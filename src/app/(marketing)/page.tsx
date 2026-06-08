import Link from "next/link";

const metrics = [
  { value: "<800ms", label: "AI Response Time", icon: "⚡" },
  { value: "99.99%", label: "Uptime SLA", icon: "🛡️" },
  { value: "50M+", label: "Messages / Day", icon: "📨" },
  { value: "1M+", label: "Scalable Users", icon: "👥" },
];

const logos = ["Acme Corp", "TechStart", "Design Studio", "RetailCo", "FinTech Pro", "MobileDev"];

const testimonials = [
  { name: "Sarah Chen", role: "Head of Support, Acme Corp", text: "SupportFlow AI cut our response time by 73% and our team can focus on complex issues instead of repetitive questions.", avatar: "SC", rating: 5 },
  { name: "Marcus Johnson", role: "VP Operations, TechStart", text: "The AI auto-resolution rate of 56% means our agents handle the issues that actually need human judgment.", avatar: "MJ", rating: 5 },
  { name: "Emily Rodriguez", role: "CX Director, Design Studio", text: "Unified inbox across WhatsApp, email, and chat changed everything. No more switching between 5 different tools.", avatar: "ER", rating: 5 },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50/80 backdrop-blur-sm px-4 py-1.5 text-sm text-blue-700 shadow-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              AI-Powered Customer Support OS
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 text-balance leading-[1.1]">
              Your Support Team,{" "}
              <span className="text-gradient">Supercharged by AI</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-balance leading-relaxed">
              Unify every support channel into one intelligent workspace. 7 AI agents classify, route, respond, and resolve — while your team focuses on what matters.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/25 hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
                Access Your Dashboard
              </Link>
              <Link href="/workflow" className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                See How It Works →
              </Link>
            </div>
          </div>

          {/* Hero Dashboard Illustration */}
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-blue-600/10 overflow-hidden">
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
              <div className="flex h-[340px]">
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
                <div className="flex-1 p-4">
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Open", value: "24", color: "bg-blue-50 border-blue-100 text-blue-700" },
                      { label: "Resolved", value: "67%", color: "bg-green-50 border-green-100 text-green-700" },
                      { label: "Response", value: "1.2m", color: "bg-purple-50 border-purple-100 text-purple-700" },
                      { label: "CSAT", value: "4.8", color: "bg-amber-50 border-amber-100 text-amber-700" },
                    ].map((stat) => (
                      <div key={stat.label} className={`rounded-lg border p-3 ${stat.color.split(" ").slice(0, 2).join(" ")}`}>
                        <div className="text-[9px] text-gray-500 mb-1">{stat.label}</div>
                        <span className={`text-lg font-bold ${stat.color.split(" ")[2]}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-gray-100 p-3">
                    <div className="text-[10px] font-semibold text-gray-700 mb-3">Ticket Volume</div>
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
                <div className="hidden lg:block w-56 border-l border-gray-100 p-3">
                  <div className="text-[10px] font-semibold text-gray-700 mb-2">Recent Tickets</div>
                  <div className="space-y-2">
                    {[
                      { name: "Sarah C.", msg: "Can't login", status: "Open", sColor: "bg-amber-100 text-amber-700" },
                      { name: "TechStart", msg: "API error 500", status: "Escalated", sColor: "bg-red-100 text-red-700" },
                      { name: "Emily R.", msg: "Integration", status: "AI Working", sColor: "bg-blue-100 text-blue-700" },
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
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">{m.value}</div>
                <div className="mt-2 text-sm text-gray-500 font-medium">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by 500+ support teams worldwide</p>
          <div className="flex items-center justify-center gap-10 flex-wrap opacity-40">
            {logos.map((logo) => (
              <div key={logo} className="text-xl font-bold text-gray-900">{logo}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 gradient-mesh">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700 mb-4">Testimonials</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Trusted by Support Teams</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-200 bg-white p-7 card-glow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed mb-6">&quot;{t.text}&quot;</div>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-600/20">{t.avatar}</div>
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
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRhMiAyIDAgMTEtNCAwIDIgMiAwIDAxNCAweiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Ready to Transform Your Support?</h2>
          <p className="mt-5 text-lg text-blue-100 leading-relaxed">Join teams already using SupportFlow AI to deliver faster, smarter customer support.</p>
          <div className="mt-10">
            <Link href="/login" className="inline-flex rounded-xl bg-white px-10 py-4 text-base font-semibold text-blue-600 shadow-2xl shadow-black/10 hover:shadow-3xl transition-all duration-300 hover:-translate-y-0.5">
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
