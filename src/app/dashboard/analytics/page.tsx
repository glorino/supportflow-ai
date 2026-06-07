export default function AnalyticsPage() {
  const monthlyTickets = [
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

  const hourlyHeatmap = Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => {
      const base = [8, 12, 10, 14, 16, 6, 4][day];
      const timeMult = hour >= 9 && hour <= 17 ? 1.5 : hour >= 18 && hour <= 21 ? 0.8 : 0.3;
      return Math.round(base * timeMult * (0.7 + Math.random() * 0.6));
    })
  );
  const heatMax = Math.max(...hourlyHeatmap.flat());

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Deep insights into your support operations</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
            <option>All time</option>
          </select>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Total Tickets", value: "7,265", change: "+12%", up: true, icon: "🎫" },
          { label: "Avg Response", value: "1.2m", change: "-18%", up: true, icon: "⚡" },
          { label: "Resolution Rate", value: "94.2%", change: "+3.1%", up: true, icon: "✅" },
          { label: "CSAT Score", value: "4.7/5", change: "+0.2", up: true, icon: "⭐" },
          { label: "AI Auto-Resolve", value: "56%", change: "+5%", up: true, icon: "🤖" },
          { label: "Cost / Ticket", value: "$2.40", change: "-22%", up: true, icon: "💰" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span>{s.icon}</span>
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <span className={`text-xs font-medium ${s.up ? "text-green-600" : "text-red-500"}`}>{s.change} vs last period</span>
          </div>
        ))}
      </div>

      {/* Monthly Trend */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Monthly Ticket Volume</h3>
            <p className="text-xs text-gray-500 mt-1">Created vs Resolved vs Escalated</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" />Created</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-green-500" />Resolved</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500" />Escalated</span>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {monthlyTickets.map((m) => {
            const max = 1400;
            return (
              <div key={m.month} className="flex flex-col items-center">
                <div className="w-full flex flex-col justify-end" style={{ height: "180px" }}>
                  <div className="w-full flex flex-col gap-0.5">
                    <div className="w-full bg-red-500 rounded-t" style={{ height: `${(m.escalated / max) * 180}px` }} />
                    <div className="w-full bg-green-500" style={{ height: `${(m.resolved / max) * 180}px` }} />
                    <div className="w-full bg-blue-500 rounded-b" style={{ height: `${((m.created - m.resolved) / max) * 180}px` }} />
                  </div>
                </div>
                <div className="mt-3 text-sm font-medium text-gray-900">{m.created.toLocaleString()}</div>
                <div className="text-xs text-gray-400">{m.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* CSAT Distribution */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Customer Satisfaction Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Based on 1,247 ratings</p>
          <div className="space-y-3">
            {csatDistribution.map((c) => (
              <div key={c.stars} className="flex items-center gap-3">
                <span className="w-8 text-sm font-medium text-gray-600">{c.stars}</span>
                <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full flex items-center pl-3 transition-all" style={{ width: `${c.pct}%` }}>
                    <span className="text-xs font-medium text-white">{c.count}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400 w-10 text-right">{c.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-center">
            <div>
              <div className="text-xl font-bold text-gray-900">4.7</div>
              <div className="text-xs text-gray-500">Avg Rating</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">74%</div>
              <div className="text-xs text-gray-500">5+4 Stars</div>
            </div>
            <div>
              <div className="text-xl font-bold text-red-500">3%</div>
              <div className="text-xs text-gray-500">1 Star</div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Top Ticket Categories</h3>
          <div className="space-y-3">
            {topCategories.map((c, i) => (
              <div key={c.cat} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-5 text-center">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-medium text-gray-900">{c.cat}</span>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{c.count}</span>
                      <span>{c.avgTime}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.pct * 4}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Weekly Activity Heatmap</h3>
        <p className="text-xs text-gray-500 mb-4">Ticket volume by day of week and hour</p>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex gap-1 mb-2">
              <div className="w-12" />
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="flex-1 text-center text-xs text-gray-400">
                  {i % 3 === 0 ? `${i}:00` : ""}
                </div>
              ))}
            </div>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dayIdx) => (
              <div key={day} className="flex gap-1 mb-1">
                <div className="w-12 text-xs text-gray-500 flex items-center">{day}</div>
                {hourlyHeatmap[dayIdx].map((val, hour) => {
                  const intensity = val / heatMax;
                  const bg = intensity > 0.7 ? "bg-blue-600" : intensity > 0.5 ? "bg-blue-500" : intensity > 0.3 ? "bg-blue-300" : intensity > 0.1 ? "bg-blue-100" : "bg-gray-50";
                  return (
                    <div
                      key={hour}
                      className={`flex-1 h-6 rounded-sm ${bg} transition-colors`}
                      title={`${day} ${hour}:00 — ${val} tickets`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-xs text-gray-400">Less</span>
            {["bg-gray-50", "bg-blue-100", "bg-blue-300", "bg-blue-500", "bg-blue-600"].map((c) => (
              <div key={c} className={`h-4 w-4 rounded-sm ${c}`} />
            ))}
            <span className="text-xs text-gray-400">More</span>
          </div>
        </div>
      </div>

      {/* Channel & AI Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Tickets by Channel</h3>
          <div className="space-y-3">
            {[
              { channel: "WhatsApp", count: 1680, pct: 23, color: "bg-green-500" },
              { channel: "Email", count: 1520, pct: 21, color: "bg-purple-500" },
              { channel: "Web Chat", count: 1453, pct: 20, color: "bg-blue-500" },
              { channel: "SMS", count: 1090, pct: 15, color: "bg-amber-500" },
              { channel: "Messenger", count: 872, pct: 12, color: "bg-blue-400" },
              { channel: "Instagram", count: 650, pct: 9, color: "bg-pink-500" },
            ].map((ch) => (
              <div key={ch.channel} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24 shrink-0">{ch.channel}</span>
                <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${ch.color} rounded-full flex items-center pl-3 transition-all`} style={{ width: `${ch.pct * 4}%` }}>
                    <span className="text-xs font-medium text-white">{ch.count.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400 w-10 text-right">{ch.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">AI Performance Metrics</h3>
          <div className="space-y-4">
            {[
              { label: "Auto-Resolution Rate", value: "56%", detail: "712 of 1,275 eligible tickets", color: "bg-green-500", width: "56%" },
              { label: "AI Response Quality", value: "92%", detail: "Passed QA review on first attempt", color: "bg-blue-500", width: "92%" },
              { label: "Agent Adoption Rate", value: "78%", detail: "Agents using AI suggestions", color: "bg-purple-500", width: "78%" },
              { label: "Knowledge Accuracy", value: "96%", detail: "Correct article retrieval rate", color: "bg-teal-500", width: "96%" },
              { label: "Escalation Accuracy", value: "89%", detail: "Correctly routed to right team", color: "bg-amber-500", width: "89%" },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{m.label}</span>
                  <span className="font-bold text-gray-900">{m.value}</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden mb-1">
                  <div className={`h-full ${m.color} rounded-full transition-all`} style={{ width: m.width }} />
                </div>
                <div className="text-xs text-gray-400">{m.detail}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-gray-900">24.5K</div>
              <div className="text-xs text-gray-500">Tokens Used Today</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-gray-900">$182</div>
              <div className="text-xs text-gray-500">AI Cost This Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
