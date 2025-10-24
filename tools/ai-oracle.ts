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
  payTo: process.env.TURNKEY_WALLET_ADDRESS!,
  message: "Premium analytics require payment before access.",
  acceptedMethods: ["x402", "402"],
  acceptedCurrencies: ["USDC"],
  chainIds: [8453],
  facilitator: "opentool",
});

export const mcp = { enabled: true };

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
