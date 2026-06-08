import { NextRequest, NextResponse } from "next/server";
import { broadcastTicketUpdate, broadcastInboxUpdate } from "@/lib/pusher";

interface BroadcastData {
  ticketId?: string;
  conversationId?: string;
  [key: string]: unknown;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { channel, event, data } = body;

    if (!channel || !event || !data) {
      return NextResponse.json({ error: "Missing channel, event, or data" }, { status: 400 });
    }

    const typedData = data as BroadcastData;

    if (channel === "tickets") {
      await broadcastTicketUpdate(typedData.ticketId || "", typedData);
    } else if (channel === "inbox") {
      await broadcastInboxUpdate(typedData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pusher broadcast error:", error);
    return NextResponse.json({ error: "Failed to broadcast" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    channels: ["tickets", "inbox"],
    events: ["ticket-updated", "inbox-updated", "new-message"],
    status: "operational",
  });
}
