"use client";

import { useState, useEffect } from "react";

interface TeamUser {
  id: string;
  email: string;
  name: string;
  role: string;
  team: string;
  avatarUrl: string;
  status: string;
  activeTickets: number;
  resolvedTickets: number;
  createdAt: string;
}

interface TeamInfo {
  name: string;
  memberCount: number;
  openTickets: number;
}

const teamColors: Record<string, string> = {
  "AI Operations": "from-cyan-500 to-blue-600",
  "Support Engineering": "from-blue-500 to-indigo-600",
  "Billing & Accounts": "from-green-500 to-emerald-600",
  "Customer Success": "from-purple-500 to-indigo-600",
};

const roleColor: Record<string, string> = {
  super_admin: "bg-purple-100 text-purple-700",
  admin: "bg-purple-100 text-purple-700",
  manager: "bg-blue-100 text-blue-700",
  agent: "bg-gray-100 text-gray-600",
  viewer: "bg-gray-100 text-gray-500",
};

const statusColor: Record<string, string> = {
  active: "bg-green-500",
  inactive: "bg-gray-300",
};

export default function TeamsPage() {
  const [view, setView] = useState<"teams" | "members">("teams");
  const [users, setUsers] = useState<TeamUser[]>([]);
  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setTeams(data.teams || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-sm text-gray-500 mt-1">{users.length} members from database</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden">
            <button onClick={() => setView("teams")} className={`px-4 py-2 text-sm font-medium transition ${view === "teams" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>Teams</button>
            <button onClick={() => setView("members")} className={`px-4 py-2 text-sm font-medium transition ${view === "members" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>Members</button>
          </div>
        </div>
      </div>

      {view === "teams" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {teams.map((t) => {
            const color = teamColors[t.name] || "from-gray-500 to-gray-600";
            const teamMembers = users.filter(u => u.team === t.name);
            const lead = teamMembers.find(u => u.role === "manager" || u.role === "admin");
            return (
              <div key={t.name} className="rounded-2xl border border-gray-200 p-6 card-glow hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{t.name}</h3>
                      <p className="text-xs text-gray-500">{t.memberCount} members</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 text-center border border-blue-100">
                    <div className="text-lg font-bold text-blue-700">{t.memberCount}</div>
                    <div className="text-[11px] text-blue-500 font-medium">Members</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 text-center border border-amber-100">
                    <div className="text-lg font-bold text-amber-700">{t.openTickets}</div>
                    <div className="text-[11px] text-amber-500 font-medium">Open</div>
                  </div>
                </div>
                {lead && (
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">{lead.name.split(" ").map((n) => n[0]).join("")}</div>
                      <span className="text-xs text-gray-600">Lead: <span className="font-medium">{lead.name}</span></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {teams.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400 text-sm">No teams found.</div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="hidden sm:table-cell text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="hidden sm:table-cell text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="hidden sm:table-cell text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Resolved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                            {u.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${statusColor[u.status] || "bg-gray-300"}`} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${roleColor[u.role] || "bg-gray-100 text-gray-600"}`}>{u.role.replace("_", " ")}</span></td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">{u.team || "—"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${statusColor[u.status] || "bg-gray-300"}`} />
                        <span className="text-xs text-gray-600 capitalize">{u.status}</span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm font-medium text-gray-900">{u.activeTickets}</td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">{u.resolvedTickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
