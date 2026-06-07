"use client";

import { useState } from "react";

const teams = [
  {
    id: 1,
    name: "Support Engineering",
    description: "Technical support and bug resolution",
    members: 8,
    openTickets: 24,
    avgResponse: "1.2m",
    color: "from-blue-500 to-indigo-600",
    lead: "Marcus Johnson",
  },
  {
    id: 2,
    name: "Billing & Accounts",
    description: "Billing inquiries and account management",
    members: 4,
    openTickets: 12,
    avgResponse: "2.1m",
    color: "from-green-500 to-emerald-600",
    lead: "Sarah Kim",
  },
  {
    id: 3,
    name: "Customer Success",
    description: "Onboarding and relationship management",
    members: 6,
    openTickets: 8,
    avgResponse: "3.5m",
    color: "from-purple-500 to-indigo-600",
    lead: "Emily Rodriguez",
  },
  {
    id: 4,
    name: "AI Operations",
    description: "AI agent monitoring and optimization",
    members: 3,
    openTickets: 0,
    avgResponse: "N/A",
    color: "from-cyan-500 to-blue-600",
    lead: "Alex Johnson",
  },
];

const agents = [
  { id: 1, name: "Alex Johnson", role: "Admin", team: "AI Operations", status: "online", tickets: 0, resolved: 45, csat: 4.9, avatar: "AJ", email: "alex@supportflow.ai" },
  { id: 2, name: "Marcus Johnson", role: "Lead", team: "Support Engineering", status: "online", tickets: 8, resolved: 124, csat: 4.7, avatar: "MJ", email: "marcus@supportflow.ai" },
  { id: 3, name: "Sarah Kim", role: "Lead", team: "Billing & Accounts", status: "online", tickets: 6, resolved: 98, csat: 4.8, avatar: "SK", email: "sarah@supportflow.ai" },
  { id: 4, name: "Emily Rodriguez", role: "Lead", team: "Customer Success", status: "away", tickets: 4, resolved: 67, csat: 4.9, avatar: "ER", email: "emily@supportflow.ai" },
  { id: 5, name: "Tom Chen", role: "Agent", team: "Support Engineering", status: "online", tickets: 12, resolved: 89, csat: 4.5, avatar: "TC", email: "tom@supportflow.ai" },
  { id: 6, name: "Lisa Park", role: "Agent", team: "Support Engineering", status: "online", tickets: 10, resolved: 76, csat: 4.6, avatar: "LP", email: "lisa@supportflow.ai" },
  { id: 7, name: "David Kim", role: "Agent", team: "Billing & Accounts", status: "offline", tickets: 0, resolved: 54, csat: 4.4, avatar: "DK", email: "david@supportflow.ai" },
  { id: 8, name: "Rachel Green", role: "Agent", team: "Customer Success", status: "online", tickets: 5, resolved: 43, csat: 4.7, avatar: "RG", email: "rachel@supportflow.ai" },
  { id: 9, name: "Mike Davis", role: "Agent", team: "Support Engineering", status: "busy", tickets: 15, resolved: 112, csat: 4.3, avatar: "MD", email: "mike@supportflow.ai" },
  { id: 10, name: "AI Resolution Agent", role: "AI Agent", team: "AI Operations", status: "online", tickets: 67, resolved: 892, csat: 4.8, avatar: "🤖", email: "ai@supportflow.ai" },
];

const statusColor: Record<string, string> = {
  online: "bg-green-500",
  away: "bg-amber-500",
  busy: "bg-red-500",
  offline: "bg-gray-300",
};

const roleColor: Record<string, string> = {
  Admin: "bg-purple-100 text-purple-700",
  Lead: "bg-blue-100 text-blue-700",
  Agent: "bg-gray-100 text-gray-600",
  "AI Agent": "bg-cyan-100 text-cyan-700",
};

export default function TeamsPage() {
  const [view, setView] = useState<"teams" | "members">("teams");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-sm text-gray-500 mt-1">Manage teams, members, and agent assignments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden">
            <button onClick={() => setView("teams")} className={`px-4 py-2 text-sm font-medium transition ${view === "teams" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>Teams</button>
            <button onClick={() => setView("members")} className={`px-4 py-2 text-sm font-medium transition ${view === "members" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>Members</button>
          </div>
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
            Add Member
          </button>
        </div>
      </div>

      {view === "teams" ? (
        <>
          {/* Team Cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {teams.map((t) => (
              <div key={t.id} className="rounded-2xl border border-gray-200 bg-white p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{t.name}</h3>
                      <p className="text-xs text-gray-500">{t.description}</p>
                    </div>
                  </div>
                  <button className="btn-ghost text-xs">Edit</button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{t.members}</div>
                    <div className="text-[11px] text-gray-500">Members</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{t.openTickets}</div>
                    <div className="text-[11px] text-gray-500">Open</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{t.avgResponse}</div>
                    <div className="text-[11px] text-gray-500">Avg Response</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">{t.lead.split(" ").map((n) => n[0]).join("")}</div>
                    <span className="text-xs text-gray-600">Lead: <span className="font-medium">{t.lead}</span></span>
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View team →</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Members Table */
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Active</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Resolved</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">CSAT</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {agents.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">{a.avatar}</div>
                        <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${statusColor[a.status]}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{a.name}</div>
                        <div className="text-xs text-gray-500">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${roleColor[a.role]}`}>{a.role}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.team}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 rounded-full ${statusColor[a.status]}`} />
                      <span className="text-xs text-gray-600 capitalize">{a.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{a.tickets}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.resolved}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-gray-900">{a.csat}</span>
                      <span className="text-amber-400 text-xs">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="btn-ghost text-xs opacity-0 group-hover:opacity-100 transition">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
