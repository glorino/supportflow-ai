"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password: "temp123", role: "agent" }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Account created! Check your email for credentials.");
      } else {
        setStatus("error");
        setMessage(data.error || "Registration failed");
      }
    } catch {
      setStatus("error");
      setMessage("Connection failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600" style={{ backgroundSize: "200% 200%", animation: "gradient-shift 8s ease infinite" }} />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" style={{ animation: "float 6s ease-in-out infinite" }} />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl" style={{ animation: "float 8s ease-in-out infinite 2s" }} />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <div className="flex items-center gap-3 mb-14">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-xl">SF</span>
            </div>
            <span className="text-2xl font-bold text-white">SupportFlow<span className="text-pink-200"> AI</span></span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Team Account<br /><span className="text-pink-200">Request</span>
          </h1>
          <p className="text-lg text-pink-100/80 mb-10 max-w-md leading-relaxed">
            New accounts are created by your organization administrator. Request access below or contact your admin directly.
          </p>
          <div className="space-y-4">
            {[
              { icon: "🔐", title: "Secure by Design", desc: "Admin-controlled account provisioning" },
              { icon: "👥", title: "Team Management", desc: "RBAC with 5 role levels" },
              { icon: "🛡️", title: "Enterprise Ready", desc: "SOC 2, GDPR compliant" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl shrink-0 border border-white/10 group-hover:bg-white/20 transition-all duration-300">{f.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-white">{f.title}</div>
                  <div className="text-xs text-pink-200/70">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl" />
        <div className="w-full max-w-md relative">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-lg shadow-purple-600/25">
                <span className="text-white font-bold text-xl">SF</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">SupportFlow<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> AI</span></span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Request Access</h2>
            <p className="text-sm text-gray-500">Submit a request for your administrator to create your account</p>
          </div>

          {status === "success" ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
              <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Submitted</h3>
              <p className="text-sm text-gray-600 mb-6">{message}</p>
              <Link href="/login" className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                Go to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full rounded-xl border-2 border-gray-100 px-4 py-3 text-sm placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full rounded-xl border-2 border-gray-100 px-4 py-3 text-sm placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {status === "error" && (
                <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2.5">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3.5 text-sm font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-purple-600/25"
              >
                {status === "loading" ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold transition">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
