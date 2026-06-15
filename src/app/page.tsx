"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import PublicShell from "./public-shell";
import { useLang } from "@/lib/i18n/context";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
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

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useScrollReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const heroWords = ["Ticket", "Query", "Complaint", "Request"];

export default function HomePage() {
  const { t } = useLang();
  const [wordIndex, setWordIndex] = useState(0);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % heroWords.length), 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/api/public/stats").then((r) => r.json()).then(setStats).catch(() => {});
  }, []);

  const ticket = stats?.tickets || { total: 0, open: 0, pending: 0, escalated: 0, resolved: 0, autoResolutionRate: 0 };
  const customer = stats?.customers || { total: 0, active: 0, avgCsat: 0, totalLtv: 0 };
  const recentTickets = stats?.recentTickets || [];
  const channelStats = stats?.channels || [];
  const sentimentStats = stats?.sentiment || [];

  const channelColors: Record<string, string> = {
    whatsapp: "bg-[#25D366]", email: "bg-[#FF6600]", sms: "bg-[#2196F3]",
    web_chat: "bg-[#8B5CF6]", messenger: "bg-[#1877F2]", instagram: "bg-gradient-to-r from-[#833AB4] to-[#FD1D1D]",
  };

  const channelCounts: Record<string, number> = {};
  channelStats.forEach((c: any) => { channelCounts[c.channel] = c.count; });

  const sentimentColors: Record<string, string> = {
    positive: "text-emerald-600", neutral: "text-gray-600", negative: "text-red-500",
  };

  const features = [
    { num: "01", title: "Intelligent Intake", desc: "7 AI agents classify, route, and respond to every customer message instantly. No queue. No delay.", color: "from-blue-500 to-blue-600", bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600", bullets: ["Auto-classification", "Smart routing", "Instant response"], feed: [{ icon: "✓", text: "Classified", detail: "Billing inquiry", time: "Just now" }, { icon: "✓", text: "Routed", detail: "Urgent API issue → Tier 2", time: "2s ago" }, { icon: "✓", text: "Resolved", detail: "Password reset", time: "5s ago" }] },
    { num: "02", title: "Unified Inbox", desc: "Every channel — WhatsApp, Email, SMS, Messenger, Instagram, Web Chat — in one conversation thread.", color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600", bullets: ["6 channels", "Real-time sync", "Full context"], feed: [{ icon: "✓", text: "WhatsApp", detail: "Sarah: My order hasn't arrived", time: "Just now" }, { icon: "✓", text: "Email", detail: "Mike: Refund request for #9876", time: "3s ago" }, { icon: "✕", text: "Web Chat", detail: "New visitor from Lagos", time: "6s ago" }] },
    { num: "03", title: "Sentiment Analysis", desc: "Real-time emotion detection on every message. Know when a customer is frustrated before they churn.", color: "from-purple-500 to-purple-600", bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-600", bullets: ["Real-time scoring", "Trend alerts", "Churn prediction"], feed: [{ icon: "✓", text: "Detected", detail: "Frustrated tone — escalated", time: "Just now" }, { icon: "✓", text: "Scored", detail: "Positive (0.92) — closed", time: "2s ago" }, { icon: "!", text: "Alert", detail: "Negative trend on WhatsApp", time: "8s ago" }] },
    { num: "04", title: "SLA Monitoring", desc: "Automated escalation when SLAs are breached. Never miss a response deadline again.", color: "from-amber-500 to-amber-600", bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-600", bullets: ["Auto-escalation", "SLA tracking", "Compliance reporting"], feed: [{ icon: "✓", text: "Enforced", detail: "SLA 2h met for SSV-1234", time: "Just now" }, { icon: "✕", text: "Breached", detail: "SSV-1230 exceeded 4h", time: "1s ago" }, { icon: "✓", text: "Escalated", detail: "SSV-1228 → Manager", time: "4s ago" }] },
    { num: "05", title: "AI Knowledge Base", desc: "Your team's knowledge, auto-digested and searchable. AI agents use it to resolve tickets autonomously.", color: "from-cyan-500 to-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-600", bullets: ["Auto-ingestion", "Semantic search", "AI-powered answers"], feed: [{ icon: "✓", text: "Indexed", detail: "12 new articles processed", time: "Just now" }, { icon: "✓", text: "Matched", detail: "Q: reset password → A: article #42", time: "1s ago" }, { icon: "✓", text: "Auto-resolved", detail: "Shipping policy question", time: "3s ago" }] },
    { num: "06", title: "Real-time Analytics", desc: "Dashboards that update live. Track resolution rates, CSAT, agent performance, and channel health.", color: "from-rose-500 to-rose-600", bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-600", bullets: ["Live dashboards", "Export reports", "Custom metrics"], feed: [{ icon: "✓", text: "Updated", detail: "Resolution rate: 87%", time: "Just now" }, { icon: "!", text: "Alert", detail: "CSAT dipped below 4.0", time: "5s ago" }, { icon: "✓", text: "Report", detail: "Weekly summary generated", time: "12s ago" }] },
  ];

  const agents = [
    { name: "Intake", desc: "Classifies and routes incoming tickets", color: "from-blue-500 to-blue-600" },
    { name: "Knowledge", desc: "Searches and retrieves relevant articles", color: "from-emerald-500 to-emerald-600" },
    { name: "Resolution", desc: "Auto-resolves common issues", color: "from-purple-500 to-purple-600" },
    { name: "QA", desc: "Monitors response quality and tone", color: "from-amber-500 to-amber-600" },
    { name: "Escalation", desc: "Routes critical issues to the right team", color: "from-red-500 to-red-600" },
    { name: "Sentiment", desc: "Detects emotions in real-time", color: "from-cyan-500 to-cyan-600" },
    { name: "Analytics", desc: "Generates insights and trend reports", color: "from-rose-500 to-rose-600" },
  ];

  return (
    <PublicShell>
      {/* ───────── HERO ───────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-blue-500/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" style={{ animation: "float 12s ease-in-out infinite" }} />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-[80px]" style={{ animation: "float 15s ease-in-out infinite reverse" }} />

        <div className="relative max-w-[1200px] mx-auto px-6 pt-32 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[13px] font-semibold text-blue-300 uppercase tracking-wider">{t("hero.badge")}</span>
              </div>
              <h1 className="text-[48px] sm:text-[64px] lg:text-[76px] font-extrabold leading-[0.95] tracking-tight text-white mb-6">
                {t("hero.title1")}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-blue-400 italic">{heroWords[wordIndex]}</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-400/20 rounded-sm" />
                </span>
                <br />{t("hero.title2")}
              </h1>
              <p className="text-lg text-gray-300/90 max-w-lg mb-10 leading-relaxed">
                {t("hero.desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="px-8 py-4 bg-white text-gray-900 rounded-xl text-[15px] font-semibold hover:bg-gray-100 transition-all text-center shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  {t("hero.cta")}
                </Link>
                <Link href="/features" className="px-8 py-4 bg-transparent border-2 border-blue-400/40 text-blue-300 rounded-xl text-[15px] font-semibold hover:bg-blue-400/10 transition-all text-center hover:scale-[1.02] active:scale-[0.98]">
                  {t("hero.demo")}
                </Link>
              </div>
            </div>

            {/* Right — Live Dashboard Preview */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-3xl" />
              <div className="relative bg-white/[0.06] backdrop-blur-xl rounded-3xl border border-white/[0.08] p-6 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Open", value: ticket.open, color: "text-blue-400" },
                    { label: "Pending", value: ticket.pending, color: "text-amber-400" },
                    { label: "Escalated", value: ticket.escalated, color: "text-red-400" },
                    { label: "Resolved", value: ticket.resolved, color: "text-emerald-400" },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-xl bg-white/[0.04] border border-white/[0.05]">
                      <div className={`text-xl font-extrabold ${s.color}`}>{s.value}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Recent tickets */}
                <div className="space-y-2">
                  {recentTickets.slice(0, 3).map((rt: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.05]">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`h-2 w-2 rounded-full shrink-0 ${
                          rt.status === "open" ? "bg-blue-400" :
                          rt.status === "pending" ? "bg-amber-400" :
                          rt.status === "escalated" ? "bg-red-400" : "bg-emerald-400"
                        }`} />
                        <span className="text-xs font-mono text-gray-400">{rt.ticket_number}</span>
                        <span className="text-xs text-gray-300 truncate">{rt.subject}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 shrink-0 ml-2">
                        {rt.customer_name || "Customer"}
                      </span>
                    </div>
                  ))}
                  {recentTickets.length === 0 && (
                    <>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.05]">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        <span className="text-xs font-mono text-gray-400">SSV-1234</span>
                        <span className="text-xs text-gray-300">Loading tickets...</span>
                      </div>
                    </>
                  )}
                </div>
                {/* Channel activity */}
                <div className="flex gap-2 flex-wrap">
                  {["whatsapp", "email", "web_chat", "sms", "messenger", "instagram"].map((ch) => (
                    <span key={ch} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.05] text-[11px] text-gray-300 capitalize">
                      {ch.replace("_", " ")} {channelCounts[ch] ? `${channelCounts[ch]}` : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ───────── LIVE STATS BAND ───────── */}
      <RevealSection className="relative -mt-12 z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: t("stats.autoResolution"), value: ticket.autoResolutionRate || 67, suffix: "%", color: "from-blue-500 to-blue-600", icon: "⚡" },
            { label: t("stats.avgResponse"), value: 42, suffix: "s", color: "from-emerald-500 to-emerald-600", icon: "⏱" },
            { label: t("stats.uptime"), value: 99.99, suffix: "%", color: "from-purple-500 to-purple-600", icon: "🛡" },
            { label: t("stats.customers"), value: customer.total || 16, suffix: "+", color: "from-amber-500 to-amber-600", icon: "👥" },
          ].map((stat, i) => (
            <RevealSection key={stat.label} delay={i * 100}>
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3 shadow-lg`}>
                  <span className="brightness-0 invert">{stat.icon}</span>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </RevealSection>
          ))}
        </div>
      </RevealSection>

      {/* ───────── TRUSTED BY ───────── */}
      <RevealSection className="py-20 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <p className="text-gray-400 text-[15px]">{t("trusted.title")}</p>
            <Link href="/about" className="text-sm font-semibold text-gray-900 border border-gray-200 rounded-xl px-5 py-2.5 hover:bg-gray-50 transition-colors hidden sm:flex items-center gap-2">
              {t("trusted.readAll")} <span className="text-gray-400">→</span>
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
          <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t("problem.label")}</p>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight mb-4 leading-[1.05]">
            {t("problem.title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-16">{t("problem.desc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "!", title: "Ticket never triaged", desc: "Customer sends a message at 2am. No one picks it up. The session dies. They don't come back.", color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
              { icon: "~", title: "Escalation fires too late", desc: "By the time your team sees it, the customer has already churned. The damage is done.", color: "from-rose-500 to-rose-600", bg: "bg-rose-50" },
              { icon: "₹", title: "Resolution fails silently", desc: "Agent responds with a template. Customer is frustrated. Silent failures for hours before anyone notices.", color: "from-amber-500 to-amber-600", bg: "bg-amber-50" },
              { icon: "↻", title: "No fallback path", desc: "One channel fails and everything stops. No automatic second attempt. Just silence.", color: "from-gray-400 to-gray-500", bg: "bg-gray-50" },
            ].map((card, i) => (
              <RevealSection key={card.title} delay={i * 100}>
                <div className="text-left p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group bg-white">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <span className="text-white">{card.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ───────── THE SOLUTION (blue band) ───────── */}
      <section className="relative py-24 bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="max-w-[1200px] mx-auto px-6 text-center relative">
          <p className="text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">{t("solution.label")}</p>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
            {t("solution.title")}
          </h2>
          <p className="text-gray-300/80 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("solution.desc")}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ───────── FEATURES 01-06 ───────── */}
      <section id="features" className="relative py-12">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <RevealSection className="text-center mb-12">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t("features.label")}</p>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.05]">
              {t("features.title")}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">{t("features.subtitle")}</p>
          </RevealSection>

          <div className="space-y-6">
            {features.map((feat, idx) => (
              <RevealSection key={feat.num} delay={idx * 50}>
                <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f0f4f8] rounded-3xl overflow-hidden min-h-[400px]">
                  {/* Text side */}
                  <div className={`p-10 lg:p-14 flex flex-col justify-center ${idx % 2 === 1 ? "order-2 lg:order-2" : ""}`}>
                    <div className={`inline-flex items-center gap-2 mb-4`}>
                      <span className={`text-xs font-bold ${feat.text} uppercase tracking-[0.15em]`}>{feat.num} · {feat.title}</span>
                    </div>
                    <h3 className="text-[26px] sm:text-[30px] font-extrabold leading-tight mb-4">{feat.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-6">{feat.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {feat.bullets.map((b) => (
                        <span key={b} className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl ${feat.bg} border ${feat.border} text-[13px] font-medium ${feat.text}`}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Live feed side */}
                  <div className={`bg-white p-8 flex flex-col justify-center ${idx % 2 === 1 ? "order-1 lg:order-1" : ""}`}>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Live Event Feed</p>
                    <div className="space-y-3">
                      {feat.feed.map((e, ei) => (
                        <div key={ei} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                          <span className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            e.icon === "✓" ? "bg-emerald-100 text-emerald-600" :
                            e.icon === "!" ? "bg-amber-100 text-amber-600" :
                            "bg-red-100 text-red-600"
                          }`}>
                            {e.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-semibold text-gray-800">{e.text}</span>
                            <span className="text-xs text-gray-400 ml-2">{e.detail}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 shrink-0">{e.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CHANNELS ───────── */}
      <section id="channels" className="py-24 border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t("channels.label")}</p>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.05]">
              {t("channels.title")}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">{t("channels.desc")}</p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "WhatsApp", desc: "2B+ users worldwide", color: "from-[#25D366] to-[#128C7E]", icon: "M", stats: channelCounts.whatsapp || 0 },
              { name: "Email", desc: "IMAP/SMTP integration", color: "from-[#FF6600] to-[#E55B00]", icon: "@", stats: channelCounts.email || 0 },
              { name: "SMS", desc: "Termii-powered delivery", color: "from-[#2196F3] to-[#1976D2]", icon: "~", stats: channelCounts.sms || 0 },
              { name: "Web Chat", desc: "Embeddable widget", color: "from-[#8B5CF6] to-[#7C3AED]", icon: "W", stats: channelCounts.web_chat || 0 },
              { name: "Messenger", desc: "Facebook integration", color: "from-[#1877F2] to-[#0D65D9]", icon: "M", stats: channelCounts.messenger || 0 },
              { name: "Instagram", desc: "DM support", color: "from-[#833AB4] to-[#FD1D1D]", icon: "I", stats: channelCounts.instagram || 0 },
            ].map((ch, i) => (
              <RevealSection key={ch.name} delay={i * 80}>
                <Link href="/channels" className="block group">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${ch.color} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                        {ch.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-xs text-gray-400">{ch.stats} tickets</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{ch.name}</h3>
                    <p className="text-sm text-gray-400">{ch.desc}</p>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── AI AGENTS ───────── */}
      <section id="agents" className="py-24 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t("agents.label")}</p>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.05]">
              {t("agents.title")}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">{t("agents.desc")}</p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {agents.map((agent, i) => (
              <RevealSection key={agent.name} delay={i * 80}>
                <Link href="/agents" className="block group">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white font-bold text-sm shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                      AI
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{agent.name} Agent</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{agent.desc}</p>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="py-24 border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t("howItWorks.label")}</p>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.05]">
              {t("howItWorks.title")}
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", icon: "↓", title: "Ingest", desc: "Customer message arrives on any channel — WhatsApp, Email, SMS, Web, Messenger, or Instagram.", color: "from-blue-500 to-blue-600" },
              { num: "02", icon: "⚡", title: "Classify", desc: "AI Intake Agent detects intent, sentiment, and urgency in under 50ms. Routes to the right queue.", color: "from-emerald-500 to-emerald-600" },
              { num: "03", icon: "↗", title: "Resolve", desc: "Knowledge Agent and Resolution Agent handle the query. 67% resolved without human intervention.", color: "from-purple-500 to-purple-600" },
              { num: "04", icon: "✓", title: "Escalate", desc: "If needed, the Escalation Agent hands off to a human with full context. SLA is always enforced.", color: "from-amber-500 to-amber-600" },
            ].map((step, i) => (
              <RevealSection key={step.num} delay={i * 100}>
                <div className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group h-full bg-white">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-lg font-bold mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                    {step.icon}
                  </div>
                  <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.15em] mb-2">Step {step.num}</p>
                  <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SECURITY & COMPLIANCE ───────── */}
      <section className="py-24 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <RevealSection>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t("security.label")}</p>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight mb-4 leading-[1.05]">
              {t("security.title")}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12">{t("security.desc")}</p>
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
      <section className="py-24 border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <RevealSection>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t("integrations.label")}</p>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight mb-4 leading-[1.05]">
              {t("integrations.title")}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12">{t("integrations.desc")}</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-0 border border-gray-100 rounded-2xl overflow-hidden bg-white max-w-4xl mx-auto mb-8">
              {["WhatsApp", "Zapier", "Instagram", "Twilio", "Slack", "Gmail", "Mailgun", "Amazon SNS", "Firebase", "Stripe", "HubSpot", "Telegram"].map((name) => (
                <div key={name} className="flex items-center justify-center h-20 border-r border-b border-gray-100 last:border-r-0 hover:bg-gray-50/50 transition-colors">
                  <span className="text-xs font-bold text-gray-400">{name}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mb-6">{t("integrations.noTool")}</p>
            <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-200 rounded-xl text-[15px] font-semibold text-gray-700 hover:border-gray-300 hover:bg-white transition-all">
              {t("integrations.apiCta")} <span>→</span>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="relative py-24 bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-50 to-transparent" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="max-w-[800px] mx-auto px-6 text-center relative">
          <RevealSection>
            <p className="text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">{t("cta.label")}</p>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              {t("cta.title")}
            </h2>
            <p className="text-gray-300/80 text-lg mb-10">{t("cta.desc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-gray-900 rounded-xl text-[15px] font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                {t("cta.book")}
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-blue-400/40 text-blue-300 rounded-xl text-[15px] font-semibold hover:bg-blue-400/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
                {t("cta.start")}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </PublicShell>
  );
}
