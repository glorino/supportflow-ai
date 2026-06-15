"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const features = [
  {
    num: "01",
    title: "Intelligent Intake",
    desc: "7 AI agents classify, route, and respond to every customer message instantly. No queue. No delay.",
    tags: ["Auto-classification", "Smart routing", "Instant response"],
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    liveFeed: [
      { action: "Classified", detail: "Billing inquiry", time: "Just now", status: "done" },
      { action: "Routed", detail: "Urgent API issue → Tier 2", time: "2s ago", status: "done" },
      { action: "Resolved", detail: "Password reset", time: "5s ago", status: "done" },
    ],
  },
  {
    num: "02",
    title: "Unified Inbox",
    desc: "Every channel — WhatsApp, Email, SMS, Messenger, Instagram, Web Chat — in one conversation thread.",
    tags: ["6 channels", "Real-time sync", "Full context"],
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    liveFeed: [
      { action: "WhatsApp", detail: "Sarah: My order hasn't arrived", time: "Just now", status: "done" },
      { action: "Email", detail: "Mike: Refund request for #9876", time: "3s ago", status: "done" },
      { action: "Web Chat", detail: "New visitor from Lagos", time: "6s ago", status: "pending" },
    ],
  },
  {
    num: "03",
    title: "Sentiment Analysis",
    desc: "Real-time emotion detection on every message. Know when a customer is frustrated before they churn.",
    tags: ["Real-time scoring", "Trend alerts", "Churn prediction"],
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    liveFeed: [
      { action: "Detected", detail: "Frustrated tone — escalated", time: "Just now", status: "done" },
      { action: "Scored", detail: "Positive (0.92) — closed", time: "2s ago", status: "done" },
      { action: "Alert", detail: "Negative trend on WhatsApp", time: "8s ago", status: "warning" },
    ],
  },
  {
    num: "04",
    title: "SLA Monitoring",
    desc: "Automated escalation when SLAs are breached. Never miss a response deadline again.",
    tags: ["Auto-escalation", "SLA tracking", "Compliance reporting"],
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    liveFeed: [
      { action: "Enforced", detail: "SLA 2h met for SSV-1234", time: "Just now", status: "done" },
      { action: "Breached", detail: "SSV-1230 exceeded 4h", time: "1s ago", status: "breached" },
      { action: "Escalated", detail: "SSV-1228 → Manager", time: "4s ago", status: "done" },
    ],
  },
  {
    num: "05",
    title: "AI Knowledge Base",
    desc: "Your team's knowledge, auto-digested and searchable. AI agents use it to resolve 67% of tickets autonomously.",
    tags: ["Auto-ingestion", "Semantic search", "AI-powered answers"],
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    liveFeed: [
      { action: "Indexed", detail: "12 new articles processed", time: "Just now", status: "done" },
      { action: "Matched", detail: "Q: reset password → A: article #42", time: "1s ago", status: "done" },
      { action: "Auto-resolved", detail: "Shipping policy question", time: "3s ago", status: "done" },
    ],
  },
  {
    num: "06",
    title: "Real-time Analytics",
    desc: "Dashboards that update live. Track resolution rates, CSAT, agent performance, and channel health at a glance.",
    tags: ["Live dashboards", "Export reports", "Custom metrics"],
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    liveFeed: [
      { action: "Updated", detail: "Resolution rate: 87%", time: "Just now", status: "done" },
      { action: "Alert", detail: "CSAT dipped below 4.0", time: "5s ago", status: "warning" },
      { action: "Report", detail: "Weekly summary generated", time: "12s ago", status: "done" },
    ],
  },
];

const channels = [
  { name: "WhatsApp", icon: "M", color: "bg-green-500", desc: "2B+ users worldwide" },
  { name: "Email", icon: "@", color: "bg-purple-500", desc: "IMAP/SMTP integration" },
  { name: "SMS", icon: "~", color: "bg-amber-500", desc: "Termii-powered delivery" },
  { name: "Web Chat", icon: "W", color: "bg-blue-500", desc: "Embeddable widget" },
  { name: "Messenger", icon: "M", color: "bg-blue-400", desc: "Facebook integration" },
  { name: "Instagram", icon: "I", color: "bg-pink-500", desc: "DM support" },
];

const stats = [
  { value: "67%", label: "Auto-Resolution Rate", desc: "Tickets resolved without humans" },
  { value: "42s", label: "Avg Response Time", desc: "First response in seconds" },
  { value: "99.99%", label: "Uptime SLA", desc: "Enterprise-grade reliability" },
  { value: "16M+", label: "Customers Served", desc: "Across all channels" },
];

