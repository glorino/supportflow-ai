"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface TicketData {
  id: string;
  ticketNumber: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  channel: string;
  sentiment: string;
  sentimentScore: number;
  aiConfidence: number;
  slaStatus: string;
  slaDue: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    email: string;
    company: string;
    segment: string;
    csat: number;
    totalTickets: number;
  };
  assignee: {
    name: string;
    email: string;
  };
}

interface Message {
  id: string;
  senderType: string;
  senderName: string;
  content: string;
  channel: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

const statusColor: Record<string, string> = {
  open: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  escalated: "bg-red-100 text-red-700",
  resolved: "bg-green-100 text-green-700",
};

const priorityColor: Record<string, string> = {
  low: "text-gray-500",
  medium: "text-amber-600",
  high: "text-orange-600 font-semibold",
  urgent: "text-red-600 font-semibold",
};

const channelDisplayNames: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  web: "Web Chat",
  sms: "SMS",
  messenger: "Messenger",
  instagram: "Instagram",
};

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export default function TicketDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data.ticket || null);
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🎫</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Ticket Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The ticket you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/dashboard/tickets" className="btn-primary">Back to Tickets</Link>
      </div>
    );
  }

  const customerInitials = ticket.customer?.name?.split(" ").map((n) => n[0]).join("") || "?";

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/tickets" className="text-gray-400 hover:text-gray-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{ticket.ticketNumber}</h1>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[ticket.status] || "bg-gray-100 text-gray-600"}`}>{ticket.status}</span>
        <span className={`text-sm capitalize ${priorityColor[ticket.priority] || "text-gray-500"}`}>{ticket.priority}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-6 py-4">
              <h2 className="font-semibold text-gray-900">{ticket.subject}</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto p-6 space-y-4">
              {messages.length > 0 ? (
                messages.map((m) => (
                  <div key={m.id} className={`flex ${m.senderType === "customer" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-lg rounded-xl px-4 py-3 ${
                      m.senderType === "customer"
                        ? "bg-gray-100 text-gray-900"
                        : "bg-blue-600 text-white"
                    }`}>
                      <div className="text-xs opacity-70 mb-1">{m.senderName} · {formatTime(m.createdAt)}</div>
                      <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                  <p>No messages yet. The initial message:</p>
                  <div className="mt-3 p-4 bg-gray-50 rounded-xl text-left max-w-lg mx-auto">
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">{ticket.message}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Customer</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">{customerInitials}</div>
              <div>
                <div className="font-medium text-gray-900">{ticket.customer?.name || "Unknown"}</div>
                <div className="text-sm text-gray-500">{ticket.customer?.email || ""}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              <div>Company: {ticket.customer?.company || "—"}</div>
              <div>Segment: <span className="capitalize">{ticket.customer?.segment || "—"}</span></div>
              <div>Total tickets: {ticket.customer?.totalTickets || 0}</div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Properties</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-medium capitalize">{ticket.status}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Priority</span><span className={`font-medium capitalize ${priorityColor[ticket.priority] || "text-gray-500"}`}>{ticket.priority}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Channel</span><span className="font-medium">{channelDisplayNames[ticket.channel] || ticket.channel}</span></div>
              {ticket.assignee?.name && (
                <div className="flex justify-between"><span className="text-gray-500">Assignee</span><span className="font-medium">{ticket.assignee.name}</span></div>
              )}
              <div className="flex justify-between"><span className="text-gray-500">AI Confidence</span><span className="font-medium">{ticket.aiConfidence}%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Sentiment</span><span className="font-medium capitalize">{ticket.sentiment}</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-3">SLA Status</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">SLA Status</span>
                  <span className={`font-medium ${ticket.slaStatus === "breached" ? "text-red-600" : ticket.slaStatus === "ok" ? "text-green-600" : "text-amber-600"}`}>
                    {ticket.slaStatus === "breached" ? "BREACHED" : ticket.slaStatus === "ok" ? "On Track" : ticket.slaStatus}
                  </span>
                </div>
              </div>
              {ticket.tags && ticket.tags.length > 0 && (
                <div>
                  <div className="text-sm text-gray-500 mb-2">Tags</div>
                  <div className="flex flex-wrap gap-1.5">
                    {ticket.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
