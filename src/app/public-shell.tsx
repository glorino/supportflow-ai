"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/features", key: "nav.features" },
    { href: "/channels", key: "nav.channels" },
    { href: "/agents", key: "nav.agents" },
    { href: "/pricing", key: "nav.pricing" },
    { href: "/about", key: "nav.about" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#1e40af] to-[#3b82f6] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                <img src="/logo.svg" alt="SSV" className="h-5 w-5 brightness-0 invert" />
              </div>
              <span className="text-[22px] font-extrabold tracking-tight text-gray-900">SSV</span>
            </Link>
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            {/* EN/FR Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 mr-2">
              {(["en", "fr"] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    locale === l
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href="/login" className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors px-4 py-2">
              {t("nav.signIn")}
            </Link>
            <Link
              href="/login"
              className="relative text-[14px] font-semibold text-white bg-gradient-to-r from-[#1e40af] to-[#3b82f6] px-5 py-2.5 rounded-xl hover:from-[#1e3a8a] hover:to-[#2563eb] transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-blue-300 animate-pulse" />
              {t("nav.getStarted")}
            </Link>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-6 space-y-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block text-base font-medium text-gray-700 py-2">
                {t(item.key)}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              {(["en", "fr"] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    locale === l ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link href="/login" className="text-center text-sm font-medium text-gray-700 py-2" onClick={() => setMobileOpen(false)}>
                {t("nav.signIn")}
              </Link>
              <Link href="/login" className="text-center text-sm font-semibold text-white bg-gradient-to-r from-[#1e40af] to-[#3b82f6] rounded-xl py-3" onClick={() => setMobileOpen(false)}>
                {t("nav.getStarted")}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* CONTENT */}
      <main className="pt-[72px]">{children}</main>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#1e40af] to-[#3b82f6] flex items-center justify-center">
                  <img src="/logo.svg" alt="SSV" className="h-4 w-4 brightness-0 invert" />
                </div>
                <span className="text-lg font-extrabold">SSV</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t("footer.desc")}</p>
            </div>
            {[
              { title: t("footer.platform"), links: [t("nav.features"), t("nav.channels"), t("nav.agents"), "API Reference", "Documentation"] },
              { title: "Solutions", links: ["Enterprise Support", "Customer Service", "Technical Support", "Sales Support"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Customer Stories", "Blog", "Status Page"] },
              { title: t("footer.company"), links: [t("nav.about"), "Careers", "Privacy Policy", "Terms & Conditions"] },
            ].map((col) => (
              <div key={col.title}>
                <h5 className="text-sm font-bold text-gray-900 mb-4">{col.title}</h5>
                <div className="space-y-2.5">
                  {col.links.map((link) => (
                    <a key={link} href="#" className="block text-sm text-gray-400 hover:text-gray-700 transition-colors">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>© 2026 SSV. All rights reserved.</span>
              <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms & Conditions</Link>
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
    </div>
  );
}
