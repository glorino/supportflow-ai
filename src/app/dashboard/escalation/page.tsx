"use client";

const escalations = [
  { id: "SF-1232", subject: "API returning 500 errors intermittently", customer: "TechStart Inc", from: "AI Agent", to: "Support Engineering", priority: "urgent", reason: "Technical issue requiring specialized knowledge", time: "30 min ago", status: "pending", sentiment: "angry" },
  { id: "SF-1228", subject: "App crashes on iOS 17.2", customer: "MobileDev", from: "AI Agent", to: "Support Engineering", priority: "high", reason: "Bug requires developer investigation", time: "2 hours ago", status: "in-progress", sentiment: "frustrated" },
  { id: "SF-1219", subject: "Disputed charges on invoice #4455", customer: "RetailCo", from: "AI Agent", to: "Billing & Accounts", priority: "high", reason: "Billing dispute requires human review", time: "5 hours ago", status: "pending", sentiment: "negative" },
  { id: "SF-1215", subject: "Enterprise contract renewal question", customer: "FinTech Pro", from: "AI Agent", to: "Customer Success", priority: "medium", reason: "Sales-related inquiry", time: "1 day ago", status: "resolved", sentiment: "neutral" },
  { id: "SF-1210", subject: "Data export compliance request", customer: "CorpNet", from: "AI Agent", to: "Support Engineering", priority: "high", reason: "GDPR compliance request", time: "1 day ago", status: "in-progress", sentiment: "neutral" },
];

const priorityColor: Record<string, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  "in-progress": "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
};

const sentimentIcon: Record<string, string> = {
  positive: "😊",
  neutral: "😐",
  negative: "😟",
  angry: "😡",
  frustrated: "😤",
};

export default function EscalationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Escalation Center</h1>
          <p className="text-sm text-gray-500 mt-1">AI-to-human handoff management and routing</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none transition-colors">
            <option>All Teams</option>
            <option>Support Engineering</option>
            <option>Billing & Accounts</option>
            <option>Customer Success</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pending", value: "2", icon: "⏳", gradient: "from-amber-400 to-orange-500", cardBg: "card-gradient-amber" },
          { label: "In Progress", value: "2", icon: "🔄", gradient: "from-blue-500 to-indigo-600", cardBg: "card-gradient-blue" },
          { label: "Resolved Today", value: "1", icon: "✅", gradient: "from-green-500 to-emerald-600", cardBg: "card-gradient-green" },
          { label: "Avg Handle Time", value: "3.2m", icon: "⏱️", gradient: "from-purple-500 to-violet-600", cardBg: "card-gradient-purple" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border border-gray-200 p-5 group ${s.cardBg} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center text-sm text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>{s.icon}</div>
              <span className="text-xs text-gray-600 font-medium">{s.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Routing Rules */}
      <div className="rounded-2xl border border-gray-200 p-6 card-gradient-cyan">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">AI Routing Rules</h3>
            <p className="text-xs text-gray-500">Intelligent escalation triggers</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { trigger: "Sentiment < -0.5", action: "Route to senior agent", priority: "High", active: true },
            { trigger: "Billing dispute detected", action: "Route to Billing team", priority: "High", active: true },
            { trigger: "Technical bug confirmed", action: "Route to Engineering", priority: "Medium", active: true },
            { trigger: "VIP customer", action: "Priority routing", priority: "Critical", active: true },
            { trigger: "AI confidence < 60%", action: "Route to human", priority: "Medium", active: true },
            { trigger: "Legal/compliance keywords", action: "Route to Legal team", priority: "Critical", active: false },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-cyan-100 hover:shadow-md hover:border-cyan-200 transition-all duration-300 cursor-pointer">
              <div className={`h-2.5 w-2.5 rounded-full mt-1 shrink-0 ${r.active ? "bg-green-500 shadow-sm shadow-green-500/50 animate-pulse" : "bg-gray-300"}`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-0.5">{r.trigger}</div>
                <div className="text-xs text-gray-500 mb-2">{r.action}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColor[r.priority.toLowerCase()]}`}>{r.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation Queue */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900">Escalation Queue</h3>
            </div>
            <span className="text-xs text-gray-400">{escalations.length} tickets</span>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {escalations.map((e) => (
            <div key={e.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-all duration-200 group">
              <div className="text-xl group-hover:scale-125 transition-transform duration-200">{sentimentIcon[e.sentiment]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-gray-400">{e.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColor[e.priority]}`}>{e.priority}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[e.status]}`}>{e.status}</span>
                </div>
                <div className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition">{e.subject}</div>
                <div className="text-xs text-gray-500 mt-0.5">{e.customer} · {e.reason}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-gray-400 mb-1">{e.time}</div>
                <div className="text-xs text-gray-500">
                  <span className="text-gray-400">From:</span> {e.from}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="text-gray-400">To:</span> <span className="font-medium text-blue-600">{e.to}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="btn-ghost text-xs hover:bg-gray-100">Assign</button>
                <button className="btn-primary text-xs shadow-sm hover:shadow-md transition-all">Accept</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
