"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div ref={ref} className={`${className} transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const heroWords = ["Fraud", "OTP", "Payment", "Ticket"];
export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % heroWords.length), 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">
      {/* ───────── NAV ───────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#1e40af] to-[#3b82f6] flex items-center justify-center">
                <img src="/logo.svg" alt="SSV" className="h-5 w-5 brightness-0 invert" />
              </div>
              <span className="text-[22px] font-extrabold tracking-tight text-gray-900">SSV</span>
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              {[
                { label: "Platform", hasDropdown: true },
                { label: "Solutions", hasDropdown: true },
                { label: "Developers", hasDropdown: false },
                { label: "Pricing", hasDropdown: false },
              ].map((item) => (
                <button key={item.label} className="flex items-center gap-1 text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  {item.label}
                  {item.hasDropdown && (
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2">Sign in</Link>
            <Link href="/login" className="relative text-[15px] font-semibold text-white bg-gray-900 px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Get Started
            </Link>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-6 space-y-4">
            {["Platform", "Solutions", "Developers", "Pricing"].map((l) => (
              <a key={l} href="#" className="block text-base font-medium text-gray-700">{l}</a>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link href="/login" className="text-center text-sm font-medium text-gray-700 py-2">Sign in</Link>
              <Link href="/login" className="text-center text-sm font-semibold text-white bg-gray-900 rounded-full py-3">Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ───────── HERO ───────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-blue-500/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" style={{ animation: "float 12s ease-in-out infinite" }} />

        <div className="relative max-w-[1200px] mx-auto px-6 pt-32 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[13px] font-semibold text-blue-300 uppercase tracking-wider">3 Billion Tickets Processed</span>
              </div>
              <h1 className="text-[56px] sm:text-[72px] lg:text-[80px] font-extrabold leading-[0.95] tracking-tight text-white mb-6">
                Every{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-blue-400 italic">{heroWords[wordIndex]}</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-400/20 rounded-sm" />
                </span>
                <br />A Resolution.
              </h1>
              <p className="text-lg text-gray-300/90 max-w-lg mb-10 leading-relaxed">
                Resolve tickets across WhatsApp, Email, SMS, Messenger, Instagram, and Web Chat — using AI agents that classify, route, and resolve automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="px-8 py-4 bg-white text-gray-900 rounded-full text-[15px] font-semibold hover:bg-gray-100 transition-all text-center shadow-lg">
                  Get Started
                </Link>
                <Link href="/login" className="px-8 py-4 bg-transparent border-2 border-blue-400/40 text-blue-300 rounded-full text-[15px] font-semibold hover:bg-blue-400/10 transition-all text-center">
                  Book a demo
                </Link>
              </div>
            </div>
            {/* Right — Chat Cards */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-3xl" />
              <div className="relative space-y-4">
                {/* User message */}
                <div className="ml-auto max-w-[340px] bg-white/[0.08] backdrop-blur-md rounded-2xl rounded-br-md px-5 py-4 border border-white/[0.08]">
                  <p className="text-sm text-white/90">Help me with my support ticket #SSV-1234</p>
                </div>
                {/* AI Response */}
                <div className="max-w-[380px] bg-white/[0.12] backdrop-blur-md rounded-2xl rounded-bl-md px-5 py-4 border border-white/[0.1]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-6 w-6 rounded-md bg-blue-500 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">AI</span>
                    </div>
                    <span className="text-xs font-semibold text-blue-300">SSV AI</span>
                  </div>
                  <p className="text-sm text-white/80">Ticket resolved! Refund of ₦45,000 has been processed for your order.</p>
                </div>
                {/* Transaction card */}
                <div className="ml-auto max-w-[360px] bg-white/[0.08] backdrop-blur-md rounded-2xl px-5 py-4 border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 font-mono">TXN-9190</span>
                    <span className="text-sm font-bold text-white">₦45,000</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["Resolved", "Escalated", "Closed"].map((tag) => (
                      <span key={tag} className={`px-3 py-1 rounded-full text-[11px] font-semibold ${tag === "Resolved" ? "bg-blue-500/20 text-blue-300" : tag === "Escalated" ? "bg-amber-500/20 text-amber-300" : "bg-white/10 text-gray-300"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Status */}
                <div className="max-w-[360px] bg-white/[0.08] backdrop-blur-md rounded-2xl px-5 py-3 border border-white/[0.08] flex items-center justify-between">
                  <span className="text-sm text-gray-300">Routing ticket...</span>
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ───────── TRUSTED BY ───────── */}
      <RevealSection className="py-20 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <p className="text-gray-400 text-[15px]">Trusted by leading companies across Nigeria and beyond</p>
            <Link href="#features" className="text-sm font-semibold text-gray-900 border border-gray-200 rounded-full px-5 py-2.5 hover:bg-gray-50 transition-colors hidden sm:flex items-center gap-2">
              Read all stories <span className="text-gray-400">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-0 border border-gray-100 rounded-2xl overflow-hidden">
            {["Paystack", "Kuda", "PiggyVest", "Chipper", "Moniepoint", "FairMoney", "Glovo", "Wema Bank", "Arm", "Tolaram", "Chowdeck", "Yellow Card"].map((name) => (
              <div key={name} className="flex items-center justify-center h-20 border-r border-b border-gray-100 last:border-r-0 hover:bg-gray-50/50 transition-colors">
                <span className="text-sm font-bold text-gray-300 tracking-wide">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ───────── THE PROBLEM ───────── */}
      <RevealSection className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">The Problem</p>
          <h2 className="text-[40px] sm:text-[52px] font-extrabold tracking-tight mb-4 leading-[1.05]">
            Ticket-triggered<br />failures.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-16">Teams send and forget. But the cost of unresolved tickets is real.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "!", title: "Ticket never triaged", desc: "Customer sends a message at 2am. No one picks it up. The session dies. They don't come back.", color: "text-blue-600 bg-blue-50" },
              { icon: "~", title: "Escalation fires too late", desc: "By the time your team sees it, the customer has already churned. The damage is done.", color: "text-rose-500 bg-rose-50" },
              { icon: "₹", title: "Resolution fails", desc: "Agent responds with a template. Customer is frustrated. Silent failures for hours before anyone notices.", color: "text-blue-600 bg-blue-50" },
              { icon: "↻", title: "No fallback path", desc: "One channel fails and everything stops. No automatic second attempt. Just silence.", color: "text-gray-400 bg-gray-50" },
            ].map((card) => (
              <div key={card.title} className="text-left p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group">
                <div className={`h-14 w-14 rounded-2xl ${card.color} flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ───────── THE SOLUTION (blue band) ───────── */}
      <section className="relative py-24 bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="max-w-[1200px] mx-auto px-6 text-center relative">
          <p className="text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">The Solution</p>
          <h2 className="text-[40px] sm:text-[52px] font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
            Failures <span className="italic text-blue-400">avoided.</span>
          </h2>
          <p className="text-gray-300/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Six capabilities working together — so every ticket, message, alert, and support request actually gets through and gets resolved.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ───────── FEATURES 01-06 ───────── */}
      <section id="features" className="relative py-12">
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-[1200px] mx-auto px-6 relative space-y-8">
          {/* 01 · AI Prediction */}
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f0f4f8] rounded-3xl overflow-hidden min-h-[420px]">
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.15em] mb-4">01 · AI Classification</p>
                <h3 className="text-[28px] sm:text-[32px] font-extrabold leading-tight mb-4">Classify every ticket before it moves</h3>
                <p className="text-gray-500 leading-relaxed mb-6">SSV runs intent detection, sentiment analysis, and priority scoring in under 50ms — before your ticket hits any queue. High-confidence tickets get auto-resolved. Low-confidence ones get routed to the right agent.</p>
                <div className="flex flex-wrap gap-2">
                  {["Intent detection", "Sentiment analysis", "Priority scoring", "&lt;50ms latency"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[13px] font-medium text-blue-700">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 flex flex-col justify-center space-y-3">
                {[
                  { id: "TICKET-9436", pct: 98, color: "bg-blue-500" },
                  { id: "TICKET-9437", pct: 72, color: "bg-amber-500" },
                  { id: "TICKET-9438", pct: 95, color: "bg-blue-500" },
                ].map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <span className="text-sm font-mono text-gray-600">{t.id}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${t.color} rounded-full transition-all duration-1000`} style={{ width: `${t.pct}%` }} />
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-10 text-right">{t.pct}%</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <span className="text-sm text-gray-500">Fraud risk</span>
                  <span className="text-sm font-bold text-blue-600">Low · 0.03</span>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* 02 · Unified Inbox */}
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f0f4f8] rounded-3xl overflow-hidden min-h-[420px]">
              <div className="bg-white p-8 flex flex-col justify-center space-y-3 order-2 lg:order-1">
                {[
                  { ch: "WhatsApp", vendor: "Live", ms: "25ms", pct: "97%", active: true },
                  { ch: "Email", vendor: "IMAP", ms: "30ms", pct: "93%", active: false },
                  { ch: "SMS", vendor: "SSV", ms: "28ms", pct: "99%", active: false },
                  { ch: "Web Chat", vendor: "Widget", ms: "12ms", pct: "100%", active: false },
                ].map((c) => (
                  <div key={c.ch} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${c.active ? "border-blue-300 bg-blue-50/80 shadow-sm" : "border-gray-100 bg-gray-50/50"}`}>
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${c.active ? "bg-blue-500" : "bg-gray-300"}`} />
                      <span className="text-sm font-semibold text-gray-800">{c.ch} · {c.vendor}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{c.ms}</span>
                      <span className={`text-sm font-bold ${c.active ? "text-blue-600" : "text-gray-700"}`}>{c.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center order-1 lg:order-2">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.15em] mb-4">02 · Unified Inbox</p>
                <h3 className="text-[28px] sm:text-[32px] font-extrabold leading-tight mb-4">The best path, chosen in real time</h3>
                <p className="text-gray-500 leading-relaxed mb-6">SSV evaluates WhatsApp, Email, SMS, Web Chat, Messenger, and Instagram simultaneously — routing to the highest-confidence channel for that ticket, that moment, that customer.</p>
                <div className="flex flex-wrap gap-2">
                  {["WhatsApp · Email · SMS · Web", "Auto-failover", "Bring your own channel"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[13px] font-medium text-blue-700">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          {/* 03 · Sentiment Analysis */}
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f0f4f8] rounded-3xl overflow-hidden min-h-[420px]">
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.15em] mb-4">03 · Sentiment Analysis</p>
                <h3 className="text-[28px] sm:text-[32px] font-extrabold leading-tight mb-4">Read the emotion before the words</h3>
                <p className="text-gray-500 leading-relaxed mb-6">Real-time fraud and emotion scoring built for customer support. Tone, urgency, and intent assessed in milliseconds. Genuine queries get answered instantly. Angry customers get escalated before they churn.</p>
                <div className="flex flex-wrap gap-2">
                  {["Velocity rules", "Device fingerprinting", "0.01% false positive"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[13px] font-medium text-blue-700">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { val: "99.7%", label: "Detection rate", text: "text-blue-600" },
                    { val: "48", label: "Flagged today", text: "text-gray-900" },
                    { val: "46ms", label: "Avg. check time", text: "text-gray-900" },
                    { val: "0.01%", label: "False positive", text: "text-gray-900" },
                  ].map((s) => (
                    <div key={s.label} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 text-center">
                      <div className={`text-2xl font-extrabold ${s.text}`}>{s.val}</div>
                      <div className="text-[11px] text-gray-400 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Live Event Feed</p>
                  {[
                    { action: "Review", detail: "TICKET-9454 · Just now", dot: "bg-amber-400" },
                    { action: "Cleared", detail: "TICKET-9453 · 1s ago", dot: "bg-blue-500" },
                    { action: "Cleared", detail: "TICKET-9452 · 3s ago", dot: "bg-blue-500" },
                  ].map((e) => (
                    <div key={e.detail} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                      <span className={`h-2 w-2 rounded-full ${e.dot}`} />
                      <span className="text-sm font-medium text-gray-700">{e.action}</span>
                      <span className="text-xs text-gray-400">{e.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          {/* 04 · SLA Monitoring */}
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f0f4f8] rounded-3xl overflow-hidden min-h-[420px]">
              <div className="bg-white p-8 flex flex-col justify-center space-y-3 order-2 lg:order-1">
                {[
                  { action: "SLA met", detail: "TICKET-9436 · just now", status: "Done", color: "text-blue-600 bg-blue-50" },
                  { action: "Ticket closed", detail: "TICKET-9435 · 3s ago", status: "Done", color: "text-blue-600 bg-blue-50" },
                  { action: "Manual review", detail: "TICKET-9434 · 8s ago", status: "Running", color: "text-amber-600 bg-amber-50" },
                  { action: "Route switched", detail: "TICKET-9433 · 20s ago", status: "Done", color: "text-blue-600 bg-blue-50" },
                ].map((e) => (
                  <div key={e.detail} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-800">{e.action}</span>
                        <span className="text-xs text-gray-400 ml-2">{e.detail}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${e.color}`}>{e.status}</span>
                  </div>
                ))}
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center order-1 lg:order-2">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.15em] mb-4">04 · SLA Monitoring</p>
                <h3 className="text-[28px] sm:text-[32px] font-extrabold leading-tight mb-4">Failures resolve before you notice them</h3>
                <p className="text-gray-500 leading-relaxed mb-6">SSV&apos;s AI system monitors your support pipeline around the clock. When a ticket breaches SLA, an escalation fires, or a retry is needed — agents act immediately. They reroute, escalate to your team via Slack or SMS, and close the loop.</p>
                <div className="flex flex-wrap gap-2">
                  {["Auto-retry & reroute", "Slack / SMS escalation", "Full audit trail"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[13px] font-medium text-blue-700">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          {/* 05 · Knowledge Base */}
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f0f4f8] rounded-3xl overflow-hidden min-h-[420px]">
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.15em] mb-4">05 · Knowledge Base</p>
                <h3 className="text-[28px] sm:text-[32px] font-extrabold leading-tight mb-4">Your team&apos;s knowledge, auto-digested</h3>
                <p className="text-gray-500 leading-relaxed mb-6">SSV&apos;s Knowledge Base turns every past ticket, article, and FAQ into an intelligent search layer. AI agents use it to resolve 67% of tickets autonomously — so your human agents focus on complex issues only.</p>
                <div className="flex flex-wrap gap-2">
                  {["AI-powered answers", "Semantic search", "Auto-ingestion"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[13px] font-medium text-blue-700">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 flex flex-col justify-center">
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">CAMPAIGN · LIVE</span>
                    <span className="text-sm font-bold text-blue-600">89% opened</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "89%" }} />
                  </div>
                </div>
                {[
                  { ch: "Email", msg: "Tunde · Monthly statement r...", done: true },
                  { ch: "WhatsApp", msg: "Kemi · ₦2,500 cashback cre...", done: true },
                ].map((m) => (
                  <div key={m.msg} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 font-medium w-16">{m.ch}</span>
                      <span className="text-sm text-gray-700 truncate">{m.msg}</span>
                    </div>
                    {m.done && <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <span className="text-sm text-gray-500">Sent today</span>
                  <span className="text-sm font-bold text-gray-900">11,147</span>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* 06 · Auto-Resolution */}
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f0f4f8] rounded-3xl overflow-hidden min-h-[420px]">
              <div className="bg-white p-8 flex flex-col justify-center order-2 lg:order-1">
                <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/50 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Auto-resolved</span>
                    <span className="text-3xl font-extrabold text-blue-600">83%</span>
                  </div>
                </div>
                {[
                  { ch: "WhatsApp", msg: "Balance enquiry · Answered", status: "Closed", sColor: "text-blue-600 bg-blue-50" },
                  { ch: "Email", msg: "Account locked · Unlocked", status: "Closed", sColor: "text-blue-600 bg-blue-50" },
                  { ch: "Messenger", msg: "Disputed charge...", status: "Escalated", sColor: "text-amber-600 bg-amber-50" },
                ].map((r) => (
                  <div key={r.msg} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 mb-3">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-sm text-gray-700"><strong>{r.ch}</strong> · {r.msg}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.sColor}`}>{r.status}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <span className="text-sm text-gray-500">Avg. response time</span>
                  <span className="text-sm font-bold text-gray-900">42s</span>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center order-1 lg:order-2">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.15em] mb-4">06 · Auto-Resolution</p>
                <h3 className="text-[28px] sm:text-[32px] font-extrabold leading-tight mb-4">Requests handled. Automatically.</h3>
                <p className="text-gray-500 leading-relaxed mb-6">SSV Resolve is your autonomous customer resolution layer. It detects issues and handles inbound requests across WhatsApp, Email, SMS, Messenger, and Instagram — responding, resolving, and closing without a human in the loop.</p>
                <div className="flex flex-wrap gap-2">
                  {["WhatsApp · Email · SMS · Web", "Instagram · Messenger", "Autonomous resolution"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[13px] font-medium text-blue-700">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="py-24 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">How it works</p>
            <h2 className="text-[40px] sm:text-[52px] font-extrabold tracking-tight leading-[1.05]">
              From ticket to <span className="italic text-blue-600">confirmed resolution.</span>
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", icon: "↓", title: "Ingest", desc: "Customer message arrives on any channel — WhatsApp, Email, SMS, Web, Messenger, or Instagram." },
              { num: "02", icon: "⚡", title: "Classify", desc: "AI Intake Agent detects intent, sentiment, and urgency in under 50ms. Routes to the right queue." },
              { num: "03", icon: "↗", title: "Route", desc: "Highest-confidence channel and agent chosen. Failover paths pre-staged so degradation never causes failure." },
              { num: "04", icon: "→", title: "Resolve", desc: "Knowledge Agent and Resolution Agent handle the query. 67% resolved without human intervention." },
              { num: "05", icon: "✓", title: "Confirm", desc: "Confirmation fires to your system via webhook. Dashboard reflects live status per ticket." },
              { num: "06", icon: "↻", title: "Escalate", desc: "If needed, the Escalation Agent hands off to a human with full context. SLA is always enforced." },
            ].map((step) => (
              <RevealSection key={step.num}>
                <div className="p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group h-full">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-lg font-bold mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    {step.icon}
                  </div>
                  <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.15em] mb-2">0{step.num} · {step.title.toUpperCase()}</p>
                  <h4 className="text-lg font-bold mb-2">{step.title === "01" ? "Signal enters SSV" : step.title === "02" ? "Predicted in &lt;50ms" : step.title === "03" ? "Optimal path selected" : step.title === "04" ? "Ticket resolved" : step.title === "05" ? "Delivery verified" : "Agents close the loop"}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── MEET SSV AI ───────── */}
      <section className="py-24 border-t border-gray-100 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#142d50] to-[#0b1a2e] aspect-[4/5] flex items-end p-8">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs font-semibold text-blue-300">SSV AI is online</span>
                  </div>
                  <p className="text-sm text-gray-300">7 intelligent agents working 24/7</p>
                </div>
              </div>
            </RevealSection>
            <RevealSection delay={100}>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Meet SSV AI</p>
              <h2 className="text-[40px] sm:text-[48px] font-extrabold leading-[1.05] mb-6">
                The intelligence layer behind <span className="italic text-blue-600">every decision</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                SSV AI is the engine SSV CRM is built on. Trained on real support signals — it classifies, routes, monitors, and resolves so your team can focus on complex issues.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "⚡", title: "Scores every ticket in &lt;50ms", desc: "Intent detection, sentiment, and priority — pre-execution" },
                  { icon: "📊", title: "Trained on real support data", desc: "Across industries and markets — continuously improving" },
                  { icon: "🔔", title: "Monitors 24/7 — no configuration needed", desc: "No thresholds to tune, no dashboards to maintain" },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg shrink-0">{f.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">{f.title}</h4>
                      <p className="text-sm text-gray-500">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ───────── SECURITY & COMPLIANCE ───────── */}
      <section className="py-24 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <RevealSection>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Security & Compliance</p>
            <h2 className="text-[40px] sm:text-[52px] font-extrabold tracking-tight mb-4 leading-[1.05]">
              Built for <span className="italic text-blue-600">regulated industries</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12">SSV is built to meet data protection, financial regulation, and compliance requirements of banks, fintechs, and institutions globally.</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-0 border border-gray-100 rounded-2xl overflow-hidden max-w-4xl mx-auto">
              {["SOC 2", "ISO 27001", "GDPR", "NDPC", "PCI DSS", "HIPAA", "CSA"].map((c) => (
                <div key={c} className="flex items-center justify-center h-20 border-r border-b border-gray-100 last:border-r-0 hover:bg-gray-50/50 transition-colors">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{c}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ───────── INTEGRATIONS ───────── */}
      <section className="py-24 border-t border-gray-100 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <RevealSection>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Integrations</p>
            <h2 className="text-[40px] sm:text-[52px] font-extrabold tracking-tight mb-4 leading-[1.05]">
              Works with the stack <span className="italic text-blue-600">you already run on</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12">Connect SSV to your existing tools in minutes — communication channels, automation platforms, cloud services, and CRMs. No rip-and-replace.</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-0 border border-gray-100 rounded-2xl overflow-hidden bg-white max-w-4xl mx-auto mb-8">
              {["WhatsApp", "Zapier", "Instagram", "Twilio", "Slack", "Gmail", "Mailgun", "Amazon SNS", "Firebase", "Stripe", "HubSpot", "Telegram"].map((name) => (
                <div key={name} className="flex items-center justify-center h-20 border-r border-b border-gray-100 last:border-r-0 hover:bg-gray-50/50 transition-colors">
                  <span className="text-xs font-bold text-gray-400">{name}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mb-6">Don&apos;t see your tool? SSV exposes a full REST API — connect anything in your stack.</p>
            <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-200 rounded-full text-[15px] font-semibold text-gray-700 hover:border-gray-300 hover:bg-white transition-all">
              Explore the API <span>→</span>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="relative py-24 bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#f9fafb] to-transparent" />
        <div className="max-w-[800px] mx-auto px-6 text-center relative">
          <RevealSection>
            <p className="text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">Ready to start</p>
            <h2 className="text-[40px] sm:text-[52px] font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Your customers trust you at the moment that <span className="italic text-blue-400">matters most.</span>
            </h2>
            <p className="text-gray-300/80 text-lg mb-10">Every ticket is a promise. SSV CRM makes sure you keep it.</p>
            <Link href="/login" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-gray-900 rounded-full text-[15px] font-semibold hover:bg-gray-100 transition-all shadow-lg">
              Book a demo
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-md bg-gradient-to-br from-[#1e40af] to-[#3b82f6] flex items-center justify-center">
                  <img src="/logo.svg" alt="SSV" className="h-4 w-4 brightness-0 invert" />
                </div>
                <span className="text-lg font-extrabold">SSV</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">SSV CRM prevents tickets from going unresolved — using AI.</p>
            </div>
            {[
              { title: "Platform", links: ["AI Classification", "Unified Inbox", "Sentiment Analysis", "SLA Monitoring", "Knowledge Base", "Auto-Resolution"] },
              { title: "Solutions", links: ["Enterprise", "Startups", "E-commerce", "Fintech", "SaaS"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Customer Stories", "Blog", "Status Page"] },
              { title: "Company", links: ["About", "Careers", "Privacy Policy", "Terms & Conditions"] },
            ].map((col) => (
              <div key={col.title}>
                <h5 className="text-sm font-bold text-gray-900 mb-4">{col.title}</h5>
                <div className="space-y-2.5">
                  {col.links.map((link) => (
                    <a key={link} href="#" className="block text-sm text-gray-400 hover:text-gray-700 transition-colors">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>© 2026 SSV Inc.</span>
              <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Terms & Conditions</a>
              <a href="mailto:support@ssv.com" className="hover:text-gray-600 transition-colors">support@ssv.com</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ───────── EN/FR TOGGLE (fixed bottom-left) ───────── */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center bg-white border border-gray-200 rounded-full shadow-lg overflow-hidden">
        <button className="px-3 py-1.5 text-xs font-bold bg-gray-900 text-white">EN</button>
        <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors">FR</button>
      </div>
    </div>
  );
}
