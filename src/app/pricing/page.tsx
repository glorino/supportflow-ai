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
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const plans = [
  {
    name: "Starter",
    price: "₦50,000",
    period: "/month",
    desc: "Perfect for small teams getting started with AI-powered support.",
    popular: false,
    features: [
      "1 agent",
      "500 tickets/month",
      "Email + Web Chat",
      "Basic AI classification",
      "Standard SLA",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    price: "₦150,000",
    period: "/month",
    desc: "For growing teams that need full omnichannel power and analytics.",
    popular: true,
    features: [
      "5 agents",
      "5,000 tickets/month",
      "All 6 channels",
      "Full AI Suite",
      "Priority SLA",
      "Advanced analytics",
      "Custom integrations",
      "Priority support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "₦500,000",
    period: "/month",
    desc: "For large organisations that need unlimited scale and dedicated support.",
    popular: false,
    features: [
      "Unlimited agents",
      "Unlimited tickets",
      "All 6 channels",
      "Full AI Suite",
      "Dedicated SLA",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
      "Custom onboarding",
    ],
    cta: "Contact Sales",
  },
];

const compareFeatures = [
  { label: "Agents", starter: "1", pro: "5", enterprise: "Unlimited" },
  { label: "Tickets / month", starter: "500", pro: "5,000", enterprise: "Unlimited" },
  { label: "Email", starter: true, pro: true, enterprise: true },
  { label: "Web Chat", starter: true, pro: true, enterprise: true },
  { label: "WhatsApp", starter: false, pro: true, enterprise: true },
  { label: "SMS", starter: false, pro: true, enterprise: true },
  { label: "Facebook Messenger", starter: false, pro: true, enterprise: true },
  { label: "Instagram", starter: false, pro: true, enterprise: true },
  { label: "Basic AI Classification", starter: true, pro: true, enterprise: true },
  { label: "Full AI Suite", starter: false, pro: true, enterprise: true },
  { label: "Standard SLA", starter: true, pro: false, enterprise: false },
  { label: "Priority SLA", starter: false, pro: true, enterprise: false },
  { label: "Dedicated SLA", starter: false, pro: false, enterprise: true },
  { label: "Analytics Dashboard", starter: false, pro: true, enterprise: true },
  { label: "Advanced Analytics", starter: false, pro: true, enterprise: true },
  { label: "Custom Integrations", starter: false, pro: true, enterprise: true },
  { label: "Knowledge Base", starter: false, pro: true, enterprise: true },
  { label: "Priority Support", starter: false, pro: true, enterprise: true },
  { label: "Dedicated Account Manager", starter: false, pro: false, enterprise: true },
  { label: "Custom Onboarding", starter: false, pro: false, enterprise: true },
];

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. You can upgrade or downgrade your plan at any time from your dashboard. When you upgrade, the new pricing takes effect immediately and you are billed pro-rata for the remainder of the billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan includes a 14-day free trial with full access to all features in that tier. No credit card is required to start. If you do not upgrade by the end of the trial, your account is automatically downgraded to the free tier.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major debit and credit cards, bank transfers, and USSD payments. All payments are processed in Nigerian Naira (₦) through our PCI-DSS compliant payment processor.",
  },
  {
    q: "What happens when I reach my ticket limit?",
    a: "When you reach your monthly ticket limit, new tickets are still received and stored but are not processed by AI until you upgrade or the next billing cycle begins. You will receive a notification at 80% and 100% of your limit.",
  },
  {
    q: "Do you offer annual billing discounts?",
    a: "Yes. Annual billing saves you 20% compared to monthly billing. Contact our sales team to set up an annual plan.",
  },
  {
    q: "Can I add more agents to my plan?",
    a: "Starter plans include 1 agent. Professional plans include up to 5 agents. You can purchase additional agent seats at any time from your dashboard. Enterprise plans include unlimited agents.",
  },
];

function FAQItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-gray-900 pr-4">
          {faq.q}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const { t } = useLang();

  return (
    <PublicShell>
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px]" />
          <div className="relative max-w-[1200px] mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[13px] font-semibold text-blue-300 uppercase tracking-wider">
                {t("nav.pricing")}
              </span>
            </div>
            <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
              {t("pricingPage.title")}
            </h1>
            <p className="text-lg text-gray-300/80 max-w-xl mx-auto leading-relaxed">
              {t("pricingPage.subtitle")}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        <section className="relative py-20">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="max-w-[1200px] mx-auto px-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
              {plans.map((plan, i) => (
                <RevealSection key={plan.name} delay={i * 120}>
                  <div
                    className={`relative rounded-3xl p-8 transition-all duration-300 ${
                      plan.popular
                        ? "bg-white shadow-2xl shadow-blue-500/10 border-2 border-transparent scale-[1.02] z-10"
                        : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg"
                    }`}
                    style={
                      plan.popular
                        ? {
                            background:
                              "linear-gradient(white, white) padding-box, linear-gradient(135deg, #1e40af, #3b82f6, #60a5fa) border-box",
                          }
                        : undefined
                    }
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white text-[12px] font-bold uppercase tracking-wider shadow-lg shadow-blue-500/30">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {plan.desc}
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[40px] font-extrabold text-gray-900 tracking-tight">
                          {plan.price}
                        </span>
                        <span className="text-sm text-gray-400 font-medium">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-6 mb-6">
                      <ul className="space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-sm text-gray-600">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href="/login"
                      className={`block w-full text-center py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-[#1e3a8a] hover:to-[#2563eb]"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f8fafc]">
          <div className="max-w-[1200px] mx-auto px-6">
            <RevealSection>
              <div className="text-center mb-12">
                <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight mb-4">
                  Compare plans
                </h2>
                <p className="text-gray-500 text-lg">
                  A detailed look at what each plan includes.
                </p>
              </div>
            </RevealSection>
            <RevealSection delay={100}>
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left px-6 py-5 text-sm font-bold text-gray-900 w-[40%]">
                          Feature
                        </th>
                        <th className="text-center px-6 py-5 text-sm font-bold text-gray-900">
                          Starter
                        </th>
                        <th className="text-center px-6 py-5 text-sm font-bold text-blue-600 bg-blue-50/50">
                          Professional
                        </th>
                        <th className="text-center px-6 py-5 text-sm font-bold text-gray-900">
                          Enterprise
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {compareFeatures.map((f, i) => (
                        <tr
                          key={f.label}
                          className={`border-b border-gray-50 last:border-0 ${
                            i % 2 === 0 ? "bg-gray-50/30" : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                            {f.label}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof f.starter === "boolean" ? (
                              f.starter ? (
                                <svg
                                  className="w-5 h-5 text-blue-500 mx-auto"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <span className="text-gray-300 text-lg">
                                  —
                                </span>
                              )
                            ) : (
                              <span className="text-sm text-gray-700">
                                {f.starter}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center bg-blue-50/30">
                            {typeof f.pro === "boolean" ? (
                              f.pro ? (
                                <svg
                                  className="w-5 h-5 text-blue-500 mx-auto"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <span className="text-gray-300 text-lg">
                                  —
                                </span>
                              )
                            ) : (
                              <span className="text-sm font-semibold text-gray-900">
                                {f.pro}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof f.enterprise === "boolean" ? (
                              f.enterprise ? (
                                <svg
                                  className="w-5 h-5 text-blue-500 mx-auto"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <span className="text-gray-300 text-lg">
                                  —
                                </span>
                              )
                            ) : (
                              <span className="text-sm text-gray-700">
                                {f.enterprise}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-[800px] mx-auto px-6">
            <RevealSection>
              <div className="text-center mb-12">
                <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight mb-4">
                  Frequently asked questions
                </h2>
                <p className="text-gray-500 text-lg">
                  Everything you need to know about our pricing.
                </p>
              </div>
            </RevealSection>
            <RevealSection delay={100}>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <FAQItem key={faq.q} faq={faq} />
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        <section className="relative py-24 bg-gradient-to-br from-[#0b1a2e] via-[#0f2340] to-[#142d50] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
          <div className="max-w-[800px] mx-auto px-6 text-center relative">
            <RevealSection>
              <p className="text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">
                {t("cta.label")}
              </p>
              <h2 className="text-[40px] sm:text-[52px] font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                {t("cta.title")}
              </h2>
              <p className="text-gray-300/80 text-lg mb-10">
                {t("cta.desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-gray-900 rounded-full text-[15px] font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  {t("cta.start")}
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-blue-400/40 text-blue-300 rounded-full text-[15px] font-semibold hover:bg-blue-400/10 transition-all"
                >
                  {t("cta.book")}
                </Link>
              </div>
            </RevealSection>
          </div>
        </section>
      </div>
    </PublicShell>
  );
}
