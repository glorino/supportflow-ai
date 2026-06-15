"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import PublicShell from "@/app/public-shell";
import { useLang } from "@/lib/i18n/context";

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

const values = [
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    gradient: "from-blue-500 to-blue-600",
    title: "Innovation",
    desc: "Pushing boundaries of what AI can do for customer support",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    gradient: "from-emerald-500 to-emerald-600",
    title: "Reliability",
    desc: "99.99% uptime SLA, never miss a ticket",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    gradient: "from-purple-500 to-purple-600",
    title: "Simplicity",
    desc: "Complex AI made simple for any team to use",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-500",
    title: "Security",
    desc: "Enterprise-grade security and compliance",
  },
];

const team = [
  { name: "Chidinma Okafor", role: "CEO", tagline: "Building the future of support", gradient: "from-[#1e40af] to-[#3b82f6]" },
  { name: "Emeka Nwosu", role: "CTO", tagline: "AI infrastructure at scale", gradient: "from-[#0891b2] to-[#06b6d4]" },
  { name: "Aisha Bello", role: "Head of Product", tagline: "User experience is everything", gradient: "from-[#7c3aed] to-[#8b5cf6]" },
  { name: "Tunde Adesanya", role: "Head of Growth", tagline: "Scaling globally from Lagos", gradient: "from-[#059669] to-[#10b981]" },
];

const statItems = [
  { value: "500+", label: "Teams Using SSV" },
  { value: "3B+", label: "Tickets Processed" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<50ms", label: "Avg Response Time" },
];

export default function AboutPage() {
  const { t } = useLang();
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const suffixes = ["+", "B+", "%", "ms"];
  const decimals = [0, 0, 2, 0];

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = [500, 3, 99.99, 50];
    const durations = [1500, 1200, 1400, 1000];
    const intervals = targets.map((target, i) => {
      const step = target / (durations[i] / 16);
      let current = 0;
      return setInterval(() => {
        current += step;
        if (current >= target) current = target;
        setCounters((prev) => {
          const next = [...prev];
          next[i] = current;
          return next;
        });
      }, 16);
    });
    return () => intervals.forEach(clearInterval);
  }, [statsVisible]);

  return (
    <PublicShell>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50]">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="max-w-[1200px] mx-auto px-6 py-28 sm:py-36 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[13px] font-semibold text-blue-300 uppercase tracking-wider">{t("aboutPage.title") || "About SSV"}</span>
          </div>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[68px] font-extrabold leading-[0.95] tracking-tight text-white mb-6">
            {t("aboutPage.title") || "About SSV"}{" "}
            <span className="italic text-blue-400">CRM</span>
          </h1>
          <p className="text-lg text-gray-300/90 max-w-2xl mx-auto leading-relaxed">
            {t("aboutPage.subtitle") || "We're building the future of customer support with AI."}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <RevealSection className="text-center mb-16">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Our Mission</p>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.05] mb-6">
            We&apos;re building the future of customer support with{" "}
            <span className="italic text-blue-600">AI</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
            SSV empowers businesses to deliver exceptional customer experiences through intelligent automation. We believe every customer interaction is an opportunity to build trust, and AI is the key to making that happen at scale.
          </p>
        </RevealSection>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <RevealSection className="text-center mb-16">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Our Values</p>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.05]">
            What drives{" "}
            <span className="italic text-blue-600">everything we build</span>
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <RevealSection key={value.title} delay={i * 80}>
              <div className="group relative h-full p-8 rounded-3xl border border-gray-100 bg-white hover:border-transparent transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">Our Story</p>
                <h2 className="text-[36px] sm:text-[48px] font-extrabold text-white leading-[1.05] mb-6">
                  Born from <span className="italic text-blue-400">frustration</span>
                </h2>
                <p className="text-gray-300/80 text-lg leading-relaxed mb-6">
                  Founded in Nigeria, SSV was born from the frustration of managing customer support across too many channels. We watched businesses struggle with fragmented tools, missed tickets, and unhappy customers.
                </p>
                <p className="text-gray-300/80 text-lg leading-relaxed">
                  We built the platform we wished existed — a single place where AI handles the repetitive work, agents focus on what matters, and no customer ever feels ignored. Today, SSV powers support for hundreds of teams across Africa and beyond.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-3xl" />
                <div className="relative bg-white/[0.08] backdrop-blur-md rounded-3xl p-8 border border-white/[0.08]">
                  <div className="space-y-4">
                    {[
                      { year: "2023", event: "Founded in Lagos, Nigeria" },
                      { year: "2024", event: "First 100 teams onboarded" },
                      { year: "2025", event: "3 billion tickets processed" },
                      { year: "2026", event: "Scaling across Africa & beyond" },
                    ].map((milestone) => (
                      <div key={milestone.year} className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-blue-300">{milestone.year}</span>
                        </div>
                        <p className="text-sm text-gray-300/80">{milestone.event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <RevealSection className="text-center mb-16">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Our Team</p>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.05]">
            The people behind{" "}
            <span className="italic text-blue-600">SSV</span>
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <RevealSection key={member.name} delay={i * 80}>
              <div className="group text-center p-8 rounded-3xl border border-gray-100 bg-white hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50">
                <div className={`h-24 w-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-2xl font-extrabold text-white">{member.name.split(" ").map((n) => n[0]).join("")}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-blue-600 mb-3">{member.role}</p>
                <p className="text-sm text-gray-400 italic">{member.tagline}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      <section ref={statsRef} className="max-w-[1200px] mx-auto px-6 pb-24">
        <RevealSection className="text-center mb-12">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">By The Numbers</p>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight leading-[1.05]">
            Trusted by teams across{" "}
            <span className="italic text-blue-600">Nigeria</span>
          </h2>
        </RevealSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((stat, i) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
                {statsVisible ? (
                  <>
                    {decimals[i] > 0 ? counters[i].toFixed(decimals[i]) : Math.floor(counters[i])}
                    {suffixes[i]}
                  </>
                ) : (
                  <span className="opacity-0">0</span>
                )}
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="max-w-[800px] mx-auto px-6 text-center relative">
          <RevealSection>
            <p className="text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">Join Us</p>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Ready to build the future of{" "}
              <span className="italic text-blue-400">support?</span>
            </h2>
            <p className="text-gray-300/80 text-lg mb-10">
              Whether you&apos;re a business looking for better support or an engineer passionate about AI, we&apos;d love to have you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-gray-900 rounded-full text-[15px] font-semibold hover:bg-gray-100 transition-all shadow-lg">
                Get Started
              </Link>
              <a href="mailto:careers@ssv.com" className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border-2 border-blue-400/40 text-blue-300 rounded-full text-[15px] font-semibold hover:bg-blue-400/10 transition-all">
                View Careers
              </a>
            </div>
          </RevealSection>
        </div>
      </section>
    </PublicShell>
  );
}
