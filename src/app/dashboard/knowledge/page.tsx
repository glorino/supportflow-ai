"use client";

import { useState } from "react";

const collections = [
  { id: 1, name: "Getting Started", icon: "🚀", articles: 12, color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-50" },
  { id: 2, name: "Account & Billing", icon: "💰", articles: 18, color: "from-green-500 to-emerald-600", bgLight: "bg-green-50" },
  { id: 3, name: "Technical Docs", icon: "🔧", articles: 34, color: "from-purple-500 to-indigo-600", bgLight: "bg-purple-50" },
  { id: 4, name: "Integrations", icon: "🔗", articles: 21, color: "from-amber-500 to-orange-600", bgLight: "bg-amber-50" },
  { id: 5, name: "API Reference", icon: "📡", articles: 45, color: "from-cyan-500 to-blue-600", bgLight: "bg-cyan-50" },
  { id: 6, name: "Troubleshooting", icon: "🛠️", articles: 27, color: "from-rose-500 to-pink-600", bgLight: "bg-rose-50" },
];

const articles = [
  { id: 1, title: "How to Reset Your Password", collection: "Account & Billing", status: "published", views: 1247, aiUsed: 342, helpful: 94, lastUpdated: "2 hours ago", tags: ["account", "security"] },
  { id: 2, title: "Getting Started with the API", collection: "API Reference", status: "published", views: 892, aiUsed: 198, helpful: 91, lastUpdated: "1 day ago", tags: ["api", "getting-started"] },
  { id: 3, title: "Billing & Plan Changes", collection: "Account & Billing", status: "published", views: 756, aiUsed: 156, helpful: 88, lastUpdated: "3 days ago", tags: ["billing", "plans"] },
  { id: 4, title: "Troubleshooting Login Issues", collection: "Troubleshooting", status: "published", views: 634, aiUsed: 142, helpful: 92, lastUpdated: "1 week ago", tags: ["login", "troubleshooting"] },
  { id: 5, title: "Webhook Configuration Guide", collection: "Technical Docs", status: "draft", views: 0, aiUsed: 0, helpful: 0, lastUpdated: "5 hours ago", tags: ["webhooks", "configuration"] },
  { id: 6, title: "Salesforce Integration Setup", collection: "Integrations", status: "published", views: 523, aiUsed: 89, helpful: 87, lastUpdated: "2 weeks ago", tags: ["salesforce", "integration"] },
  { id: 7, title: "Understanding Your Invoice", collection: "Account & Billing", status: "published", views: 445, aiUsed: 78, helpful: 90, lastUpdated: "4 days ago", tags: ["billing", "invoices"] },
  { id: 8, title: "Two-Factor Authentication Setup", collection: "Account & Billing", status: "published", views: 389, aiUsed: 67, helpful: 95, lastUpdated: "1 week ago", tags: ["security", "2fa"] },
  { id: 9, title: "Rate Limiting Best Practices", collection: "API Reference", status: "published", views: 312, aiUsed: 45, helpful: 86, lastUpdated: "3 weeks ago", tags: ["api", "rate-limiting"] },
  { id: 10, title: "Slack Integration Guide", collection: "Integrations", status: "review", views: 0, aiUsed: 0, helpful: 0, lastUpdated: "1 day ago", tags: ["slack", "integration"] },
];

const statusColor: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-100 text-gray-600",
  review: "bg-amber-100 text-amber-700",
};

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredArticles = articles.filter((a) => {
    if (selectedCollection && !collections.find((c) => c.id === selectedCollection && c.name === a.collection)) return false;
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-sm text-gray-500 mt-1">Manage articles, FAQs, and documentation for AI-powered self-service</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Import
          </button>
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Article
          </button>
        </div>
      </div>

      {/* AI Search */}
      <div className="rounded-2xl border border-gray-200 p-6 mb-6 card-gradient-blue">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">AI-Powered Search</h3>
            <p className="text-xs text-gray-500">Search across all articles with semantic understanding</p>
          </div>
        </div>
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Ask a question or search for articles... (e.g., 'How do I reset my password?')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 text-sm placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <kbd className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-medium text-gray-400">⌘K</kbd>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-gray-400">Quick searches:</span>
          {["password reset", "billing", "API setup", "integration"].map((q) => (
            <button key={q} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">{q}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Articles", value: "157", icon: "📚", change: "+8 this week", gradient: "from-blue-500 via-blue-600 to-indigo-600", cardBg: "card-gradient-blue" },
          { label: "AI Resolution", value: "89%", icon: "🤖", change: "+3% this month", gradient: "from-green-500 via-emerald-500 to-teal-600", cardBg: "card-gradient-green" },
          { label: "Total Views", value: "24.5K", icon: "👁️", change: "+12% this week", gradient: "from-purple-500 via-violet-500 to-indigo-600", cardBg: "card-gradient-purple" },
          { label: "Helpful Rating", value: "92%", icon: "👍", change: "+1% this week", gradient: "from-amber-400 via-orange-500 to-red-500", cardBg: "card-gradient-amber" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border border-gray-200 p-5 card-glow group ${s.cardBg}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center text-sm text-white shadow-md group-hover:scale-110 transition-transform`}>{s.icon}</div>
              <span className="text-xs text-gray-600 font-medium">{s.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-green-600 mt-1 font-medium">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Collections */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Collections</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all →</button>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCollection(selectedCollection === c.id ? null : c.id)}
              className={`rounded-2xl border p-5 text-left transition-all ${
                selectedCollection === c.id ? "border-blue-300 bg-blue-50 shadow-sm ring-2 ring-blue-500/20" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className={`h-12 w-12 rounded-xl ${c.bgLight} flex items-center justify-center text-2xl mb-3`}>{c.icon}</div>
              <div className="text-sm font-semibold text-gray-900 mb-0.5">{c.name}</div>
              <div className="text-xs text-gray-500">{c.articles} articles</div>
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-gray-900">Articles</h3>
            {selectedCollection && (
              <button onClick={() => setSelectedCollection(null)} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700">
                {collections.find((c) => c.id === selectedCollection)?.name}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView("grid")} className={`h-8 w-8 rounded-lg flex items-center justify-center ${view === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:bg-gray-50"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button onClick={() => setView("list")} className={`h-8 w-8 rounded-lg flex items-center justify-center ${view === "list" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:bg-gray-50"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </button>
          </div>
        </div>

        {view === "list" ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Article</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Collection</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Used</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Helpful</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredArticles.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">{a.title}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      {a.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.collection}</td>
                  <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[a.status]}`}>{a.status}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 font-medium">{a.aiUsed}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.helpful > 0 ? `${a.helpful}%` : "—"}</td>
                  <td className="px-6 py-4 text-xs text-gray-400 text-right">{a.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((a) => (
              <div key={a.id} className="rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[a.status]}`}>{a.status}</span>
                  <span className="text-xs text-gray-400">{a.lastUpdated}</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition mb-2">{a.title}</h4>
                <p className="text-xs text-gray-500 mb-3">{a.collection}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    {a.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-blue-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    AI: {a.aiUsed}
                  </span>
                  {a.helpful > 0 && (
                    <span className="flex items-center gap-1 text-green-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                      {a.helpful}%
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  {a.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
