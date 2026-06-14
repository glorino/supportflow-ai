"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const customersData: Record<string, {
  name: string; email: string; company: string; segment: string; plan: string;
  ltv: string; tickets: number; csat: number; status: string; avatar: string;
  phone: string; joined: string; lastActive: string; address: string;
  notes: string; tags: string[];
  recentTickets: { id: string; subject: string; status: string; date: string; priority: string }[];
  activity: { action: string; time: string; icon: string }[];
}> = {
  "1": { name: "Sarah Chen", email: "sarah@acme.com", company: "Acme Corp", segment: "Enterprise", plan: "Growth", ltv: "₦36,750,000", tickets: 12, csat: 4.8, status: "active", avatar: "SC", phone: "+234 801 234 5678", joined: "Jan 15, 2024", lastActive: "2 min ago", address: "12 Victoria Island, Lagos", notes: "Key enterprise account. Prefers WhatsApp for support. Quarterly business reviews scheduled.", tags: ["enterprise", "vip", "whatsapp"], recentTickets: [{ id: "SSV-1234", subject: "Cannot access account after password reset", status: "open", date: "Today", priority: "high" }, { id: "SSV-1220", subject: "API rate limit question", status: "resolved", date: "Yesterday", priority: "low" }, { id: "SSV-1198", subject: "Billing discrepancy on invoice", status: "resolved", date: "3 days ago", priority: "medium" }], activity: [{ action: "Opened ticket SSV-1234", time: "2 min ago", icon: "🎫" }, { action: "Rated support 5 stars", time: "Yesterday", icon: "⭐" }, { action: "Upgraded to Growth plan", time: "1 week ago", icon: "📈" }] },
  "2": { name: "Marcus Johnson", email: "marcus@techstart.io", company: "TechStart Inc", segment: "Enterprise", plan: "Enterprise", ltv: "₦27,300,000", tickets: 8, csat: 4.5, status: "active", avatar: "MJ", phone: "+234 802 345 6789", joined: "Mar 8, 2024", lastActive: "15 min ago", address: "45 Lekki Phase 1, Lagos", notes: "Technical team lead. Often submits API-related tickets. Prefers email communication.", tags: ["enterprise", "technical", "api"], recentTickets: [{ id: "SSV-1232", subject: "API returning 500 errors intermittently", status: "escalated", date: "Today", priority: "urgent" }, { id: "SSV-1210", subject: "Webhook configuration help", status: "resolved", date: "2 days ago", priority: "medium" }], activity: [{ action: "Ticket SSV-1232 escalated", time: "15 min ago", icon: "⚠️" }, { action: "Submitted API error report", time: "1 hour ago", icon: "📋" }] },
  "3": { name: "Emily Rodriguez", email: "emily@design.co", company: "Design Studio", segment: "Pro", plan: "Pro", ltv: "₦12,600,000", tickets: 5, csat: 4.9, status: "active", avatar: "ER", phone: "+234 803 456 7890", joined: "Jun 22, 2024", lastActive: "1 hour ago", address: "78 Ikeja GRA, Lagos", notes: "Very satisfied customer. Design agency, uses platform for client support.", tags: ["pro", "design", "satisfied"], recentTickets: [{ id: "SSV-1231", subject: "How to integrate with Salesforce?", status: "open", date: "Today", priority: "low" }], activity: [{ action: "Asked about Salesforce integration", time: "1 hour ago", icon: "❓" }] },
  "4": { name: "James Park", email: "james@retail.com", company: "RetailCo", segment: "Business", plan: "Business", ltv: "₦18,900,000", tickets: 15, csat: 4.2, status: "active", avatar: "JP", phone: "+234 804 567 8901", joined: "Feb 10, 2024", lastActive: "3 hours ago", address: "23 Abuja", notes: "High ticket volume. Retail business with seasonal spikes. Needs priority support.", tags: ["business", "retail", "high-volume"], recentTickets: [{ id: "SSV-1230", subject: "Billing discrepancy on invoice #4521", status: "resolved", date: "Today", priority: "medium" }], activity: [{ action: "Invoice issue resolved", time: "3 hours ago", icon: "✅" }] },
  "5": { name: "Lisa Wang", email: "lisa@startup.app", company: "StartupApp", segment: "Starter", plan: "Starter", ltv: "₦4,800,000", tickets: 3, csat: 4.7, status: "active", avatar: "LW", phone: "+234 805 678 9012", joined: "Sep 5, 2024", lastActive: "4 hours ago", address: "10 Port Harcourt", notes: "Startup founder. Likely to upgrade as company grows.", tags: ["starter", "startup", "growth-potential"], recentTickets: [{ id: "SSV-1228", subject: "Feature request: dark mode support", status: "open", date: "Today", priority: "low" }], activity: [{ action: "Submitted feature request", time: "4 hours ago", icon: "💡" }] },
  "6": { name: "Tom Miller", email: "tom@mobile.dev", company: "MobileDev", segment: "Pro", plan: "Pro", ltv: "₦14,700,000", tickets: 7, csat: 4.3, status: "active", avatar: "TM", phone: "+234 806 789 0123", joined: "Apr 18, 2024", lastActive: "5 hours ago", address: "55 Enugu", notes: "Mobile development company. Frequent bug reports related to iOS/Android.", tags: ["pro", "mobile", "bug-reporter"], recentTickets: [{ id: "SSV-1225", subject: "App crashes on iOS 17.2 when uploading photos", status: "open", date: "Today", priority: "high" }], activity: [{ action: "Reported iOS crash bug", time: "5 hours ago", icon: "🐛" }] },
  "7": { name: "Anna Smith", email: "anna@corp.net", company: "CorpNet", segment: "Business", plan: "Business", ltv: "₦23,100,000", tickets: 11, csat: 4.6, status: "inactive", avatar: "AS", phone: "+234 807 890 1234", joined: "Jan 30, 2024", lastActive: "6 hours ago", address: "33 Kano", notes: "Corporate client. Currently inactive - contract renewal pending.", tags: ["business", "corporate", "inactive"], recentTickets: [{ id: "SSV-1215", subject: "Cannot download invoice PDF", status: "resolved", date: "Yesterday", priority: "low" }], activity: [{ action: "Invoice PDF issue resolved", time: "6 hours ago", icon: "✅" }] },
  "8": { name: "Mike Davis", email: "mike@growth.io", company: "GrowthIO", segment: "Enterprise", plan: "Enterprise", ltv: "₦33,150,000", tickets: 6, csat: 4.8, status: "active", avatar: "MD", phone: "+234 808 901 2345", joined: "May 12, 2024", lastActive: "7 hours ago", address: "80 Calabar", notes: "Growth-stage company. Interested in premium features and custom integrations.", tags: ["enterprise", "growth", "premium"], recentTickets: [{ id: "SSV-1218", subject: "Want to upgrade to Growth plan", status: "open", date: "Today", priority: "low" }], activity: [{ action: "Inquired about plan upgrade", time: "7 hours ago", icon: "📈" }] },
  "9": { name: "Rachel Green", email: "rachel@coffee.co", company: "Coffee Co", segment: "Starter", plan: "Starter", ltv: "₦4,200,000", tickets: 2, csat: 4.9, status: "active", avatar: "RG", phone: "+234 809 012 3456", joined: "Nov 20, 2024", lastActive: "1 day ago", address: "15 Ibadan", notes: "Small coffee shop chain. Simple support needs. Very happy with service.", tags: ["starter", "small-business", "satisfied"], recentTickets: [], activity: [{ action: "Last ticket resolved", time: "1 day ago", icon: "✅" }] },
  "10": { name: "David Kim", email: "david@fintech.com", company: "FinTech Pro", segment: "Enterprise", plan: "Enterprise", ltv: "₦46,800,000", tickets: 18, csat: 4.4, status: "active", avatar: "DK", phone: "+234 800 123 4567", joined: "Dec 1, 2023", lastActive: "2 hours ago", address: "92 Victoria Island, Lagos", notes: "FinTech company with strict compliance requirements. High ticket volume. Needs dedicated support.", tags: ["enterprise", "fintech", "compliance", "high-volume"], recentTickets: [{ id: "SSV-1233", subject: "Refund request for order #98765", status: "pending", date: "Today", priority: "medium" }, { id: "SSV-1222", subject: "Two-factor auth not working", status: "open", date: "Yesterday", priority: "medium" }], activity: [{ action: "Submitted refund request", time: "2 hours ago", icon: "💰" }, { action: "2FA issue reported", time: "Yesterday", icon: "🔐" }] },
};

