import { generateText } from "opentool/ai";
import { defineX402Payment } from "opentool/x402";
import { z } from "zod";

export const schema = z.object({
  question: z
    .string()
    .min(1)
    .default("What is the price of BTC?")
    .describe("Question to answer"),
});

export const payment = defineX402Payment({
  amount: "0.001",
  currency: "USDC",
  payTo: process.env.WALLET_ADDRESS!,
  message: "Premium analytics require payment before access.",
  resource: process.env.DEPLOYED_URL!,
  network: "base-sepolia",
  assetAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  scheme: "exact",
});

export const mcp = { enabled: false };

export async function POST(request: Request) {
  const payload = await request.json();
  const { question } = schema.parse(payload);

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
