"use client";

import { useState, useCallback } from "react";
import { useRealtimeInbox } from "@/hooks/use-pusher";

const channels = [
  { id: "all", name: "All Channels", icon: "📥", count: 24 },
  { id: "whatsapp", name: "WhatsApp", icon: "📱", count: 8, color: "bg-green-500" },
  { id: "email", name: "Email", icon: "📧", count: 6, color: "bg-purple-500" },
  { id: "web", name: "Web Chat", icon: "💬", count: 5, color: "bg-blue-500" },
  { id: "sms", name: "SMS", icon: "💬", count: 3, color: "bg-amber-500" },
  { id: "messenger", name: "Messenger", icon: "💬", count: 1, color: "bg-blue-400" },
  { id: "instagram", name: "Instagram", icon: "📸", count: 1, color: "bg-pink-500" },
];

const conversations = [
  { id: 1, name: "Sarah Chen", email: "sarah@acme.com", company: "Acme Corp", avatar: "SC", channel: "whatsapp", channelIcon: "📱", channelColor: "bg-green-500", lastMsg: "I can't access my account after resetting my password", time: "2m", unread: 2, sentiment: "negative", sentimentScore: -0.3, priority: "high", status: "active", assignee: "AI Agent", tags: ["account", "urgent"], aiConfidence: 94 },
  { id: 2, name: "TechStart Inc", email: "dev@techstart.io", company: "TechStart", avatar: "TI", channel: "email", channelIcon: "📧", channelColor: "bg-purple-500", lastMsg: "API returning 500 errors intermittently since yesterday", time: "15m", unread: 1, sentiment: "angry", sentimentScore: -0.7, priority: "urgent", status: "escalated", assignee: "Marcus J.", tags: ["api", "bug", "escalated"], aiConfidence: 87 },
  { id: 3, name: "Emily Rodriguez", email: "emily@design.co", company: "Design Studio", avatar: "ER", channel: "web", channelIcon: "💬", channelColor: "bg-blue-500", lastMsg: "How do I integrate with Salesforce?", time: "1h", unread: 0, sentiment: "neutral", sentimentScore: 0.1, priority: "medium", status: "active", assignee: "AI Agent", tags: ["integration"], aiConfidence: 92 },
  { id: 4, name: "James Park", email: "james@retail.com", company: "RetailCo", avatar: "JP", channel: "sms", channelIcon: "💬", channelColor: "bg-amber-500", lastMsg: "Billing discrepancy on invoice #4521", time: "3h", unread: 0, sentiment: "neutral", sentimentScore: 0.0, priority: "medium", status: "pending", assignee: "Sarah K.", tags: ["billing"], aiConfidence: 88 },
  { id: 5, name: "Lisa Wang", email: "lisa@startup.app", company: "StartupApp", avatar: "LW", channel: "messenger", channelIcon: "💬", channelColor: "bg-blue-400", lastMsg: "Feature request: dark mode support", time: "4h", unread: 0, sentiment: "positive", sentimentScore: 0.5, priority: "low", status: "active", assignee: "AI Agent", tags: ["feature-request"], aiConfidence: 96 },
  { id: 6, name: "Tom Miller", email: "tom@mobile.dev", company: "MobileDev", avatar: "TM", channel: "instagram", channelIcon: "📸", channelColor: "bg-pink-500", lastMsg: "App crashes on iOS 17.2 when uploading photos", time: "5h", unread: 3, sentiment: "frustrated", sentimentScore: -0.4, priority: "high", status: "active", assignee: "AI Agent", tags: ["bug", "ios"], aiConfidence: 85 },
  { id: 7, name: "Anna Smith", email: "anna@corp.net", company: "CorpNet", avatar: "AS", channel: "whatsapp", channelIcon: "📱", channelColor: "bg-green-500", lastMsg: "Cannot download invoice PDF", time: "6h", unread: 0, sentiment: "neutral", sentimentScore: -0.1, priority: "low", status: "resolved", assignee: "AI Agent", tags: ["billing"], aiConfidence: 97 },
  { id: 8, name: "Mike Davis", email: "mike@growth.io", company: "GrowthIO", avatar: "MD", channel: "web", channelIcon: "💬", channelColor: "bg-blue-500", lastMsg: "Want to upgrade to Growth plan", time: "7h", unread: 0, sentiment: "positive", sentimentScore: 0.6, priority: "low", status: "active", assignee: "AI Agent", tags: ["sales"], aiConfidence: 99 },
];

const sentimentColor: Record<string, string> = {
  positive: "text-green-500",
  neutral: "text-gray-400",
  negative: "text-amber-500",
  angry: "text-red-500",
  frustrated: "text-orange-500",
};

