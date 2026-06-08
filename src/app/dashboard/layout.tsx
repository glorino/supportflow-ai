"use client";

import { Sidebar } from "@/components/sidebar";
import { ChatWidget } from "@/components/chat-widget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/80">
      <Sidebar />
      <div className="lg:pl-[260px]">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between px-6">
            {/* Left - Search */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative max-w-md w-full">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search tickets, customers, articles... (⌘K)"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">⌘K</kbd>
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
              {/* AI Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 mr-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-700">AI Active</span>
                <span className="text-[10px] text-green-600">·</span>
                <span className="text-[10px] text-green-600">67% auto-resolved</span>
              </div>

              {/* Quick Actions */}
              <button className="h-9 w-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">3</span>
              </button>

              <button className="h-9 w-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-blue-500 text-[9px] font-bold text-white flex items-center justify-center">5</span>
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
                <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-100 transition">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    AJ
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">Alex Johnson</div>
                    <div className="text-[11px] text-gray-400">Admin</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </div>

      <ChatWidget />
    </div>
  );
}
