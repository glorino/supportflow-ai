import Link from "next/link";

const tickets = [
  { id: "#1234", subject: "Cannot access my account after password reset", customer: "Sarah Chen", status: "open", priority: "high", channel: "WhatsApp", sla: "23m left", assignee: "Alex Kim", updatedAt: "2m ago" },
  { id: "#1233", subject: "Refund request for order #98765", customer: "Marcus Johnson", status: "pending", priority: "medium", channel: "Email", sla: "OK", assignee: "Unassigned", updatedAt: "15m ago" },
  { id: "#1232", subject: "API returning 500 errors intermittently", customer: "Dev Team - Acme Corp", status: "escalated", priority: "urgent", channel: "Web", sla: "BREACHED", assignee: "Jordan Lee", updatedAt: "1h ago" },
  { id: "#1231", subject: "How to integrate with Salesforce?", customer: "Emily Rodriguez", status: "open", priority: "low", channel: "Messenger", sla: "5h left", assignee: "Alex Kim", updatedAt: "2h ago" },
  { id: "#1230", subject: "Billing discrepancy on invoice #4521", customer: "James Park", status: "resolved", priority: "medium", channel: "SMS", sla: "Done", assignee: "Sam Taylor", updatedAt: "3h ago" },
  { id: "#1229", subject: "Feature request: Dark mode support", customer: "Lisa Wang", status: "open", priority: "low", channel: "Email", sla: "24h left", assignee: "Unassigned", updatedAt: "4h ago" },
  { id: "#1228", subject: "App crashes on iOS 17.2", customer: "Tom Miller", status: "open", priority: "high", channel: "Instagram", sla: "45m left", assignee: "Jordan Lee", updatedAt: "5h ago" },
  { id: "#1227", subject: "Cannot download invoice PDF", customer: "Anna Smith", status: "pending", priority: "medium", channel: "WhatsApp", sla: "OK", assignee: "Sam Taylor", updatedAt: "6h ago" },
  { id: "#1226", subject: "Upgrade plan from Starter to Growth", customer: "Mike Davis", status: "open", priority: "medium", channel: "Web", sla: "3h left", assignee: "Alex Kim", updatedAt: "7h ago" },
  { id: "#1225", subject: "Two-factor authentication not working", customer: "Rachel Green", status: "resolved", priority: "high", channel: "Email", sla: "Done", assignee: "Jordan Lee", updatedAt: "8h ago" },
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
  urgent: "text-red-600 font-bold",
};

const slaColor: Record<string, string> = {
  BREACHED: "text-red-600 font-semibold",
  OK: "text-green-600",
  Done: "text-gray-400",
};

export default function TicketsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
        <Link
          href="/dashboard/tickets/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          + New Ticket
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "Open", "Pending", "Escalated", "Resolved"].map((f) => (
          <button
            key={f}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              f === "All"
                ? "bg-blue-100 text-blue-700"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Ticket Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SLA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4">
                  <Link href={`/dashboard/tickets/${t.id.replace("#", "")}`} className="block">
                    <span className="text-sm font-mono text-gray-400">{t.id}</span>
                    <div className="text-sm font-medium text-gray-900 mt-0.5 max-w-xs truncate">{t.subject}</div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{t.customer}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[t.status]}`}>
                    {t.status}
                  </span>
                </td>
                <td className={`px-6 py-4 text-sm ${priorityColor[t.priority]}`}>{t.priority}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{t.channel}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{t.assignee}</td>
                <td className={`px-6 py-4 text-xs font-medium ${slaColor[t.sla] || "text-gray-500"}`}>{t.sla}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{t.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
