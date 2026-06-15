"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface DashboardData {
  stats: {
    totalTickets: number;
    openTickets: number;
    pendingTickets: number;
    escalatedTickets: number;
    resolvedTickets: number;
    totalCustomers: number;
    totalUsers: number;
    slaBreached: number;
  };
  channelCounts: { channel: string; count: number }[];
  sentimentCounts: { sentiment: string; count: number }[];
  avgConfidence: number;
  avgCsat: number;
  recentTickets: {
    ticketNumber: string;
    subject: string;
    status: string;
    priority: string;
    channel: string;
    aiConfidence: number;
    slaStatus: string;
    slaDue: string;
    sentiment: string;
    createdAt: string;
    customerName: string;
  }[];
}

const channelMeta: Record<string, { icon: string; color: string; bgColor: string; status: string }> = {
  whatsapp: { icon: "📱", color: "text-green-600", bgColor: "bg-green-50", status: "connected" },
  email: { icon: "📧", color: "text-purple-600", bgColor: "bg-purple-50", status: "connected" },
  web: { icon: "💬", color: "text-blue-600", bgColor: "bg-blue-50", status: "active" },
  sms: { icon: "💬", color: "text-amber-600", bgColor: "bg-amber-50", status: "connected" },
  messenger: { icon: "💬", color: "text-blue-500", bgColor: "bg-blue-50", status: "needs_token" },
  instagram: { icon: "📸", color: "text-pink-600", bgColor: "bg-pink-50", status: "connected" },
};

const channelDisplayNames: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  web: "Web Chat",
  sms: "SMS",
  messenger: "Messenger",
  instagram: "Instagram",
};

