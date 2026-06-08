import Link from "next/link";

const agents = [
  { name: "Intake", role: "Classifies & routes incoming messages", color: "from-blue-500 to-cyan-500", detail: "Intent detection, priority assignment, entity extraction", stats: { processed: "287", accuracy: "96%", avgTime: "120ms" } },
  { name: "Knowledge", role: "Retrieves relevant articles via RAG", color: "from-purple-500 to-fuchsia-500", detail: "Semantic search, hybrid retrieval, context synthesis", stats: { processed: "456", accuracy: "93%", avgTime: "200ms" } },
  { name: "Resolution", role: "Generates contextual responses", color: "from-green-500 to-emerald-500", detail: "Auto-reply, suggested drafts, action execution", stats: { processed: "189", accuracy: "94%", avgTime: "350ms" } },
  { name: "QA", role: "Reviews responses for quality", color: "from-amber-500 to-orange-500", detail: "Factual accuracy, tone check, compliance validation", stats: { processed: "142", accuracy: "97%", avgTime: "80ms" } },
  { name: "Escalation", role: "Routes to the right human agent", color: "from-red-500 to-rose-500", detail: "Skill matching, load balancing, VIP routing", stats: { processed: "23", accuracy: "91%", avgTime: "150ms" } },
  { name: "Sentiment", role: "Tracks customer emotion in real-time", color: "from-pink-500 to-fuchsia-500", detail: "Trend detection, alert triggers, satisfaction tracking", stats: { processed: "312", accuracy: "88%", avgTime: "50ms" } },
  { name: "Analytics", role: "Generates insights and forecasts", color: "from-cyan-500 to-blue-500", detail: "Trend analysis, anomaly detection, capacity planning", stats: { processed: "89", accuracy: "92%", avgTime: "500ms" } },
];

