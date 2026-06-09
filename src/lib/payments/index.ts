import Flutterwave from "flutterwave-node-v3";

let flw: Flutterwave | null = null;

function getFlutterwave() {
  if (!flw) {
    const publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
    const encryptionKey = process.env.FLUTTERWAVE_ENCRYPTION_KEY;
    if (!publicKey || !secretKey || !encryptionKey) {
      throw new Error("Flutterwave keys not configured");
    }
    flw = new Flutterwave(publicKey, secretKey, encryptionKey);
  }
  return flw;
}

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    period: "month",
    description: "For small teams getting started with AI support",
    features: [
      "Up to 3 agents",
      "1,000 tickets/month",
      "3 channels (Web, Email, SMS)",
      "Basic AI resolution",
      "Email support",
      "Analytics dashboard",
    ],
    limits: { agents: 3, tickets: 1000, channels: 3 },
    popular: false,
    color: "from-gray-500 to-gray-600",
    cardClass: "border-gray-200 bg-white",
  },
  {
    id: "growth",
    name: "Growth",
    price: 149,
    period: "month",
    description: "For growing teams that need more power",
    features: [
      "Up to 10 agents",
      "5,000 tickets/month",
      "All 6 channels",
      "Advanced AI pipeline",
      "Priority support",
      "Custom branding",
      "API access",
    ],
    limits: { agents: 10, tickets: 5000, channels: 6 },
    popular: true,
    color: "from-blue-500 to-indigo-600",
    cardClass: "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    period: "month",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited agents",
      "Unlimited tickets",
      "All 6 channels + custom",
      "Full AI suite + custom models",
      "Dedicated account manager",
      "Custom branding & SLA",
      "SSO & RBAC",
      "Audit logs & compliance",
    ],
    limits: { agents: -1, tickets: -1, channels: -1 },
    popular: false,
    color: "from-purple-500 to-violet-600",
    cardClass: "border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50",
  },
];

export async function initializePayment({
  email,
  amount,
  planId,
  userId,
}: {
  email: string;
  amount: number;
  planId: string;
  userId: string;
}) {
  const client = getFlutterwave();
  const txRef = `SF-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const payload = {
    tx_ref: txRef,
    amount: amount.toString(),
    currency: "USD",
    email,
    redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://supportflow-ai-six.vercel.app"}/api/payments/verify`,
    meta: {
      plan_id: planId,
      user_id: userId,
    },
    customizations: {
      title: "SupportFlow AI",
      description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan Subscription`,
      logo: `${process.env.NEXT_PUBLIC_BASE_URL || "https://supportflow-ai-six.vercel.app"}/logo.png`,
    },
  };

  const response = await client.Charges(payload);
  return { ...response.data, tx_ref: txRef };
}

export async function verifyPayment(transactionId: string) {
  const client = getFlutterwave();
  const response = await client.Transaction.verify({ id: transactionId });
  return response.data;
}

export async function createSubscription({
  email,
  plan,
  customerName,
}: {
  email: string;
  plan: string;
  customerName: string;
}) {
  const client = getFlutterwave();
  const response = await client.Subscription.create({
    email,
    customer_name: customerName,
    amount: plans.find((p) => p.id === plan)?.price || 0,
    plan: plan === "starter" ? "PLN_starter" : plan === "growth" ? "PLN_growth" : "PLN_enterprise",
  });
  return response.data;
}

export async function listTransactions({ from, to, status }: { from?: string; to?: string; status?: string } = {}) {
  const client = getFlutterwave();
  const response = await client.Transaction.list({ from, to, status });
  return response.data;
}