const statusColor: Record<string, string> = {
  open: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  escalated: "bg-red-100 text-red-700",
  resolved: "bg-green-100 text-green-700",
};

const priorityColor: Record<string, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const customer = customersData[id];

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Customer Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The customer you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/dashboard/customers" className="btn-primary">Back to Customers</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link href="/dashboard/customers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Customers
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-start gap-5">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">{customer.avatar}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${customer.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{customer.status}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{customer.email} · {customer.company}</p>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">{tag}</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{customer.ltv}</div>
            <div className="text-xs text-gray-500">Lifetime Value</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Info */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm">📧</div>
                <div>
                  <div className="text-[10px] text-gray-400">Email</div>
                  <div className="text-sm font-medium text-gray-900">{customer.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 text-sm">📱</div>
                <div>
                  <div className="text-[10px] text-gray-400">Phone</div>
                  <div className="text-sm font-medium text-gray-900">{customer.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 text-sm">📍</div>
                <div>
                  <div className="text-[10px] text-gray-400">Address</div>
                  <div className="text-sm font-medium text-gray-900">{customer.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 text-sm">📅</div>
                <div>
                  <div className="text-[10px] text-gray-400">Customer Since</div>
                  <div className="text-sm font-medium text-gray-900">{customer.joined}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Account Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-gray-400 mb-0.5">Segment</div>
                <div className="text-sm font-semibold text-gray-900">{customer.segment}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-gray-400 mb-0.5">Plan</div>
                <div className="text-sm font-semibold text-gray-900">{customer.plan}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-gray-400 mb-0.5">Total Tickets</div>
                <div className="text-sm font-semibold text-gray-900">{customer.tickets}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-gray-400 mb-0.5">CSAT Score</div>
                <div className="text-sm font-semibold text-gray-900">{customer.csat} ★</div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Notes</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{customer.notes}</p>
          </div>
        </div>

        {/* Right - Tickets & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Tickets */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Recent Tickets</h3>
              <Link href="/dashboard/tickets" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">View all →</Link>
            </div>
            <div className="space-y-2">
              {customer.recentTickets.map((ticket) => (
                <Link key={ticket.id} href={`/dashboard/tickets/${ticket.id.replace("SSV-", "")}`} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[ticket.status]}`}>{ticket.status}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${priorityColor[ticket.priority]}`}>{ticket.priority}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition truncate">{ticket.subject}</div>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{ticket.date}</span>
                </Link>
              ))}
              {customer.recentTickets.length === 0 && (
                <div className="text-center py-6 text-sm text-gray-400">No tickets yet</div>
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Activity Timeline</h3>
            <div className="space-y-3">
              {customer.activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm shrink-0">{a.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900">{a.action}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
