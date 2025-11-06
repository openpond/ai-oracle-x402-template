import { payX402 } from "opentool/x402";

async function main() {
  const privateKey = process.env.PRIVATE_KEY as `0x${string}` | undefined;
  if (!privateKey) {
    console.error("❌ Set PRIVATE_KEY in your environment before running this script");
    process.exit(1);
  }

  const url = process.env.PAYMENT_URL ?? "http://localhost:7000/ai-oracle";
  const rpcUrl = process.env.RPC_URL ?? "https://sepolia.base.org";
  const question =
    process.env.QUESTION ?? "Show me the premium report";

  const body = { question };

  console.log("🔐 Testing x402 payment...");
  console.log(`Using payment URL: ${url}`);
  console.log(`Using RPC URL: ${rpcUrl}`);
  console.log(`Request body: ${JSON.stringify(body)}`);
  console.log("");

  const result = await payX402({
    privateKey,
    url,
    body,
    rpcUrl,
  });

  if (result.success) {
    console.log("✅ Payment successful!\n");
    console.log("Payment Details:");
    console.log(`  Amount: ${result.paymentDetails?.amount}`);
    console.log(`  Currency: ${result.paymentDetails?.currency}`);
    console.log(`  Network: ${result.paymentDetails?.network}`);
    console.log(`  Signature: ${result.paymentDetails?.signature?.slice(0, 20)}...`);

    if (result.response) {
      console.log(`\nFinal response status: ${result.response.status}`);
    }

    if (result.response) {
      try {
        const data = await result.response.json();
        console.log("\nResponse:");
        console.log(JSON.stringify(data, null, 2));
      } catch (err) {
        console.log("\nResponse stream could not be parsed as JSON");
      }
    }
  } else {
    console.error("❌ Payment failed:\n");
    console.error(result.error);
    if (result.response) {
      console.error(`\nResponse status: ${result.response.status}`);
      const text = await result.response.text();
      console.error(text);
    }
  }
}

main().catch((error) => {
  console.error("Unhandled error while testing payment:");
  console.error(error);
  process.exit(1);
});
