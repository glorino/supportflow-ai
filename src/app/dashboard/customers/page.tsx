"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  email: string;
  name: string;
  company: string;
  segment: string;
  plan: string;
  ltv: number;
  csat: number;
  totalTickets: number;
  status: string;
  sourceChannel: string;
  firstTicketDate: string;
  createdAt: string;
}

const segmentColor: Record<string, string> = {
  enterprise: "bg-purple-100 text-purple-700",
  business: "bg-blue-100 text-blue-700",
  pro: "bg-green-100 text-green-700",
  starter: "bg-gray-100 text-gray-600",
};

const channelIcon: Record<string, string> = {
  whatsapp: "📱",
  email: "📧",
  web: "💬",
  sms: "💬",
  messenger: "💬",
  instagram: "📸",
};

const channelDisplayNames: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  web: "Web Chat",
  sms: "SMS",
  messenger: "Messenger",
  instagram: "Instagram",
};

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (segmentFilter !== "all") params.set("segment", segmentFilter);

    fetch(`/api/customers?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchQuery, segmentFilter]);

  const enterpriseCount = customers.filter((c) => c.segment === "enterprise").length;
  const businessCount = customers.filter((c) => c.segment === "business").length;
  const proCount = customers.filter((c) => c.segment === "pro").length;
  const starterCount = customers.filter((c) => c.segment === "starter").length;

  const enterpriseRevenue = customers.filter((c) => c.segment === "enterprise").reduce((sum, c) => sum + (c.ltv || 0), 0);
  const businessRevenue = customers.filter((c) => c.segment === "business").reduce((sum, c) => sum + (c.ltv || 0), 0);
  const proRevenue = customers.filter((c) => c.segment === "pro").reduce((sum, c) => sum + (c.ltv || 0), 0);
  const starterRevenue = customers.filter((c) => c.segment === "starter").reduce((sum, c) => sum + (c.ltv || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">{customers.length} customers from database</p>
        </div>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: "Enterprise", count: enterpriseCount, revenue: formatNaira(enterpriseRevenue), icon: "🏢", gradient: "from-purple-500 via-violet-500 to-indigo-600", cardBg: "card-gradient-purple" },
          { label: "Business", count: businessCount, revenue: formatNaira(businessRevenue), icon: "📈", gradient: "from-blue-500 via-blue-600 to-cyan-600", cardBg: "card-gradient-blue" },
          { label: "Pro", count: proCount, revenue: formatNaira(proRevenue), icon: "⭐", gradient: "from-green-500 via-emerald-500 to-teal-600", cardBg: "card-gradient-green" },
          { label: "Starter", count: starterCount, revenue: formatNaira(starterRevenue), icon: "🚀", gradient: "from-amber-400 via-orange-500 to-red-500", cardBg: "card-gradient-amber" },
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
            <div className="text-xs text-gray-500">Total LTV</div>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/customers/${c.id}`} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.email}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {c.sourceChannel ? (
                      <Link href={`/dashboard/tickets?channel=${encodeURIComponent(c.sourceChannel)}`} className="flex items-center gap-2 group/source">
                        <span className="text-sm">{channelIcon[c.sourceChannel] || "💬"}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900 group-hover/source:text-blue-600 transition">{channelDisplayNames[c.sourceChannel] || c.sourceChannel}</div>
                          {c.firstTicketDate && (
                            <div className="text-[10px] text-gray-400">since {formatDate(c.firstTicketDate)}</div>
                          )}
                        </div>
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400">No tickets</span>
                    )}
                  </td>
                  <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${segmentColor[c.segment] || "bg-gray-100 text-gray-600"}`}>{c.segment}</span></td>
                  <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600 capitalize">{c.plan}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatNaira(c.ltv || 0)}</td>
                  <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">{c.totalTickets}</td>
                  <td className="hidden sm:table-cell px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-gray-900">{c.csat || 0}</span>
                      <span className="text-amber-400 text-xs">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${c.status === "active" ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className="text-xs text-gray-600 capitalize">{c.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
