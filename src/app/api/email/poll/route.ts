import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function processIncomingEmail(from: string, subject: string, body: string): Promise<{ ticketNumber: string; customerId: string }> {
  let customers = await sql`SELECT id FROM customers WHERE email = ${from}`;
  let customerId: string;

  if (customers.length === 0) {
    const name = from.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const result = await sql`
      INSERT INTO customers (email, name, company, segment, plan)
      VALUES (${from}, ${name}, 'Unknown', 'starter', 'starter')
      RETURNING id
    `;
    customerId = result[0].id;
  } else {
    customerId = customers[0].id;
  }

  const count = await sql`SELECT COUNT(*) as cnt FROM tickets`;
  const num = Number(count[0].cnt) + 1235;
  const ticketNumber = `SSV-${num}`;
  const slaDue = new Date(Date.now() + 14400000);

  await sql`
    INSERT INTO tickets (ticket_number, subject, message, status, priority, channel, customer_id, sla_status, sla_due, tags)
    VALUES (${ticketNumber}, ${subject}, ${body}, 'open', 'medium', 'email', ${customerId}, 'ok', ${slaDue.toISOString()}, ARRAY['email', 'inbound'])
  `;

  await sql`
    INSERT INTO messages (ticket_id, sender_type, sender_id, content, channel, metadata)
    SELECT id, 'customer', ${customerId}, ${body}, 'email', ${JSON.stringify({ from, subject })}::jsonb
    FROM tickets WHERE ticket_number = ${ticketNumber}
  `;

  return { ticketNumber, customerId };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, subject, text, html, messageId } = body;

    if (!from || !subject) {
      return NextResponse.json({ error: "Missing from or subject" }, { status: 400 });
    }

    const existing = await sql`
      SELECT id FROM messages WHERE channel = 'email' AND metadata->>'messageId' = ${messageId || ''}
    `;
    if (existing.length > 0) {
      return NextResponse.json({ message: "Duplicate email skipped" });
    }

    const result = await processIncomingEmail(from, subject, text || html || "");

    return NextResponse.json({
      message: "Email processed",
      ticketNumber: result.ticketNumber,
    });
  } catch (error) {
    console.error("Email poll error:", error);
    return NextResponse.json({ error: "Failed to process email" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const imapHost = process.env.IMAP_HOST;
    const emailAddr = process.env.EMAIL_ADDRESS;
    const configured = !!(imapHost && emailAddr);

    const recentEmails = await sql`
      SELECT 
        t.ticket_number,
        t.subject,
        t.status,
        t.created_at,
        c.name as customer_name,
        c.email as customer_email
      FROM tickets t
      LEFT JOIN customers c ON t.customer_id = c.id
      WHERE t.channel = 'email'
      ORDER BY t.created_at DESC
      LIMIT 20
    `;

    return NextResponse.json({
      configured,
      imapHost: imapHost || "Not configured",
      email: emailAddr || "Not configured",
      recentEmails: recentEmails.map(e => ({
        ticketNumber: e.ticket_number,
        subject: e.subject,
        status: e.status,
        customerName: e.customer_name,
        customerEmail: e.customer_email,
        createdAt: e.created_at,
      })),
    });
  } catch (error) {
    console.error("Email status error:", error);
    return NextResponse.json({ error: "Failed to check email status" }, { status: 500 });
  }
}
