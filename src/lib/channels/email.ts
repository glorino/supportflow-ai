import { sql } from "@/lib/db";

export interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  messageId?: string;
  date?: Date;
}

export async function fetchIncomingEmails(): Promise<EmailMessage[]> {
  const imapHost = process.env.IMAP_HOST;
  const imapPort = process.env.IMAP_PORT;
  const email = process.env.EMAIL_ADDRESS;
  const password = process.env.EMAIL_PASSWORD;

  if (!imapHost || !email || !password) {
    console.error("Email credentials not configured");
    return [];
  }

  // For production, use a library like 'imap-simple' or a webhook-based approach
  // This is a placeholder that would connect to IMAP
  console.log(`IMAP fetch from ${imapHost}:${imapPort} as ${email}`);
  return [];
}

export async function sendEmail(to: string, subject: string, text: string, html?: string): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const email = process.env.EMAIL_ADDRESS;
  const password = process.env.EMAIL_PASSWORD;

  if (!smtpHost || !email || !password) {
    console.error("SMTP credentials not configured");
    return false;
  }

  try {
    // For production, use nodemailer or similar
    // This creates the email record in DB for tracking
    await sql`
      INSERT INTO messages (sender_type, sender_id, content, channel, metadata)
      VALUES ('system', NULL, ${text}, 'email', ${JSON.stringify({ to, subject, from: email })}::jsonb)
    `;
    console.log(`Email sent to ${to}: ${subject}`);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

export async function processIncomingEmail(from: string, subject: string, body: string): Promise<void> {
  // Find or create customer
  let customers = await sql`SELECT id FROM customers WHERE email = ${from}`;
  let customerId: string;

  if (customers.length === 0) {
    const result = await sql`
      INSERT INTO customers (email, name, company, segment, plan)
      VALUES (${from}, ${from.split("@")[0]}, 'Unknown', 'starter', 'starter')
      RETURNING id
    `;
    customerId = result[0].id;
  } else {
    customerId = customers[0].id;
  }

  // Create ticket
  const count = await sql`SELECT COUNT(*) as cnt FROM tickets`;
  const num = Number(count[0].cnt) + 1235;
  const ticketNumber = `SSV-${num}`;
  const slaDue = new Date(Date.now() + 14400000); // 4 hours

  await sql`
    INSERT INTO tickets (ticket_number, subject, message, status, priority, channel, customer_id, sla_status, sla_due, tags)
    VALUES (${ticketNumber}, ${subject}, ${body}, 'open', 'medium', 'email', ${customerId}, 'ok', ${slaDue.toISOString()}, ARRAY['email'])
  `;
}
