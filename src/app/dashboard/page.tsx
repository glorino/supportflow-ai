import Link from "next/link";

const stats = [
  { label: "Open Tickets", value: "142", change: "+12", up: true, icon: "🎫" },
  { label: "Avg Response", value: "1.2m", change: "-18%", up: true, icon: "⚡" },
  { label: "Resolution Rate", value: "94%", change: "+3%", up: true, icon: "✅" },
  { label: "CSAT Score", value: "4.7/5", change: "+0.2", up: true, icon: "⭐" },
  { label: "AI Resolved", value: "67%", change: "+5%", up: true, icon: "🤖" },
  { label: "SLA Compliance", value: "91%", change: "-2%", up: false, icon: "⏱️" },
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
  { name: "WhatsApp", count: 34, pct: 28, color: "bg-green-500" },
  { name: "Email", count: 28, pct: 23, color: "bg-purple-500" },
  { name: "Web Chat", count: 24, pct: 20, color: "bg-blue-500" },
  { name: "SMS", count: 16, pct: 13, color: "bg-amber-500" },
  { name: "Messenger", count: 11, pct: 9, color: "bg-blue-400" },
  { name: "Instagram", count: 9, pct: 7, color: "bg-pink-500" },
];

const recentTickets = [
  { id: "#1234", subject: "Cannot access my account after password reset", customer: "Sarah Chen", status: "open", priority: "high", channel: "WhatsApp", sla: "23m left" },
  { id: "#1233", subject: "Refund request for order #98765", customer: "Marcus Johnson", status: "pending", priority: "medium", channel: "Email", sla: "OK" },
  { id: "#1232", subject: "API returning 500 errors intermittently", customer: "Dev Team - Acme Corp", status: "escalated", priority: "urgent", channel: "Web", sla: "BREACHED" },
  { id: "#1231", subject: "How to integrate with Salesforce?", customer: "Emily Rodriguez", status: "open", priority: "low", channel: "Messenger", sla: "5h left" },
  { id: "#1230", subject: "Billing discrepancy on invoice #4521", customer: "James Park", status: "resolved", priority: "medium", channel: "SMS", sla: "Done" },
];

const agentPerformance = [
  { name: "Resolution Agent", resolved: 89, pending: 12, rating: 4.8 },
  { name: "QA Agent", reviewed: 142, approved: 138, rating: 4.9 },
  { name: "Escalation Agent", handled: 23, avgTime: "3m", rating: 4.6 },
  { name: "Intake Agent", classified: 287, accuracy: "96%", rating: 4.7 },
];

const sentimentTrend = [
  { label: "Positive", pct: 42, color: "bg-green-500", textColor: "text-green-600" },
  { label: "Neutral", pct: 35, color: "bg-gray-400", textColor: "text-gray-600" },
  { label: "Negative", pct: 18, color: "bg-amber-500", textColor: "text-amber-600" },
  { label: "Angry", pct: 5, color: "bg-red-500", textColor: "text-red-600" },
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
  BREACHED: "text-red-600 font-semibold",
  OK: "text-green-600",
  Done: "text-gray-400",
};

