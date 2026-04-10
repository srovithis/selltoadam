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
  console.log("SENDGRID_API_KEY exists:", !!apiKey);
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
    <p style="margin-top:16px;"><a href="https://selltoadam.vercel.app/crm">View in CRM →</a></p>
  `;

  // Send full details email
  console.log("Sending lead email to Rovithis13@gmail.com...");
  await sgMail.send({
    to: "Rovithis13@gmail.com",
    from: "Rovithis13@gmail.com",
    subject,
    html,
  });
  console.log("Lead email sent successfully.");

  // Send short SMS via Verizon email-to-text gateway
  const smsBody = `New Lead! Name: ${(lead.name || "Unknown").slice(0, 20)}, Address: ${lead.address.slice(0, 40)}, Ph: ${lead.phone || "N/A"}. CRM: selltoadam.vercel.app/crm`;
  console.log("Sending SMS via vtext gateway...");
  await sgMail.send({
    to: "4132622463@vtext.com",
    from: "Rovithis13@gmail.com",
    subject: " ",
    text: smsBody.slice(0, 160),
  });
  console.log("SMS gateway email sent successfully.");
}

// Twilio SMS — kept for future use, currently disabled
export async function sendLeadSMS(_lead: LeadData): Promise<void> {
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  // if (!accountSid || !authToken || !fromNumber) return;
  // const twilio = (await import("twilio")).default;
  // const client = twilio(accountSid, authToken);
  // await client.messages.create({
  //   body: `New Lead! Name: ${_lead.name || "Unknown"}, Address: ${_lead.address}, Phone: ${_lead.phone || "N/A"}. CRM: selltoadam.vercel.app/crm`,
  //   from: fromNumber,
  //   to: "+14132622463",
  // });
}
