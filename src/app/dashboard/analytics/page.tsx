"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  stats: {
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
    escalatedTickets: number;
    avgConfidence: number;
    avgCsat: number;
    slaBreached: number;
    totalCustomers: number;
  };
  channelCounts: { channel: string; count: number }[];
  sentimentCounts: { sentiment: string; count: number }[];
  priorityCounts: { priority: string; count: number }[];
}

const channelDisplayNames: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "Email",
  web: "Web Chat",
  sms: "SMS",
  messenger: "Messenger",
  instagram: "Instagram",
};

const channelColors: Record<string, string> = {
  whatsapp: "bg-green-500",
  email: "bg-purple-500",
  web: "bg-blue-500",
  sms: "bg-amber-500",
  messenger: "bg-blue-400",
  instagram: "bg-pink-500",
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const { stats, channelCounts, sentimentCounts } = data;
  const totalTickets = stats.totalTickets;
  const resolutionRate = totalTickets > 0 ? Math.round((stats.resolvedTickets / totalTickets) * 100) : 0;
  const totalChannelTickets = channelCounts.reduce((sum, c) => sum + c.count, 0);
  const totalSentiment = sentimentCounts.reduce((sum, s) => sum + s.count, 0);

  const kpis = [
    { label: "Total Tickets", value: totalTickets.toLocaleString(), icon: "🎫", cardBg: "card-gradient-blue" },
    { label: "Open Tickets", value: stats.openTickets.toLocaleString(), icon: "📂", cardBg: "card-gradient-green" },
    { label: "Resolution Rate", value: `${resolutionRate}%`, icon: "✅", cardBg: "card-gradient-purple" },
    { label: "CSAT Score", value: `${(stats.avgCsat || 0).toFixed(1)}/5`, icon: "⭐", cardBg: "card-gradient-amber" },
    { label: "AI Confidence", value: `${Math.round(stats.avgConfidence || 0)}%`, icon: "🤖", cardBg: "card-gradient-red" },
    { label: "SLA Breached", value: stats.slaBreached.toLocaleString(), icon: "⚠️", cardBg: "card-gradient-cyan" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time insights from your database</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((s, i) => {
          const colors = ["card-gradient-blue", "card-gradient-green", "card-gradient-purple", "card-gradient-amber", "card-gradient-red", "card-gradient-cyan"];
          return (
            <div key={s.label} className={`rounded-2xl border border-gray-200 p-5 group ${colors[i]} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-default`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg group-hover:scale-125 transition-transform duration-300">{s.icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Channel Performance */}
      {channelCounts.length > 0 && (
        <div className="rounded-2xl border border-gray-200 p-6 card-gradient-blue">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Channel Performance</h3>
          <p className="text-xs text-gray-500 mb-5">Tickets by communication channel</p>
          <div className="space-y-3">
            {channelCounts.map((ch) => {
              const pct = totalChannelTickets > 0 ? Math.round((ch.count / totalChannelTickets) * 100) : 0;
              return (
                <div key={ch.channel} className="flex items-center gap-3 group">
                  <div className="hidden sm:flex w-28 items-center gap-2 shrink-0">
                    <span className="text-sm">{channelDisplayNames[ch.channel] || ch.channel}</span>
                  </div>
                  <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${channelColors[ch.channel] || "bg-gray-500"} rounded-full flex items-center pl-3 transition-all duration-700 hover:brightness-110`} style={{ width: `${Math.max(pct * 3.5, 8)}%` }}>
                      <span className="text-xs font-semibold text-white">{ch.count}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 w-10 text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sentiment & Priority */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {sentimentCounts.length > 0 && (
          <div className="rounded-2xl border border-gray-200 p-6 card-gradient-purple">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Sentiment Distribution</h3>
            <p className="text-xs text-gray-500 mb-5">Customer emotion breakdown</p>
            <div className="space-y-3">
              {sentimentCounts.map((s) => {
                const pct = totalSentiment > 0 ? Math.round((s.count / totalSentiment) * 100) : 0;
                const sentimentColors: Record<string, string> = {
                  positive: "bg-green-500",
                  neutral: "bg-gray-400",
                  negative: "bg-amber-500",
                  angry: "bg-red-500",
                  frustrated: "bg-orange-500",
                };
                return (
                  <div key={s.sentiment} className="flex items-center gap-3">
                    <span className="w-20 text-sm font-medium text-gray-600 capitalize">{s.sentiment}</span>
                    <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${sentimentColors[s.sentiment] || "bg-gray-400"} rounded-full flex items-center pl-3 transition-all duration-700`} style={{ width: `${Math.max(pct * 2.2, 8)}%` }}>
                        <span className="text-xs font-semibold text-white">{s.count}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400 w-10 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 p-6 card-gradient-green">
          <h3 className="text-base font-semibold text-gray-900 mb-1">AI Performance</h3>
          <p className="text-xs text-gray-500 mb-5">Agent metrics</p>
          <div className="space-y-4">
            {[
              { label: "AI Confidence", value: `${Math.round(stats.avgConfidence || 0)}%`, color: "bg-green-500", width: `${stats.avgConfidence || 0}%` },
              { label: "CSAT Score", value: `${(stats.avgCsat || 0).toFixed(1)}/5`, color: "bg-blue-500", width: `${((stats.avgCsat || 0) / 5) * 100}%` },
              { label: "Resolution Rate", value: `${resolutionRate}%`, color: "bg-purple-500", width: `${resolutionRate}%` },
              { label: "SLA Compliance", value: `${totalTickets > 0 ? Math.round(((totalTickets - stats.slaBreached) / totalTickets) * 100) : 100}%`, color: "bg-teal-500", width: `${totalTickets > 0 ? ((totalTickets - stats.slaBreached) / totalTickets) * 100 : 100}%` },
            ].map((m) => (
              <div key={m.label} className="group">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600 group-hover:text-gray-900 transition">{m.label}</span>
                  <span className="font-bold text-gray-900">{m.value}</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden mb-1">
                  <div className={`h-full ${m.color} rounded-full transition-all duration-700 group-hover:brightness-110`} style={{ width: m.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
