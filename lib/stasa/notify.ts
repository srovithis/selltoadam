// lib/stasa/notify.ts
// Handoff alerts for the STASA chat widget — ntfy push + outbound Twilio SMS.
// Both fail-soft: a missing/erroring channel logs and is skipped, never throws.

const DEFAULT_NTFY_TOPIC = "selltoadam-leads-adam"; // existing topic used by lib/notifications.ts
const DEFAULT_FORWARD_TO = "+14132622463"; // spec value for TWILIO_FORWARD_TO_CELL

async function fireNtfy(title: string, body: string): Promise<void> {
  const topic = process.env.NTFY_TOPIC || DEFAULT_NTFY_TOPIC;
  // ntfy Title header must be ISO-8859-1; strip non-ASCII to be safe.
  const safeTitle = title.normalize("NFKD").replace(/[^\x00-\x7F]/g, "-");
  try {
    const res = await fetch(`https://ntfy.sh/${topic}`, {
      method: "POST",
      headers: {
        Title: safeTitle,
        Priority: "high",
        Tags: "house,bell",
        "Content-Type": "text/plain",
      },
      body,
    });
    console.log(`[stasa] ntfy response: ${res.status} ${res.statusText}`);
  } catch (err) {
    console.error("[stasa] ntfy threw:", err);
  }
}

async function fireSms(body: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  const to = process.env.TWILIO_FORWARD_TO_CELL || DEFAULT_FORWARD_TO;

  if (!accountSid || !authToken || !from) {
    console.warn(
      "[stasa] Twilio not configured (need TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER) — skipping SMS"
    );
    return;
  }
  try {
    const twilio = (await import("twilio")).default;
    const client = twilio(accountSid, authToken);
    const msg = await client.messages.create({ from, to, body });
    console.log("[stasa] SMS sent", msg.sid);
  } catch (err) {
    console.error("[stasa] SMS send failed:", err);
  }
}

// Visitor asked to talk to Adam.
export async function fireHandoffAlert(message: string): Promise<void> {
  await Promise.allSettled([
    fireNtfy("STASA Lead Handoff", `A visitor wants to talk to Adam. Message: ${message}`),
    fireSms(`STASA Chat: Someone wants to talk to Adam. Message: ${message}`),
  ]);
}

// Visitor's name captured after the handoff.
export async function fireNameAlert(name: string): Promise<void> {
  await Promise.allSettled([
    fireNtfy("STASA Lead Handoff", `STASA Chat: ${name} is waiting to chat.`),
    fireSms(`STASA Chat: ${name} is waiting to chat.`),
  ]);
}
