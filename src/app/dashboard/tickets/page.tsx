"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  channel: string;
  aiConfidence: number;
  slaStatus: string;
  slaDue: string;
  sentiment: string;
  sentimentScore: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string;
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

const channelColor: Record<string, string> = {
  whatsapp: "bg-green-100 text-green-700",
  email: "bg-purple-100 text-purple-700",
  web: "bg-blue-100 text-blue-700",
  sms: "bg-amber-100 text-amber-700",
  messenger: "bg-blue-100 text-blue-600",
  instagram: "bg-pink-100 text-pink-700",
};

const channelDisplayNames: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  web: "Web Chat",
  sms: "SMS",
  messenger: "Messenger",
  instagram: "Instagram",
};

function TicketsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlChannel = searchParams.get("channel") || "all";
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState(urlChannel);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (channelFilter !== "all") params.set("channel", channelFilter);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (search) params.set("search", search);

    fetch(`/api/tickets?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [channelFilter, statusFilter, search]);

  useEffect(() => {
    setChannelFilter(urlChannel);
  }, [urlChannel]);

  const filteredTickets = tickets;

  const handleChannelChange = (value: string) => {
    setChannelFilter(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("channel");
    } else {
      params.set("channel", value);
    }
    router.push(`/dashboard/tickets?${params.toString()}`);
  };

  const toggleTicket = (id: string) => {
    setSelectedTickets((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const openCount = tickets.filter((t) => t.status === "open").length;
  const pendingCount = tickets.filter((t) => t.status === "pending").length;
  const escalatedCount = tickets.filter((t) => t.status === "escalated").length;
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length;
  const breachedCount = tickets.filter((t) => t.slaStatus === "breached").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-sm text-gray-500 mt-1">{tickets.length} tickets from database</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Open", count: openCount, gradient: "from-blue-500 to-indigo-600", cardBg: "card-gradient-blue", icon: "📂" },
          { label: "Pending", count: pendingCount, gradient: "from-amber-400 to-orange-500", cardBg: "card-gradient-amber", icon: "⏳" },
          { label: "Escalated", count: escalatedCount, gradient: "from-red-500 to-rose-600", cardBg: "card-gradient-red", icon: "🚨" },
          { label: "Resolved", count: resolvedCount, gradient: "from-green-500 to-emerald-600", cardBg: "card-gradient-green", icon: "✅" },
          { label: "SLA Breached", count: breachedCount, gradient: "from-red-600 to-red-800", cardBg: "card-gradient-red", icon: "⚠️" },
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
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search tickets by ID, subject, customer..."
            className="input-search w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={channelFilter}
          onChange={(e) => handleChannelChange(e.target.value)}
          className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none transition-colors"
        >
          <option value="all">All Channels</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="web">Web Chat</option>
          <option value="sms">SMS</option>
          <option value="messenger">Messenger</option>
          <option value="instagram">Instagram</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none transition-colors"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="escalated">Escalated</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedTickets.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-xl border border-blue-200 animate-[slide-up_0.2s_ease]">
          <span className="text-sm text-blue-700 font-medium">{selectedTickets.length} selected</span>
          <button className="btn-ghost text-xs">Assign to...</button>
          <button className="btn-ghost text-xs">Change status</button>
          <button className="btn-ghost text-xs text-red-600">Close tickets</button>
        </div>
      )}

      {/* Ticket Table */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="hidden sm:table-cell text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">SLA</th>
                <th className="hidden sm:table-cell text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI</th>
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
                    <Link href={`/dashboard/tickets/${t.ticketNumber.replace("SSV-", "")}`} className="block">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-gray-400">{t.ticketNumber}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${channelColor[t.channel] || "bg-gray-100 text-gray-600"}`}>{channelDisplayNames[t.channel] || t.channel}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition truncate max-w-xs">{t.subject}</div>
                      {t.tags && t.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-1">
                          {t.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                          ))}
                        </div>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                        {(t.customerName || "U").split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{t.customerName || "Unknown"}</div>
                        <div className="text-xs text-gray-400">{t.customerCompany || ""}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[t.status] || "bg-gray-100 text-gray-700"}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3">
                    <span className={`text-xs capitalize ${priorityColor[t.priority] || "text-gray-500"}`}>{t.priority}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`text-xs font-medium ${slaColor[t.slaStatus] || "text-gray-400"}`}>
                      {t.slaStatus === "breached" ? "BREACHED" : t.slaStatus === "ok" ? "OK" : t.slaStatus}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{sentimentIcon[t.sentiment] || "😐"}</span>
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
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No tickets found. {channelFilter !== "all" ? `No tickets for channel "${channelFilter}".` : "Create some tickets to see them here."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-sm text-gray-500">Showing {filteredTickets.length} tickets</span>
        </div>
      </div>
    </div>
  );
}

export default function TicketsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>}>
      <TicketsContent />
    </Suspense>
  );
}
