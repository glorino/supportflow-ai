"use client";

import Link from "next/link";

const stats = [
  { label: "Open Tickets", value: "142", change: "+12", up: true, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", gradient: "from-blue-500 via-blue-600 to-indigo-600", cardClass: "card-premium-blue", ringColor: "ring-blue-500/20" },
  { label: "Avg Response", value: "1.2m", change: "-18%", up: true, icon: "M13 10V3L4 14h7v7l9-11h-7z", gradient: "from-green-500 via-emerald-500 to-teal-600", cardClass: "card-premium-green", ringColor: "ring-green-500/20" },
  { label: "Resolution Rate", value: "94%", change: "+3%", up: true, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-purple-500 via-violet-500 to-indigo-600", cardClass: "card-premium-purple", ringColor: "ring-purple-500/20" },
  { label: "CSAT Score", value: "4.7/5", change: "+0.2", up: true, icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", gradient: "from-amber-400 via-orange-500 to-red-500", cardClass: "card-premium-amber", ringColor: "ring-amber-500/20" },
  { label: "AI Resolved", value: "67%", change: "+5%", up: true, icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", gradient: "from-cyan-500 via-blue-500 to-indigo-600", cardClass: "card-premium-cyan", ringColor: "ring-cyan-500/20" },
  { label: "SLA Compliance", value: "91%", change: "-2%", up: false, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-rose-500 via-pink-500 to-fuchsia-600", cardClass: "card-premium-red", ringColor: "ring-rose-500/20" },
];

const weeklyData = [
  { day: "Mon", open: 12, resolved: 18, escalated: 3 },
  { day: "Tue", open: 15, resolved: 22, escalated: 2 },
  { day: "Wed", open: 8, resolved: 14, escalated: 4 },
  { day: "Thu", open: 18, resolved: 20, escalated: 1 },
  { day: "Fri", open: 22, resolved: 25, escalated: 5 },
  { day: "Sat", open: 6, resolved: 8, escalated: 1 },
  { day: "Sun", open: 4, resolved: 5, escalated: 0 },
];

const channelStats = [
  { name: "WhatsApp", count: 34, pct: 28, color: "from-green-400 to-green-600", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", bgColor: "bg-green-100" },
  { name: "Email", count: 28, pct: 23, color: "from-purple-400 to-purple-600", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", bgColor: "bg-purple-100" },
  { name: "Web Chat", count: 24, pct: 20, color: "from-blue-400 to-blue-600", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", bgColor: "bg-blue-100" },
  { name: "SMS", count: 16, pct: 13, color: "from-amber-400 to-amber-600", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", bgColor: "bg-amber-100" },
  { name: "Messenger", count: 11, pct: 9, color: "from-blue-300 to-blue-500", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1", bgColor: "bg-blue-50" },
  { name: "Instagram", count: 9, pct: 7, color: "from-pink-400 to-pink-600", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 3h11A3.5 3.5 0 0121 6.5v11a3.5 3.5 0 01-3.5 3.5h-11A3.5 3.5 0 013 17.5v-11A3.5 3.5 0 016.5 3z", bgColor: "bg-pink-100" },
];

const recentTickets = [
  { id: "SSV-1234", subject: "Cannot access my account after password reset", customer: "Sarah Chen", status: "open", priority: "high", channel: "WhatsApp", sla: "23m left", slaStatus: "ok", ai: 94 },
  { id: "SSV-1233", subject: "Refund request for order #98765", customer: "Marcus Johnson", status: "pending", priority: "medium", channel: "Email", sla: "1h 45m", slaStatus: "ok", ai: 88 },
  { id: "SSV-1232", subject: "API returning 500 errors intermittently", customer: "Dev Team", status: "escalated", priority: "urgent", channel: "Web", sla: "BREACHED", slaStatus: "breached", ai: 72 },
  { id: "SSV-1231", subject: "How to integrate with Salesforce?", customer: "Emily Rodriguez", status: "open", priority: "low", channel: "Messenger", sla: "5h left", slaStatus: "ok", ai: 96 },
  { id: "SSV-1230", subject: "Billing discrepancy on invoice #4521", customer: "James Park", status: "resolved", priority: "medium", channel: "SMS", sla: "Done", slaStatus: "done", ai: 97 },
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

const agentPerformance = [
  { name: "Resolution Agent", role: "Auto-resolves tickets", resolved: 89, pending: 12, rating: 4.8, status: "active", color: "from-green-500 to-emerald-600", specialty: "Drafts contextual replies, executes actions", confidence: 94 },
  { name: "QA Agent", role: "Reviews responses", reviewed: 142, approved: 138, rating: 4.9, status: "active", color: "from-amber-500 to-orange-600", specialty: "Verifies accuracy, tone, compliance", confidence: 97 },
  { name: "Intake Agent", role: "Classifies incoming", classified: 287, accuracy: "96%", rating: 4.7, status: "active", color: "from-blue-500 to-cyan-600", specialty: "Intent detection, priority, entity extraction", confidence: 96 },
  { name: "Escalation Agent", role: "Routes to humans", handled: 23, avgTime: "3m", rating: 4.6, status: "active", color: "from-red-500 to-rose-600", specialty: "Skill matching, load balancing, VIP routing", confidence: 91 },
  { name: "Sentiment Agent", role: "Tracks emotions", tracked: 312, alerts: 14, rating: 4.5, status: "active", color: "from-pink-500 to-fuchsia-600", specialty: "Real-time emotion, trend detection", confidence: 88 },
  { name: "Knowledge Agent", role: "RAG retrieval", articles: 157, accuracy: "93%", rating: 4.7, status: "active", color: "from-purple-500 to-indigo-600", specialty: "Semantic search, context synthesis", confidence: 93 },
];

const sentimentTrend = [
  { label: "Positive", pct: 42, color: "from-green-400 to-green-600", textColor: "text-green-600" },
  { label: "Neutral", pct: 35, color: "from-gray-300 to-gray-500", textColor: "text-gray-600" },
  { label: "Negative", pct: 18, color: "from-amber-400 to-amber-600", textColor: "text-amber-600" },
  { label: "Angry", pct: 5, color: "from-red-400 to-red-600", textColor: "text-red-600" },
];

const topBar = Math.max(...weeklyData.map((d) => d.open + d.resolved + d.escalated));

export default function DashboardPage() {
  return (
    <div className="space-y-6 particles">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Alex. Here&apos;s your SSV support overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none font-medium shadow-sm transition-all hover:border-gray-300">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-2xl border p-4 sm:p-5 card-glow cursor-pointer group ${s.cardClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-scale-in stagger-${i + 1}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                </svg>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{s.change}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-0.5 tracking-tight">{s.value}</div>
            <div className="text-xs text-gray-600 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Volume */}
        <div className="lg:col-span-2 rounded-2xl border border-blue-200/60 p-6 card-premium-blue">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Ticket Volume</h3>
              <p className="text-xs text-gray-500 mt-0.5">Daily ticket trends this week</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />Open</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-green-400 to-green-600" />Resolved</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-red-400 to-red-600" />Escalated</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-52">
            {weeklyData.map((d) => {
              const total = d.open + d.resolved + d.escalated;
              const scale = 100 / topBar;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex flex-col items-center" style={{ height: "180px" }}>
                    <div className="w-full flex flex-col justify-end rounded-t-xl overflow-hidden group-hover:opacity-90 transition-opacity shadow-sm group-hover:shadow-md" style={{ height: `${total * scale}%` }}>
                      <div className="w-full bg-gradient-to-t from-red-400 to-red-300" style={{ height: `${(d.escalated / total) * 100}%`, minHeight: d.escalated > 0 ? "6px" : 0 }} />
                      <div className="w-full bg-gradient-to-t from-green-500 to-green-400" style={{ height: `${(d.resolved / total) * 100}%`, minHeight: "6px" }} />
                      <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400" style={{ height: `${(d.open / total) * 100}%`, minHeight: "6px" }} />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sentiment */}
        <div className="rounded-2xl border border-purple-200/60 p-6 card-premium-purple">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Sentiment Today</h3>
          <p className="text-xs text-gray-500 mb-5">Customer emotion distribution</p>
          <div className="space-y-4">
            {sentimentTrend.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600 font-medium">{s.label}</span>
                  <span className={`font-bold ${s.textColor}`}>{s.pct}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/80 overflow-hidden border border-purple-100/50 shadow-inner">
                  <div className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-700 shadow-sm`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl border border-purple-100 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">Avg Sentiment Score</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">+0.34</span>
              <span className="text-xs font-semibold text-green-600">↑ 12%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Channel & Agent Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Distribution */}
        <div className="rounded-2xl border border-blue-200/60 p-6 card-premium-blue">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Channel Distribution</h3>
          <p className="text-xs text-gray-500 mb-5">Tickets by communication channel</p>
          <div className="space-y-3">
            {channelStats.map((ch) => (
              <div key={ch.name} className="flex items-center gap-3">
                <div className="w-28 flex items-center gap-2.5 shrink-0">
                  <div className={`h-8 w-8 rounded-lg ${ch.bgColor} flex items-center justify-center`}>
                    <svg className={`w-4 h-4 bg-gradient-to-r ${ch.color} bg-clip-text`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ch.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{ch.name}</span>
                </div>
                <div className="flex-1 h-8 bg-white/80 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                  <div className={`h-full bg-gradient-to-r ${ch.color} rounded-full flex items-center pl-3 transition-all duration-700 shadow-sm`} style={{ width: `${Math.max(ch.pct * 3.5, 8)}%` }}>
                    <span className="text-xs font-bold text-white drop-shadow-sm">{ch.count}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-400 w-10 text-right">{ch.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-blue-100/50 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/80 rounded-xl p-3 border border-blue-100 shadow-sm">
              <div className="text-xl font-bold text-gray-900">122</div>
              <div className="text-[11px] text-gray-500 font-medium">Total Today</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100 shadow-sm">
              <div className="text-xl font-bold text-green-600">78%</div>
              <div className="text-[11px] text-gray-500 font-medium">AI Handled</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 shadow-sm">
              <div className="text-xl font-bold text-blue-600">4.8m</div>
              <div className="text-[11px] text-gray-500 font-medium">Avg Handle</div>
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="rounded-2xl border border-purple-200/60 p-6 card-premium-purple">
          <h3 className="text-base font-semibold text-gray-900 mb-1">AI Agent Performance</h3>
          <p className="text-xs text-gray-500 mb-5">Real-time agent metrics</p>
          <div className="space-y-2.5">
            {agentPerformance.map((a) => (
              <div key={a.name} className="flex items-center gap-3 p-3 bg-white/80 rounded-xl hover:bg-white border border-purple-100/50 transition-all duration-200 hover:shadow-md group">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                  {a.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{a.name}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 truncate">{a.specialty}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-gray-900">{a.rating}</div>
                  <div className="text-[10px] text-green-600 font-semibold">{a.confidence}% conf</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="rounded-2xl border border-green-200/60 card-premium-green overflow-hidden">
        <div className="flex items-center justify-between border-b border-green-100/50 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Recent Tickets</h2>
            <p className="text-xs text-gray-500 mt-0.5">Latest customer conversations</p>
          </div>
          <Link href="/dashboard/tickets" className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-100/50 bg-white/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-50">
              {recentTickets.map((t) => (
                <tr key={t.id} className="hover:bg-white/60 transition-colors group">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/tickets/${t.id.replace("SF-", "")}`}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-gray-400">{t.id}</span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{t.channel}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition truncate max-w-sm">{t.subject}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{t.customer}</td>
                  <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[t.status]}`}>{t.status}</span></td>
                  <td className="px-6 py-4"><span className={`text-xs capitalize ${priorityColor[t.priority]}`}>{t.priority}</span></td>
                  <td className="px-6 py-4"><span className="text-sm font-bold text-gray-700">{t.ai}%</span></td>
                  <td className={`px-6 py-4 text-right text-xs font-semibold ${slaColor[t.slaStatus]}`}>{t.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLA & AI Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-green-200/60 p-6 card-premium-green">
          <h3 className="text-base font-semibold text-gray-900 mb-1">SLA Compliance</h3>
          <p className="text-xs text-gray-500 mb-5">Service level agreement metrics</p>
          <div className="space-y-5">
            {[
              { label: "First Response Time", value: "97%", color: "from-green-400 to-green-600", width: "97%", detail: "< 1m avg" },
              { label: "Resolution Time", value: "84%", color: "from-amber-400 to-amber-600", width: "84%", detail: "< 4h avg" },
              { label: "Customer Satisfaction", value: "92%", color: "from-blue-400 to-blue-600", width: "92%", detail: "4.7/5 avg" },
              { label: "AI Auto-Resolution", value: "56%", color: "from-purple-400 to-purple-600", width: "56%", detail: "67 tickets" },
              { label: "Escalation Handling", value: "91%", color: "from-teal-400 to-teal-600", width: "91%", detail: "< 3m avg" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600 font-medium">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{s.detail}</span>
                    <span className="font-bold text-gray-900">{s.value}</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-white/80 overflow-hidden border border-green-100/50 shadow-inner">
                  <div className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-700 shadow-sm`} style={{ width: s.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200/60 p-6 card-premium-amber">
          <h3 className="text-base font-semibold text-gray-900 mb-1">AI Activity Feed</h3>
          <p className="text-xs text-gray-500 mb-5">Real-time agent actions</p>
          <div className="space-y-2.5">
            {[
              { agent: "Resolution Agent", action: "Auto-resolved ticket SSV-1228", time: "2m ago", type: "success", icon: "✅" },
              { agent: "QA Agent", action: "Approved response for SSV-1225", time: "5m ago", type: "success", icon: "👍" },
              { agent: "Escalation Agent", action: "Escalated SSV-1224 to billing team", time: "8m ago", type: "warning", icon: "⚠️" },
              { agent: "Intake Agent", action: "Classified 14 new tickets", time: "12m ago", type: "info", icon: "📋" },
              { agent: "Sentiment Agent", action: "Flagged negative trend on WhatsApp", time: "15m ago", type: "warning", icon: "🔴" },
              { agent: "Knowledge Agent", action: "Updated article: Password Reset", time: "22m ago", type: "info", icon: "📝" },
              { agent: "Resolution Agent", action: "Drafted response for SSV-1219", time: "28m ago", type: "success", icon: "✍️" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-sm p-3 bg-white/80 rounded-xl hover:bg-white border border-amber-100/50 transition-all duration-200 hover:shadow-sm group">
                <div className="text-base mt-0.5 group-hover:scale-110 transition-transform">{a.icon}</div>
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-gray-900">{a.agent}</span>{" "}
                  <span className="text-gray-600">{a.action}</span>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap font-medium">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