const topBar = Math.max(...weeklyData.map((d) => d.open + d.resolved + d.escalated));

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your support operations</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{s.icon}</span>
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <span className={`text-xs font-medium ${s.up ? "text-green-600" : "text-red-500"}`}>{s.change}</span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Ticket Volume Chart */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Ticket Volume</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" />Open</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-green-500" />Resolved</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500" />Escalated</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {weeklyData.map((d) => {
              const total = d.open + d.resolved + d.escalated;
              const scale = 100 / topBar;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center" style={{ height: "160px" }}>
                    <div className="w-full flex flex-col justify-end" style={{ height: `${total * scale}%` }}>
                      <div className="w-full bg-red-500 rounded-t" style={{ height: `${(d.escalated / total) * 100}%`, minHeight: d.escalated > 0 ? "4px" : 0 }} />
                      <div className="w-full bg-green-500" style={{ height: `${(d.resolved / total) * 100}%`, minHeight: "4px" }} />
                      <div className="w-full bg-blue-500 rounded-b" style={{ height: `${(d.open / total) * 100}%`, minHeight: "4px" }} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Sentiment Today</h3>
          <div className="space-y-4">
            {sentimentTrend.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={s.textColor}>{s.label}</span>
                  <span className="font-medium">{s.pct}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Avg Sentiment Score</div>
            <div className="text-lg font-bold text-gray-900">+0.34</div>
            <div className="text-xs text-green-600">↑ 12% improvement this week</div>
          </div>
        </div>
      </div>

      {/* Channel Distribution & Agent Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Channel Distribution */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Channel Distribution</h3>
          <div className="space-y-3">
            {channelStats.map((ch) => (
              <div key={ch.name} className="flex items-center gap-3">
                <div className="w-24 text-sm text-gray-600 shrink-0">{ch.name}</div>
                <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${ch.color} rounded-full flex items-center pl-3 transition-all`} style={{ width: `${ch.pct}%` }}>
                    <span className="text-xs font-medium text-white">{ch.count}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400 w-10 text-right">{ch.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">122</div>
              <div className="text-xs text-gray-500">Total Today</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">78%</div>
              <div className="text-xs text-gray-500">AI Handled</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">4.8m</div>
              <div className="text-xs text-gray-500">Avg Handle</div>
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Agent Performance</h3>
          <div className="space-y-4">
            {agentPerformance.map((a) => (
              <div key={a.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm shrink-0">
                  {a.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{a.name}</div>
                  <div className="text-xs text-gray-500">
                    {a.resolved !== undefined && `${a.resolved} resolved · ${a.pending} pending`}
                    {a.reviewed !== undefined && `${a.reviewed} reviewed · ${a.approved} approved`}
                    {a.handled !== undefined && `${a.handled} handled · ${a.avgTime} avg`}
                    {a.classified !== undefined && `${a.classified} classified · ${a.accuracy} accuracy`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{a.rating}</div>
                  <div className="text-xs text-gray-400">rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="rounded-xl border border-gray-200 bg-white mb-8">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Tickets</h2>
          <Link href="/dashboard/tickets" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500">
                <th className="text-left px-6 py-3 font-medium">Ticket</th>
                <th className="text-left px-6 py-3 font-medium">Customer</th>
                <th className="text-left px-6 py-3 font-medium">Channel</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="text-left px-6 py-3 font-medium">Priority</th>
                <th className="text-right px-6 py-3 font-medium">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTickets.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/tickets/${t.id.replace("#", "")}`}>
                      <span className="text-sm font-mono text-gray-400">{t.id}</span>
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{t.subject}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.channel}</td>
                  <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[t.status]}`}>{t.status}</span></td>
                  <td className="px-6 py-4"><span className={`text-xs ${priorityColor[t.priority]}`}>{t.priority}</span></td>
                  <td className={`px-6 py-4 text-right text-xs font-medium ${slaColor[t.sla] || "text-gray-500"}`}>{t.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLA & AI Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">SLA Compliance</h3>
          <div className="space-y-4">
            {[
              { label: "First Response Time", value: "97%", color: "bg-green-500", width: "97%", detail: "< 1m avg" },
              { label: "Resolution Time", value: "84%", color: "bg-amber-500", width: "84%", detail: "< 4h avg" },
              { label: "Customer Satisfaction", value: "92%", color: "bg-blue-500", width: "92%", detail: "4.7/5 avg" },
              { label: "AI Auto-Resolution", value: "56%", color: "bg-purple-500", width: "56%", detail: "67 tickets" },
              { label: "Escalation Handling", value: "91%", color: "bg-teal-500", width: "91%", detail: "< 3m avg" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{s.detail}</span>
                    <span className="font-medium">{s.value}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: s.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">AI Activity Feed</h3>
          <div className="space-y-3">
            {[
              { agent: "Resolution Agent", action: "Auto-resolved ticket #1228", time: "2m ago", type: "success" },
              { agent: "QA Agent", action: "Approved response for #1225", time: "5m ago", type: "success" },
              { agent: "Escalation Agent", action: "Escalated #1224 to billing team", time: "8m ago", type: "warning" },
              { agent: "Intake Agent", action: "Classified 14 new tickets", time: "12m ago", type: "info" },
              { agent: "Sentiment Agent", action: "Flagged negative trend on WhatsApp", time: "15m ago", type: "warning" },
              { agent: "Knowledge Agent", action: "Updated article: Password Reset", time: "22m ago", type: "info" },
              { agent: "Resolution Agent", action: "Drafted response for #1219", time: "28m ago", type: "success" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                  a.type === "success" ? "bg-green-500" : a.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                }`} />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-gray-900">{a.agent}</span>{" "}
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
