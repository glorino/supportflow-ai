declare module "flutterwave-node-v3" {
  interface FlutterwaveConfig {
    public_key: string;
    secret_key: string;
    encryption_key: string;
  }

  interface ChargePayload {
    tx_ref: string;
    amount: string;
    currency: string;
    email: string;
    redirect_url?: string;
    meta?: Record<string, string>;
    customizations?: {
      title?: string;
      description?: string;
      logo?: string;
    };
  }

  interface TransactionVerifyParams {
    id: string;
  }

  interface SubscriptionCreateParams {
    email: string;
    customer_name: string;
    amount: number;
    plan: string;
  }

  interface TransactionListParams {
    from?: string;
    to?: string;
    status?: string;
  }

  class Flutterwave {
    constructor(public_key: string, secret_key: string, encryption_key: string);
    Charges(payload: ChargePayload): Promise<{ data: { link?: string; [key: string]: unknown } }>;
    Transaction: {
      verify(params: TransactionVerifyParams): Promise<{ data: Record<string, unknown> }>;
      list(params?: TransactionListParams): Promise<{ data: Record<string, unknown>[] }>;
    };
    Subscription: {
      create(params: SubscriptionCreateParams): Promise<{ data: Record<string, unknown> }>;
    };
  }

  export default Flutterwave;
}
