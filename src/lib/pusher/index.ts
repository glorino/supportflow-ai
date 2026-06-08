import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.PUSHER_CLUSTER || "us2",
  useTLS: true,
});

interface BroadcastPayload {
  [key: string]: unknown;
}

export async function broadcastChannel(channel: string, event: string, data: BroadcastPayload) {
  await pusher.trigger(channel, event, data);
}

export async function broadcastTicketUpdate(ticketId: string, data: BroadcastPayload) {
  await pusher.trigger("tickets", "ticket-updated", { ticketId, ...data });
}

export async function broadcastNewMessage(conversationId: string, data: BroadcastPayload) {
  await pusher.trigger(`conversation-${conversationId}`, "new-message", data);
}

export async function broadcastInboxUpdate(data: BroadcastPayload) {
  await pusher.trigger("inbox", "inbox-updated", data);
}

export async function broadcastAgentActivity(data: BroadcastPayload) {
  await pusher.trigger("ai-agents", "agent-activity", data);
}

export { pusher };