const pipelineSteps = [
  { step: "1", title: "Message Arrives", desc: "Customer sends a message from any channel", icon: "📨", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { step: "2", title: "AI Classifies", desc: "Intake agent detects intent, priority, and sentiment", icon: "🔍", color: "bg-purple-50 border-purple-200 text-purple-700" },
  { step: "3", title: "Knowledge Retrieved", desc: "RAG pipeline finds relevant articles and context", icon: "📚", color: "bg-green-50 border-green-200 text-green-700" },
  { step: "4", title: "Response Generated", desc: "Resolution agent drafts a contextual reply", icon: "✍️", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { step: "5", title: "Quality Verified", desc: "QA agent checks accuracy, tone, and compliance", icon: "✅", color: "bg-red-50 border-red-200 text-red-700" },
  { step: "6", title: "Sent to Customer", desc: "Approved response delivered via original channel", icon: "📤", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
];

export default function AgentsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold text-purple-700">AI Engine</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance">7 Specialized AI Agents</h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">Each agent is purpose-built for a task. Together they form an autonomous pipeline that handles your entire support operation.</p>
          </div>
        </div>
      </section>

      {/* Pipeline Infographic */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Agent Pipeline</h2>
            <p className="mt-4 text-lg text-gray-600">From message to resolution in seconds</p>
          </div>

          {/* Pipeline SVG */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 mb-16 overflow-hidden">
            <svg viewBox="0 0 800 200" className="w-full h-auto" fill="none">
              <rect x="0" y="0" width="800" height="200" fill="#f8fafc" rx="12" />
              {pipelineSteps.map((s, i) => (
                <g key={s.step}>
                  <rect x={20 + i * 128} y="30" width="118" height="140" fill="white" rx="10" stroke="#e5e7eb" strokeWidth="1" />
                  <text x={79 + i * 128} y="60" textAnchor="middle" fontSize="28">{s.icon}</text>
                  <text x={79 + i * 128} y="85" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="700">STEP {s.step}</text>
                  <text x={79 + i * 128} y="105" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="600">{s.title}</text>
                  <text x={79 + i * 128} y="125" textAnchor="middle" fill="#6b7280" fontSize="8">{s.desc.split(" ").slice(0, 4).join(" ")}</text>
                  <text x={79 + i * 128} y="140" textAnchor="middle" fill="#6b7280" fontSize="8">{s.desc.split(" ").slice(4).join(" ")}</text>
                  {i < pipelineSteps.length - 1 && (
                    <text x={142 + i * 128} y="105" fill="#d1d5db" fontSize="20">→</text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Pipeline Flow Chart */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Decision Flow</h3>
            <svg viewBox="0 0 800 300" className="w-full h-auto" fill="none">
              <rect x="0" y="0" width="800" height="300" fill="#f8fafc" rx="12" />

              {/* Start */}
              <circle cx="80" cy="150" r="30" fill="#3b82f6" />
              <text x="80" y="154" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">START</text>

              {/* Arrow to Intake */}
              <line x1="110" y1="150" x2="160" y2="150" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="158,145 168,150 158,155" fill="#94a3b8" />

              {/* Intake Box */}
              <rect x="170" y="120" width="100" height="60" fill="white" rx="8" stroke="#3b82f6" strokeWidth="2" />
              <text x="220" y="145" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="600">Intake</text>
              <text x="220" y="162" textAnchor="middle" fill="#6b7280" fontSize="8">Classify</text>

              {/* Arrow to Decision */}
              <line x1="270" y1="150" x2="310" y2="150" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="308,145 318,150 308,155" fill="#94a3b8" />

              {/* Decision Diamond */}
              <polygon points="360,110 410,150 360,190 310,150" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
              <text x="360" y="147" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="600">Can AI</text>
              <text x="360" y="160" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="600">Resolve?</text>

              {/* Yes - Knowledge → Resolution → QA */}
              <line x1="410" y1="150" x2="450" y2="150" stroke="#22c55e" strokeWidth="2" />
              <text x="430" y="142" fill="#22c55e" fontSize="9" fontWeight="600">YES</text>

              <rect x="455" y="120" width="80" height="60" fill="white" rx="8" stroke="#22c55e" strokeWidth="2" />
              <text x="495" y="145" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="600">Resolve</text>
              <text x="495" y="160" textAnchor="middle" fill="#6b7280" fontSize="8">Auto-reply</text>

              <line x1="535" y1="150" x2="565" y2="150" stroke="#22c55e" strokeWidth="2" />

              <rect x="570" y="120" width="80" height="60" fill="white" rx="8" stroke="#22c55e" strokeWidth="2" />
              <text x="610" y="145" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="600">QA Check</text>
              <text x="610" y="160" textAnchor="middle" fill="#6b7280" fontSize="8">Verify</text>

              <line x1="650" y1="150" x2="690" y2="150" stroke="#22c55e" strokeWidth="2" />

              <circle cx="720" cy="150" r="30" fill="#22c55e" />
              <text x="720" y="154" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">SENT ✓</text>

              {/* No - Escalate */}
              <line x1="360" y1="190" x2="360" y2="240" stroke="#ef4444" strokeWidth="2" />
              <text x="375" y="220" fill="#ef4444" fontSize="9" fontWeight="600">NO</text>

              <rect x="310" y="245" width="100" height="45" fill="white" rx="8" stroke="#ef4444" strokeWidth="2" />
              <text x="360" y="272" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="600">Escalate</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Agent Cards */}
      <section className="py-20 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Meet the Agents</h2>
            <p className="mt-4 text-lg text-gray-600">Each agent is specialized for maximum performance</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((a, i) => (
              <div key={a.name} className="rounded-2xl border border-gray-200 bg-white p-6 card-glow group">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>{i + 1}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{a.name} Agent</div>
                    <div className="text-sm text-gray-500">{a.role}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-5">{a.detail}</p>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900">{a.stats.processed}</div>
                    <div className="text-[9px] text-gray-500">Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-600">{a.stats.accuracy}</div>
                    <div className="text-[9px] text-gray-500">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600">{a.stats.avgTime}</div>
                    <div className="text-[9px] text-gray-500">Avg Time</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Let AI Handle the Routine</h2>
          <p className="mt-4 text-lg text-purple-100">Your agents focus on complex issues. AI handles the rest.</p>
          <div className="mt-8">
            <Link href="/login" className="inline-flex rounded-xl bg-white px-8 py-4 text-base font-semibold text-purple-700 shadow-2xl hover:-translate-y-0.5 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
