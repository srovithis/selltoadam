import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail, sendLeadSMS } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();
    const results = await Promise.allSettled([
      sendLeadEmail(lead),
      sendLeadSMS(lead),
    ]);

    const errors = results
      .filter((r) => r.status === "rejected")
      .map((r) => (r as PromiseRejectedResult).reason?.message || "Unknown error");

    return NextResponse.json({
      success: true,
      errors: errors.length ? errors : undefined,
    });
  } catch (err) {
    console.error("POST /api/notify error:", err);
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 });
  }
}
