import Link from "next/link";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Tickets", href: "/dashboard/tickets", icon: "🎫" },
  { label: "Customers", href: "/dashboard/customers", icon: "👥" },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: "📚" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "📈" },
  { label: "Teams", href: "/dashboard/teams", icon: "🏢" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

const stats = [
  { label: "Open Tickets", value: "142", change: "+12", up: true },
  { label: "Avg Response", value: "1.2m", change: "-18%", up: false },
  { label: "Resolution Rate", value: "94%", change: "+3%", up: true },
  { label: "CSAT Score", value: "4.7", change: "+0.2", up: true },
];

const recentTickets = [
  {
    id: "#1234",
    subject: "Cannot access my account after password reset",
    customer: "Sarah Chen",
    status: "open",
    priority: "high",
    channel: "WhatsApp",
    sla: "23m left",
  },
  {
    id: "#1233",
    subject: "Refund request for order #98765",
    customer: "Marcus Johnson",
    status: "pending",
    priority: "medium",
    channel: "Email",
    sla: "OK",
  },
  {
    id: "#1232",
    subject: "API returning 500 errors intermittently",
    customer: "Dev Team - Acme Corp",
    status: "escalated",
    priority: "urgent",
    channel: "Web",
    sla: "BREACHED",
  },
  {
    id: "#1231",
    subject: "How to integrate with Salesforce?",
    customer: "Emily Rodriguez",
    status: "open",
    priority: "low",
    channel: "Messenger",
    sla: "5h left",
  },
  {
    id: "#1230",
    subject: "Billing discrepancy on invoice #4521",
    customer: "James Park",
    status: "resolved",
    priority: "medium",
    channel: "SMS",
    sla: "Done",
  },
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
  high: "text-orange-600",
  urgent: "text-red-600 font-semibold",
};

const slaColor: Record<string, string> = {
  "BREACHED": "text-red-600 font-semibold",
  "OK": "text-green-600",
  "Done": "text-gray-400",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 bg-white hidden lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SF</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            SupportFlow<span className="text-blue-600"> AI</span>
          </span>
        </div>
        <nav className="p-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-gray-500">AI Active</span>
          </div>
        </header>

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="text-sm text-gray-500">{s.label}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-gray-900">
                    {s.value}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      s.up ? "text-green-600" : "text-green-600"
                    }`}
                  >
                    {s.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Tickets */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-900">
                Recent Tickets
              </h2>
              <Link
                href="/dashboard/tickets"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentTickets.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-400">
                        {t.id}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          statusColor[t.status]
                        }`}
                      >
                        {t.status}
                      </span>
                      <span className={`text-xs ${priorityColor[t.priority]}`}>
                        {t.priority}
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-medium text-gray-900 truncate">
                      {t.subject}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500">
                      {t.customer} · {t.channel}
                    </div>
                  </div>
                  <div
                    className={`text-xs font-medium whitespace-nowrap ${
                      slaColor[t.sla] || "text-gray-500"
                    }`}
                  >
                    {t.sla}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Activity */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                AI Resolution Activity
              </h3>
              <div className="space-y-3">
                {[
                  {
                    agent: "Resolution Agent",
                    action: "Auto-resolved ticket #1228",
                    time: "2m ago",
                  },
                  {
                    agent: "QA Agent",
                    action: "Approved response for #1225",
                    time: "5m ago",
                  },
                  {
                    agent: "Escalation Agent",
                    action: "Escalated #1224 to billing team",
                    time: "8m ago",
                  },
                  {
                    agent: "Intake Agent",
                    action: "Classified 14 new tickets",
                    time: "12m ago",
                  },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-gray-900">
                        {a.agent}
                      </span>{" "}
                      <span className="text-gray-600">{a.action}</span>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {a.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                SLA Status
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">First Response</span>
                    <span className="font-medium text-green-600">97%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: "97%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Resolution</span>
                    <span className="font-medium text-amber-600">84%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: "84%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Customer Satisfaction</span>
                    <span className="font-medium text-blue-600">92%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "92%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">AI Auto-Resolution</span>
                    <span className="font-medium text-purple-600">56%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: "56%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
