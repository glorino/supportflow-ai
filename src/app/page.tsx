import Link from "next/link";

const features = [
  {
    title: "7 AI Agents",
    description:
      "Intake, Knowledge, Resolution, QA, Escalation, Sentiment, and Analytics agents working in concert.",
    icon: "🤖",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "6 Channels Unified",
    description:
      "Website chat, WhatsApp, Email, SMS, Facebook Messenger, and Instagram DM — all in one inbox.",
    icon: "📡",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Auto-Resolution",
    description:
      "AI resolves 40-60% of tickets autonomously with QA-verified responses before anyone touches them.",
    icon: "⚡",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "SLA Breach Prevention",
    description:
      "Proactive monitoring with real-time alerts and auto-escalation before deadlines are missed.",
    icon: "🛡️",
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "RAG Knowledge Base",
    description:
      "Self-learning knowledge base with semantic search, embeddings, and AI-powered article retrieval.",
    icon: "📚",
    color: "bg-red-50 text-red-600",
  },
  {
    title: "AI Copilot for Agents",
    description:
      "Real-time suggested replies, contextual insights, and sentiment tracking for every conversation.",
    icon: "💡",
    color: "bg-cyan-50 text-cyan-600",
  },
];

const metrics = [
  { value: "<800ms", label: "AI Response Time" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "50M+", label: "Messages / Day" },
  { value: "1M+", label: "Scalable Users" },
];

const channels = [
  { name: "Web Chat", icon: "💬", desc: "Embeddable widget for your website", color: "bg-blue-500" },
  { name: "WhatsApp", icon: "📱", desc: "Business API integration", color: "bg-green-500" },
  { name: "Email", icon: "📧", desc: "IMAP/SMTP with auto-routing", color: "bg-purple-500" },
  { name: "SMS", icon: "💬", desc: "Twilio-powered text messaging", color: "bg-amber-500" },
  { name: "Messenger", icon: "💬", desc: "Facebook Messenger integration", color: "bg-blue-400" },
  { name: "Instagram", icon: "📸", desc: "Instagram DM support", color: "bg-pink-500" },
];

const agents = [
  { name: "Intake", role: "Classifies & routes incoming messages", color: "bg-blue-500", detail: "Intent detection, priority assignment, entity extraction" },
  { name: "Knowledge", role: "Retrieves relevant articles via RAG", color: "bg-purple-500", detail: "Semantic search, hybrid retrieval, context synthesis" },
  { name: "Resolution", role: "Generates contextual responses", color: "bg-green-500", detail: "Auto-reply, suggested drafts, action execution" },
  { name: "QA", role: "Reviews responses for quality", color: "bg-amber-500", detail: "Factual accuracy, tone check, compliance validation" },
  { name: "Escalation", role: "Routes to the right human agent", color: "bg-red-500", detail: "Skill matching, load balancing, VIP routing" },
  { name: "Sentiment", role: "Tracks customer emotion in real-time", color: "bg-pink-500", detail: "Trend detection, alert triggers, satisfaction tracking" },
  { name: "Analytics", role: "Generates insights and forecasts", color: "bg-cyan-500", detail: "Trend analysis, anomaly detection, capacity planning" },
];

