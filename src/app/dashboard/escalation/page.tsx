export default function EscalationPage() {
  const escalations = [
    { id: "#1232", subject: "API returning 500 errors", customer: "Acme Corp", priority: "urgent", reason: "SLA breach", assignedTo: "Jordan Lee", createdAt: "1h ago", status: "active" },
    { id: "#1218", subject: "Payment processing failed 3 times", customer: "TechStart Inc", priority: "high", reason: "Multiple failures", assignedTo: "Sam Taylor", createdAt: "3h ago", status: "active" },
    { id: "#1205", subject: "Customer threatens legal action", customer: "Global Solutions", priority: "urgent", reason: "Legal risk", assignedTo: "Alex Kim", createdAt: "6h ago", status: "active" },
    { id: "#1198", subject: "Data export request (GDPR)", customer: "Smith Enterprises", priority: "high", reason: "Compliance", assignedTo: "Casey Morgan", createdAt: "1d ago", status: "pending" },
  ];

  const priorityColor: Record<string, string> = {
    urgent: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Escalation Center</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Active Escalations</div>
          <div className="text-3xl font-bold text-red-600 mt-1">3</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Avg Resolution Time</div>
          <div className="text-3xl font-bold text-gray-900 mt-1">2.4h</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Resolved Today</div>
          <div className="text-3xl font-bold text-green-600 mt-1">5</div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Active Escalations</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {escalations.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4">
                  <div className="text-sm font-mono text-gray-400">{e.id}</div>
                  <div className="text-sm font-medium text-gray-900 mt-0.5">{e.subject}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.customer}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColor[e.priority]}`}>
                    {e.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.reason}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.assignedTo}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{e.createdAt}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    e.status === "active" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
