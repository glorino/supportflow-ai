"use client";

const kpis = [
  { label: "Total Tickets", value: "7,265", change: "+12%", up: true, icon: "🎫", sparkline: [65, 72, 68, 82, 78, 85, 92] },
  { label: "Avg Response", value: "1.2m", change: "-18%", up: true, icon: "⚡", sparkline: [2.1, 1.8, 1.6, 1.4, 1.3, 1.2, 1.2] },
  { label: "Resolution Rate", value: "94.2%", change: "+3.1%", up: true, icon: "✅", sparkline: [88, 89, 91, 92, 93, 93, 94] },
  { label: "CSAT Score", value: "4.7/5", change: "+0.2", up: true, icon: "⭐", sparkline: [4.3, 4.4, 4.5, 4.5, 4.6, 4.6, 4.7] },
  { label: "AI Auto-Resolve", value: "56%", change: "+5%", up: true, icon: "🤖", sparkline: [42, 45, 48, 50, 52, 54, 56] },
  { label: "Cost / Ticket", value: "$2.40", change: "-22%", up: true, icon: "💰", sparkline: [3.8, 3.5, 3.2, 2.9, 2.7, 2.5, 2.4] },
];

const monthlyData = [
  { month: "Jan", created: 1120, resolved: 1080, escalated: 42 },
  { month: "Feb", created: 1247, resolved: 1198, escalated: 38 },
  { month: "Mar", created: 1085, resolved: 1062, escalated: 29 },
  { month: "Apr", created: 1340, resolved: 1298, escalated: 52 },
  { month: "May", created: 1198, resolved: 1178, escalated: 31 },
  { month: "Jun", created: 1275, resolved: 1248, escalated: 35 },
];

const csatDistribution = [
  { stars: "5★", count: 542, pct: 43 },
  { stars: "4★", count: 389, pct: 31 },
  { stars: "3★", count: 198, pct: 16 },
  { stars: "2★", count: 87, pct: 7 },
  { stars: "1★", count: 31, pct: 3 },
];

const topCategories = [
  { cat: "Account Access", count: 287, pct: 23, avgTime: "1.1h" },
  { cat: "Billing & Payments", count: 224, pct: 18, avgTime: "1.4h" },
  { cat: "Technical Issues", count: 198, pct: 16, avgTime: "2.3h" },
  { cat: "Integration Help", count: 167, pct: 13, avgTime: "0.8h" },
  { cat: "Feature Requests", count: 142, pct: 11, avgTime: "0.4h" },
  { cat: "General Inquiry", count: 118, pct: 9, avgTime: "0.5h" },
  { cat: "Bug Report", count: 111, pct: 9, avgTime: "1.8h" },
];

const forecasts = [
  { period: "Next 7 days", predicted: 185, confidence: 87, factor: "Seasonal trend" },
  { period: "Next 30 days", predicted: 742, confidence: 72, factor: "Product launch" },
  { period: "Next quarter", predicted: 2180, confidence: 65, factor: "Growth trajectory" },
];

const aiInsights = [
  { insight: "Ticket volume spikes every Monday 9-11 AM. Consider increasing staffing during this window.", category: "trend", impact: "high" },
  { insight: "WhatsApp channel has 23% higher CSAT than email. Prioritize WhatsApp for complex issues.", category: "recommendation", impact: "medium" },
  { insight: "Unusual spike in billing-related tickets detected in the last 48 hours. Possible system issue.", category: "anomaly", impact: "high" },
  { insight: "AI auto-resolution rate improved 5% after knowledge base update last week.", category: "trend", impact: "medium" },
];

const impactColor: Record<string, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-red-100 text-red-700",
};

const categoryIcon: Record<string, string> = {
  trend: "📈",
  recommendation: "💡",
  anomaly: "⚠️",
  forecast: "🔮",
};

