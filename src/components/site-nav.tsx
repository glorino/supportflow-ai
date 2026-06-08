"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "AI Agents", href: "/agents" },
  { label: "Channels", href: "/channels" },
  { label: "How It Works", href: "/workflow" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full border-b border-gray-100/80 bg-white/70 backdrop-blur-2xl z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                SupportFlow<span className="text-gradient"> AI</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-primary px-6 py-2.5 text-sm">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
