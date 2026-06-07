import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const ticketSchema = z.object({
  classification: z.object({
    intent: z.enum(["billing", "technical", "account", "general", "feature_request", "bug_report"]),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    category: z.string(),
    confidence: z.number().min(0).max(1),
  }),
  sentiment: z.object({
    sentiment: z.enum(["positive", "neutral", "negative", "angry", "frustrated"]),
    score: z.number().min(-1).max(1),
    keywords: z.array(z.string()),
  }),
  suggestedResponse: z.object({
    message: z.string(),
    tone: z.enum(["formal", "friendly", "empathetic", "apologetic"]),
    requiresEscalation: z.boolean(),
    escalationReason: z.string().optional(),
  }),
  entities: z.object({
    orderIds: z.array(z.string()),
    emailAddresses: z.array(z.string()),
    productNames: z.array(z.string()),
  }),
});

export async function POST(req: Request) {
  const { ticketId, message, customerId, channel, history } = await req.json();

  const { object: analysis } = await generateObject({
    model: openai("gpt-4o"),
    schema: ticketSchema,
    system: `You are the AI Ticket Analyzer for SupportFlow AI.

Analyze the customer ticket and provide:
1. Classification (intent, priority, category, confidence)
2. Sentiment analysis
3. Suggested response
4. Entity extraction

Be accurate and thorough. Consider the full conversation history.`,
    prompt: `Analyze this customer ticket:

Ticket ID: ${ticketId}
Customer ID: ${customerId}
Channel: ${channel}
Message: "${message}"

${history && history.length > 0 ? `Conversation history:\n${history.map((h: { role: string; content: string }) => `${h.role}: ${h.content}`).join("\n")}` : "This is the first message in the conversation."}`,
  });

  return Response.json({
    ticketId,
    analysis,
    processedAt: new Date().toISOString(),
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get("ticketId");

  if (!ticketId) {
    return Response.json({ error: "ticketId is required" }, { status: 400 });
  }

  return Response.json({
    ticketId,
    status: "open",
    assignedTo: null,
    lastActivity: new Date().toISOString(),
  });
}
