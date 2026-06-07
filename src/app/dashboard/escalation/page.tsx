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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Escalation Center</h1>
          <p className="text-sm text-gray-500 mt-1">AI-to-human handoff management and routing</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none">
            <option>All Teams</option>
            <option>Support Engineering</option>
            <option>Billing & Accounts</option>
            <option>Customer Success</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Pending", value: "2", icon: "⏳", color: "bg-amber-50" },
          { label: "In Progress", value: "2", icon: "🔄", color: "bg-blue-50" },
          { label: "Resolved Today", value: "1", icon: "✅", color: "bg-green-50" },
          { label: "Avg Handle Time", value: "3.2m", icon: "⏱️", color: "bg-purple-50" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{s.icon}</span>
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Routing Rules */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">AI Routing Rules</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { trigger: "Sentiment < -0.5", action: "Route to senior agent", priority: "High", active: true },
            { trigger: "Billing dispute detected", action: "Route to Billing team", priority: "High", active: true },
            { trigger: "Technical bug confirmed", action: "Route to Engineering", priority: "Medium", active: true },
            { trigger: "VIP customer", action: "Priority routing", priority: "Critical", active: true },
            { trigger: "AI confidence < 60%", action: "Route to human", priority: "Medium", active: true },
            { trigger: "Legal/compliance keywords", action: "Route to Legal team", priority: "Critical", active: false },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${r.active ? "bg-green-500" : "bg-gray-300"}`} />
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
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Escalation Queue</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {escalations.map((e) => (
            <div key={e.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors group">
              <div className="text-sm">{sentimentIcon[e.sentiment]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-gray-400">{e.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColor[e.priority]}`}>{e.priority}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[e.status]}`}>{e.status}</span>
                </div>
                <div className="text-sm font-medium text-gray-900 truncate">{e.subject}</div>
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
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="btn-ghost text-xs">Assign</button>
                <button className="btn-primary text-xs">Accept</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
