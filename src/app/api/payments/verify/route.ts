import { NextResponse, NextRequest } from "next/server";
import { verifyPayment } from "@/lib/payments";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get("transaction_id");

    if (!transactionId) {
      return NextResponse.redirect(new URL("/dashboard/billing?status=error", request.url));
    }

    const result = await verifyPayment(transactionId);

    if (result && result.status === "successful") {
      // In production, update the user's subscription in the database here
      const meta = result.meta as Record<string, string> | undefined;
      const planId = meta?.plan_id || "growth";

      return NextResponse.redirect(
        new URL(`/dashboard/billing?status=success&plan=${planId}&tx=${transactionId}`, request.url)
      );
    }

    return NextResponse.redirect(new URL("/dashboard/billing?status=failed", request.url));
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.redirect(new URL("/dashboard/billing?status=error", request.url));
  }
}
