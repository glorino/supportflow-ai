import Link from "next/link";

const channels = [
  { name: "Web Chat", icon: "💬", desc: "Embeddable widget for your website", color: "from-blue-500 to-blue-600", stats: { volume: "24%", resolution: "72%", satisfaction: "4.8" }, features: ["Custom branding", "Pre-chat forms", "File attachments", "Co-browsing"] },
  { name: "WhatsApp", icon: "📱", desc: "Business API integration", color: "from-green-500 to-green-600", stats: { volume: "28%", resolution: "68%", satisfaction: "4.7" }, features: ["Templates", "Media messages", "Quick replies", "Catalogs"] },
  { name: "Email", icon: "📧", desc: "IMAP/SMTP with auto-routing", color: "from-purple-500 to-purple-600", stats: { volume: "23%", resolution: "54%", satisfaction: "4.5" }, features: ["Auto-routing", "Thread management", "Templates", "Tracking"] },
  { name: "SMS", icon: "💬", desc: "Twilio-powered text messaging", color: "from-amber-500 to-amber-600", stats: { volume: "13%", resolution: "61%", satisfaction: "4.6" }, features: ["Two-way SMS", "Broadcasts", "Scheduled", "Keywords"] },
  { name: "Messenger", icon: "💬", desc: "Facebook Messenger integration", color: "from-blue-400 to-blue-500", stats: { volume: "9%", resolution: "65%", satisfaction: "4.4" }, features: ["Bots", "Cards", "Quick replies", "Handoff"] },
  { name: "Instagram", icon: "📸", desc: "Instagram DM support", color: "from-pink-500 to-pink-600", stats: { volume: "7%", resolution: "58%", satisfaction: "4.5" }, features: ["Story replies", "Media support", "Labels", "Auto-replies"] },
];

