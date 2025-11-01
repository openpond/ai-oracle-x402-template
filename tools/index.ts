import { generateText } from "opentool/ai";
import { definePayment, getPaymentContext } from "opentool/payment";
import { z } from "zod";

const DEFAULT_FACILITATOR_BASE = "https://facilitator.x402.rs";
const DEFAULT_FACILITATOR_PATH = "x402";
const DEFAULT_X402_NETWORK = "base";
const DEFAULT_ASSET_ADDRESSES: Record<string, `0x${string}`> = {
  base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "base-sepolia": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
};

function resolveFacilitatorUrl(): string {
  const raw = process.env.X402_FACILITATOR_URL?.trim();
  if (!raw) {
    return `${DEFAULT_FACILITATOR_BASE}/${DEFAULT_FACILITATOR_PATH}`;
  }

  const value =
    raw.startsWith("http://") || raw.startsWith("https://")
      ? raw
      : `https://${raw}`;
  const normalized = value.replace(/\/$/, "");
  try {
    const url = new URL(normalized);
    if (url.pathname && url.pathname !== "/") {
      return normalized;
    }
    return `${normalized}/${DEFAULT_FACILITATOR_PATH}`;
  } catch {
    // If URL constructor fails, fall back to default
    return `${DEFAULT_FACILITATOR_BASE}/${DEFAULT_FACILITATOR_PATH}`;
  }
}

const x402Network =
  process.env.X402_NETWORK?.trim()?.toLowerCase() || DEFAULT_X402_NETWORK;
const x402AssetAddress =
  (process.env.X402_ASSET_ADDRESS as `0x${string}` | undefined) ??
  DEFAULT_ASSET_ADDRESSES[x402Network] ??
  DEFAULT_ASSET_ADDRESSES[DEFAULT_X402_NETWORK];
const facilitatorUrl = resolveFacilitatorUrl();

export const schema = z.object({
  question: z
    .string()
    .min(1)
    .default("What is the price of BTC?")
    .describe("Question to answer"),
});

export const payment = definePayment({
  amount: "0.001",
  currency: "USDC",
  payTo: process.env.WALLET_ADDRESS!,
  message: "Premium analytics require payment before access.",
  resource: process.env.DEPLOYED_URL!,
  acceptedMethods: ["x402", "402"],
  acceptedCurrencies: ["USDC"],
  chains: [x402Network],
  facilitator: {
    url: facilitatorUrl,
    verifyPath: "verify",
    settlePath: "settle",
  },
  x402: {
    network: x402Network,
    assetAddress: x402AssetAddress,
  },
});

export const mcp = { enabled: false };

export async function POST(request: Request) {
  console.log("[x402-template] Incoming request", {
    hasXPaymentHeader: request.headers.has("X-PAYMENT"),
    xPaymentPreview: request.headers.get("X-PAYMENT")?.slice(0, 64),
    facilitatorUrl,
    x402Network,
  });

  const payload = await request.json();
  const { question } = schema.parse(payload);

  console.log("[x402-template] Parsed payload", {
    questionLength: question.length,
  });

  const paymentContext = getPaymentContext(request);
  console.log("[x402-template] Payment context", {
    optionId: paymentContext?.optionId,
    verifier: paymentContext?.payment?.verifier,
  });

  const report = await generateText({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });
  return new Response(
    JSON.stringify({
      report,
    }),
    {
      status: 200,
    }
  );
}