const workflows = [
  { step: "1", title: "Message Arrives", desc: "Customer sends a message from any channel", icon: "📨" },
  { step: "2", title: "AI Classifies", desc: "Intake agent detects intent, priority, and sentiment", icon: "🔍" },
  { step: "3", title: "Knowledge Retrieved", desc: "RAG pipeline finds relevant articles and context", icon: "📚" },
  { step: "4", title: "Response Generated", desc: "Resolution agent drafts a contextual reply", icon: "✍️" },
  { step: "5", title: "Quality Verified", desc: "QA agent checks accuracy, tone, and compliance", icon: "✅" },
  { step: "6", title: "Sent to Customer", desc: "Approved response delivered via original channel", icon: "📤" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Head of Support, Acme Corp", text: "SupportFlow AI cut our response time by 73% and our team can focus on complex issues instead of repetitive questions.", avatar: "SC" },
  { name: "Marcus Johnson", role: "VP Operations, TechStart", text: "The AI auto-resolution rate of 56% means our agents handle the issues that actually need human judgment.", avatar: "MJ" },
  { name: "Emily Rodriguez", role: "CX Director, Design Studio", text: "Unified inbox across WhatsApp, email, and chat changed everything. No more switching between 5 different tools.", avatar: "ER" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                SupportFlow<span className="text-blue-600"> AI</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#agents" className="text-sm text-gray-600 hover:text-gray-900 transition">AI Agents</a>
              <a href="#channels" className="text-sm text-gray-600 hover:text-gray-900 transition">Channels</a>
              <a href="#workflow" className="text-sm text-gray-600 hover:text-gray-900 transition">How it Works</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30" />
        <div className="mx-auto max-w-6xl text-center relative">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm text-blue-700">
            <span className="mr-2 h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            AI-Powered Customer Support OS
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 text-balance leading-tight">
            Your Support Team,{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Supercharged by AI
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
            Unify every support channel into one intelligent workspace. 7 AI agents classify, route, respond, and resolve — while your team focuses on what matters.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:shadow-xl transition-all">
              Access Your Dashboard
            </Link>
            <a href="#workflow" className="rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all">
              See How It Works ↓
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> SOC 2 Compliant</div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> GDPR Ready</div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> 99.99% Uptime</div>
          </div>

          {/* Hero Illustration - Dashboard Mockup */}
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-blue-600/10 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-4 flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 max-w-lg">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span className="text-xs text-gray-500">app.supportflow.ai/dashboard</span>
                </div>
              </div>
              {/* Dashboard content mockup */}
              <div className="flex h-[340px]">
                {/* Sidebar mock */}
                <div className="hidden md:flex w-48 border-r border-gray-100 p-3 flex-col gap-1.5">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-blue-50">
                    <div className="h-4 w-4 rounded bg-blue-600" />
                    <span className="text-[10px] font-medium text-blue-700">Dashboard</span>
                  </div>
                  {["Inbox", "Tickets", "Customers", "Knowledge", "Analytics", "Settings"].map((item) => (
                    <div key={item} className="flex items-center gap-2 px-2 py-1.5 rounded-lg">
                      <div className="h-3.5 w-3.5 rounded bg-gray-200" />
                      <span className="text-[10px] text-gray-500">{item}</span>
                    </div>
                  ))}
                </div>
                {/* Main content mock */}
                <div className="flex-1 p-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Open Tickets", value: "24", change: "+3", color: "bg-blue-50 border-blue-100 text-blue-700" },
                      { label: "AI Resolved", value: "67%", change: "+5%", color: "bg-green-50 border-green-100 text-green-700" },
                      { label: "Avg Response", value: "1.2m", change: "-18%", color: "bg-purple-50 border-purple-100 text-purple-700" },
                      { label: "CSAT", value: "4.8", change: "+0.2", color: "bg-amber-50 border-amber-100 text-amber-700" },
                    ].map((stat) => (
                      <div key={stat.label} className={`rounded-lg border p-3 ${stat.color.split(" ").slice(0, 2).join(" ")}`}>
                        <div className="text-[9px] text-gray-500 mb-1">{stat.label}</div>
                        <div className="flex items-end justify-between">
                          <span className={`text-lg font-bold ${stat.color.split(" ")[2]}`}>{stat.value}</span>
                          <span className="text-[9px] text-green-600 font-medium">{stat.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Chart mock */}
                  <div className="rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold text-gray-700">Ticket Volume</span>
                      <div className="flex gap-1">
                        <span className="h-1.5 w-6 rounded-full bg-blue-500" />
                        <span className="h-1.5 w-6 rounded-full bg-green-500" />
                      </div>
                    </div>
                    <div className="flex items-end gap-1 h-20">
                      {[40, 55, 35, 65, 50, 70, 45, 80, 60, 75, 55, 65].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col gap-0.5">
                          <div className="rounded-sm bg-green-400 opacity-60" style={{ height: `${h * 0.4}px` }} />
                          <div className="rounded-sm bg-blue-500" style={{ height: `${h * 0.6}px` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Right panel mock */}
                <div className="hidden lg:block w-56 border-l border-gray-100 p-3">
                  <div className="text-[10px] font-semibold text-gray-700 mb-2">Recent Tickets</div>
                  <div className="space-y-2">
                    {[
                      { name: "Sarah C.", msg: "Can't login", status: "Open", sColor: "bg-amber-100 text-amber-700" },
                      { name: "TechStart", msg: "API error 500", status: "Escalated", sColor: "bg-red-100 text-red-700" },
                      { name: "Emily R.", msg: "Integration help", status: "AI Working", sColor: "bg-blue-100 text-blue-700" },
                      { name: "James P.", msg: "Billing issue", status: "Resolved", sColor: "bg-green-100 text-green-700" },
                    ].map((ticket) => (
                      <div key={ticket.name} className="rounded-lg border border-gray-100 p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-medium text-gray-900">{ticket.name}</span>
                          <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${ticket.sColor}`}>{ticket.status}</span>
                        </div>
                        <div className="text-[9px] text-gray-500">{ticket.msg}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Floating AI badge */}
            <div className="relative -mt-4 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 shadow-lg px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-700">AI Agents Active</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-green-600 font-medium">56% auto-resolved today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-gray-100 bg-gray-50/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">{m.value}</div>
                <div className="mt-1 text-sm text-gray-500">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Workflow */}
      <section id="workflow" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 mb-4">How It Works</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">From Message to Resolution in Seconds</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              When a customer reaches out, our AI pipeline takes over — classifying, researching, drafting, and verifying before sending.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {workflows.map((w, i) => (
              <div key={w.step} className="relative text-center">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mb-4">{w.icon}</div>
                <div className="text-xs font-bold text-blue-600 mb-1">Step {w.step}</div>
                <div className="font-semibold text-gray-900 mb-1">{w.title}</div>
                <div className="text-sm text-gray-500">{w.desc}</div>
                {i < workflows.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-3 text-gray-300 text-lg">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Pipeline */}
      <section id="agents" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 mb-4">AI Engine</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">7 Specialized AI Agents</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Each agent is purpose-built for a task. Together they form an autonomous pipeline that handles your entire support operation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {agents.map((a, i) => (
              <div key={a.name} className="relative rounded-xl border border-gray-200 bg-white p-5 hover:shadow-lg hover:border-gray-300 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-xl ${a.color} flex items-center justify-center text-white font-bold text-sm`}>{i + 1}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{a.name} Agent</div>
                    <div className="text-sm text-gray-500">{a.role}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{a.detail}</p>
              </div>
            ))}
            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-5 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-2xl mb-2">🔗</div>
                <div className="text-sm font-medium">Handoff Protocol</div>
                <div className="text-xs">Agents transfer context seamlessly</div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-600">
              <span className="font-mono text-xs text-gray-400">Pipeline:</span>
              <span className="font-medium">Intake</span> → <span className="font-medium">Knowledge</span> → <span className="font-medium">Resolution</span> → <span className="font-medium">QA</span> → <span className="text-green-600 font-medium">Resolve</span>
              <span className="text-gray-300">|</span>
              <span className="text-red-500 font-medium">Escalate if needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 mb-4">Platform</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A complete customer support operating system — not just another ticketing tool.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:border-gray-300 transition-all group">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.color} text-2xl mb-4 group-hover:scale-110 transition-transform`}>{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One Inbox, Every Channel - Full Section */}
      <section id="channels" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-300 mb-4">Omnichannel</div>
            <h2 className="text-3xl sm:text-4xl font-bold">One Inbox, Every Channel</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Connect all your support channels. Customers reach you however they prefer — you respond from one unified workspace.
            </p>
          </div>

          {/* Channel Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {channels.map((ch) => (
              <div key={ch.name} className="rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all group cursor-default">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-lg ${ch.color} flex items-center justify-center text-lg`}>{ch.icon}</div>
                  <div>
                    <div className="font-semibold text-white">{ch.name}</div>
                    <div className="text-xs text-gray-400">{ch.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Connected & Active
                </div>
              </div>
            ))}
          </div>

          {/* Inbox Preview */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/10 px-6 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-4 text-sm text-gray-400">Unified Inbox — All Channels</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* Conversation List */}
              <div className="p-4 space-y-2">
                {[
                  { name: "Sarah Chen", msg: "Can't access my account", channel: "WhatsApp", time: "2m", unread: true, color: "bg-green-500" },
                  { name: "TechStart Inc", msg: "API returning 500 errors", channel: "Email", time: "15m", unread: true, color: "bg-purple-500" },
                  { name: "Emily Rodriguez", msg: "How to integrate?", channel: "Web", time: "1h", unread: false, color: "bg-blue-500" },
                  { name: "James Park", msg: "Billing discrepancy", channel: "SMS", time: "3h", unread: false, color: "bg-amber-500" },
                ].map((c) => (
                  <div key={c.name} className={`flex items-center gap-3 rounded-lg p-3 ${c.unread ? "bg-white/10" : "hover:bg-white/5"} cursor-pointer transition`}>
                    <div className="relative">
                      <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">{c.name[0]}{c.name.split(" ")[1]?.[0]}</div>
                      <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-gray-900 ${c.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white truncate">{c.name}</span>
                        <span className="text-xs text-gray-500">{c.time}</span>
                      </div>
                      <div className="text-xs text-gray-400 truncate">{c.msg}</div>
                    </div>
                    {c.unread && <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                  </div>
                ))}
              </div>

              {/* Active Conversation */}
              <div className="p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-sm text-green-400 font-medium">SC</div>
                  <div>
                    <div className="text-sm font-medium text-white">Sarah Chen</div>
                    <div className="text-xs text-gray-400">via WhatsApp</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-xs text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    AI Processing
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-xl px-4 py-2.5 max-w-[80%]">
                      <div className="text-sm text-white">Hi, I can&apos;t access my account after resetting my password. I keep getting an error.</div>
                      <div className="text-xs text-gray-500 mt-1">10:30 AM</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 rounded-xl px-4 py-2.5 max-w-[80%]">
                      <div className="flex items-center gap-1.5 text-xs text-blue-200 mb-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                        AI Resolution Agent
                      </div>
                      <div className="text-sm text-white">I found your account. Let me send a fresh password reset link to sarah.chen@example.com. Could you confirm this is correct?</div>
                      <div className="text-xs text-blue-300 mt-1">10:30 AM · QA Verified ✓</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <input type="text" placeholder="Type a message..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
                  <button className="bg-blue-600 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">Send</button>
                </div>
              </div>

              {/* AI Insights Panel */}
              <div className="p-4 space-y-4">
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">AI Insights</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Sentiment</span>
                      <span className="text-amber-400 font-medium">Frustrated (−0.3)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Intent</span>
                      <span className="text-white font-medium">Account Access</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Priority</span>
                      <span className="text-orange-400 font-medium">High</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Confidence</span>
                      <span className="text-green-400 font-medium">94%</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Suggested Actions</div>
                  <div className="space-y-2">
                    <button className="w-full text-left bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-sm text-white transition border border-white/10">
                      🔑 Send password reset link
                    </button>
                    <button className="w-full text-left bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-sm text-white transition border border-white/10">
                      📋 View account history
                    </button>
                    <button className="w-full text-left bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-sm text-white transition border border-white/10">
                      📞 Request a call back
                    </button>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Related Articles</div>
                  <div className="space-y-1.5">
                    <div className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer">How to Reset Your Password (92% match)</div>
                    <div className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer">Two-Factor Authentication Issues (78% match)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Trusted by Support Teams</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
                <div className="text-sm text-gray-600 leading-relaxed mb-4">&quot;{t.text}&quot;</div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">{t.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Transform Your Support?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Join teams already using SupportFlow AI to deliver faster, smarter customer support.
          </p>
          <div className="mt-8">
            <Link href="/login" className="inline-flex rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg hover:shadow-xl transition-all hover:bg-blue-50">
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">SF</span>
              </div>
              <span className="font-bold text-gray-900">
                SupportFlow<span className="text-blue-600"> AI</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#features" className="hover:text-gray-700 transition">Features</a>
              <a href="#agents" className="hover:text-gray-700 transition">AI Agents</a>
              <a href="#channels" className="hover:text-gray-700 transition">Channels</a>
              <Link href="/login" className="hover:text-gray-700 transition">Sign In</Link>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} SupportFlow AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
