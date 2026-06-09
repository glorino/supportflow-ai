"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 p-4">
      <div className="max-w-md w-full">
        <div className="rounded-3xl border border-gray-200/60 bg-white p-8 shadow-xl text-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-500 mb-6">Your payment was not completed. No charges were made.</p>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6">
            <div className="text-sm text-amber-700 font-medium">No worries!</div>
            <div className="text-xs text-amber-600 mt-1">You can try again anytime. Your account remains active with your current plan.</div>
          </div>
          <div className="space-y-3">
            <Link
              href="/dashboard/billing"
              className="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              View Plans
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center w-full rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
