import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadEmail, sendLeadSMS } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(leads);
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, name, phone, email, soonToSell, askingPrice, immediateRepairs, notes, source } = body;

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        address,
        name: name || null,
        phone: phone || null,
        email: email || null,
        soonToSell: soonToSell || null,
        askingPrice: askingPrice || null,
        immediateRepairs: immediateRepairs || null,
        notes: notes || null,
        source: source || "Website",
        events: {
          create: {
            type: "created",
            note: "Lead created from website form",
          },
        },
      },
    });

    // Send notifications — must be awaited before response on Vercel serverless
    try {
      const results = await Promise.allSettled([sendLeadEmail(lead), sendLeadSMS(lead)]);
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Notification[${i}] failed:`, r.reason);
        }
      });
    } catch (err) {
      console.error("Notification error:", err);
    }

    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
