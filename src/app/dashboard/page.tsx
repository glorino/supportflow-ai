import Link from "next/link";

const stats = [
  { label: "Open Tickets", value: "142", change: "+12", up: true },
  { label: "Avg Response", value: "1.2m", change: "-18%", up: false },
  { label: "Resolution Rate", value: "94%", change: "+3%", up: true },
  { label: "CSAT Score", value: "4.7", change: "+0.2", up: true },
];

const recentTickets = [
  { id: "#1234", subject: "Cannot access my account after password reset", customer: "Sarah Chen", status: "open", priority: "high", channel: "WhatsApp", sla: "23m left" },
  { id: "#1233", subject: "Refund request for order #98765", customer: "Marcus Johnson", status: "pending", priority: "medium", channel: "Email", sla: "OK" },
  { id: "#1232", subject: "API returning 500 errors intermittently", customer: "Dev Team - Acme Corp", status: "escalated", priority: "urgent", channel: "Web", sla: "BREACHED" },
  { id: "#1231", subject: "How to integrate with Salesforce?", customer: "Emily Rodriguez", status: "open", priority: "low", channel: "Messenger", sla: "5h left" },
  { id: "#1230", subject: "Billing discrepancy on invoice #4521", customer: "James Park", status: "resolved", priority: "medium", channel: "SMS", sla: "Done" },
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

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-3xl font-bold text-gray-900">{s.value}</div>
              <span className={`text-sm font-medium ${s.up ? "text-green-600" : "text-green-600"}`}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="rounded-xl border border-gray-200 bg-white mb-8">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Tickets</h2>
          <Link href="/dashboard/tickets" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentTickets.map((t) => (
            <Link key={t.id} href={`/dashboard/tickets/${t.id.replace("#", "")}`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-gray-400">{t.id}</span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[t.status]}`}>{t.status}</span>
                  <span className={`text-xs ${priorityColor[t.priority]}`}>{t.priority}</span>
                </div>
                <div className="mt-1 text-sm font-medium text-gray-900 truncate">{t.subject}</div>
                <div className="mt-0.5 text-xs text-gray-500">{t.customer} · {t.channel}</div>
              </div>
              <div className={`text-xs font-medium whitespace-nowrap ${slaColor[t.sla] || "text-gray-500"}`}>{t.sla}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Activity & SLA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">AI Resolution Activity</h3>
          <div className="space-y-3">
            {[
              { agent: "Resolution Agent", action: "Auto-resolved ticket #1228", time: "2m ago" },
              { agent: "QA Agent", action: "Approved response for #1225", time: "5m ago" },
              { agent: "Escalation Agent", action: "Escalated #1224 to billing team", time: "8m ago" },
              { agent: "Intake Agent", action: "Classified 14 new tickets", time: "12m ago" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-gray-900">{a.agent}</span>{" "}
                  <span className="text-gray-600">{a.action}</span>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">SLA Status</h3>
          <div className="space-y-4">
            {[
              { label: "First Response", value: "97%", color: "bg-green-500", width: "97%" },
              { label: "Resolution", value: "84%", color: "bg-amber-500", width: "84%" },
              { label: "Customer Satisfaction", value: "92%", color: "bg-blue-500", width: "92%" },
              { label: "AI Auto-Resolution", value: "56%", color: "bg-purple-500", width: "56%" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{s.label}</span>
                  <span className="font-medium">{s.value}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: s.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
