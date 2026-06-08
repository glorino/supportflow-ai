"use client";

import Link from "next/link";
import { useState } from "react";

const demoLogins = [
  { email: "admin@supportflow.ai", password: "admin123", role: "Super Admin", name: "Alex Johnson", avatar: "AJ", gradient: "from-purple-500 to-indigo-600" },
  { email: "sarah@supportflow.ai", password: "demo123", role: "Manager", name: "Sarah Kim", avatar: "SK", gradient: "from-green-500 to-emerald-600" },
  { email: "tom@supportflow.ai", password: "demo123", role: "Agent", name: "Tom Chen", avatar: "TC", gradient: "from-blue-500 to-cyan-600" },
  { email: "viewer@supportflow.ai", password: "demo123", role: "Viewer", name: "Jordan Lee", avatar: "JL", gradient: "from-gray-500 to-gray-600" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax; Secure`;
        document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax; Secure`;
        window.location.href = "/dashboard";
      } else {
        setStatus("error");
        setError(data.error || "Login failed");
      }
    } catch {
      setStatus("error");
      setError("Connection failed. Please try again.");
    }
  };

  const handleDemoLogin = (demo: typeof demoLogins[0]) => {
    setEmail(demo.email);
    setPassword(demo.password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" style={{ backgroundSize: "200% 200%", animation: "gradient-shift 8s ease infinite" }} />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" style={{ animation: "float 6s ease-in-out infinite" }} />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl" style={{ animation: "float 8s ease-in-out infinite 2s" }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl" style={{ animation: "float 7s ease-in-out infinite 1s" }} />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRhMiAyIDAgMTEtNCAwIDIgMiAwIDAxNCAweiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-14">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-xl">SF</span>
            </div>
            <span className="text-2xl font-bold text-white">
              SupportFlow<span className="text-blue-200"> AI</span>
            </span>
          </div>

          {/* Hero */}
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Your Support Team,
            <br />
            <span className="text-blue-200">Supercharged by AI</span>
          </h1>
          <p className="text-lg text-blue-100/80 mb-12 max-w-md leading-relaxed">
            Unify every support channel into one intelligent workspace. 7 AI agents classify, route, respond, and resolve.
          </p>

          {/* Features */}
          <div className="space-y-4 mb-14">
            {[
              { icon: "🤖", title: "7 AI Agents", desc: "Intelligent automation pipeline" },
              { icon: "📡", title: "6 Channels Unified", desc: "WhatsApp, Email, SMS, Web, Messenger, Instagram" },
              { icon: "⚡", title: "56% Auto-Resolution", desc: "AI resolves tickets without human intervention" },
              { icon: "🛡️", title: "99.99% Uptime", desc: "Enterprise-grade reliability" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl shrink-0 border border-white/10 group-hover:bg-white/20 transition-all duration-300">
                  {f.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{f.title}</div>
                  <div className="text-xs text-blue-200/70">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="text-sm text-white/90 leading-relaxed mb-4">
              &quot;SupportFlow AI cut our response time by 73% and our team can focus on complex issues instead of repetitive questions.&quot;
            </div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold border border-white/20">SC</div>
              <div>
                <div className="text-sm font-semibold text-white">Sarah Chen</div>
                <div className="text-xs text-blue-200/70">Head of Support, Acme Corp</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="w-full max-w-md relative">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-blue-600/25">
                <span className="text-white font-bold text-xl">SF</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                SupportFlow<span className="text-gradient"> AI</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
            <p className="text-sm text-gray-500">Sign in to your support dashboard</p>
          </div>

          {/* Demo Logins */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Demo Access</div>
            <div className="grid grid-cols-2 gap-2.5">
              {demoLogins.map((demo) => (
                <button
                  key={demo.email}
                  onClick={() => handleDemoLogin(demo)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    email === demo.email ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-600/10" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${demo.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}>
                    {demo.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-gray-900 truncate">{demo.name}</div>
                    <div className="text-[10px] text-gray-500 font-medium">{demo.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full rounded-xl border-2 border-gray-100 px-4 py-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border-2 border-gray-100 px-4 py-3 pr-12 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {status === "error" && (
              <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2.5">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-6 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition">
                Contact Admin
              </Link>
            </p>
          </div>

          {/* Security Badge */}
          <div className="mt-8 flex items-center justify-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              SOC 2 Compliant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
