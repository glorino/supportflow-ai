import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppMessage, verifyWhatsAppSignature } from "@/lib/channels/whatsapp";
import { processIncomingEmail } from "@/lib/channels/email";
import { broadcastInboxUpdate } from "@/lib/events";
import { initDB, sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // WhatsApp webhook verification
    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];

      if (changes?.field === "messages") {
        const value = changes.value;
        const messages = value.messages || [];

        for (const msg of messages) {
          const from = msg.from;
          const text = msg.text?.body || "";

          if (text) {
            await processIncomingWhatsApp(from, text, msg.id);
          }
        }
      }

      return NextResponse.json({ status: "ok" });
    }

    return NextResponse.json({ status: "ignored" });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.FB_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

async function processIncomingWhatsApp(from: string, text: string, messageId: string) {
  await initDB();

  // Find or create customer by phone
  let customers = await sql`SELECT id FROM customers WHERE email = ${from}`;
  let customerId: string;

  if (customers.length === 0) {
    const result = await sql`
      INSERT INTO customers (email, name, company, segment, plan)
      VALUES (${from}, ${'WhatsApp User'}, 'Unknown', 'starter', 'starter')
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
  const slaDue = new Date(Date.now() + 7200000); // 2 hours for WhatsApp

  await sql`
    INSERT INTO tickets (ticket_number, subject, message, status, priority, channel, customer_id, sla_status, sla_due, tags)
    VALUES (${ticketNumber}, ${text.substring(0, 100)}, ${text}, 'open', 'medium', 'whatsapp', ${customerId}, 'ok', ${slaDue.toISOString()}, ARRAY['whatsapp'])
  `;

  broadcastInboxUpdate({
    type: "new_message",
    channel: "whatsapp",
    from,
    message: text,
    ticketNumber,
  });
}
