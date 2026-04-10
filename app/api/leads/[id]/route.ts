import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: { events: { orderBy: { createdAt: "desc" } } },
    });
    if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(lead);
  } catch (err) {
    console.error("GET /api/leads/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status, notes, followUpDate } = body;

    const existing = await prisma.lead.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const events: { type: string; message: string }[] = [];
    if (status && status !== existing.status) {
      events.push({
        type: "status_change",
        message: `Status changed from "${existing.status}" to "${status}"`,
      });
    }
    if (notes !== undefined && notes !== existing.notes) {
      events.push({ type: "note_added", message: "Notes updated" });
    }
    if (followUpDate !== undefined) {
      events.push({
        type: "followup_set",
        message: `Follow-up date set to ${followUpDate ? new Date(followUpDate).toLocaleDateString() : "cleared"}`,
      });
    }

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(followUpDate !== undefined && {
          followUpDate: followUpDate ? new Date(followUpDate) : null,
        }),
        ...(events.length > 0 && {
          events: { create: events },
        }),
      },
      include: { events: { orderBy: { createdAt: "desc" } } },
    });

    return NextResponse.json(lead);
  } catch (err) {
    console.error("PATCH /api/leads/[id] error:", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.lead.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/leads/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
