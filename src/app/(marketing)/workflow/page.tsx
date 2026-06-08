import Link from "next/link";

const steps = [
  { step: "1", title: "Message Arrives", desc: "Customer sends a message from any of 6 supported channels — WhatsApp, Email, SMS, Web Chat, Messenger, or Instagram DM.", icon: "📨", color: "from-blue-500 to-cyan-500", detail: "Messages are instantly received and queued for processing. The channel of origin is preserved for context-aware responses." },
  { step: "2", title: "AI Classifies", desc: "The Intake Agent analyzes the message to detect intent, priority, sentiment, and extracts key entities.", icon: "🔍", color: "from-purple-500 to-fuchsia-500", detail: "Uses NLP to classify intent into categories like billing, technical, account access. Assigns priority (low/medium/high/urgent) based on keywords and sentiment." },
  { step: "3", title: "Knowledge Retrieved", desc: "The Knowledge Agent searches the RAG pipeline for relevant articles, FAQs, and historical solutions.", icon: "📚", color: "from-green-500 to-emerald-500", detail: "Semantic search across your knowledge base using vector embeddings. Hybrid retrieval combines keyword and semantic matching for maximum relevance." },
  { step: "4", title: "Response Generated", desc: "The Resolution Agent drafts a contextual, personalized response using the retrieved knowledge.", icon: "✍️", color: "from-amber-500 to-orange-500", detail: "Generates human-quality responses that are personalized, empathetic, and actionable. Can also execute automated actions like password resets." },
  { step: "5", title: "Quality Verified", desc: "The QA Agent reviews the response for accuracy, tone, compliance, and factual correctness.", icon: "✅", color: "from-red-500 to-rose-500", detail: "Multi-point quality check ensures responses meet your brand guidelines. Factual accuracy verified against knowledge base. Tone matched to customer sentiment." },
  { step: "6", title: "Delivered to Customer", desc: "The approved response is sent back to the customer via the original channel they used.", icon: "📤", color: "from-cyan-500 to-blue-500", detail: "Response delivered instantly via the customer's preferred channel. Conversation context is preserved for seamless follow-up." },
];

const timeMetrics = [
  { label: "Message Received", time: "0ms", icon: "📨" },
  { label: "Classification Complete", time: "120ms", icon: "🔍" },
  { label: "Knowledge Retrieved", time: "320ms", icon: "📚" },
  { label: "Response Generated", time: "670ms", icon: "✍️" },
  { label: "QA Verified", time: "750ms", icon: "✅" },
  { label: "Delivered", time: "<800ms", icon: "📤" },
];

export default function WorkflowPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">How It Works</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance">From Message to Resolution in Seconds</h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">When a customer reaches out, our AI pipeline takes over — classifying, researching, drafting, and verifying before sending.</p>
          </div>
        </div>
      </section>

      {/* Timeline Infographic */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-900 mb-8 text-center">Processing Timeline</h3>
            <svg viewBox="0 0 800 120" className="w-full h-auto" fill="none">
              <rect x="0" y="0" width="800" height="120" fill="#f8fafc" rx="12" />

              {/* Timeline bar */}
              <rect x="40" y="55" width="720" height="4" fill="#e5e7eb" rx="2" />
              <rect x="40" y="55" width="720" height="4" fill="url(#timeline-gradient)" rx="2" />

              {/* Progress dots */}
              {timeMetrics.map((m, i) => (
                <g key={m.label}>
                  <circle cx={80 + i * 130} cy="57" r="12" fill="white" stroke="#3b82f6" strokeWidth="3" />
                  <circle cx={80 + i * 130} cy="57" r="6" fill="#3b82f6" />
                  <text x={80 + i * 130} y="30" textAnchor="middle" fontSize="16">{m.icon}</text>
                  <text x={80 + i * 130} y="90" textAnchor="middle" fill="#374151" fontSize="9" fontWeight="600">{m.label}</text>
                  <text x={80 + i * 130} y="108" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="700">{m.time}</text>
                </g>
              ))}

              <defs>
                <linearGradient id="timeline-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-20 bg-gray-50/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Step by Step</h2>
            <p className="mt-4 text-lg text-gray-600">Detailed breakdown of the AI pipeline</p>
          </div>

          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={s.step} className="flex gap-6 group">
                {/* Step Number */}
                <div className="flex flex-col items-center shrink-0">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {s.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 flex-1 card-glow">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{s.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{s.desc}</p>
                      <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-lg p-3">{s.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Flow Infographic */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Decision Flow</h2>
            <p className="mt-4 text-lg text-gray-600">How the AI decides whether to auto-resolve or escalate</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden">
            <svg viewBox="0 0 800 350" className="w-full h-auto" fill="none">
              <rect x="0" y="0" width="800" height="350" fill="#f8fafc" rx="12" />

              {/* Entry */}
              <rect x="330" y="20" width="140" height="40" fill="#3b82f6" rx="8" />
              <text x="400" y="45" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Message Received</text>

              {/* Arrow */}
              <line x1="400" y1="60" x2="400" y2="90" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="395,88 405,88 400,95" fill="#94a3b8" />

              {/* Classification */}
              <rect x="330" y="95" width="140" height="40" fill="#8b5cf6" rx="8" />
              <text x="400" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">AI Classification</text>

              {/* Arrow */}
              <line x1="400" y1="135" x2="400" y2="165" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="395,163 405,163 400,170" fill="#94a3b8" />

              {/* Confidence Check */}
              <polygon points="400,175 470,215 400,255 330,215" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
              <text x="400" y="212" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="600">Confidence</text>
              <text x="400" y="226" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="600">≥ 85%?</text>

              {/* Yes path */}
              <line x1="470" y1="215" x2="540" y2="215" stroke="#22c55e" strokeWidth="2" />
              <text x="505" y="208" fill="#22c55e" fontSize="9" fontWeight="600">YES</text>

              <rect x="545" y="195" width="120" height="40" fill="#22c55e" rx="8" />
              <text x="605" y="215" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Auto-Resolve ✓</text>

              {/* No path */}
              <line x1="400" y1="255" x2="400" y2="285" stroke="#ef4444" strokeWidth="2" />
              <text x="415" y="272" fill="#ef4444" fontSize="9" fontWeight="600">NO</text>

              <rect x="330" y="290" width="140" height="40" fill="#ef4444" rx="8" />
              <text x="400" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Escalate to Human</text>

              {/* Side paths */}
              <line x1="330" y1="215" x2="200" y2="215" stroke="#f59e0b" strokeWidth="2" />
              <text x="265" y="208" fill="#f59e0b" fontSize="9" fontWeight="600">REVIEW</text>

              <rect x="80" y="195" width="115" height="40" fill="#f59e0b" rx="8" />
              <text x="137" y="215" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Human Review</text>

              {/* QA path */}
              <line x1="605" y1="235" x2="605" y2="270" stroke="#22c55e" strokeWidth="2" />

              <rect x="545" y="275" width="120" height="40" fill="#16a34a" rx="8" />
              <text x="605" y="295" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">QA Verify</text>
              <text x="605" y="308" textAnchor="middle" fill="#bbf7d0" fontSize="8">then deliver</text>

              {/* Labels */}
              <text x="137" y="250" textAnchor="middle" fill="#6b7280" fontSize="8">Agent reviews, edits if needed</text>
              <text x="605" y="325" textAnchor="middle" fill="#6b7280" fontSize="8">Quality check before delivery</text>
            </svg>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">See the Pipeline in Action</h2>
          <p className="mt-4 text-lg text-blue-100">Experience how AI handles your support end-to-end.</p>
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
