"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    period: "month",
    description: "For small teams getting started with AI support",
    features: [
      { text: "Up to 3 agents", included: true },
      { text: "1,000 tickets/month", included: true },
      { text: "3 channels (Web, Email, SMS)", included: true },
      { text: "Basic AI resolution", included: true },
      { text: "Email support", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Custom branding", included: false },
      { text: "API access", included: false },
    ],
    popular: false,
    gradient: "from-gray-400 to-gray-600",
    cardBg: "border-gray-200 bg-white",
    btnClass: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  },
  {
    id: "growth",
    name: "Growth",
    price: 149,
    period: "month",
    description: "For growing teams that need more power",
    features: [
      { text: "Up to 10 agents", included: true },
      { text: "5,000 tickets/month", included: true },
      { text: "All 6 channels", included: true },
      { text: "Advanced AI pipeline", included: true },
      { text: "Priority support", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: true },
      { text: "SSO & RBAC", included: false },
    ],
    popular: true,
    gradient: "from-blue-500 to-indigo-600",
    cardBg: "border-blue-300 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 shadow-lg shadow-blue-500/10",
    btnClass: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    period: "month",
    description: "For large organizations with custom needs",
    features: [
      { text: "Unlimited agents", included: true },
      { text: "Unlimited tickets", included: true },
      { text: "All 6 channels + custom", included: true },
      { text: "Full AI suite + custom models", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom branding & SLA", included: true },
      { text: "SSO & RBAC", included: true },
      { text: "Audit logs & compliance", included: true },
    ],
    popular: false,
    gradient: "from-purple-500 to-violet-600",
    cardBg: "border-purple-200 bg-gradient-to-br from-purple-50/80 via-white to-violet-50/80",
    btnClass: "border border-purple-300 text-purple-700 hover:bg-purple-50",
  },
];

const currentPlan = {
  name: "Growth",
  price: 149,
  renewalDate: "July 9, 2026",
  ticketsUsed: 2847,
  ticketsLimit: 5000,
  agentsUsed: 7,
  agentsLimit: 10,
};

function BillingContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "success") {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } else if (status === "failed" || status === "error") {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  }, [searchParams]);

  const handleSubscribe = async (planId: string) => {
    setProcessingPlan(planId);
    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email || "test@supportflow.ai",
          planId,
          userId: user?.id || "1",
        }),
      });

      const data = await res.json();

      if (data.data?.link) {
        window.location.href = data.data.link;
      } else {
        alert("Payment initialized. In test mode, you'll be redirected to Flutterwave's demo checkout.");
      }
    } catch {
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setProcessingPlan(null);
    }
  };

  return (
    <div className="space-y-6 particles">
      {/* Success/Error Toasts */}
      {showSuccess && (
        <div className="fixed top-20 right-6 z-50 animate-[slide-up_0.3s_ease]">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-5 py-3 shadow-xl shadow-green-500/10">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-green-800">Payment Successful!</div>
              <div className="text-xs text-green-600">Your plan has been updated.</div>
            </div>
          </div>
        </div>
      )}
      {showError && (
        <div className="fixed top-20 right-6 z-50 animate-[slide-up_0.3s_ease]">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 px-5 py-3 shadow-xl shadow-red-500/10">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-red-800">Payment Failed</div>
              <div className="text-xs text-red-600">Please try again or contact support.</div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Billing & Subscription</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your plan and payment methods</p>
        </div>
      </div>

      {/* Current Plan */}
      <div className="rounded-2xl border border-blue-200/60 p-6 card-premium-blue">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">{currentPlan.name} Plan</h2>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">ACTIVE</span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">Renews on {currentPlan.renewalDate}</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-gray-900">${currentPlan.price}</span>
            <span className="text-sm text-gray-500 font-medium">/month</span>
          </div>
        </div>

        {/* Usage Bars */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Tickets Used</span>
              <span className="font-semibold text-gray-900">{currentPlan.ticketsUsed.toLocaleString()} / {currentPlan.ticketsLimit.toLocaleString()}</span>
            </div>
            <div className="h-3 rounded-full bg-white/80 overflow-hidden border border-blue-100/50 shadow-inner">
              <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-700 shadow-sm" style={{ width: `${(currentPlan.ticketsUsed / currentPlan.ticketsLimit) * 100}%` }} />
            </div>
            <div className="text-xs text-gray-400 mt-1">{Math.round((currentPlan.ticketsUsed / currentPlan.ticketsLimit) * 100)}% used</div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Agents Active</span>
              <span className="font-semibold text-gray-900">{currentPlan.agentsUsed} / {currentPlan.agentsLimit}</span>
            </div>
            <div className="h-3 rounded-full bg-white/80 overflow-hidden border border-blue-100/50 shadow-inner">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-700 shadow-sm" style={{ width: `${(currentPlan.agentsUsed / currentPlan.agentsLimit) * 100}%` }} />
            </div>
            <div className="text-xs text-gray-400 mt-1">{Math.round((currentPlan.agentsUsed / currentPlan.agentsLimit) * 100)}% used</div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.cardBg} ${plan.popular ? "ring-2 ring-blue-500/20" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-1 text-[10px] font-bold text-white shadow-lg shadow-blue-500/25 uppercase tracking-wider">Most Popular</span>
                </div>
              )}

              <div className="mb-5">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${plan.gradient} text-white shadow-lg mb-3`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {plan.id === "starter" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                    {plan.id === "growth" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
                    {plan.id === "enterprise" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-sm text-gray-500 font-medium">/month</span>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <div key={f.text} className="flex items-center gap-2.5">
                    {f.included ? (
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                      </div>
                    )}
                    <span className={`text-sm ${f.included ? "text-gray-700" : "text-gray-400"}`}>{f.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={processingPlan === plan.id || plan.name === currentPlan.name}
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${plan.btnClass} ${
                  processingPlan === plan.id ? "animate-pulse" : ""
                }`}
              >
                {processingPlan === plan.id ? "Processing..." : plan.name === currentPlan.name ? "Current Plan" : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="rounded-2xl border border-gray-200/60 p-6 bg-white">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="flex items-center gap-4">
          <div className="h-12 w-20 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            VISA
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">•••• •••• •••• 4242</div>
            <div className="text-xs text-gray-500">Expires 12/2028</div>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">Default</span>
          <button className="btn-ghost text-sm">Edit</button>
        </div>
      </div>

      {/* Billing History */}
      <div className="rounded-2xl border border-gray-200/60 overflow-hidden bg-white">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Billing History</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { date: "Jun 9, 2026", amount: "$149.00", status: "paid", invoice: "INV-2026-006" },
            { date: "May 9, 2026", amount: "$149.00", status: "paid", invoice: "INV-2026-005" },
            { date: "Apr 9, 2026", amount: "$149.00", status: "paid", invoice: "INV-2026-004" },
            { date: "Mar 9, 2026", amount: "$49.00", status: "paid", invoice: "INV-2026-003" },
          ].map((b) => (
            <div key={b.invoice} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition">
              <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">{b.invoice}</div>
                <div className="text-xs text-gray-500">{b.date}</div>
              </div>
              <div className="text-sm font-bold text-gray-900">{b.amount}</div>
              <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2.5 py-0.5 text-[10px] font-semibold uppercase">Paid</span>
              <button className="btn-ghost text-xs">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
      <BillingContent />
    </Suspense>
  );
}
