interface LeadData {
  id?: string;
  address: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  soonToSell?: string | null;
  askingPrice?: string | null;
  immediateRepairs?: string | null;
  notes?: string | null;
  source?: string | null;
}

export async function sendLeadEmail(lead: LeadData): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("SENDGRID_API_KEY not set — skipping email");
    return;
  }

  const sgMail = (await import("@sendgrid/mail")).default;
  sgMail.setApiKey(apiKey);

  const subject = `New Lead: ${lead.name || "Unknown"} - ${lead.address}`;
  const html = `
    <h2>New Lead from selltoadam.com</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Address</td><td style="padding:8px;border:1px solid #ddd;">${lead.address}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${lead.name || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${lead.phone || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${lead.email || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Soon To Sell</td><td style="padding:8px;border:1px solid #ddd;">${lead.soonToSell || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Asking Price</td><td style="padding:8px;border:1px solid #ddd;">${lead.askingPrice || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Immediate Repairs</td><td style="padding:8px;border:1px solid #ddd;">${lead.immediateRepairs || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Notes</td><td style="padding:8px;border:1px solid #ddd;">${lead.notes || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Source</td><td style="padding:8px;border:1px solid #ddd;">${lead.source || "Website"}</td></tr>
    </table>
    <p style="margin-top:16px;"><a href="https://selltoadam.com/crm">View in CRM →</a></p>
  `;

  await sgMail.send({
    to: "Rovithis13@gmail.com",
    from: "info@selltoadam.com",
    subject,
    html,
  });
}

export async function sendLeadSMS(lead: LeadData): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("Twilio env vars not set — skipping SMS");
    return;
  }

  const twilio = (await import("twilio")).default;
  const client = twilio(accountSid, authToken);

  const body = `New Lead from selltoadam.com! Name: ${lead.name || "Unknown"}, Address: ${lead.address}, Phone: ${lead.phone || "N/A"}. Login to CRM to view.`;

  await client.messages.create({
    body,
    from: fromNumber,
    to: "+14132622463",
  });
}