export default function ChannelsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-blue-300">Omnichannel</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">One Inbox, Every Channel</h1>
            <p className="mt-5 text-lg text-gray-400 leading-relaxed">Connect all your support channels. Customers reach you however they prefer — you respond from one unified workspace.</p>
          </div>
        </div>
      </section>

      {/* Channel Distribution Infographic */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-900 mb-8 text-center">Channel Distribution Overview</h3>
            <svg viewBox="0 0 800 300" className="w-full h-auto" fill="none">
              <rect x="0" y="0" width="800" height="300" fill="#f8fafc" rx="12" />

              {/* Central Inbox */}
              <circle cx="400" cy="150" r="60" fill="#3b82f6" opacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="400" cy="150" r="40" fill="#3b82f6" />
              <text x="400" y="146" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">UNIFIED</text>
              <text x="400" y="162" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">INBOX</text>

              {/* Channel Nodes */}
              {[
                { name: "Web Chat", x: 100, y: 60, color: "#3b82f6", pct: "24%" },
                { name: "WhatsApp", x: 700, y: 60, color: "#22c55e", pct: "28%" },
                { name: "Email", x: 100, y: 240, color: "#8b5cf6", pct: "23%" },
                { name: "SMS", x: 700, y: 240, color: "#f59e0b", pct: "13%" },
                { name: "Messenger", x: 250, y: 30, color: "#60a5fa", pct: "9%" },
                { name: "Instagram", x: 550, y: 30, color: "#ec4899", pct: "7%" },
              ].map((ch) => (
                <g key={ch.name}>
                  <line x1={ch.x} y1={ch.y} x2="400" y2="150" stroke={ch.color} strokeWidth="2" opacity="0.3" strokeDasharray="6" />
                  <circle cx={ch.x} cy={ch.y} r="30" fill="white" stroke={ch.color} strokeWidth="2" />
                  <text x={ch.x} y={ch.y + 4} textAnchor="middle" fill={ch.color} fontSize="10" fontWeight="700">{ch.pct}</text>
                  <text x={ch.x} y={ch.y + 48} textAnchor="middle" fill="#374151" fontSize="11" fontWeight="600">{ch.name}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* Channel Cards */}
      <section className="py-20 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Connect Every Channel</h2>
            <p className="mt-4 text-lg text-gray-600">Each channel comes with full AI support</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((ch) => (
              <div key={ch.name} className="rounded-2xl border border-gray-200 bg-white p-7 card-glow group">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${ch.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>{ch.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{ch.name}</div>
                    <div className="text-sm text-gray-500">{ch.desc}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5 p-3 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{ch.stats.volume}</div>
                    <div className="text-[9px] text-gray-500 font-medium">Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{ch.stats.resolution}</div>
                    <div className="text-[9px] text-gray-500 font-medium">Resolution</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{ch.stats.satisfaction}</div>
                    <div className="text-[9px] text-gray-500 font-medium">CSAT</div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5">
                  {ch.features.map((f) => (
                    <span key={f} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inbox Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-900 mb-8 text-center">Unified Inbox Experience</h3>
            <svg viewBox="0 0 800 350" className="w-full h-auto" fill="none">
              <rect x="0" y="0" width="800" height="350" fill="#111827" rx="12" />

              {/* Window Chrome */}
              <rect x="0" y="0" width="800" height="30" fill="#1f2937" rx="12" />
              <circle cx="20" cy="15" r="5" fill="#ef4444" />
              <circle cx="38" cy="15" r="5" fill="#eab308" />
              <circle cx="56" cy="15" r="5" fill="#22c55e" />
              <text x="400" y="19" textAnchor="middle" fill="#9ca3af" fontSize="10">Unified Inbox — All Channels</text>

              {/* Channel Sidebar */}
              <rect x="0" y="30" width="140" height="320" fill="#1f2937" />
              {["📥 All Channels", "📱 WhatsApp", "📧 Email", "💬 Web Chat", "💬 SMS", "📸 Instagram"].map((ch, i) => (
                <g key={ch}>
                  <rect x="8" y={45 + i * 40} width="124" height="32" fill={i === 0 ? "#3b82f6" : "transparent"} rx="6" />
                  <text x="20" y={66 + i * 40} fill={i === 0 ? "white" : "#9ca3af"} fontSize="10">{ch}</text>
                </g>
              ))}

              {/* Conversation List */}
              <rect x="140" y="30" width="220" height="320" fill="#111827" />
              <text x="155" y="55" fill="#6b7280" fontSize="10" fontWeight="600">CONVERSATIONS</text>
              {[
                { name: "Sarah Chen", msg: "Can't access my account", ch: "📱", time: "2m", active: true },
                { name: "TechStart Inc", msg: "API returning 500 errors", ch: "📧", time: "15m", active: false },
                { name: "Emily Rodriguez", msg: "How to integrate?", ch: "💬", time: "1h", active: false },
                { name: "James Park", msg: "Billing discrepancy", ch: "💬", time: "3h", active: false },
                { name: "Lisa Wang", msg: "Feature request", ch: "💬", time: "4h", active: false },
              ].map((c, i) => (
                <g key={c.name}>
                  <rect x="148" y={68 + i * 52} width="204" height="44" fill={c.active ? "#1e3a5f" : "transparent"} rx="6" />
                  <text x="160" y={86 + i * 52} fill="white" fontSize="10" fontWeight="600">{c.name}</text>
                  <text x="160" y={100 + i * 52} fill="#6b7280" fontSize="8">{c.ch} {c.msg}</text>
                  <text x="340" y={86 + i * 52} fill="#4b5563" fontSize="8">{c.time}</text>
                </g>
              ))}

              {/* Chat Area */}
              <rect x="360" y="30" width="260" height="320" fill="#0f172a" />
              <rect x="360" y="30" width="260" height="40" fill="#1e293b" />
              <circle cx="385" cy="50" r="12" fill="#22c55e" opacity="0.2" />
              <text x="385" y="54" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">SC</text>
              <text x="405" y="47" fill="white" fontSize="10" fontWeight="600">Sarah Chen</text>
              <text x="405" y="60" fill="#6b7280" fontSize="8">via WhatsApp</text>

              {/* Messages */}
              <rect x="375" y="85" width="180" height="40" fill="#1e293b" rx="8" />
              <text x="385" y="102" fill="#d1d5db" fontSize="9">I can't access my account</text>
              <text x="385" y="116" fill="#4b5563" fontSize="7">10:30 AM</text>

              <rect x="420" y="140" width="185" height="50" fill="#2563eb" rx="8" />
              <text x="430" y="157" fill="#93c5fd" fontSize="7">AI Resolution Agent</text>
              <text x="430" y="172" fill="white" fontSize="8">I found your account. Sending</text>
              <text x="430" y="183" fill="white" fontSize="8">a fresh reset link now.</text>

              {/* AI Panel */}
              <rect x="620" y="30" width="180" height="320" fill="#111827" />
              <text x="635" y="55" fill="#6b7280" fontSize="10" fontWeight="600">AI INSIGHTS</text>
              {[
                { label: "Sentiment", value: "Frustrated", color: "#f59e0b" },
                { label: "Intent", value: "Account Access", color: "#3b82f6" },
                { label: "Priority", value: "High", color: "#ef4444" },
                { label: "Confidence", value: "94%", color: "#22c55e" },
              ].map((item, i) => (
                <g key={item.label}>
                  <text x="635" y={80 + i * 30} fill="#6b7280" fontSize="9">{item.label}</text>
                  <text x="635" y={95 + i * 30} fill={item.color} fontSize="10" fontWeight="600">{item.value}</text>
                </g>
              ))}

              <text x="635" y="210" fill="#6b7280" fontSize="10" fontWeight="600">ACTIONS</text>
              {["🔑 Send reset link", "📋 View history", "📞 Request call"].map((a, i) => (
                <g key={a}>
                  <rect x="630" y={220 + i * 32} width="155" height="26" fill="#1e293b" rx="6" />
                  <text x="645" y={237 + i * 32} fill="#d1d5db" fontSize="9">{a}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Connect All Your Channels</h2>
          <p className="mt-4 text-lg text-gray-400">Start unifying your support experience today.</p>
          <div className="mt-8">
            <Link href="/login" className="inline-flex rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-2xl hover:-translate-y-0.5 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
