"use client";

import { useState, useEffect } from "react";

interface Article {
  id: string;
  title: string;
  content: string;
  collection: string;
  status: string;
  views: number;
  aiUsed: number;
  helpful: number;
  tags: string[];
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

interface Collection {
  name: string;
  count: number;
}

const collectionIcons: Record<string, string> = {
  "Getting Started": "🚀",
  "Account & Billing": "💰",
  "Technical Docs": "🔧",
  "Integrations": "🔗",
  "API Reference": "📡",
  "Troubleshooting": "🛠️",
};

const statusColor: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-100 text-gray-600",
  review: "bg-amber-100 text-amber-700",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [articles, setArticles] = useState<Article[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [stats, setStats] = useState({ totalArticles: 0, published: 0, totalViews: 0, totalAiUsed: 0, avgHelpful: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCollection) params.set("collection", selectedCollection);

    fetch(`/api/knowledge?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setCollections(data.collections || []);
        setStats(data.stats || { totalArticles: 0, published: 0, totalViews: 0, totalAiUsed: 0, avgHelpful: 0 });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchQuery, selectedCollection]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-sm text-gray-500 mt-1">{articles.length} articles from database</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Article
          </button>
        </div>
      </div>

      {/* AI Search */}
      <div className="rounded-2xl border border-gray-200 p-6 card-gradient-blue">
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
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 text-sm placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Articles", value: stats.totalArticles, icon: "📚", gradient: "from-blue-500 via-blue-600 to-indigo-600", cardBg: "card-gradient-blue" },
          { label: "Published", value: stats.published, icon: "✅", gradient: "from-green-500 via-emerald-500 to-teal-600", cardBg: "card-gradient-green" },
          { label: "Total Views", value: stats.totalViews, icon: "👁️", gradient: "from-purple-500 via-violet-500 to-indigo-600", cardBg: "card-gradient-purple" },
          { label: "Helpful Rating", value: `${Math.round(stats.avgHelpful)}%`, icon: "👍", gradient: "from-amber-400 via-orange-500 to-red-500", cardBg: "card-gradient-amber" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border border-gray-200 p-5 group ${s.cardBg} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center text-sm text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>{s.icon}</div>
              <span className="text-xs text-gray-600 font-medium">{s.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Collections */}
      {collections.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Collections</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {collections.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedCollection(selectedCollection === c.name ? null : c.name)}
                className={`rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                  selectedCollection === c.name
                    ? "border-blue-300 bg-blue-50 shadow-md ring-2 ring-blue-500/20 scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl mb-3">{collectionIcons[c.name] || "📄"}</div>
                <div className="text-sm font-semibold text-gray-900 mb-0.5">{c.name}</div>
                <div className="text-xs text-gray-500">{c.count} articles</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Articles */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Articles</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => setView("grid")} className={`h-8 w-8 rounded-lg flex items-center justify-center transition ${view === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:bg-gray-50"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button onClick={() => setView("list")} className={`h-8 w-8 rounded-lg flex items-center justify-center transition ${view === "list" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:bg-gray-50"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </button>
          </div>
        </div>

        {view === "list" ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Article</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Collection</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="hidden sm:table-cell text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="hidden sm:table-cell text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Used</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Helpful</th>
                  <th className="hidden sm:table-cell text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {articles.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">{a.title}</div>
                      {a.tags && a.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-1">
                          {a.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{a.collection || "Uncategorized"}</td>
                    <td className="px-6 py-4"><span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-600"}`}>{a.status}</span></td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">{a.views}</td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-blue-600 font-medium">{a.aiUsed}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{a.helpful > 0 ? `${a.helpful}%` : "—"}</td>
                    <td className="hidden sm:table-cell px-6 py-4 text-xs text-gray-400 text-right">{formatDate(a.updatedAt)}</td>
                  </tr>
                ))}
                {articles.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                      No articles found. Create your first article to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((a) => (
              <div key={a.id} className="rounded-xl border border-gray-200 p-5 hover:border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-600"}`}>{a.status}</span>
                  <span className="text-xs text-gray-400">{formatDate(a.updatedAt)}</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition mb-2">{a.title}</h4>
                <p className="text-xs text-gray-500 mb-3">{a.collection || "Uncategorized"}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{a.views} views</span>
                  <span className="text-blue-500">AI: {a.aiUsed}</span>
                  {a.helpful > 0 && <span className="text-green-500">{a.helpful}%</span>}
                </div>
                {a.tags && a.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-3">
                    {a.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {articles.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-400 text-sm">
                No articles found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
