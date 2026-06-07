import { openai } from "@ai-sdk/openai";
import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: `You are SupportFlow AI, an intelligent customer support assistant.

Your role is to help customers resolve their issues quickly and accurately.

Guidelines:
- Be professional, empathetic, and helpful
- Use the customer's name when available
- Provide clear, actionable solutions
- If you can't resolve the issue, explain why and offer alternatives
- Keep responses concise but thorough
- Match the customer's communication style

You have access to tools to:
- Search the knowledge base for relevant articles
- Look up customer information
- Execute automated actions (password resets, refunds, etc.)
- Escalate to human agents when needed

Always verify facts before providing solutions. If uncertain, escalate.`,
    messages,
    tools: {
      searchKnowledgeBase: tool({
        description: "Search the knowledge base for relevant articles",
        inputSchema: z.object({
          query: z.string().describe("Search query"),
          category: z.string().optional().describe("Filter by category"),
        }),
        execute: async ({ query }) => {
          return {
            results: [],
            query,
            totalResults: 0,
          };
        },
      }),
      lookupCustomer: tool({
        description: "Look up customer information",
        inputSchema: z.object({
          customerId: z.string().optional(),
          email: z.string().optional(),
        }),
        execute: async ({ customerId }) => {
          return {
            customerId: customerId || "unknown",
            found: false,
          };
        },
      }),
      executeAction: tool({
        description: "Execute an automated action",
        inputSchema: z.object({
          action: z.enum(["send_password_reset", "issue_refund", "update_account", "create_ticket"]),
          parameters: z.record(z.string(), z.string()),
        }),
        execute: async ({ action }) => {
          return {
            action,
            executed: true,
            executedAt: new Date().toISOString(),
          };
        },
      }),
      escalateToAgent: tool({
        description: "Escalate to a human agent",
        inputSchema: z.object({
          reason: z.string(),
          priority: z.enum(["normal", "urgent", "critical"]),
          team: z.string().optional(),
        }),
        execute: async ({ reason }) => {
          return {
            escalated: true,
            reason,
            escalatedAt: new Date().toISOString(),
          };
        },
      }),
    },
    stopWhen: stepCountIs(5),
  });

  return result.toTextStreamResponse();
}
