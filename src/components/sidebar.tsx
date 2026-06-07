"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Tickets", href: "/dashboard/tickets", icon: "🎫" },
  { label: "Customers", href: "/dashboard/customers", icon: "👥" },
  { label: "Knowledge Base", href: "/dashboard/knowledge", icon: "📚" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "📈" },
  { label: "Teams", href: "/dashboard/teams", icon: "🏢" },
  { label: "Escalation", href: "/dashboard/escalation", icon: "🚨" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 bg-white hidden lg:block">
      <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">SF</span>
        </div>
        <span className="text-lg font-bold text-gray-900">
          SupportFlow<span className="text-blue-600"> AI</span>
        </span>
      </div>
      <nav className="p-4 space-y-1">
        {nav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
