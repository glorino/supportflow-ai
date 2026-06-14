"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRealtimeTickets } from "@/hooks/use-sse";

const tickets = [
  { id: "SSV-1234", subject: "Can't access my account after password reset", customer: "Sarah Chen", company: "Acme Corp", status: "open", priority: "high", channel: "WhatsApp", channelIcon: "📱", assignee: "AI Agent", sla: "23m left", slaStatus: "ok", createdAt: "2 min ago", lastReply: "1 min ago", sentiment: "negative", tags: ["account", "urgent"], aiConfidence: 94 },
  { id: "SSV-1233", subject: "Refund request for order #98765", customer: "Marcus Johnson", company: "TechStart", status: "pending", priority: "medium", channel: "Email", channelIcon: "📧", assignee: "Sarah K.", sla: "1h 45m", slaStatus: "ok", createdAt: "15 min ago", lastReply: "10 min ago", sentiment: "neutral", tags: ["billing", "refund"], aiConfidence: 88 },
  { id: "SSV-1232", subject: "API returning 500 errors intermittently", customer: "Dev Team", company: "TechStart Inc", status: "escalated", priority: "urgent", channel: "Web", channelIcon: "💬", assignee: "Marcus J.", sla: "BREACHED", slaStatus: "breached", createdAt: "1h ago", lastReply: "30 min ago", sentiment: "angry", tags: ["api", "bug", "critical"], aiConfidence: 72 },
  { id: "SSV-1231", subject: "How to integrate with Salesforce?", customer: "Emily Rodriguez", company: "Design Studio", status: "open", priority: "low", channel: "Messenger", channelIcon: "💬", assignee: "AI Agent", sla: "5h left", slaStatus: "ok", createdAt: "2h ago", lastReply: "1h ago", sentiment: "neutral", tags: ["integration", "how-to"], aiConfidence: 96 },
  { id: "SSV-1230", subject: "Billing discrepancy on invoice #4521", customer: "James Park", company: "RetailCo", status: "resolved", priority: "medium", channel: "SMS", channelIcon: "💬", assignee: "AI Agent", sla: "Done", slaStatus: "done", createdAt: "3h ago", lastReply: "2h ago", sentiment: "positive", tags: ["billing"], aiConfidence: 97 },
  { id: "SSV-1229", subject: "Feature request: dark mode support", customer: "Lisa Wang", company: "StartupApp", status: "open", priority: "low", channel: "Web", channelIcon: "💬", assignee: "Unassigned", sla: "8h left", slaStatus: "ok", createdAt: "4h ago", lastReply: "4h ago", sentiment: "positive", tags: ["feature-request"], aiConfidence: 99 },
  { id: "SSV-1228", subject: "App crashes on iOS 17.2", customer: "Tom Miller", company: "MobileDev", status: "open", priority: "high", channel: "Instagram", channelIcon: "📸", assignee: "AI Agent", sla: "45m left", slaStatus: "warning", createdAt: "5h ago", lastReply: "3h ago", sentiment: "frustrated", tags: ["bug", "ios", "mobile"], aiConfidence: 85 },
  { id: "SSV-1227", subject: "Cannot download invoice PDF", customer: "Anna Smith", company: "CorpNet", status: "resolved", priority: "low", channel: "WhatsApp", channelIcon: "📱", assignee: "AI Agent", sla: "Done", slaStatus: "done", createdAt: "6h ago", lastReply: "5h ago", sentiment: "positive", tags: ["billing"], aiConfidence: 98 },
  { id: "SSV-1226", subject: "Want to upgrade to Growth plan", customer: "Mike Davis", company: "GrowthIO", status: "open", priority: "low", channel: "Web", channelIcon: "💬", assignee: "AI Agent", sla: "12h left", slaStatus: "ok", createdAt: "7h ago", lastReply: "7h ago", sentiment: "positive", tags: ["sales", "upgrade"], aiConfidence: 99 },
  { id: "SSV-1225", subject: "Two-factor auth not working", customer: "Rachel Green", company: "Coffee Co", status: "open", priority: "medium", channel: "Email", channelIcon: "📧", assignee: "AI Agent", sla: "2h left", slaStatus: "ok", createdAt: "8h ago", lastReply: "7h ago", sentiment: "negative", tags: ["account", "security"], aiConfidence: 91 },
];

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

const slaColor: Record<string, string> = {
  ok: "text-green-600",
  warning: "text-amber-600 font-semibold",
  breached: "text-red-600 font-semibold",
  done: "text-gray-400",
};

const sentimentIcon: Record<string, string> = {
  positive: "😊",
  neutral: "😐",
  negative: "😟",
  angry: "😡",
  frustrated: "😤",
};

