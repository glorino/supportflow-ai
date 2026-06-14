import Link from "next/link";

const messages = [
  { id: 1, sender: "customer", name: "Sarah Chen", content: "Hi, I can't access my account after resetting my password. I keep getting an error message.", time: "10:30 AM", channel: "WhatsApp" },
  { id: 2, sender: "ai", name: "AI Agent", content: "I understand you're having trouble accessing your account. Let me help you with that. Could you please confirm the email address associated with your account?", time: "10:30 AM" },
  { id: 3, sender: "customer", name: "Sarah Chen", content: "Yes, it's sarah.chen@example.com", time: "10:32 AM" },
  { id: 4, sender: "ai", name: "AI Agent", content: "Thank you, Sarah. I've found your account. It looks like there might be a caching issue. Please try these steps:\n\n1. Clear your browser cache\n2. Try logging in with the new password\n3. If that doesn't work, I can send a password reset link\n\nWould you like me to send a fresh reset link?", time: "10:32 AM" },
  { id: 5, sender: "customer", name: "Sarah Chen", content: "I already tried clearing the cache. Can you send a new reset link?", time: "10:35 AM" },
];

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/tickets" className="text-gray-400 hover:text-gray-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Ticket SSV-{params.id}</h1>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">open</span>
        <span className="text-sm text-orange-600 font-semibold">high</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-6 py-4">
              <h2 className="font-semibold text-gray-900">Conversation</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto p-6 space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "customer" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-lg rounded-xl px-4 py-3 ${
                    m.sender === "customer"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-blue-600 text-white"
                  }`}>
                    <div className="text-xs opacity-70 mb-1">{m.name} · {m.time}</div>
                    <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Customer</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">SC</div>
              <div>
                <div className="font-medium text-gray-900">Sarah Chen</div>
                <div className="text-sm text-gray-500">sarah.chen@example.com</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              <div>Company: Acme Corp</div>
              <div>Segment: Enterprise</div>
              <div>Total tickets: 12</div>
            </div>
          </div>

          {/* Properties */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Properties</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-medium">Open</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Priority</span><span className="font-medium text-orange-600">High</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Channel</span><span className="font-medium">WhatsApp</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Assignee</span><span className="font-medium">Alex Kim</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="font-medium">Account Access</span></div>
            </div>
          </div>

          {/* SLA */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-3">SLA Status</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">First Response</span>
                  <span className="font-medium text-green-600">Achieved</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Resolution</span>
                  <span className="font-medium text-amber-600">23m remaining</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
