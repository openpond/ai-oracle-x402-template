import { generateText } from "opentool/ai";
import { definePayment } from "opentool/payment";
import { z } from "zod";

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
  chainIds: [84532],
  facilitator: "opentool", // Use opentool facilitator for Base Sepolia testnet
  x402: {
    network: "base-sepolia",
    assetAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Base Sepolia USDC
  },
});

export const mcp = { enabled: false };

export async function POST(request: Request) {
  const payload = await request.json();
  const { question } = schema.parse(payload);
  const report = await generateText({
    baseUrl: process.env.OPENPOND_GATEWAY_URL,
    apiKey: process.env.OPENPOND_API_KEY,
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