const statusColor: Record<string, string> = {
  open: "bg-blue-100/80 text-blue-700",
  pending: "bg-amber-100/80 text-amber-700",
  escalated: "bg-red-100/80 text-red-700",
  resolved: "bg-green-100/80 text-green-700",
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

const sentimentMeta: Record<string, { color: string; label: string; emoji: string }> = {
  positive: { color: "from-emerald-400 to-green-500", label: "Positive", emoji: "😊" },
  neutral: { color: "from-gray-300 to-gray-400", label: "Neutral", emoji: "😐" },
  negative: { color: "from-amber-400 to-orange-500", label: "Negative", emoji: "😟" },
  angry: { color: "from-red-400 to-red-500", label: "Angry", emoji: "😡" },
  frustrated: { color: "from-orange-400 to-orange-500", label: "Frustrated", emoji: "😤" },
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalTickets = data?.stats.totalTickets || 0;
  const openTickets = data?.stats.openTickets || 0;
  const resolvedTickets = data?.stats.resolvedTickets || 0;
  const escalatedTickets = data?.stats.escalatedTickets || 0;
  const resolutionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;
  const aiResolvedPct = totalTickets > 0 ? Math.round((data?.avgConfidence || 0)) : 0;
  const slaCompliance = totalTickets > 0 ? Math.round(((totalTickets - (data?.stats.slaBreached || 0)) / totalTickets) * 100) : 100;

  const channelData = data?.channelCounts || [];
  const totalChannelTickets = channelData.reduce((sum, c) => sum + c.count, 0);

  const sentimentData = data?.sentimentCounts || [];
  const totalSentiment = sentimentData.reduce((sum, s) => sum + s.count, 0);

  const recentTickets = data?.recentTickets || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-200" />
          <div className="absolute inset-0 animate-spin rounded-full h-10 w-10 border-2 border-transparent border-t-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 particles">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1.5">Welcome back, Alex. Here&apos;s your SSV support overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Open Tickets", value: openTickets, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2", gradient: "from-blue-500 via-blue-600 to-indigo-600", cardClass: "card-premium-blue" },
          { label: "Avg Response", value: "1.2m", icon: "M13 10V3L4 14h7v7l9-11h-7z", gradient: "from-emerald-500 via-green-500 to-teal-600", cardClass: "card-premium-green" },
          { label: "Resolution Rate", value: `${resolutionRate}%`, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-violet-500 via-purple-500 to-indigo-600", cardClass: "card-premium-purple" },
          { label: "CSAT Score", value: `${(data?.avgCsat || 0).toFixed(1)}/5`, icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", gradient: "from-amber-400 via-orange-500 to-red-500", cardClass: "card-premium-amber" },
          { label: "AI Confidence", value: `${aiResolvedPct}%`, icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", gradient: "from-cyan-500 via-blue-500 to-indigo-600", cardClass: "card-premium-cyan" },
          { label: "SLA Compliance", value: `${slaCompliance}%`, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-rose-500 via-pink-500 to-fuchsia-600", cardClass: "card-premium-red" },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`rounded-3xl border p-5 cursor-pointer group ${s.cardClass} transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl animate-scale-in stagger-${i + 1}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{s.value}</div>
            <div className="text-xs text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Channel Status */}
      <div className="rounded-3xl border border-gray-200/60 bg-white/80 backdrop-blur-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100/80">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Channel Status</h3>
            <p className="text-xs text-gray-500 mt-0.5">Connected support channels and ticket counts</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50/80 border border-green-200/60">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-700">{channelData.length} Active</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-100/60 max-sm:divide-x-0 max-sm:gap-3 max-sm:p-4">
          {channelData.map((ch) => {
            const meta = channelMeta[ch.channel] || { icon: "💬", color: "text-gray-600", bgColor: "bg-gray-50", status: "active" };
            const displayName = channelDisplayNames[ch.channel] || ch.channel;
            return (
              <Link
                key={ch.channel}
                href={`/dashboard/tickets?channel=${encodeURIComponent(ch.channel)}`}
                className="p-5 hover:bg-gray-50/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-11 w-11 rounded-2xl ${meta.bgColor} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>{meta.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">{displayName}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${meta.status === "connected" || meta.status === "active" ? "bg-green-500" : "bg-amber-500 animate-pulse"}`} />
                      <span className={`text-[10px] font-medium ${meta.color}`}>
                        {meta.status === "connected" || meta.status === "active" ? "Active" : "Needs Token"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{ch.count}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">total tickets</div>
              </Link>
            );
          })}
          {channelData.length === 0 && (
            <div className="col-span-full p-10 text-center text-gray-400 text-sm">No tickets yet. Channel data will appear here once tickets are created.</div>
          )}
        </div>
      </div>

      {/* Sentiment + Channel Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment */}
        {sentimentData.length > 0 && (
          <div className="rounded-3xl border border-purple-200/60 p-7 card-premium-purple">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Sentiment Distribution</h3>
            <p className="text-xs text-gray-500 mb-6">Customer emotion breakdown from all tickets</p>
            <div className="space-y-4">
              {sentimentData.map((s) => {
                const meta = sentimentMeta[s.sentiment] || { color: "from-gray-300 to-gray-400", label: s.sentiment, emoji: "😐" };
                const pct = totalSentiment > 0 ? Math.round((s.count / totalSentiment) * 100) : 0;
                return (
                  <div key={s.sentiment}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-600 font-medium flex items-center gap-2">
                        <span className="text-base">{meta.emoji}</span>
                        {meta.label}
                      </span>
                      <span className="font-bold text-gray-900">{pct}% ({s.count})</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/60 overflow-hidden border border-purple-100/40 shadow-inner">
                      <div className={`h-full bg-gradient-to-r ${meta.color} rounded-full transition-all duration-700 shadow-sm`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50/60 to-fuchsia-50/60 rounded-2xl border border-purple-100/60">
              <div className="text-xs text-gray-500 mb-1">Avg AI Confidence</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{(data?.avgConfidence || 0).toFixed(0)}%</span>
                <span className="text-xs font-medium text-green-600">across {totalTickets} tickets</span>
              </div>
            </div>
          </div>
        )}

        {/* Channel Distribution */}
        {channelData.length > 0 && (
          <div className="rounded-3xl border border-blue-200/60 p-7 card-premium-blue">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Channel Distribution</h3>
            <p className="text-xs text-gray-500 mb-6">Tickets by communication channel</p>
            <div className="space-y-3.5">
              {channelData.map((ch) => {
                const meta = channelMeta[ch.channel] || { icon: "💬", bgColor: "bg-gray-50" };
                const displayName = channelDisplayNames[ch.channel] || ch.channel;
                const pct = totalChannelTickets > 0 ? Math.round((ch.count / totalChannelTickets) * 100) : 0;
                return (
                  <div key={ch.channel} className="flex items-center gap-3">
                    <div className="w-24 flex items-center gap-2 shrink-0">
                      <div className={`h-8 w-8 rounded-xl ${meta.bgColor} flex items-center justify-center`}>
                        <span className="text-sm">{meta.icon}</span>
                      </div>
                      <span className="text-xs font-medium text-gray-700">{displayName}</span>
                    </div>
                    <div className="flex-1 h-8 bg-white/60 rounded-full overflow-hidden border border-gray-100/60 shadow-inner">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center pl-3 transition-all duration-700 shadow-sm" style={{ width: `${Math.max(pct * 3.5, 8)}%` }}>
                        <span className="text-xs font-bold text-white drop-shadow-sm">{ch.count}</span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-400 w-10 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-blue-100/50 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/60 rounded-2xl p-3 border border-blue-100/60">
                <div className="text-xl font-bold text-gray-900">{totalChannelTickets}</div>
                <div className="text-[11px] text-gray-500 font-medium">Total Tickets</div>
              </div>
              <div className="bg-gradient-to-br from-green-50/60 to-emerald-50/60 rounded-2xl p-3 border border-green-100/60">
                <div className="text-xl font-bold text-green-600">{aiResolvedPct}%</div>
                <div className="text-[11px] text-gray-500 font-medium">AI Confidence</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/60 rounded-2xl p-3 border border-blue-100/60">
                <div className="text-xl font-bold text-blue-600">{data?.stats.totalCustomers || 0}</div>
                <div className="text-[11px] text-gray-500 font-medium">Customers</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Tickets */}
      <div className="rounded-3xl border border-green-200/60 card-premium-green overflow-hidden">
        <div className="flex items-center justify-between border-b border-green-100/50 px-7 py-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Recent Tickets</h2>
            <p className="text-xs text-gray-500 mt-0.5">Latest customer conversations from database</p>
          </div>
          <Link href="/dashboard/tickets" className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-100/50 bg-white/40">
                <th className="text-left px-7 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="text-left px-7 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-7 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-7 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Priority</th>
                <th className="text-left px-7 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">AI</th>
                <th className="text-right px-7 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-50/80">
              {recentTickets.map((t) => (
                <tr key={t.ticketNumber} className="hover:bg-white/60 transition-colors group">
                  <td className="px-7 py-4">
                    <Link href={`/dashboard/tickets/${t.ticketNumber.replace("SSV-", "")}`}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-gray-400">{t.ticketNumber}</span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400 capitalize">{t.channel}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition truncate max-w-sm">{t.subject}</div>
                    </Link>
                  </td>
                  <td className="px-7 py-4 text-sm text-gray-600 font-medium">{t.customerName || "Unknown"}</td>
                  <td className="px-7 py-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[t.status] || "bg-gray-100 text-gray-700"}`}>{t.status}</span></td>
                  <td className="px-7 py-4 hidden sm:table-cell"><span className={`text-xs capitalize ${priorityColor[t.priority] || "text-gray-500"}`}>{t.priority}</span></td>
                  <td className="px-7 py-4 hidden sm:table-cell"><span className="text-sm font-bold text-gray-700">{t.aiConfidence}%</span></td>
                  <td className={`px-7 py-4 text-right text-xs font-semibold ${slaColor[t.slaStatus] || "text-gray-400"}`}>{t.slaStatus === "breached" ? "BREACHED" : t.slaStatus === "ok" ? "OK" : t.slaStatus}</td>
                </tr>
              ))}
              {recentTickets.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-7 py-12 text-center text-gray-400 text-sm">No tickets yet. Create some tickets to see them here.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLA & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-green-200/60 p-7 card-premium-green">
          <h3 className="text-base font-semibold text-gray-900 mb-1">SLA Compliance</h3>
          <p className="text-xs text-gray-500 mb-6">Service level agreement metrics</p>
          <div className="space-y-5">
            {[
              { label: "SLA Compliance", value: `${slaCompliance}%`, color: slaCompliance >= 90 ? "from-emerald-400 to-green-500" : "from-amber-400 to-orange-500", width: `${slaCompliance}%`, detail: `${totalTickets - (data?.stats.slaBreached || 0)}/${totalTickets} tickets` },
              { label: "SLA Breached", value: `${data?.stats.slaBreached || 0}`, color: "from-red-400 to-red-500", width: totalTickets > 0 ? `${((data?.stats.slaBreached || 0) / totalTickets) * 100}%` : "0%", detail: `${data?.stats.slaBreached || 0} tickets` },
              { label: "Open Tickets", value: `${openTickets}`, color: "from-blue-400 to-blue-500", width: totalTickets > 0 ? `${(openTickets / totalTickets) * 100}%` : "0%", detail: "awaiting response" },
              { label: "Escalated Tickets", value: `${escalatedTickets}`, color: "from-purple-400 to-purple-500", width: totalTickets > 0 ? `${(escalatedTickets / totalTickets) * 100}%` : "0%", detail: "needs attention" },
              { label: "Resolved Tickets", value: `${resolvedTickets}`, color: "from-teal-400 to-teal-500", width: `${resolutionRate}%`, detail: `${resolutionRate}% of total` },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600 font-medium">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{s.detail}</span>
                    <span className="font-bold text-gray-900">{s.value}</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-white/60 overflow-hidden border border-green-100/40 shadow-inner">
                  <div className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-700 shadow-sm`} style={{ width: s.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/60 p-7 card-premium-amber">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Ticket Summary</h3>
          <p className="text-xs text-gray-500 mb-6">Overview of all ticket statuses</p>
          <div className="space-y-3">
            {[
              { label: "Open", count: openTickets, color: "bg-blue-500", textColor: "text-blue-700" },
              { label: "Pending", count: data?.stats.pendingTickets || 0, color: "bg-amber-500", textColor: "text-amber-700" },
              { label: "Escalated", count: escalatedTickets, color: "bg-red-500", textColor: "text-red-700" },
              { label: "Resolved", count: resolvedTickets, color: "bg-green-500", textColor: "text-green-700" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-4 bg-white/60 rounded-2xl hover:bg-white/80 border border-amber-100/40 transition-all duration-300 hover:shadow-sm group">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${s.color} shadow-sm`} />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition">{s.label}</span>
                </div>
                <span className={`text-lg font-bold ${s.textColor}`}>{s.count}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-amber-50/60 to-orange-50/60 rounded-2xl border border-amber-100/60 mt-2">
              <span className="text-sm font-semibold text-gray-700">Total Tickets</span>
              <span className="text-2xl font-bold text-gray-900">{totalTickets}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
