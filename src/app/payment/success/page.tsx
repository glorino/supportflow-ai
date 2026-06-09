"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const transactionId = searchParams.get("transaction_id");
    if (transactionId) {
      fetch(`/api/payments/verify?transaction_id=${transactionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setVerified(true);
          } else {
            setError(data.error || "Payment verification failed");
          }
        })
        .catch(() => setError("Failed to verify payment"))
        .finally(() => setVerifying(false));
    } else {
      setVerifying(false);
      setError("No transaction ID provided");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-md w-full">
        <div className="rounded-3xl border border-gray-200/60 bg-white p-8 shadow-xl text-center">
          {verifying ? (
            <>
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-6">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-500 border-t-transparent" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment...</h1>
              <p className="text-gray-500">Please wait while we confirm your payment.</p>
            </>
          ) : verified ? (
            <>
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
              <p className="text-gray-500 mb-6">Your subscription has been activated. Thank you for choosing SupportFlow AI.</p>
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 mb-6">
                <div className="text-sm text-green-700 font-medium">Your plan is now active</div>
                <div className="text-xs text-green-600 mt-1">You can now access all features included in your plan.</div>
              </div>
              <Link
                href="/dashboard/billing"
                className="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Go to Billing
              </Link>
              <div className="mt-4">
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 transition">
                  Back to Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Failed</h1>
              <p className="text-gray-500 mb-6">{error || "Something went wrong. Please contact support."}</p>
              <Link
                href="/dashboard/billing"
                className="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Try Again
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-500 border-t-transparent" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