export default function AnalyticsPage() {
  const maxMonthly = Math.max(...monthlyData.map((m) => m.created));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">AI-powered insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export
          </button>
        </div>
      </div>

      {/* KPIs with Sparklines */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg">{s.icon}</span>
              <span className={`text-xs font-semibold ${s.up ? "text-green-600" : "text-red-500"}`}>{s.change}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
            <div className="text-xs text-gray-500 mb-3">{s.label}</div>
            <div className="flex items-end gap-0.5 h-8">
              {s.sparkline.map((v, i) => {
                const max = Math.max(...s.sparkline);
                const min = Math.min(...s.sparkline);
                const height = ((v - min) / (max - min || 1)) * 100;
                return (
                  <div key={i} className="flex-1 bg-blue-100 rounded-sm" style={{ height: `${Math.max(height, 10)}%` }}>
                    <div className="w-full bg-blue-500 rounded-sm" style={{ height: `${(v / max) * 100}%` }} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Trend */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Monthly Ticket Volume</h3>
            <p className="text-xs text-gray-500 mt-0.5">Created vs Resolved vs Escalated</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" />Created</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green-500" />Resolved</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400" />Escalated</span>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {monthlyData.map((m) => (
            <div key={m.month} className="flex flex-col items-center">
              <div className="w-full flex flex-col justify-end" style={{ height: "200px" }}>
                <div className="w-full flex flex-col gap-0.5">
                  <div className="w-full bg-red-400 rounded-t-lg" style={{ height: `${(m.escalated / maxMonthly) * 200}px` }} />
                  <div className="w-full bg-green-500" style={{ height: `${(m.resolved / maxMonthly) * 200}px` }} />
                  <div className="w-full bg-blue-500 rounded-b-lg" style={{ height: `${((m.created - m.resolved) / maxMonthly) * 200}px` }} />
                </div>
              </div>
              <div className="mt-3 text-sm font-bold text-gray-900">{m.created.toLocaleString()}</div>
              <div className="text-xs text-gray-400">{m.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSAT Distribution */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Customer Satisfaction</h3>
          <p className="text-xs text-gray-500 mb-5">Based on 1,247 ratings</p>
          <div className="space-y-3">
            {csatDistribution.map((c) => (
              <div key={c.stars} className="flex items-center gap-3">
                <span className="w-8 text-sm font-medium text-gray-600">{c.stars}</span>
                <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full flex items-center pl-3 transition-all duration-500" style={{ width: `${Math.max(c.pct * 2.2, 8)}%` }}>
                    <span className="text-xs font-semibold text-white">{c.count}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400 w-10 text-right">{c.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-center">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xl font-bold text-gray-900">4.7</div>
              <div className="text-[11px] text-gray-500">Avg Rating</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-xl font-bold text-green-600">74%</div>
              <div className="text-[11px] text-gray-500">4-5 Stars</div>
            </div>
            <div className="bg-red-50 rounded-xl p-3">
              <div className="text-xl font-bold text-red-500">3%</div>
              <div className="text-[11px] text-gray-500">1 Star</div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Top Categories</h3>
          <p className="text-xs text-gray-500 mb-5">By ticket volume</p>
          <div className="space-y-3">
            {topCategories.map((c, i) => (
              <div key={c.cat} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-5 text-center font-medium">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{c.cat}</span>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{c.count} tickets</span>
                      <span className="text-gray-400">·</span>
                      <span>{c.avgTime} avg</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${c.pct * 4}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forecasts & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forecasts */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🔮</span>
            <h3 className="text-base font-semibold text-gray-900">AI Forecasts</h3>
          </div>
          <p className="text-xs text-gray-500 mb-5">Predicted ticket volumes</p>
          <div className="space-y-4">
            {forecasts.map((f) => (
              <div key={f.period} className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{f.period}</span>
                  <span className="text-xl font-bold text-blue-700">{f.predicted.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-gray-500">Confidence: <span className="font-medium text-gray-700">{f.confidence}%</span></span>
                  <span className="text-gray-500">Factor: <span className="font-medium text-gray-700">{f.factor}</span></span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-blue-100 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${f.confidence}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🤖</span>
            <h3 className="text-base font-semibold text-gray-900">AI Insights</h3>
          </div>
          <p className="text-xs text-gray-500 mb-5">Automated recommendations</p>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{categoryIcon[insight.category]}</span>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 mb-2">{insight.insight}</div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${impactColor[insight.impact]}`}>
                        {insight.impact} impact
                      </span>
                      <span className="text-[10px] text-gray-400 capitalize">{insight.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel & AI Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Channel Performance</h3>
          <p className="text-xs text-gray-500 mb-5">Tickets by channel</p>
          <div className="space-y-3">
            {[
              { channel: "WhatsApp", count: 1680, pct: 23, color: "bg-green-500", icon: "📱" },
              { channel: "Email", count: 1520, pct: 21, color: "bg-purple-500", icon: "📧" },
              { channel: "Web Chat", count: 1453, pct: 20, color: "bg-blue-500", icon: "💬" },
              { channel: "SMS", count: 1090, pct: 15, color: "bg-amber-500", icon: "💬" },
              { channel: "Messenger", count: 872, pct: 12, color: "bg-blue-400", icon: "💬" },
              { channel: "Instagram", count: 650, pct: 9, color: "bg-pink-500", icon: "📸" },
            ].map((ch) => (
              <div key={ch.channel} className="flex items-center gap-3">
                <div className="w-28 flex items-center gap-2 shrink-0">
                  <span>{ch.icon}</span>
                  <span className="text-sm text-gray-600">{ch.channel}</span>
                </div>
                <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${ch.color} rounded-full flex items-center pl-3 transition-all duration-500`} style={{ width: `${Math.max(ch.pct * 3.5, 8)}%` }}>
                    <span className="text-xs font-semibold text-white">{ch.count.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400 w-10 text-right">{ch.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">AI Performance</h3>
          <p className="text-xs text-gray-500 mb-5">Agent metrics</p>
          <div className="space-y-4">
            {[
              { label: "Auto-Resolution Rate", value: "56%", detail: "712 of 1,275 eligible tickets", color: "bg-green-500", width: "56%" },
              { label: "AI Response Quality", value: "92%", detail: "Passed QA review on first attempt", color: "bg-blue-500", width: "92%" },
              { label: "Agent Adoption Rate", value: "78%", detail: "Agents using AI suggestions", color: "bg-purple-500", width: "78%" },
              { label: "Knowledge Accuracy", value: "96%", detail: "Correct article retrieval rate", color: "bg-teal-500", width: "96%" },
              { label: "Escalation Accuracy", value: "89%", detail: "Correctly routed to right team", color: "bg-amber-500", width: "89%" },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{m.label}</span>
                  <span className="font-bold text-gray-900">{m.value}</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden mb-1">
                  <div className={`h-full ${m.color} rounded-full transition-all duration-500`} style={{ width: m.width }} />
                </div>
                <div className="text-xs text-gray-400">{m.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