const agents = [
  { name: "Intake Agent", desc: "Classifies and routes incoming tickets", color: "from-blue-500 to-indigo-600" },
  { name: "Knowledge Agent", desc: "Searches and retrieves relevant articles", color: "from-emerald-500 to-green-600" },
  { name: "Resolution Agent", desc: "Auto-resolves common issues", color: "from-purple-500 to-violet-600" },
  { name: "QA Agent", desc: "Monitors response quality and tone", color: "from-amber-500 to-orange-600" },
  { name: "Escalation Agent", desc: "Routes critical issues to the right team", color: "from-rose-500 to-pink-600" },
  { name: "Sentiment Agent", desc: "Detects emotions in real-time", color: "from-cyan-500 to-blue-600" },
  { name: "Analytics Agent", desc: "Generates insights and trend reports", color: "from-violet-500 to-purple-600" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}{suffix}</span>;
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      {/* Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0e1a]/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/20" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <img src="/logo.svg" alt="SSV" className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">SSV</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Features</a>
            <a href="#channels" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Channels</a>
            <a href="#agents" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">AI Agents</a>
            <a href="#stats" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Results</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors duration-300 px-4 py-2">
              Sign in
            </Link>
            <Link href="/login" className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-6">
        {/* Background orbs */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto relative">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-gray-300">AI-Powered Support Platform</span>
              <span className="text-xs text-gray-500">·</span>
              <span className="text-xs font-medium text-blue-400">Now Live</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-center tracking-tight leading-[0.95] mb-8">
            <span className="text-white">Your support team,</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">supercharged by AI.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-center text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Unify every support channel into one intelligent workspace. 7 AI agents classify, route, respond, and resolve — so your team can focus on what matters.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/login" className="w-full sm:w-auto text-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-sm font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
              Start Free Trial →
            </Link>
            <Link href="#features" className="w-full sm:w-auto text-center px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-semibold text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              See How It Works
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs text-gray-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-lg bg-white/5 text-xs text-gray-500">supportflow-ai-six.vercel.app/dashboard</div>
              </div>
            </div>
            {/* Mock dashboard */}
            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
                {["14 Open", "2 Pending", "2 Escalated", "87% Resolved", "4.6 CSAT", "99.9% SLA"].map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.04] border border-white/5 text-center">
                    <div className="text-xs font-bold text-white">{s.split(" ")[0]}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{s.split(" ").slice(1).join(" ")}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-2 rounded-xl bg-white/[0.03] border border-white/5 p-5">
                  <div className="text-xs text-gray-400 mb-3 font-medium">Recent Tickets</div>
                  {["SSV-1234 · Can't access account · Urgent", "SSV-1233 · Refund request · Medium", "SSV-1232 · API 500 errors · Escalated"].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                      <div className={`h-2 w-2 rounded-full ${i === 0 ? "bg-red-400" : i === 1 ? "bg-amber-400" : "bg-blue-400"}`} />
                      <span className="text-xs text-gray-300">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/5 p-5">
                  <div className="text-xs text-gray-400 mb-3 font-medium">Channel Activity</div>
                  {["WhatsApp · 4", "Email · 4", "Web · 6", "SMS · 2"].map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-gray-300">{c.split(" · ")[0]}</span>
                      <span className="text-xs font-bold text-white">{c.split(" · ")[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="text-xs font-semibold text-blue-400">Platform</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Built for <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">speed</span> and{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">reliability</span>.
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Six core capabilities. One unified platform. Zero compromises.
            </p>
          </div>

          <div className="space-y-8">
            {features.map((f) => (
              <div key={f.num} className={`group rounded-3xl border ${f.borderColor} ${f.bgColor} p-8 sm:p-10 hover:scale-[1.01] transition-all duration-500`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-sm font-bold bg-gradient-to-r ${f.color} bg-clip-text text-transparent`}>{f.num}</span>
                      <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${f.color} flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{f.num}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{f.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-5">{f.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {f.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#0d1120] border border-white/5 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-gray-400 font-medium">Live Event Feed</span>
                    </div>
                    <div className="space-y-3">
                      {f.liveFeed.map((evt, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white ${
                            evt.status === "done" ? "bg-green-500" : evt.status === "warning" ? "bg-amber-500" : "bg-red-500"
                          }`}>
                            {evt.status === "done" ? "✓" : evt.status === "warning" ? "!" : "✕"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-white font-medium">{evt.action}</div>
                            <div className="text-[11px] text-gray-500 truncate">{evt.detail}</div>
                          </div>
                          <span className="text-[10px] text-gray-600 shrink-0">{evt.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section id="channels" className="relative px-6 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="text-xs font-semibold text-emerald-400">Channels</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              All your channels.{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">One inbox.</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Connect WhatsApp, Email, SMS, Messenger, Instagram, and Web Chat — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {channels.map((ch) => (
              <div key={ch.name} className="group p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300 text-center hover:-translate-y-1">
                <div className={`h-14 w-14 rounded-2xl ${ch.color} mx-auto mb-4 flex items-center justify-center text-white text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {ch.icon}
                </div>
                <div className="text-sm font-semibold text-white mb-1">{ch.name}</div>
                <div className="text-[11px] text-gray-500">{ch.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents */}
      <section id="agents" className="relative px-6 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-xs font-semibold text-purple-400">AI Agents</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              7 agents.{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Zero bottlenecks.</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Each agent handles a specific part of your support pipeline. Together, they resolve 67% of tickets autonomously.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {agents.map((a) => (
              <div key={a.name} className="group p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-r ${a.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-white mb-1.5">{a.name}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative px-6 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              From ticket to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">resolution</span>.
            </h2>
          </div>
          <div className="space-y-6">
            {[
              { step: "01", title: "Ingest", desc: "Customer message arrives on any channel — WhatsApp, Email, SMS, Web, Messenger, or Instagram.", color: "from-blue-500 to-indigo-600" },
              { step: "02", title: "Classify", desc: "AI Intake Agent detects intent, sentiment, and urgency in under 50ms. Routes to the right queue.", color: "from-emerald-500 to-green-600" },
              { step: "03", title: "Resolve", desc: "Knowledge Agent and Resolution Agent handle the query. 67% resolved without human intervention.", color: "from-purple-500 to-violet-600" },
              { step: "04", title: "Escalate", desc: "If needed, the Escalation Agent hands off to a human with full context. SLA is always enforced.", color: "from-amber-500 to-orange-600" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${s.color} flex items-center justify-center text-white font-bold shrink-0 shadow-lg`}>
                  {s.step}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{s.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative px-6 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">support teams</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "SSV CRM cut our response time by 73%. Our team can focus on complex issues instead of repetitive questions.", name: "Sarah Chen", role: "Head of Support, SSV", gradient: "from-blue-500 to-indigo-600" },
              { quote: "The AI agents handle 80% of our tickets automatically. We went from 2-hour to 42-second average response times.", name: "David Kim", role: "VP Operations, TechStart", gradient: "from-emerald-500 to-green-600" },
              { quote: "Finally, a support platform that actually works across all our channels. WhatsApp, email, social — all unified.", name: "Rachel Green", role: "Customer Success Lead, NovaPay", gradient: "from-purple-500 to-violet-600" },
            ].map((t) => (
              <div key={t.name} className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 text-sm">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 relative">
            Your customers trust you{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              at the moment that matters most.
            </span>
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto relative">
            Every ticket is a promise. SSV CRM makes sure you keep it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <Link href="/login" className="w-full sm:w-auto text-center px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-sm font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300">
              Book a Demo
            </Link>
            <Link href="/login" className="w-full sm:w-auto text-center px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-semibold text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <img src="/logo.svg" alt="SSV" className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold">SSV CRM</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">AI-powered customer support platform. Built for teams that move fast.</p>
            </div>
            <div>
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Product</h5>
              <div className="space-y-2">
                <a href="#features" className="block text-xs text-gray-500 hover:text-white transition-colors">Features</a>
                <a href="#channels" className="block text-xs text-gray-500 hover:text-white transition-colors">Channels</a>
                <a href="#agents" className="block text-xs text-gray-500 hover:text-white transition-colors">AI Agents</a>
                <a href="#stats" className="block text-xs text-gray-500 hover:text-white transition-colors">Results</a>
              </div>
            </div>
            <div>
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h5>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-xs text-gray-500 hover:text-white transition-colors">Terms & Conditions</Link>
              </div>
            </div>
            <div>
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Support</h5>
              <div className="space-y-2">
                <a href="mailto:support@ssv.com" className="block text-xs text-gray-500 hover:text-white transition-colors">support@ssv.com</a>
                <Link href="/login" className="block text-xs text-gray-500 hover:text-white transition-colors">Sign In</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-600">&copy; 2026 SSV CRM. All rights reserved.</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
