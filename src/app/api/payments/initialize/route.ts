import { NextResponse } from "next/server";
import { initializePayment } from "@/lib/payments";

export async function POST(request: Request) {
  try {
    const { email, planId, userId } = await request.json();

    if (!email || !planId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { plans } = await import("@/lib/payments");
    const plan = plans.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const payment = await initializePayment({
      email,
      amount: plan.price,
      planId,
      userId,
    });

    return NextResponse.json({ data: payment });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
  }
}
