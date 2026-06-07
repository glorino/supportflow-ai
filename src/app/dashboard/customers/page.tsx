const customers = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@example.com", company: "Acme Corp", segment: "Enterprise", tickets: 12, satisfaction: 4.8, lastContact: "2m ago" },
  { id: "2", name: "Marcus Johnson", email: "marcus.j@example.com", company: "TechStart Inc", segment: "SMB", tickets: 5, satisfaction: 4.2, lastContact: "15m ago" },
  { id: "3", name: "Emily Rodriguez", email: "emily.r@example.com", company: "Design Studio", segment: "Startup", tickets: 3, satisfaction: 4.9, lastContact: "2h ago" },
  { id: "4", name: "James Park", email: "james.park@example.com", company: "Global Solutions", segment: "Enterprise", tickets: 18, satisfaction: 3.9, lastContact: "3h ago" },
  { id: "5", name: "Lisa Wang", email: "lisa.w@example.com", company: "CloudNine Labs", segment: "SMB", tickets: 7, satisfaction: 4.5, lastContact: "4h ago" },
  { id: "6", name: "Tom Miller", email: "tom.m@example.com", company: "Miller & Co", segment: "SMB", tickets: 2, satisfaction: 4.1, lastContact: "5h ago" },
  { id: "7", name: "Anna Smith", email: "anna.s@example.com", company: "Smith Enterprises", segment: "Enterprise", tickets: 22, satisfaction: 4.7, lastContact: "6h ago" },
  { id: "8", name: "Mike Davis", email: "mike.d@example.com", company: "Davis Digital", segment: "Startup", tickets: 1, satisfaction: 5.0, lastContact: "7h ago" },
];

const segmentColor: Record<string, string> = {
  Enterprise: "bg-purple-100 text-purple-700",
  SMB: "bg-blue-100 text-blue-700",
  Startup: "bg-green-100 text-green-700",
};

export default function CustomersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
          + Add Customer
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Segment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tickets</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Satisfaction</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{c.company}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${segmentColor[c.segment]}`}>
                    {c.segment}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{c.tickets}</td>
                <td className="px-6 py-4 text-sm text-gray-600">⭐ {c.satisfaction}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{c.lastContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
