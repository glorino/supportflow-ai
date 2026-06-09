import Link from "next/link";

const coreFeatures = [
  { title: "7 AI Agents", description: "Intake, Knowledge, Resolution, QA, Escalation, Sentiment, and Analytics agents working in concert.", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "from-blue-500 to-cyan-500", bgClass: "card-premium-blue", stat: "56%", statLabel: "Auto-resolution rate" },
  { title: "6 Channels Unified", description: "Website chat, WhatsApp, Email, SMS, Facebook Messenger, and Instagram DM — all in one inbox.", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", color: "from-purple-500 to-fuchsia-500", bgClass: "card-premium-purple", stat: "1", statLabel: "Unified inbox" },
  { title: "Auto-Resolution", description: "AI resolves 40-60% of tickets autonomously with QA-verified responses before anyone touches them.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "from-green-500 to-emerald-500", bgClass: "card-premium-green", stat: "40-60%", statLabel: "Tickets resolved" },
  { title: "SLA Breach Prevention", description: "Proactive monitoring with real-time alerts and auto-escalation before deadlines are missed.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "from-amber-500 to-orange-500", bgClass: "card-premium-amber", stat: "91%", statLabel: "SLA compliance" },
  { title: "RAG Knowledge Base", description: "Self-learning knowledge base with semantic search, embeddings, and AI-powered article retrieval.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "from-red-500 to-rose-500", bgClass: "card-premium-red", stat: "93%", statLabel: "Search accuracy" },
  { title: "AI Copilot for Agents", description: "Real-time suggested replies, contextual insights, and sentiment tracking for every conversation.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", color: "from-cyan-500 to-blue-500", bgClass: "card-premium-cyan", stat: "3x", statLabel: "Faster responses" },
];

const platformFeatures = [
  { title: "Multi-Tenant RBAC", desc: "Super Admin, Admin, Manager, Agent, Viewer roles with granular permissions", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { title: "Real-Time Analytics", desc: "Live dashboards with AI forecasting, anomaly detection, and automated insights", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { title: "SLA Management", desc: "Configurable SLA policies with proactive monitoring and breach prevention", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Customer 360°", desc: "Complete customer profiles with history, sentiment trends, and lifetime value", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { title: "Workflow Automation", desc: "Event-driven automation engine with triggers, conditions, and actions", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { title: "Enterprise Security", desc: "SOC 2 compliant, GDPR ready, encrypted at rest and in transit", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

export default function FeaturesPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 px-4 py-1.5 text-xs font-semibold text-green-700">Platform</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance">Everything You Need</h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">A complete customer support operating system — not just another ticketing tool.</p>
          </div>
        </div>
      </section>

      {/* Core Features with Infographics */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((f) => (
              <div key={f.title} className={`rounded-2xl border p-7 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${f.bgClass}`}>
                <div className="flex items-start justify-between mb-5">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{f.stat}</div>
                    <div className="text-[10px] text-gray-500 font-medium">{f.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Infographic */}
      <section className="py-20 bg-gradient-to-b from-gray-50/80 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Platform Capabilities</h2>
            <p className="mt-4 text-lg text-gray-600">Built for scale, security, and reliability</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {platformFeatures.map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200/80 card-glow hover:shadow-lg group transition-all duration-300">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">System Architecture</h2>
            <p className="mt-4 text-lg text-gray-600">Built on modern, scalable infrastructure</p>
          </div>
          <div className="rounded-2xl border border-gray-200/80 bg-white p-8 overflow-hidden shadow-lg shadow-gray-200/50">
            <svg viewBox="0 0 800 400" className="w-full h-auto" fill="none">
              <rect x="0" y="0" width="800" height="400" fill="#f8fafc" rx="12" />
              {/* Channels Layer */}
              <rect x="20" y="20" width="760" height="80" fill="url(#channelGrad)" rx="8" stroke="#93c5fd" strokeWidth="1" />
              <defs>
                <linearGradient id="channelGrad" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#eff6ff" />
                  <stop offset="1" stopColor="#f0f9ff" />
                </linearGradient>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f0fdf4" />
                  <stop offset="1" stopColor="#ecfdf5" />
                </linearGradient>
              </defs>
              <text x="400" y="45" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="600">CHANNELS</text>
              {["💬 Web", "📱 WhatsApp", "📧 Email", "💬 SMS", "💬 Messenger", "📸 Instagram"].map((ch, i) => (
                <g key={ch}>
                  <rect x={40 + i * 120} y="55" width="100" height="35" fill="white" rx="6" stroke="#93c5fd" strokeWidth="1" />
                  <text x={90 + i * 120} y="77" textAnchor="middle" fill="#374151" fontSize="10">{ch}</text>
                </g>
              ))}
              {/* Arrow down */}
              <line x1="400" y1="100" x2="400" y2="130" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
              <polygon points="395,128 405,128 400,135" fill="#94a3b8" />
              {/* AI Pipeline Layer */}
              <rect x="20" y="135" width="760" height="110" fill="url(#aiGrad)" rx="8" stroke="#86efac" strokeWidth="1" />
              <text x="400" y="155" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="600">AI AGENT PIPELINE</text>
              {["1. Intake", "2. Knowledge", "3. Resolution", "4. QA"].map((step, i) => (
                <g key={step}>
                  <rect x={40 + i * 190} y="165" width="170" height="65" fill="white" rx="8" stroke="#86efac" strokeWidth="1" />
                  <text x={125 + i * 190} y="192" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="600">{step}</text>
                  <text x={125 + i * 190} y="210" textAnchor="middle" fill="#6b7280" fontSize="9">{["Classify & Route", "RAG Retrieval", "Generate Reply", "Verify Quality"][i]}</text>
                  {i < 3 && <text x={215 + i * 190} y="200" fill="#94a3b8" fontSize="16">→</text>}
                </g>
              ))}
              {/* Arrow down */}
              <line x1="400" y1="245" x2="400" y2="275" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
              <polygon points="395,273 405,273 400,280" fill="#94a3b8" />
              {/* Data Layer */}
              <rect x="20" y="280" width="370" height="100" fill="#fefce8" rx="8" stroke="#fde68a" strokeWidth="1" />
              <text x="205" y="300" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="600">DATA LAYER</text>
              {["Neon PostgreSQL", "Vector Embeddings", "Session Store"].map((db, i) => (
                <g key={db}>
                  <rect x={40 + i * 115} y="310" width="100" height="55" fill="white" rx="6" stroke="#fbbf24" strokeWidth="1" />
                  <text x={90 + i * 115} y="342" textAnchor="middle" fill="#713f12" fontSize="9">{db}</text>
                </g>
              ))}
              {/* Infrastructure Layer */}
              <rect x="410" y="280" width="370" height="100" fill="#fdf2f8" rx="8" stroke="#fbcfe8" strokeWidth="1" />
              <text x="595" y="300" textAnchor="middle" fill="#9d174d" fontSize="12" fontWeight="600">INFRASTRUCTURE</text>
              {["Vercel Edge", "Pusher Realtime", "Trigger.dev Jobs"].map((infra, i) => (
                <g key={infra}>
                  <rect x={430 + i * 115} y="310" width="100" height="55" fill="white" rx="6" stroke="#f472b6" strokeWidth="1" />
                  <text x={480 + i * 115} y="342" textAnchor="middle" fill="#831843" fontSize="9">{infra}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="mx-auto max-w-4xl text-center px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">See It In Action</h2>
          <p className="mt-4 text-lg text-blue-100">Experience the full platform with your team.</p>
          <div className="mt-8">
            <Link href="/login" className="inline-flex rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-2xl hover:shadow-3xl hover:-translate-y-0.5 transition-all duration-300">
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
