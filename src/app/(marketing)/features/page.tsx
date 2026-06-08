import Link from "next/link";

const coreFeatures = [
  { title: "7 AI Agents", description: "Intake, Knowledge, Resolution, QA, Escalation, Sentiment, and Analytics agents working in concert.", icon: "🤖", color: "from-blue-500 to-cyan-500", stat: "56%", statLabel: "Auto-resolution rate" },
  { title: "6 Channels Unified", description: "Website chat, WhatsApp, Email, SMS, Facebook Messenger, and Instagram DM — all in one inbox.", icon: "📡", color: "from-purple-500 to-fuchsia-500", stat: "1", statLabel: "Unified inbox" },
  { title: "Auto-Resolution", description: "AI resolves 40-60% of tickets autonomously with QA-verified responses before anyone touches them.", icon: "⚡", color: "from-green-500 to-emerald-500", stat: "40-60%", statLabel: "Tickets resolved" },
  { title: "SLA Breach Prevention", description: "Proactive monitoring with real-time alerts and auto-escalation before deadlines are missed.", icon: "🛡️", color: "from-amber-500 to-orange-500", stat: "91%", statLabel: "SLA compliance" },
  { title: "RAG Knowledge Base", description: "Self-learning knowledge base with semantic search, embeddings, and AI-powered article retrieval.", icon: "📚", color: "from-red-500 to-rose-500", stat: "93%", statLabel: "Search accuracy" },
  { title: "AI Copilot for Agents", description: "Real-time suggested replies, contextual insights, and sentiment tracking for every conversation.", icon: "💡", color: "from-cyan-500 to-blue-500", stat: "3x", statLabel: "Faster responses" },
];

const platformFeatures = [
  { title: "Multi-Tenant RBAC", desc: "Super Admin, Admin, Manager, Agent, Viewer roles with granular permissions", icon: "🔐" },
  { title: "Real-Time Analytics", desc: "Live dashboards with AI forecasting, anomaly detection, and automated insights", icon: "📊" },
  { title: "SLA Management", desc: "Configurable SLA policies with proactive monitoring and breach prevention", icon: "⏱️" },
  { title: "Customer 360°", desc: "Complete customer profiles with history, sentiment trends, and lifetime value", icon: "👤" },
  { title: "Workflow Automation", desc: "Event-driven automation engine with triggers, conditions, and actions", icon: "⚙️" },
  { title: "Enterprise Security", desc: "SOC 2 compliant, GDPR ready, encrypted at rest and in transit", icon: "🛡️" },
];

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700">Platform</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance">Everything You Need</h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">A complete customer support operating system — not just another ticketing tool.</p>
          </div>
        </div>
      </section>

      {/* Core Features with Infographics */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-200 bg-white p-7 card-glow group">
                <div className="flex items-start justify-between mb-5">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>{f.icon}</div>
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
      <section className="py-20 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Platform Capabilities</h2>
            <p className="mt-4 text-lg text-gray-600">Built for scale, security, and reliability</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200 card-glow">
                <div className="text-2xl mt-0.5">{f.icon}</div>
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
          <div className="rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden">
            {/* Architecture SVG Infographic */}
            <svg viewBox="0 0 800 400" className="w-full h-auto" fill="none">
              {/* Background */}
              <rect x="0" y="0" width="800" height="400" fill="#f8fafc" rx="12" />

              {/* Channels Layer */}
              <rect x="20" y="20" width="760" height="80" fill="#eff6ff" rx="8" stroke="#bfdbfe" strokeWidth="1" />
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
              <rect x="20" y="135" width="760" height="110" fill="#f0fdf4" rx="8" stroke="#bbf7d0" strokeWidth="1" />
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
        <div className="mx-auto max-w-4xl text-center px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">See It In Action</h2>
          <p className="mt-4 text-lg text-blue-100">Experience the full platform with your team.</p>
          <div className="mt-8">
            <Link href="/login" className="inline-flex rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-2xl hover:-translate-y-0.5 transition-all">
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
