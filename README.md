# x402 Starter Kit

[![Deploy on OpenPond](https://img.shields.io/badge/Deploy_on-OpenPond-1E90FF?style=flat)](https://openpond.ai/project/new?repo=openpond/ai-oracle-x402-base-sepolia&ref=readme-host-button)
[![x402 Facilitator DuckAI](https://img.shields.io/badge/x402_Facilitator-Duckai-FFFFFF?style=flat&logo=data:image/svg+xml;base64,%3Cencoded-logo%3E&logoColor=white&labelColor=0B1E3F)](https://facilitator.duckai.ai)

A template for creating agents with x402 payment support on Base. This project demonstrates how to build AI-powered tools with integrated payment handling using the OpenTool framework. The template defaults to the [DuckAI](https://facilitator.duckai.ai) facilitator and can be hosted on [OpenPond](https://openpond.ai).

## Quick Start

1. **Create your environment file:**

   ```bash
   cp .env.example .env
   ```

   Update the file with your required credentials:

   - `WALLET_ADDRESS` – Your wallet address for receiving payments
   - `DEPLOYED_URL` – Base URL (e.g. `https://your-app.openpond.live`) used in x402 payment metadata
   - Additional API keys as needed for the OpenPond gateway
   - Optional overrides:
     - `X402_FACILITATOR_URL` – Custom facilitator base (defaults to `https://facilitator.x402.rs/x402`)
     - `X402_NETWORK` – Network slug (`base`, `base-sepolia`, etc.)
     - `X402_ASSET_ADDRESS` – ERC20 token address if the default for the selected network should be overridden

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Build the project:**

   ```bash
   npx opentool build
   ```

4. **Run the project:**

   ```bash
   npx opentool dev
   ```

5. Exercise the paywall end-to-end with the helper script (keep `npx opentool dev` running):

   ```bash
   PRIVATE_KEY=0xyour_private_key \
   bunx tsx scripts/test-x402-client.ts
   ```

   The script performs the full x402 flow: it makes the initial request, captures the 402 response, signs the transfer authorization, and retries with the `X-PAYMENT` header. Optional overrides include `PAYMENT_URL` (defaults to `http://localhost:7000/ai-oracle`), `RPC_URL` for a different Ethereum RPC, and `QUESTION` to change the payload. Successful runs print the payment details, HTTP status, and the paid response body.
