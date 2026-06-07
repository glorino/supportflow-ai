"use client";

import Link from "next/link";

const stats = [
  { label: "Open Tickets", value: "142", change: "+12", up: true, icon: "🎫", color: "from-blue-500 to-blue-600", bgLight: "bg-blue-50" },
  { label: "Avg Response", value: "1.2m", change: "-18%", up: true, icon: "⚡", color: "from-green-500 to-emerald-600", bgLight: "bg-green-50" },
  { label: "Resolution Rate", value: "94%", change: "+3%", up: true, icon: "✅", color: "from-purple-500 to-indigo-600", bgLight: "bg-purple-50" },
  { label: "CSAT Score", value: "4.7/5", change: "+0.2", up: true, icon: "⭐", color: "from-amber-500 to-orange-600", bgLight: "bg-amber-50" },
  { label: "AI Resolved", value: "67%", change: "+5%", up: true, icon: "🤖", color: "from-cyan-500 to-blue-600", bgLight: "bg-cyan-50" },
  { label: "SLA Compliance", value: "91%", change: "-2%", up: false, icon: "⏱️", color: "from-rose-500 to-pink-600", bgLight: "bg-rose-50" },
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
  { name: "WhatsApp", count: 34, pct: 28, color: "bg-green-500", icon: "📱" },
  { name: "Email", count: 28, pct: 23, color: "bg-purple-500", icon: "📧" },
  { name: "Web Chat", count: 24, pct: 20, color: "bg-blue-500", icon: "💬" },
  { name: "SMS", count: 16, pct: 13, color: "bg-amber-500", icon: "💬" },
  { name: "Messenger", count: 11, pct: 9, color: "bg-blue-400", icon: "💬" },
  { name: "Instagram", count: 9, pct: 7, color: "bg-pink-500", icon: "📸" },
];

const recentTickets = [
  { id: "SF-1234", subject: "Cannot access my account after password reset", customer: "Sarah Chen", status: "open", priority: "high", channel: "WhatsApp", sla: "23m left", slaStatus: "ok", ai: 94 },
  { id: "SF-1233", subject: "Refund request for order #98765", customer: "Marcus Johnson", status: "pending", priority: "medium", channel: "Email", sla: "1h 45m", slaStatus: "ok", ai: 88 },
  { id: "SF-1232", subject: "API returning 500 errors intermittently", customer: "Dev Team", status: "escalated", priority: "urgent", channel: "Web", sla: "BREACHED", slaStatus: "breached", ai: 72 },
  { id: "SF-1231", subject: "How to integrate with Salesforce?", customer: "Emily Rodriguez", status: "open", priority: "low", channel: "Messenger", sla: "5h left", slaStatus: "ok", ai: 96 },
  { id: "SF-1230", subject: "Billing discrepancy on invoice #4521", customer: "James Park", status: "resolved", priority: "medium", channel: "SMS", sla: "Done", slaStatus: "done", ai: 97 },
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
  { name: "Resolution Agent", role: "Auto-resolves tickets", resolved: 89, pending: 12, rating: 4.8, status: "active" },
  { name: "QA Agent", role: "Reviews responses", reviewed: 142, approved: 138, rating: 4.9, status: "active" },
  { name: "Intake Agent", role: "Classifies incoming", classified: 287, accuracy: "96%", rating: 4.7, status: "active" },
  { name: "Escalation Agent", role: "Routes to humans", handled: 23, avgTime: "3m", rating: 4.6, status: "active" },
];

const sentimentTrend = [
  { label: "Positive", pct: 42, color: "bg-green-500" },
  { label: "Neutral", pct: 35, color: "bg-gray-400" },
  { label: "Negative", pct: 18, color: "bg-amber-500" },
  { label: "Angry", pct: 5, color: "bg-red-500" },
];

