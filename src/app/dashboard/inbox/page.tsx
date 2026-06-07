const conversations = [
  { id: 1, name: "Sarah Chen", lastMsg: "Can't access my account after reset", channel: "WhatsApp", channelIcon: "📱", channelColor: "bg-green-500", time: "2m", unread: 2, sentiment: "negative", status: "active" },
  { id: 2, name: "TechStart Inc", lastMsg: "API returning 500 errors intermittently", channel: "Email", channelIcon: "📧", channelColor: "bg-purple-500", time: "15m", unread: 1, sentiment: "angry", status: "escalated" },
  { id: 3, name: "Emily Rodriguez", lastMsg: "How to integrate with Salesforce?", channel: "Web Chat", channelIcon: "💬", channelColor: "bg-blue-500", time: "1h", unread: 0, sentiment: "neutral", status: "active" },
  { id: 4, name: "James Park", lastMsg: "Billing discrepancy on invoice #4521", channel: "SMS", channelIcon: "💬", channelColor: "bg-amber-500", time: "3h", unread: 0, sentiment: "neutral", status: "pending" },
  { id: 5, name: "Lisa Wang", lastMsg: "Feature request: dark mode support", channel: "Messenger", channelIcon: "💬", channelColor: "bg-blue-400", time: "4h", unread: 0, sentiment: "positive", status: "active" },
  { id: 6, name: "Tom Miller", lastMsg: "App crashes on iOS 17.2", channel: "Instagram", channelIcon: "📸", channelColor: "bg-pink-500", time: "5h", unread: 3, sentiment: "frustrated", status: "active" },
  { id: 7, name: "Anna Smith", lastMsg: "Cannot download invoice PDF", channel: "WhatsApp", channelIcon: "📱", channelColor: "bg-green-500", time: "6h", unread: 0, sentiment: "neutral", status: "resolved" },
  { id: 8, name: "Mike Davis", lastMsg: "Want to upgrade to Growth plan", channel: "Web Chat", channelIcon: "💬", channelColor: "bg-blue-500", time: "7h", unread: 0, sentiment: "positive", status: "active" },
];

const sentimentColor: Record<string, string> = {
  positive: "text-green-500",
  neutral: "text-gray-400",
  negative: "text-amber-500",
  angry: "text-red-500",
  frustrated: "text-orange-500",
};

const statusColor: Record<string, string> = {
  active: "bg-blue-100 text-blue-700",
  escalated: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
};

const channelFilters = [
  { name: "All", count: 8, active: true },
  { name: "WhatsApp", count: 2, icon: "📱" },
  { name: "Email", count: 1, icon: "📧" },
  { name: "Web Chat", count: 2, icon: "💬" },
  { name: "SMS", count: 1, icon: "💬" },
  { name: "Messenger", count: 1, icon: "💬" },
  { name: "Instagram", count: 1, icon: "📸" },
];

