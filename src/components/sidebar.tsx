"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, getInitials } from "@/lib/auth/context";

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", badge: null, roles: ["super_admin", "admin", "manager", "agent", "viewer"] },
  { label: "Inbox", href: "/dashboard/inbox", icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4", badge: "24", roles: ["super_admin", "admin", "manager", "agent"] },
  { label: "Tickets", href: "/dashboard/tickets", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", badge: "8", roles: ["super_admin", "admin", "manager", "agent"] },
  { label: "Customers", href: "/dashboard/customers", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", badge: null, roles: ["super_admin", "admin", "manager", "agent"] },
  { label: "Knowledge Base", href: "/dashboard/knowledge", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", badge: null, roles: ["super_admin", "admin", "manager", "agent"] },
];

const analyticsNav = [
  { label: "Analytics", href: "/dashboard/analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", badge: null, roles: ["super_admin", "admin", "manager"] },
  { label: "Teams", href: "/dashboard/teams", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", badge: null, roles: ["super_admin", "admin", "manager"] },
  { label: "Escalation", href: "/dashboard/escalation", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", badge: null, roles: ["super_admin", "admin", "manager", "agent"] },
];

const settingsNav = [
  { label: "Settings", href: "/dashboard/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", badge: null, roles: ["super_admin", "admin"] },
];

const roleConfig: Record<string, { label: string; color: string; gradient: string }> = {
  super_admin: { label: "Super Admin", color: "bg-purple-100 text-purple-700 border-purple-200", gradient: "from-purple-500 to-indigo-600" },
  admin: { label: "Admin", color: "bg-blue-100 text-blue-700 border-blue-200", gradient: "from-blue-500 to-indigo-600" },
  manager: { label: "Manager", color: "bg-green-100 text-green-700 border-green-200", gradient: "from-green-500 to-emerald-600" },
  agent: { label: "Agent", color: "bg-amber-100 text-amber-700 border-amber-200", gradient: "from-amber-500 to-orange-600" },
  viewer: { label: "Viewer", color: "bg-gray-100 text-gray-600 border-gray-200", gradient: "from-gray-500 to-gray-600" },
};

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const userRole = user?.role || "agent";
  const config = roleConfig[userRole] || roleConfig.agent;

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const filterByRole = (items: typeof mainNav) => items.filter(item => item.roles.includes(userRole));

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-[260px] border-r border-gray-200 bg-white hidden lg:flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-5">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-shadow">
            <span className="text-white font-bold text-sm">SSV</span>
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">SSV</span>
            <span className="text-lg font-bold text-blue-600 ml-1">CRM</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        {/* Main Section */}
        <div className="mb-4">
          <div className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Main</div>
          {filterByRole(mainNav).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm shadow-blue-600/5 border border-blue-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className={`flex items-center justify-center w-5 h-5 ${isActive(item.href) ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"} transition-colors`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={`h-5 min-w-[20px] rounded-full text-[10px] font-bold flex items-center justify-center px-1.5 ${
                  isActive(item.href) ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
                } transition-colors`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="mb-4">
          <div className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Analytics</div>
          {filterByRole(analyticsNav).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 shadow-sm shadow-purple-600/5 border border-purple-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className={`flex items-center justify-center w-5 h-5 ${isActive(item.href) ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"} transition-colors`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <span className="flex-1">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* System Section */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">System</div>
          {filterByRole(settingsNav).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 shadow-sm shadow-amber-600/5 border border-amber-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className={`flex items-center justify-center w-5 h-5 ${isActive(item.href) ? "text-amber-600" : "text-gray-400 group-hover:text-gray-600"} transition-colors`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <span className="flex-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-100 space-y-2">
        {user && (
          <div className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 p-3">
            <div className="flex items-center gap-3">
              <div className={`relative h-10 w-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                {getInitials(user.name)}
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">{user.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold border ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
