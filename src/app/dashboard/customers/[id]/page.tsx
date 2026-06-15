"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CustomerData {
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

interface Ticket {
  ticketNumber: string;
  subject: string;
  status: string;
  priority: string;
  channel: string;
  createdAt: string;
}

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

const channelIcon: Record<string, string> = {
  whatsapp: "📱",
  email: "📧",
  web: "💬",
  sms: "💬",
  messenger: "💬",
  instagram: "📸",
};

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
}

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data.customer || null);
        setRecentTickets(data.recentTickets || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

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

  const initials = customer.name.split(" ").map((n) => n[0]).join("");

  return (
    <div className="space-y-6">
      <Link href="/dashboard/customers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Customers
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-start gap-5">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">{initials}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${customer.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{customer.status}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{customer.email} · {customer.company}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{formatNaira(customer.ltv || 0)}</div>
            <div className="text-xs text-gray-500">Lifetime Value</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
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
                <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 text-sm">📅</div>
                <div>
                  <div className="text-[10px] text-gray-400">Customer Since</div>
                  <div className="text-sm font-medium text-gray-900">{formatDate(customer.createdAt)}</div>
                </div>
              </div>
              {customer.sourceChannel && (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 text-sm">{channelIcon[customer.sourceChannel] || "💬"}</div>
                  <div>
                    <div className="text-[10px] text-gray-400">Source Channel</div>
                    <div className="text-sm font-medium text-gray-900 capitalize">{customer.sourceChannel}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Account Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-gray-400 mb-0.5">Segment</div>
                <div className="text-sm font-semibold text-gray-900 capitalize">{customer.segment}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-gray-400 mb-0.5">Plan</div>
                <div className="text-sm font-semibold text-gray-900 capitalize">{customer.plan}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-gray-400 mb-0.5">Total Tickets</div>
                <div className="text-sm font-semibold text-gray-900">{customer.totalTickets}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-gray-400 mb-0.5">CSAT Score</div>
                <div className="text-sm font-semibold text-gray-900">{customer.csat || 0} ★</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Recent Tickets</h3>
              <Link href={`/dashboard/tickets?channel=${customer.sourceChannel || ""}`} className="text-xs text-blue-600 hover:text-blue-700 font-semibold">View all →</Link>
            </div>
            <div className="space-y-2">
              {recentTickets.map((ticket) => (
                <Link key={ticket.ticketNumber} href={`/dashboard/tickets/${ticket.ticketNumber.replace("SSV-", "")}`} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-gray-400">{ticket.ticketNumber}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[ticket.status] || "bg-gray-100 text-gray-600"}`}>{ticket.status}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${priorityColor[ticket.priority] || "bg-gray-100 text-gray-600"}`}>{ticket.priority}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition truncate">{ticket.subject}</div>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{timeAgo(ticket.createdAt)}</span>
                </Link>
              ))}
              {recentTickets.length === 0 && (
                <div className="text-center py-6 text-sm text-gray-400">No tickets yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
