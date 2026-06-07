import Link from "next/link";

const features = [
  {
    title: "7 AI Agents",
    description:
      "Intake, Knowledge, Resolution, QA, Escalation, Sentiment, and Analytics agents working in concert.",
    icon: "🤖",
  },
  {
    title: "6 Channels",
    description:
      "Website chat, WhatsApp, Email, SMS, Facebook Messenger, and Instagram DM — unified.",
    icon: "📡",
  },
  {
    title: "Auto-Resolution",
    description:
      "AI resolves 40-60% of tickets autonomously with QA-verified responses.",
    icon: "⚡",
  },
  {
    title: "SLA Prevention",
    description:
      "Proactive breach prevention with real-time monitoring and auto-escalation.",
    icon: "🛡️",
  },
  {
    title: "RAG Knowledge",
    description:
      "Self-learning knowledge base with semantic search and AI-powered retrieval.",
    icon: "📚",
  },
  {
    title: "Real-time Copilot",
    description:
      "AI-assisted agent workspace with suggested replies and contextual insights.",
    icon: "💡",
  },
];

const metrics = [
  { value: "<800ms", label: "AI Response Time" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "50M+", label: "Messages / Day" },
  { value: "1M+", label: "Scalable Users" },
];

const channels = [
  "Web Chat",
  "WhatsApp",
  "Email",
  "SMS",
  "Messenger",
  "Instagram",
];

const agents = [
  { name: "Intake", role: "Classifies & routes", color: "bg-blue-500" },
  { name: "Knowledge", role: "Retrieves articles", color: "bg-purple-500" },
  { name: "Resolution", role: "Generates replies", color: "bg-green-500" },
  { name: "QA", role: "Reviews quality", color: "bg-amber-500" },
  { name: "Escalation", role: "Routes to humans", color: "bg-red-500" },
  { name: "Sentiment", role: "Tracks emotion", color: "bg-pink-500" },
  { name: "Analytics", role: "Generates insights", color: "bg-cyan-500" },
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
              <a
                href="#features"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Features
              </a>
              <a
                href="#agents"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                AI Agents
              </a>
              <a
                href="#channels"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Channels
              </a>
              <a
                href="https://github.com/glorino/supportflow-ai"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm text-blue-700">
            <span className="mr-2 h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            Now in Public Beta
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 text-balance">
            The AI-Powered{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Customer Support
            </span>{" "}
            Operating System
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Unify every support channel with 7 intelligent AI agents that
            classify, route, respond, and resolve — while your human agents focus
            on what matters most.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:shadow-xl transition-all"
            >
              Start Free Trial
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              View Demo Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {m.value}
                </div>
                <div className="mt-1 text-sm text-gray-500">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Pipeline */}
      <section id="agents" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              7-Agent AI Architecture
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Each agent specializes in a task. Together they form an autonomous
              pipeline that handles your support end-to-end.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {agents.map((a, i) => (
              <div
                key={a.name}
                className="relative flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`h-10 w-10 rounded-lg ${a.color} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{a.name}</div>
                  <div className="text-sm text-gray-500">{a.role}</div>
                </div>
                {i < agents.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center text-sm text-gray-400">
            Intake → Knowledge → Resolution → QA → (Escalation if needed)
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A complete customer support operating system, not just another
              ticketing tool.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section id="channels" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              One Inbox, Every Channel
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Connect all your support channels. Customers reach you however they
              prefer — you respond from one place.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {channels.map((ch) => (
              <div
                key={ch}
                className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all cursor-default"
              >
                {ch}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ready to Transform Support?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start your free trial. No credit card required. Deploy in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all"
            >
              Get Started Free
            </Link>
            <Link
              href="https://github.com/glorino/supportflow-ai"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              View on GitHub
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
              <a href="#features" className="hover:text-gray-700 transition">
                Features
              </a>
              <a href="#agents" className="hover:text-gray-700 transition">
                Agents
              </a>
              <a
                href="https://github.com/glorino/supportflow-ai"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-700 transition"
              >
                GitHub
              </a>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} SupportFlow AI
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