const sentimentBg: Record<string, string> = {
  positive: "bg-green-50 border-green-200",
  neutral: "bg-gray-50 border-gray-200",
  negative: "bg-amber-50 border-amber-200",
  angry: "bg-red-50 border-red-200",
  frustrated: "bg-orange-50 border-orange-200",
};

const priorityColor: Record<string, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

const statusColor: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  escalated: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
  resolved: "bg-gray-100 text-gray-600",
};

export default function InboxPage() {
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const realtimeUpdates = useRealtimeInbox();

  const handleRealtimeMessage = useCallback((data: { conversationId?: string; sender?: string; message?: string }) => {
    if (data.conversationId) {
      const conv = conversations.find((c) => c.id.toString() === data.conversationId);
      if (conv) {
        conv.unread += 1;
        conv.lastMsg = data.message || conv.lastMsg;
      }
    }
  }, []);

  realtimeUpdates.forEach(handleRealtimeMessage);

  const filteredConversations = conversations.filter((c) => {
    if (selectedChannel !== "all" && c.channel !== selectedChannel) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8 overflow-hidden">
      {/* Left Panel - Channel List */}
      <div className="w-16 border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white flex flex-col items-center py-4 gap-2">
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setSelectedChannel(ch.id)}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-200 ${
              selectedChannel === ch.id ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg scale-110" : "hover:bg-gray-100 text-gray-500"
            }`}
            title={ch.name}
          >
            {ch.icon}
            {ch.count > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                {ch.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Middle Panel - Conversation List */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Inbox</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{filteredConversations.length} conversations</span>
              <button className="h-6 w-6 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
              </button>
            </div>
          </div>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-search"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {filteredConversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedConversation(c)}
              className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer border-b border-gray-50 transition-all ${
                selectedConversation.id === c.id ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-3 border-l-blue-600 shadow-sm" : "hover:bg-gray-50 border-l-2 border-l-transparent"
              }`}
            >
              <div className="relative shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                  {c.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${c.channelColor}`} />
                {c.status === "active" && (
                  <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-semibold text-gray-900 truncate">{c.name}</span>
                  <span className="text-[11px] text-gray-400 shrink-0 ml-2">{c.time}</span>
                </div>
                <div className="text-xs text-gray-500 truncate mb-1.5">{c.lastMsg}</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-[10px] ${sentimentColor[c.sentiment]}`}>●</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${priorityColor[c.priority]}`}>{c.priority}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${statusColor[c.status]}`}>{c.status}</span>
                  {c.tags.slice(0, 1).map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                  ))}
                </div>
              </div>
              {c.unread > 0 && (
                <div className="h-5 min-w-[20px] rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 px-1">
                  {c.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel - Conversation View */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Conversation Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                {selectedConversation.avatar}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${selectedConversation.channelColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{selectedConversation.name}</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-500">{selectedConversation.company}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{selectedConversation.email}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${selectedConversation.channelColor}`} />
                  {selectedConversation.channel}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${sentimentBg[selectedConversation.sentiment]}`}>
              <span className={sentimentColor[selectedConversation.sentiment]}>●</span>{" "}
              {selectedConversation.sentiment} ({selectedConversation.sentimentScore})
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700">
              AI: {selectedConversation.aiConfidence}%
            </div>
            <button className="btn-ghost text-xs">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              Assign
            </button>
            <button className="btn-ghost text-xs">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              Save
            </button>
            <button className="btn-ghost text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
          <div className="flex justify-start">
            <div className="max-w-[70%]">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="text-sm text-gray-900">{selectedConversation.lastMsg}</div>
              </div>
              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="text-[11px] text-gray-400">10:30 AM</span>
                <span className="text-[11px] text-gray-400">·</span>
                <span className="text-[11px] text-gray-400 capitalize">{selectedConversation.channel}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-[70%]">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3">
                <div className="flex items-center gap-1.5 text-xs text-blue-200 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-300 animate-pulse" />
                  AI Resolution Agent
                </div>
                <div className="text-sm">I understand your concern. Let me look into this right away. I&apos;ve found your account and can see the issue. I&apos;m sending a fresh password reset link now.</div>
              </div>
              <div className="flex items-center gap-2 mt-1 px-1 justify-end">
                <span className="text-[11px] text-green-500 font-medium">QA Verified ✓</span>
                <span className="text-[11px] text-gray-400">10:30 AM</span>
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="max-w-[70%]">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="text-sm text-gray-900">Thank you! I received the reset link. One more thing - can you also check why my billing shows $49 instead of $29?</div>
              </div>
              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="text-[11px] text-gray-400">10:32 AM</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-[70%]">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3">
                <div className="flex items-center gap-1.5 text-xs text-blue-200 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                  AI Resolution Agent
                </div>
                <div className="text-sm">I can see the billing discrepancy. It appears your plan was upgraded on March 15th. The $49 reflects the Growth plan. Would you like me to:</div>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                    <span>Revert to the Starter plan ($29/mo)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                    <span>Keep Growth plan with a one-time credit</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                    <span>Connect with billing team for review</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1 px-1 justify-end">
                <span className="text-[11px] text-green-500 font-medium">QA Verified ✓</span>
                <span className="text-[11px] text-blue-500 font-medium">Action Required</span>
                <span className="text-[11px] text-gray-400">10:32 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                rows={1}
                placeholder="Type a message... (Shift+Enter for new line)"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm resize-none focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button className="h-7 w-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                </button>
                <button className="h-7 w-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary text-xs">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                AI Assist
              </button>
              <button className="btn-primary text-xs">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                Send
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2 px-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              AI suggestions available
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Auto-save enabled
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - AI Insights & Customer Info */}
      <div className="w-80 border-l border-gray-200 bg-white flex flex-col overflow-y-auto scrollbar-thin">
        {/* Customer Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Customer</div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              {selectedConversation.avatar}
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{selectedConversation.name}</div>
              <div className="text-xs text-gray-500">{selectedConversation.email}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-50 rounded-lg p-2.5">
              <div className="text-gray-400 mb-0.5">Company</div>
              <div className="font-medium text-gray-900">{selectedConversation.company}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5">
              <div className="text-gray-400 mb-0.5">Lifetime Value</div>
              <div className="font-medium text-gray-900">$24,500</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5">
              <div className="text-gray-400 mb-0.5">Total Tickets</div>
              <div className="font-medium text-gray-900">12</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5">
              <div className="text-gray-400 mb-0.5">Avg CSAT</div>
              <div className="font-medium text-gray-900">4.8 ★</div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="p-4 border-b border-gray-100">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">AI Insights</div>
          <div className="space-y-2.5">
            <div className={`rounded-xl p-3 border ${sentimentBg[selectedConversation.sentiment]}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Sentiment</span>
                <span className={`text-sm font-bold ${sentimentColor[selectedConversation.sentiment]}`}>
                  {selectedConversation.sentimentScore > 0 ? "+" : ""}{selectedConversation.sentimentScore}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1 capitalize">{selectedConversation.sentiment} · Trend: Stable</div>
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Intent</span>
                <span className="text-sm font-bold text-blue-700">Account + Billing</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Multi-topic detected</div>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-200 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Resolution</span>
                <span className="text-sm font-bold text-green-700">87%</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">High confidence auto-resolve</div>
            </div>
          </div>
        </div>

        {/* Suggested Actions */}
        <div className="p-4 border-b border-gray-100">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Suggested Actions</div>
          <div className="space-y-2">
            <button className="w-full text-left rounded-xl border border-gray-200 bg-white p-3 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all group">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition">🔑</span>
                <div>
                  <div className="font-medium text-gray-900">Send password reset</div>
                  <div className="text-xs text-gray-400">Already sent · Confirm receipt</div>
                </div>
              </div>
            </button>
            <button className="w-full text-left rounded-xl border border-gray-200 bg-white p-3 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all group">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-200 transition">💰</span>
                <div>
                  <div className="font-medium text-gray-900">Issue billing credit</div>
                  <div className="text-xs text-gray-400">$20 credit for overcharge</div>
                </div>
              </div>
            </button>
            <button className="w-full text-left rounded-xl border border-gray-200 bg-white p-3 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all group">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition">📋</span>
                <div>
                  <div className="font-medium text-gray-900">View billing history</div>
                  <div className="text-xs text-gray-400">Last 12 months</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="p-4 border-b border-gray-100">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Related Articles</div>
          <div className="space-y-2">
            <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer transition group">
              <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">How to Reset Your Password</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700">92% match</span>
                <span className="text-[10px] text-gray-400">Used 342 times by AI</span>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer transition group">
              <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">Billing & Plan Changes</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">85% match</span>
                <span className="text-[10px] text-gray-400">Used 198 times by AI</span>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer transition group">
              <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">Understanding Your Invoice</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">78% match</span>
                <span className="text-[10px] text-gray-400">Used 156 times by AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation Tags */}
        <div className="p-4">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Tags</div>
          <div className="flex flex-wrap gap-2">
            {selectedConversation.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                {tag}
                <button className="hover:text-gray-900">×</button>
              </span>
            ))}
            <button className="inline-flex items-center gap-1 rounded-lg border border-dashed border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-gray-600 hover:border-gray-400 transition">
              + Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
