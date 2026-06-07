export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Tickets", value: "1,247", change: "+12%", up: true },
          { label: "Avg Response Time", value: "1.2m", change: "-18%", up: true },
          { label: "Resolution Rate", value: "94.2%", change: "+3.1%", up: true },
          { label: "CSAT Score", value: "4.7/5", change: "+0.2", up: true },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-3xl font-bold text-gray-900">{s.value}</div>
              <span className={`text-sm font-medium ${s.up ? "text-green-600" : "text-red-600"}`}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Ticket Volume Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Ticket Volume (Last 7 Days)</h3>
          <div className="flex items-end gap-2 h-48">
            {[65, 82, 74, 91, 88, 76, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-blue-500 rounded-t" style={{ height: `${h}%` }} />
                <span className="text-xs text-gray-400">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Time */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Avg Resolution Time</h3>
          <div className="space-y-4">
            {[
              { label: "Billing", time: "1.1h", width: 45 },
              { label: "Technical", time: "2.3h", width: 85 },
              { label: "Account", time: "0.8h", width: 30 },
              { label: "General", time: "0.5h", width: 20 },
            ].map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{c.label}</span>
                  <span className="font-medium">{c.time}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.width}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Distribution */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tickets by Channel</h3>
          <div className="space-y-3">
            {[
              { channel: "Web Chat", count: 420, pct: 34 },
              { channel: "Email", count: 312, pct: 25 },
              { channel: "WhatsApp", count: 248, pct: 20 },
              { channel: "SMS", count: 124, pct: 10 },
              { channel: "Messenger", count: 87, pct: 7 },
              { channel: "Instagram", count: 56, pct: 4 },
            ].map((ch) => (
              <div key={ch.channel} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24">{ch.channel}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${ch.pct}%` }} />
                </div>
                <span className="text-sm font-medium text-gray-900 w-16 text-right">{ch.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-4">AI Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto-Resolution Rate</span>
              <span className="text-2xl font-bold text-green-600">56%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Response Quality</span>
              <span className="text-2xl font-bold text-blue-600">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Agent Adoption of AI</span>
              <span className="text-2xl font-bold text-purple-600">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tokens Used (Today)</span>
              <span className="text-2xl font-bold text-gray-900">24.5K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