const sentimentBg: Record<string, string> = {
  positive: "from-green-50 to-emerald-50 border-green-200",
  neutral: "from-gray-50 to-slate-50 border-gray-200",
  negative: "from-amber-50 to-orange-50 border-amber-200",
  angry: "from-red-50 to-rose-50 border-red-200",
  frustrated: "from-orange-50 to-amber-50 border-orange-200",
};

export default function TicketsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const realtimeUpdates = useRealtimeTickets();

  const handleRealtimeUpdate = useCallback((data: { ticketId?: string; type?: string }) => {
    if (data.ticketId) {
      const idx = tickets.findIndex((t) => t.id === data.ticketId);
      if (idx !== -1) {
        if (data.type === "sla_warning") tickets[idx].slaStatus = "warning";
        if (data.type === "sla_breached") tickets[idx].slaStatus = "breached";
      }
    }
  }, []);

  realtimeUpdates.forEach(handleRealtimeUpdate);

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter === "all") return true;
    return t.status === statusFilter;
  });

  const toggleTicket = (id: string) => {
    setSelectedTickets((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all customer conversations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export
          </button>
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Ticket
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: "Open", count: 6, gradient: "from-blue-500 to-indigo-600", cardBg: "card-gradient-blue", icon: "📂" },
          { label: "Pending", count: 1, gradient: "from-amber-400 to-orange-500", cardBg: "card-gradient-amber", icon: "⏳" },
          { label: "Escalated", count: 1, gradient: "from-red-500 to-rose-600", cardBg: "card-gradient-red", icon: "🚨" },
          { label: "Resolved", count: 2, gradient: "from-green-500 to-emerald-600", cardBg: "card-gradient-green", icon: "✅" },
          { label: "SLA Breached", count: 1, gradient: "from-red-600 to-red-800", cardBg: "card-gradient-red", icon: "⚠️" },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => setStatusFilter(s.label.toLowerCase().split(" ")[0])}
            className={`rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              statusFilter === s.label.toLowerCase().split(" ")[0]
                ? `${s.cardBg} border-transparent shadow-lg scale-[1.02]`
                : "border-gray-200 bg-white hover:bg-gray-50 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{s.icon}</span>
              <span className="text-xs text-gray-500 font-medium">{s.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.count}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search tickets by ID, subject, customer..." className="input-search" />
        </div>
        <select className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none transition-colors">
          <option>All Channels</option>
          <option>WhatsApp</option>
          <option>Email</option>
          <option>Web Chat</option>
          <option>SMS</option>
          <option>Messenger</option>
          <option>Instagram</option>
        </select>
        <select className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none transition-colors">
          <option>All Priority</option>
          <option>Urgent</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none transition-colors">
          <option>All Assignees</option>
          <option>AI Agent</option>
          <option>Marcus J.</option>
          <option>Sarah K.</option>
          <option>Unassigned</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedTickets.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200 animate-[slide-up_0.2s_ease]">
          <span className="text-sm text-blue-700 font-medium">{selectedTickets.length} selected</span>
          <button className="btn-ghost text-xs">Assign to...</button>
          <button className="btn-ghost text-xs">Change status</button>
          <button className="btn-ghost text-xs">Add tag</button>
          <button className="btn-ghost text-xs text-red-600">Close tickets</button>
        </div>
      )}

      {/* Ticket Table */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="w-10 px-4 py-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticket</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">SLA</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredTickets.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedTickets.includes(t.id)}
                    onChange={() => toggleTicket(t.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/tickets/${t.id.replace("SF-", "")}`} className="block">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-gray-400">{t.id}</span>
                      <span>{t.channelIcon}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition truncate max-w-xs">{t.subject}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      {t.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                      ))}
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                      {t.customer.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t.customer}</div>
                      <div className="text-xs text-gray-400">{t.company}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[t.status]}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs ${priorityColor[t.priority]}`}>{t.priority}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">{t.assignee}</span>
                </td>
                <td className="px-4 py-3">
                  <div className={`text-xs font-medium ${slaColor[t.slaStatus]}`}>{t.sla}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{sentimentIcon[t.sentiment]}</span>
                    <span className="text-xs text-gray-500">{t.aiConfidence}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition">
                    <button className="h-7 w-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-gray-400 hover:text-blue-600 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </button>
                    <button className="h-7 w-7 rounded-lg hover:bg-amber-50 flex items-center justify-center text-gray-400 hover:text-amber-600 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    </button>
                    <button className="h-7 w-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-sm text-gray-500">Showing {filteredTickets.length} of {tickets.length} tickets</span>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-xs" disabled>Previous</button>
            <button className="h-8 w-8 rounded-lg bg-blue-600 text-white text-xs font-medium shadow-sm">1</button>
            <button className="h-8 w-8 rounded-lg hover:bg-gray-100 text-xs font-medium text-gray-600 transition">2</button>
            <button className="btn-ghost text-xs">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
