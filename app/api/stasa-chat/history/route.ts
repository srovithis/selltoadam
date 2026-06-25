// app/api/stasa-chat/history/route.ts
// Public endpoint — returns recent chat history for a visitor.
// GET /api/stasa-chat/history?visitorId=... → { messages, handoffRequested }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const visitorId = request.nextUrl.searchParams.get("visitorId")?.trim();
    if (!visitorId) {
      return NextResponse.json({ error: "visitorId is required" }, { status: 400 });
    }

    const visitor = await prisma.stasaVisitor.findUnique({
      where: { visitorId },
      select: { handoffRequested: true },
    });

    const recent = await prisma.stasaMessage.findMany({
      where: { visitorId },
      orderBy: { createdAt: "desc" },
      take: 30,
      select: { role: true, content: true, createdAt: true },
    });

    return NextResponse.json({
      messages: recent.reverse(),
      handoffRequested: visitor?.handoffRequested ?? false,
    });
  } catch (err) {
    console.error("[stasa/history] error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
