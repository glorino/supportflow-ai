import { openai } from "@ai-sdk/openai";
import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: `You are SSV AI, the intelligent customer support assistant for SSV CRM.

Your role is to help customers resolve their issues quickly and accurately.

Guidelines:
- Be professional, empathetic, and helpful
- Use the customer's name when available
- Provide clear, actionable solutions
- If you can't resolve the issue, explain why and offer alternatives
- Keep responses concise but thorough
- You work for a company called SSV
- All currency is in Naira (₦)

You have access to tools to:
- Search the knowledge base for relevant articles
- Look up customer information by email
- Look up tickets by ticket number
- Create new support tickets
- Provide analytics insights

Always verify facts before providing solutions. If uncertain, escalate to a human agent.`,
    messages,
    tools: {
      searchKnowledgeBase: tool({
        description: "Search the knowledge base for relevant support articles",
        inputSchema: z.object({
          query: z.string().describe("Search query to find relevant articles"),
        }),
        execute: async ({ query }) => {
          try {
            const results = await sql`
              SELECT id, title, content, collection, views, ai_used
              FROM knowledge_articles
              WHERE status = 'published'
                AND (title ILIKE ${`%${query}%`} OR content ILIKE ${`%${query}%`} OR ${query} = ANY(tags))
              ORDER BY views DESC
              LIMIT 5
            `;
            return {
              results: results.map((r: Record<string, unknown>) => ({
                id: r.id,
                title: r.title,
                excerpt: String(r.content).substring(0, 200),
                collection: r.collection,
                views: r.views,
              })),
              totalResults: results.length,
            };
          } catch {
            return { results: [], totalResults: 0, note: "Knowledge base not yet populated" };
          }
        },
      }),
      lookupCustomer: tool({
        description: "Look up a customer by email address to get their account info",
        inputSchema: z.object({
          email: z.string().describe("Customer email address"),
        }),
        execute: async ({ email }) => {
          try {
            const customers = await sql`
              SELECT id, name, email, company, segment, plan, ltv, csat, total_tickets, status
              FROM customers WHERE email = ${email}
              LIMIT 1
            `;
            if (customers.length === 0) {
              return { found: false, email, note: "No customer found with this email" };
            }
            const c = customers[0];
            return {
              found: true,
              id: c.id,
              name: c.name,
              email: c.email,
              company: c.company,
              segment: c.segment,
              plan: c.plan,
              lifetimeValue: `₦${Number(c.ltv).toLocaleString()}`,
              csat: c.csat,
              totalTickets: c.total_tickets,
              status: c.status,
            };
          } catch {
            return { found: false, email, note: "Database unavailable" };
          }
        },
      }),
      lookupTicket: tool({
        description: "Look up a ticket by its ticket number (e.g. SSV-1234)",
        inputSchema: z.object({
          ticketNumber: z.string().describe("Ticket number like SSV-1234"),
        }),
        execute: async ({ ticketNumber }) => {
          try {
            const tickets = await sql`
              SELECT t.id, t.ticket_number, t.subject, t.message, t.status, t.priority,
                     t.channel, t.sentiment, t.ai_confidence, t.sla_status, t.tags,
                     c.name as customer_name, c.email as customer_email
              FROM tickets t
              LEFT JOIN customers c ON t.customer_id = c.id
              WHERE t.ticket_number = ${ticketNumber}
              LIMIT 1
            `;
            if (tickets.length === 0) {
              return { found: false, ticketNumber, note: "Ticket not found" };
            }
            const t = tickets[0];
            return {
              found: true,
              ticketNumber: t.ticket_number,
              subject: t.subject,
              status: t.status,
              priority: t.priority,
              channel: t.channel,
              sentiment: t.sentiment,
              aiConfidence: t.ai_confidence,
              slaStatus: t.sla_status,
              tags: t.tags,
              customerName: t.customer_name,
              customerEmail: t.customer_email,
            };
          } catch {
            return { found: false, ticketNumber, note: "Database unavailable" };
          }
        },
      }),
      createTicket: tool({
        description: "Create a new support ticket for a customer issue",
        inputSchema: z.object({
          subject: z.string().describe("Brief subject line"),
          message: z.string().describe("Detailed description of the issue"),
          priority: z.enum(["low", "medium", "high", "urgent"]).describe("Ticket priority"),
          channel: z.string().describe("Channel the request came from"),
        }),
        execute: async ({ subject, message, priority, channel }) => {
          try {
            const count = await sql`SELECT COUNT(*) as cnt FROM tickets`;
            const num = Number(count[0].cnt) + 1235;
            const ticketNumber = `SSV-${num}`;
            const slaDue = new Date(Date.now() + (priority === "urgent" ? 3600000 : priority === "high" ? 7200000 : 14400000));
            await sql`
              INSERT INTO tickets (ticket_number, subject, message, status, priority, channel, sla_status, sla_due, tags)
              VALUES (${ticketNumber}, ${subject}, ${message}, 'open', ${priority}, ${channel}, 'ok', ${slaDue.toISOString()}, ARRAY['web-chat'])
            `;
            return {
              created: true,
              ticketNumber,
              subject,
              priority,
              status: "open",
              message: `Ticket ${ticketNumber} has been created. Our team will respond shortly.`,
            };
          } catch {
            return { created: false, note: "Failed to create ticket. Please try again." };
          }
        },
      }),
      getAnalytics: tool({
        description: "Get current support analytics and metrics",
        inputSchema: z.object({}),
        execute: async () => {
          try {
            const [ticketCount, openCount, resolvedCount] = await Promise.all([
              sql`SELECT COUNT(*) as cnt FROM tickets`,
              sql`SELECT COUNT(*) as cnt FROM tickets WHERE status IN ('open', 'pending')`,
              sql`SELECT COUNT(*) as cnt FROM tickets WHERE status = 'resolved'`,
            ]);
            return {
              totalTickets: Number(ticketCount[0].cnt),
              openTickets: Number(openCount[0].cnt),
              resolvedTickets: Number(resolvedCount[0].cnt),
              resolutionRate: ticketCount[0].cnt > 0
                ? `${Math.round((Number(resolvedCount[0].cnt) / Number(ticketCount[0].cnt)) * 100)}%`
                : "N/A",
            };
          } catch {
            return { note: "Analytics unavailable" };
          }
        },
      }),
    },
    stopWhen: stepCountIs(5),
  });

  return result.toTextStreamResponse();
}
