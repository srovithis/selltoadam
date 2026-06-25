// app/api/stasa-chat/message/route.ts
// Public endpoint for the STASA ("Sell to Adam") chat widget.
// POST { visitorId, message } → { reply, handoffRequested, followUp? }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fireHandoffAlert, fireNameAlert } from "@/lib/stasa/notify";
import {
  STASA_SYSTEM_PROMPT,
  HANDOFF_REPLY,
  HANDOFF_HOLDING_REPLY,
  NAME_ASK,
  detectHandoff,
} from "@/lib/stasa/constants";

export const dynamic = "force-dynamic";

const RATE_LIMIT_PER_HOUR = 20;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const visitorId = typeof body.visitorId === "string" ? body.visitorId.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!visitorId || !message) {
      return NextResponse.json({ error: "visitorId and message are required" }, { status: 400 });
    }

    // Upsert visitor.
    const visitor = await prisma.stasaVisitor.upsert({
      where: { visitorId },
      update: {},
      create: { visitorId },
    });

    // Rate limit: 20 user messages / hour / visitor (checked before insert).
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = await prisma.stasaMessage.count({
      where: { visitorId, role: "user", createdAt: { gt: oneHourAgo } },
    });
    if (recentCount >= RATE_LIMIT_PER_HOUR) {
      return NextResponse.json(
        {
          reply:
            "You've sent quite a few messages — give me a sec to catch up! You can always reach Adam directly at 413-423-1110. 😊",
          handoffRequested: visitor.handoffRequested,
        },
        { status: 429 }
      );
    }

    // Most recent assistant message BEFORE this turn (for name-capture).
    const lastAssistant = await prisma.stasaMessage.findFirst({
      where: { visitorId, role: "assistant" },
      orderBy: { createdAt: "desc" },
    });

    // Save the incoming user message (common to every branch).
    await prisma.stasaMessage.create({
      data: { visitorId, role: "user", content: message },
    });

    // ── Name capture (priority) ──────────────────────────────────────────────
    // After a handoff we ask NAME_ASK; the next message is the visitor's name.
    // Runs ahead of Branch A so the name is captured even though handoff is on.
    if (!visitor.visitorName && lastAssistant?.content === NAME_ASK) {
      const name = message.slice(0, 120);
      await prisma.stasaVisitor.update({
        where: { visitorId },
        data: { visitorName: name },
      });
      await fireNameAlert(name);
      return NextResponse.json({ reply: null, handoffRequested: true });
    }

    // ── Branch A: handoff already requested ──────────────────────────────────
    if (visitor.handoffRequested) {
      const staffExists = await prisma.stasaMessage.count({
        where: { visitorId, role: "staff" },
      });

      if (staffExists > 0) {
        // Live thread with Adam — stay silent, the widget polls history.
        return NextResponse.json({ reply: null, handoffRequested: true });
      }

      // No staff reply yet: nudge with a holding message every 3rd user message.
      const userCount = await prisma.stasaMessage.count({
        where: { visitorId, role: "user" },
      });
      if (userCount % 3 === 0) {
        await prisma.stasaMessage.create({
          data: { visitorId, role: "assistant", content: HANDOFF_HOLDING_REPLY },
        });
        return NextResponse.json({ reply: HANDOFF_HOLDING_REPLY, handoffRequested: true });
      }
      return NextResponse.json({ reply: null, handoffRequested: true });
    }

    // ── Branch B: handoff trigger detected ───────────────────────────────────
    if (detectHandoff(message)) {
      await prisma.stasaVisitor.update({
        where: { visitorId },
        data: { handoffRequested: true, handoffRequestedAt: new Date() },
      });
      await prisma.stasaMessage.create({
        data: { visitorId, role: "assistant", content: HANDOFF_REPLY },
      });
      // NAME_ASK saved as the last assistant message so the next turn captures the name.
      await prisma.stasaMessage.create({
        data: { visitorId, role: "assistant", content: NAME_ASK },
      });
      await fireHandoffAlert(message);
      return NextResponse.json({
        reply: HANDOFF_REPLY,
        handoffRequested: true,
        followUp: NAME_ASK,
      });
    }

    // ── Branch C: normal AI response ─────────────────────────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[stasa] ANTHROPIC_API_KEY not set");
      return NextResponse.json(
        {
          reply:
            "I'm having a little trouble right now — but you can reach Adam directly at 413-423-1110. 😊",
          handoffRequested: false,
        },
        { status: 200 }
      );
    }

    // Last 20 messages as conversation history (chronological).
    const recent = await prisma.stasaMessage.findMany({
      where: { visitorId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    const history = recent.reverse().map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content,
    }));

    const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: STASA_SYSTEM_PROMPT,
        messages: history,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("[stasa] Anthropic API error:", aiRes.status, errText);
      const fallback =
        "Sorry, I glitched for a second there! Try again, or reach Adam directly at 413-423-1110. 😊";
      await prisma.stasaMessage.create({
        data: { visitorId, role: "assistant", content: fallback },
      });
      return NextResponse.json({ reply: fallback, handoffRequested: false });
    }

    const aiData = await aiRes.json();
    const reply =
      aiData?.content?.[0]?.text?.trim() ||
      "Thanks for reaching out! Adam would love to help — you can also reach him at 413-423-1110. 😊";

    await prisma.stasaMessage.create({
      data: { visitorId, role: "assistant", content: reply },
    });
    return NextResponse.json({ reply, handoffRequested: false });
  } catch (err) {
    console.error("[stasa] handler error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
