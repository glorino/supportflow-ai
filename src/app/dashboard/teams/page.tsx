const teams = [
  { id: 1, name: "Support General", members: 5, lead: "Alex Kim", channels: ["Web", "Email"], openTickets: 42, sla: "97%", color: "bg-blue-500" },
  { id: 2, name: "Billing Team", members: 3, lead: "Sam Taylor", channels: ["Email", "SMS"], openTickets: 18, sla: "94%", color: "bg-green-500" },
  { id: 3, name: "Technical Support", members: 4, lead: "Jordan Lee", channels: ["Web", "WhatsApp"], openTickets: 31, sla: "91%", color: "bg-purple-500" },
  { id: 4, name: "VIP Support", members: 2, lead: "Alex Kim", channels: ["All"], openTickets: 8, sla: "100%", color: "bg-amber-500" },
];

const members = [
  { name: "Alex Kim", role: "Manager", team: "Support General", status: "online", tickets: 12, avatar: "AK" },
  { name: "Sam Taylor", role: "Agent", team: "Billing Team", status: "online", tickets: 8, avatar: "ST" },
  { name: "Jordan Lee", role: "Agent", team: "Technical Support", status: "away", tickets: 15, avatar: "JL" },
  { name: "Casey Morgan", role: "Agent", team: "Support General", status: "online", tickets: 10, avatar: "CM" },
  { name: "Riley Patel", role: "Agent", team: "Technical Support", status: "offline", tickets: 6, avatar: "RP" },
];

const statusDot: Record<string, string> = {
  online: "bg-green-500",
  away: "bg-amber-500",
  offline: "bg-gray-300",
};

export default function TeamsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
          + New Team
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {teams.map((t) => (
          <div key={t.id} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-3 w-3 rounded-full ${t.color}`} />
              <h3 className="font-semibold text-gray-900">{t.name}</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Members</span><span className="font-medium">{t.members}</span></div>
              <div className="flex justify-between"><span>Lead</span><span className="font-medium">{t.lead}</span></div>
              <div className="flex justify-between"><span>Open Tickets</span><span className="font-medium">{t.openTickets}</span></div>
              <div className="flex justify-between"><span>SLA</span><span className="font-medium text-green-600">{t.sla}</span></div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {t.channels.map((ch) => (
                <span key={ch} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{ch}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Team Members */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Team Members</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active Tickets</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((m) => (
              <tr key={m.name} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">{m.avatar}</div>
                    <span className="text-sm font-medium text-gray-900">{m.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{m.role}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{m.team}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${statusDot[m.status]}`} />
                    <span className="text-sm text-gray-600 capitalize">{m.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{m.tickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
