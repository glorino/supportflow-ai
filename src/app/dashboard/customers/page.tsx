"use client";

import { useState } from "react";
import Link from "next/link";

const customers = [
  { id: 1, name: "Sarah Chen", email: "sarah@acme.com", company: "Acme Corp", segment: "Enterprise", ltv: "₦36,750,000", tickets: 12, csat: 4.8, lastActive: "2 min ago", status: "active", avatar: "SC", plan: "Growth", source: "WhatsApp", sourceIcon: "📱", sourceDate: "Jan 12, 2024" },
  { id: 2, name: "Marcus Johnson", email: "marcus@techstart.io", company: "TechStart Inc", segment: "Enterprise", ltv: "₦27,300,000", tickets: 8, csat: 4.5, lastActive: "15 min ago", status: "active", avatar: "MJ", plan: "Enterprise", source: "Email", sourceIcon: "📧", sourceDate: "Mar 5, 2024" },
  { id: 3, name: "Emily Rodriguez", email: "emily@design.co", company: "Design Studio", segment: "Pro", ltv: "₦12,600,000", tickets: 5, csat: 4.9, lastActive: "1 hour ago", status: "active", avatar: "ER", plan: "Pro", source: "Web Chat", sourceIcon: "💬", sourceDate: "Feb 18, 2024" },
  { id: 4, name: "James Park", email: "james@retail.com", company: "RetailCo", segment: "Business", ltv: "₦18,900,000", tickets: 15, csat: 4.2, lastActive: "3 hours ago", status: "active", avatar: "JP", plan: "Business", source: "SMS", sourceIcon: "💬", sourceDate: "Apr 22, 2024" },
  { id: 5, name: "Lisa Wang", email: "lisa@startup.app", company: "StartupApp", segment: "Starter", ltv: "₦4,800,000", tickets: 3, csat: 4.7, lastActive: "4 hours ago", status: "active", avatar: "LW", plan: "Starter", source: "Messenger", sourceIcon: "💬", sourceDate: "May 8, 2024" },
  { id: 6, name: "Tom Miller", email: "tom@mobile.dev", company: "MobileDev", segment: "Pro", ltv: "₦14,700,000", tickets: 7, csat: 4.3, lastActive: "5 hours ago", status: "active", avatar: "TM", plan: "Pro", source: "Instagram", sourceIcon: "📸", sourceDate: "Jun 1, 2024" },
  { id: 7, name: "Anna Smith", email: "anna@corp.net", company: "CorpNet", segment: "Business", ltv: "₦23,100,000", tickets: 11, csat: 4.6, lastActive: "6 hours ago", status: "inactive", avatar: "AS", plan: "Business", source: "WhatsApp", sourceIcon: "📱", sourceDate: "Jan 28, 2024" },
  { id: 8, name: "Mike Davis", email: "mike@growth.io", company: "GrowthIO", segment: "Enterprise", ltv: "₦33,150,000", tickets: 6, csat: 4.8, lastActive: "7 hours ago", status: "active", avatar: "MD", plan: "Enterprise", source: "Web Chat", sourceIcon: "💬", sourceDate: "Feb 14, 2024" },
  { id: 9, name: "Rachel Green", email: "rachel@coffee.co", company: "Coffee Co", segment: "Starter", ltv: "₦4,200,000", tickets: 2, csat: 4.9, lastActive: "1 day ago", status: "active", avatar: "RG", plan: "Starter", source: "Email", sourceIcon: "📧", sourceDate: "Apr 3, 2024" },
  { id: 10, name: "David Kim", email: "david@fintech.com", company: "FinTech Pro", segment: "Enterprise", ltv: "₦46,800,000", tickets: 18, csat: 4.4, lastActive: "2 hours ago", status: "active", avatar: "DK", plan: "Enterprise", source: "WhatsApp", sourceIcon: "📱", sourceDate: "Dec 10, 2023" },
];

const segmentColor: Record<string, string> = {
  Enterprise: "bg-purple-100 text-purple-700",
  Business: "bg-blue-100 text-blue-700",
  Pro: "bg-green-100 text-green-700",
  Starter: "bg-gray-100 text-gray-600",
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");

  const filtered = customers.filter((c) => {
    if (segmentFilter !== "all" && c.segment.toLowerCase() !== segmentFilter) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage your customer database</p>
        </div>
        <button className="btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Customer
        </button>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: "Enterprise", count: 4, revenue: "₦144,000,000", icon: "🏢", gradient: "from-purple-500 via-violet-500 to-indigo-600", cardBg: "card-gradient-purple" },
          { label: "Business", count: 2, revenue: "₦42,000,000", icon: "📈", gradient: "from-blue-500 via-blue-600 to-cyan-600", cardBg: "card-gradient-blue" },
          { label: "Pro", count: 2, revenue: "₦27,300,000", icon: "⭐", gradient: "from-green-500 via-emerald-500 to-teal-600", cardBg: "card-gradient-green" },
          { label: "Starter", count: 2, revenue: "₦9,000,000", icon: "🚀", gradient: "from-amber-400 via-orange-500 to-red-500", cardBg: "card-gradient-amber" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border border-gray-200 p-5 card-glow cursor-pointer group ${s.cardBg}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>{s.icon}</div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{s.label}</div>
                <div className="text-xs text-gray-500">{s.count} customers</div>
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">{s.revenue}</div>
            <div className="text-xs text-gray-500">Annual revenue</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search customers by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-search"
          />
        </div>
        <select
          value={segmentFilter}
          onChange={(e) => setSegmentFilter(e.target.value)}
          className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none"
        >
          <option value="all">All Segments</option>
          <option value="enterprise">Enterprise</option>
          <option value="business">Business</option>
          <option value="pro">Pro</option>
          <option value="starter">Starter</option>
        </select>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto">
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Segment</th>
              <th className="hidden sm:table-cell text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">LTV</th>
              <th className="hidden sm:table-cell text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tickets</th>
              <th className="hidden sm:table-cell text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">CSAT</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="hidden sm:table-cell text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <Link href={`/dashboard/customers/${c.id}`} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">{c.avatar}</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.email}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/dashboard/tickets?channel=${encodeURIComponent(c.source)}`} className="flex items-center gap-2 group/source">
                    <span className="text-sm">{c.sourceIcon}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900 group-hover/source:text-blue-600 transition">{c.source}</div>
                      <div className="text-[10px] text-gray-400">since {c.sourceDate}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${segmentColor[c.segment]}`}>{c.segment}</span></td>
                <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">{c.plan}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{c.ltv}</td>
                <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">{c.tickets}</td>
                <td className="hidden sm:table-cell px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-gray-900">{c.csat}</span>
                    <span className="text-amber-400 text-xs">★</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${c.status === "active" ? "bg-green-500" : "bg-gray-300"}`} />
                    <span className="text-xs text-gray-600 capitalize">{c.status}</span>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-6 py-4 text-xs text-gray-400 text-right">{c.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