export default function InboxPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Unified Inbox</h1>
          <p className="text-sm text-gray-500 mt-1">All conversations from every channel in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>6 Connected Channels</span>
          </div>
        </div>
      </div>

      {/* Channel Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {channelFilters.map((f) => (
          <button
            key={f.name}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              f.active
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f.icon && <span>{f.icon}</span>}
            {f.name}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${f.active ? "bg-blue-200 text-blue-800" : "bg-gray-100 text-gray-500"}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-xl border border-gray-200 bg-white overflow-hidden" style={{ height: "calc(100vh - 220px)" }}>
        {/* Conversation List */}
        <div className="border-r border-gray-200 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <input type="text" placeholder="Search conversations..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="divide-y divide-gray-100">
            {conversations.map((c) => (
              <div key={c.id} className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${c.id === 1 ? "bg-blue-50" : "hover:bg-gray-50"}`}>
                <div className="relative shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${c.channelColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate">{c.name}</span>
                    <span className="text-xs text-gray-400 shrink-0">{c.time}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate mt-0.5">{c.lastMsg}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{c.channel}</span>
                    <span className={`text-xs ${sentimentColor[c.sentiment]}`}>●</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${statusColor[c.status]}`}>{c.status}</span>
                  </div>
                </div>
                {c.unread > 0 && (
                  <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-medium text-white shrink-0">
                    {c.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Conversation */}
        <div className="flex flex-col border-r border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">SC</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">Sarah Chen</div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  WhatsApp
                </span>
                <span>·</span>
                <span className="text-amber-500">Frustrated</span>
              </div>
            </div>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">Assign</button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                <div className="text-sm text-gray-900">Hi, I can&apos;t access my account after resetting my password. I keep getting an error message.</div>
                <div className="text-xs text-gray-400 mt-1">10:30 AM</div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                <div className="flex items-center gap-1.5 text-xs text-blue-200 mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                  AI Resolution Agent
                </div>
                <div className="text-sm">I understand you&apos;re having trouble. Could you confirm the email address on your account so I can look into this?</div>
                <div className="text-xs text-blue-300 mt-1">10:30 AM · QA ✓</div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                <div className="text-sm text-gray-900">Yes, it&apos;s sarah.chen@example.com</div>
                <div className="text-xs text-gray-400 mt-1">10:32 AM</div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                <div className="flex items-center gap-1.5 text-xs text-blue-200 mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                  AI Resolution Agent
                </div>
                <div className="text-sm">Found your account. Sending a fresh password reset link now. Please check your inbox in the next 2 minutes.</div>
                <div className="text-xs text-blue-300 mt-1">10:32 AM · QA ✓</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 p-4">
            <div className="flex gap-2">
              <input type="text" placeholder="Type a message..." className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">Send</button>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Insights */}
        <div className="overflow-y-auto p-5 space-y-6">
          {/* Customer Info */}
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Customer</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">SC</div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Sarah Chen</div>
                <div className="text-xs text-gray-500">sarah.chen@example.com</div>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between"><span className="text-gray-400">Company</span><span>Acme Corp</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Segment</span><span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-xs">Enterprise</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Total Tickets</span><span>12</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Lifetime Value</span><span>$24,500</span></div>
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">AI Insights</div>
            <div className="space-y-2.5">
              <div className="rounded-lg bg-amber-50 border border-amber-100 p-3">
                <div className="flex items-center gap-2 text-sm">
                  <span>😊</span>
                  <span className="font-medium text-amber-700">Sentiment: Frustrated</span>
                </div>
                <div className="text-xs text-amber-600 mt-1">Score: −0.3 · Trend: Declining</div>
              </div>
              <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                <div className="text-sm font-medium text-blue-700">Intent: Account Access</div>
                <div className="text-xs text-blue-600 mt-1">Category: Technical · Priority: High</div>
              </div>
              <div className="rounded-lg bg-green-50 border border-green-100 p-3">
                <div className="text-sm font-medium text-green-700">Confidence: 94%</div>
                <div className="text-xs text-green-600 mt-1">Auto-resolvable: Yes</div>
              </div>
            </div>
          </div>

          {/* Suggested Actions */}
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Suggested Actions</div>
            <div className="space-y-2">
              <button className="w-full text-left rounded-lg border border-gray-200 bg-white p-3 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
                🔑 Send password reset link
              </button>
              <button className="w-full text-left rounded-lg border border-gray-200 bg-white p-3 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
                📋 View account history
              </button>
              <button className="w-full text-left rounded-lg border border-gray-200 bg-white p-3 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
                📞 Escalate to senior agent
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Related Articles</div>
            <div className="space-y-2">
              <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer transition">
                <div className="text-sm font-medium text-gray-900">How to Reset Your Password</div>
                <div className="text-xs text-green-600 mt-1">92% relevance · Used 342 times by AI</div>
              </div>
              <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer transition">
                <div className="text-sm font-medium text-gray-900">Two-Factor Auth Issues</div>
                <div className="text-xs text-green-600 mt-1">78% relevance · Used 198 times by AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