const topBar = Math.max(...weeklyData.map((d) => d.open + d.resolved + d.escalated));

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Alex. Here&apos;s your support overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 card-hover cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-xl ${s.bgLight} flex items-center justify-center text-lg`}>{s.icon}</div>
              <span className={`text-xs font-semibold ${s.up ? "text-green-600" : "text-red-500"}`}>{s.change}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Volume */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Ticket Volume</h3>
              <p className="text-xs text-gray-500 mt-0.5">Daily ticket trends this week</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" />Open</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green-500" />Resolved</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" />Escalated</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-52">
            {weeklyData.map((d) => {
              const total = d.open + d.resolved + d.escalated;
              const scale = 100 / topBar;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center" style={{ height: "180px" }}>
                    <div className="w-full flex flex-col justify-end" style={{ height: `${total * scale}%` }}>
                      <div className="w-full bg-red-400 rounded-t-lg" style={{ height: `${(d.escalated / total) * 100}%`, minHeight: d.escalated > 0 ? "6px" : 0 }} />
                      <div className="w-full bg-green-500" style={{ height: `${(d.resolved / total) * 100}%`, minHeight: "6px" }} />
                      <div className="w-full bg-blue-500 rounded-b-lg" style={{ height: `${(d.open / total) * 100}%`, minHeight: "6px" }} />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sentiment */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Sentiment Today</h3>
          <p className="text-xs text-gray-500 mb-5">Customer emotion distribution</p>
          <div className="space-y-4">
            {sentimentTrend.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{s.label}</span>
                  <span className="font-semibold text-gray-900">{s.pct}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full transition-all duration-500`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
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
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Channel Distribution</h3>
          <p className="text-xs text-gray-500 mb-5">Tickets by communication channel</p>
          <div className="space-y-3">
            {channelStats.map((ch) => (
              <div key={ch.name} className="flex items-center gap-3">
                <div className="w-28 flex items-center gap-2 shrink-0">
                  <span>{ch.icon}</span>
                  <span className="text-sm text-gray-600">{ch.name}</span>
                </div>
                <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${ch.color} rounded-full flex items-center pl-3 transition-all duration-500`} style={{ width: `${Math.max(ch.pct * 3.5, 8)}%` }}>
                    <span className="text-xs font-semibold text-white">{ch.count}</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-400 w-10 text-right">{ch.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xl font-bold text-gray-900">122</div>
              <div className="text-[11px] text-gray-500">Total Today</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-xl font-bold text-green-600">78%</div>
              <div className="text-[11px] text-gray-500">AI Handled</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-xl font-bold text-blue-600">4.8m</div>
              <div className="text-[11px] text-gray-500">Avg Handle</div>
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">AI Agent Performance</h3>
          <p className="text-xs text-gray-500 mb-5">Real-time agent metrics</p>
          <div className="space-y-3">
            {agentPerformance.map((a) => (
              <div key={a.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                  {a.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{a.name}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{a.role}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {a.resolved !== undefined && `${a.resolved} resolved · ${a.pending} pending`}
                    {a.reviewed !== undefined && `${a.reviewed} reviewed · ${a.approved} approved`}
                    {a.handled !== undefined && `${a.handled} handled · ${a.avgTime} avg`}
                    {a.classified !== undefined && `${a.classified} classified · ${a.accuracy} accuracy`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{a.rating}</div>
                  <div className="text-[10px] text-gray-400">rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Recent Tickets</h2>
            <p className="text-xs text-gray-500 mt-0.5">Latest customer conversations</p>
          </div>
          <Link href="/dashboard/tickets" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTickets.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/tickets/${t.id.replace("SF-", "")}`}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-gray-400">{t.id}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-400">{t.channel}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition truncate max-w-sm">{t.subject}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.customer}</td>
                  <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[t.status]}`}>{t.status}</span></td>
                  <td className="px-6 py-4"><span className={`text-xs ${priorityColor[t.priority]}`}>{t.priority}</span></td>
                  <td className="px-6 py-4"><span className="text-sm font-medium text-gray-700">{t.ai}%</span></td>
                  <td className={`px-6 py-4 text-right text-xs font-medium ${slaColor[t.slaStatus]}`}>{t.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLA & AI Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">SLA Compliance</h3>
          <p className="text-xs text-gray-500 mb-5">Service level agreement metrics</p>
          <div className="space-y-5">
            {[
              { label: "First Response Time", value: "97%", color: "bg-green-500", width: "97%", detail: "< 1m avg" },
              { label: "Resolution Time", value: "84%", color: "bg-amber-500", width: "84%", detail: "< 4h avg" },
              { label: "Customer Satisfaction", value: "92%", color: "bg-blue-500", width: "92%", detail: "4.7/5 avg" },
              { label: "AI Auto-Resolution", value: "56%", color: "bg-purple-500", width: "56%", detail: "67 tickets" },
              { label: "Escalation Handling", value: "91%", color: "bg-teal-500", width: "91%", detail: "< 3m avg" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{s.detail}</span>
                    <span className="font-semibold text-gray-900">{s.value}</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full transition-all duration-500`} style={{ width: s.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">AI Activity Feed</h3>
          <p className="text-xs text-gray-500 mb-5">Real-time agent actions</p>
          <div className="space-y-3">
            {[
              { agent: "Resolution Agent", action: "Auto-resolved ticket SF-1228", time: "2m ago", type: "success" },
              { agent: "QA Agent", action: "Approved response for SF-1225", time: "5m ago", type: "success" },
              { agent: "Escalation Agent", action: "Escalated SF-1224 to billing team", time: "8m ago", type: "warning" },
              { agent: "Intake Agent", action: "Classified 14 new tickets", time: "12m ago", type: "info" },
              { agent: "Sentiment Agent", action: "Flagged negative trend on WhatsApp", time: "15m ago", type: "warning" },
              { agent: "Knowledge Agent", action: "Updated article: Password Reset", time: "22m ago", type: "info" },
              { agent: "Resolution Agent", action: "Drafted response for SF-1219", time: "28m ago", type: "success" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-sm p-3 rounded-xl hover:bg-gray-50 transition">
                <div className={`mt-0.5 h-2.5 w-2.5 rounded-full shrink-0 ${
                  a.type === "success" ? "bg-green-500" : a.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                }`} />
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-gray-900">{a.agent}</span>{" "}
                  <span className="text-gray-600">{a.action}</span>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
