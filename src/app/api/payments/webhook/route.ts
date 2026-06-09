import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verify the webhook signature in production
    // const signature = request.headers.get("verif-hash");

    console.log("Flutterwave webhook received:", body);

    if (body.event === "charge.completed" && body.data?.status === "successful") {
      // Handle successful payment
      const { amount, customer, meta } = body.data;
      console.log(`Payment successful: ${amount} from ${customer.email} for plan ${meta?.plan_id}`);

      // In production:
      // 1. Update user subscription in database
      // 2. Send confirmation email
      // 3. Activate features
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
