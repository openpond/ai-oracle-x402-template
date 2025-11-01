# AI Oracle X402 Template

A template for creating MCP (Model Context Protocol) agents with x402 payment support. This project demonstrates how to build AI-powered tools with integrated payment handling using the OpenTool framework.

## Files

- `tools/ai-oracle.ts` – AI-powered question answering tool with x402 payment integration
- `metadata.ts` – Complete metadata configuration including payment settings
- `package.json` – Project configuration with OpenTool dependencies
- `dist/` – Generated files after build

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

1. **Install dependencies:**

   ```bash
   bun install
   ```

1. **Build the project:**

   ```bash
   bun run build
   ```

1. **Test locally with MCP Inspector:**
   ```bash
   npx @modelcontextprotocol/inspector node dist/mcp-server.js
   ```

## Features

This template showcases:

- **X402 Payment Integration** – Built-in payment handling using x402 protocol
- **AI-Powered Tools** – Question answering using the `opentool/ai` package
- **Custom Metadata** – Complete project information, categories, and discovery data
- **Payment Configuration** – Monetization with USDC (defaults to Base mainnet, configurable via env)
- **MCP Server** – Full Model Context Protocol server implementation
- **Type-Safe Schemas** – Input validation using Zod
- **Deployment Ready** – Build scripts for generating production-ready MCP servers

## Generated Files

After building, you'll find these files in `dist/`:

- **`mcp-server.js`** – stdio MCP server for Node/Lambda execution (if mcp is enabled)
- **`metadata.json`** – Complete tool and project metadata (spec `v1.0.0`)
- **`tools/ai-oracle.js`** – Compiled AI Oracle tool

## Testing

Use the MCP Inspector to test the AI Oracle tool:

**AI Oracle Example:**

```json
{
  "question": "What is the price of BTC?"
}
```

Other example questions:

- "Calculate the square root of 144"
- "What are the latest developments in AI?"
- "Explain quantum computing in simple terms"

The tool requires x402 payment before returning results. Set `OPENPOND_GATEWAY_URL` or `OPENPOND_API_KEY` in your environment if you need to target a custom gateway or authenticated provider.

### Quick x402 test with curl

1. Start the dev server:

   ```bash
   npx opentool dev --input tools
   ```

2. Trigger the paywall and inspect the returned payment requirements:

   ```bash
   curl -i \
     -X POST http://localhost:7000/ai-oracle \
     -H "content-type: application/json" \
     -d '{"question":"What is the price of BTC?"}'
   ```

   The response includes `402 Payment Required` with an `x402.accepts[0]` object that references your `DEPLOYED_URL`.

3. Submit a follow-up request using a facilitator-signed payload:

   ```bash
   curl -i \
     -X POST http://localhost:7000/ai-oracle \
     -H "content-type: application/json" \
     -H "X-PAYMENT: ${X402_HEADER}" \
     -d '{"question":"What is the price of BTC?"}'
   ```

   Replace `${X402_HEADER}` with the base64-encoded `X-PAYMENT` header returned by your facilitator (for example, the hosted service at `https://facilitator.x402.rs`). A valid payload returns `200 OK`; otherwise the server sends another `402` with error details.

## Metadata Configuration

The `metadata.ts` file demonstrates how to configure:

- **Project Information** – Name, description, version, and branding
- **Discovery Metadata** – Keywords, use cases, and capabilities
- **Payment Settings** – X402 configuration with USDC on Base Sepolia
- **UI Enhancements** – Prompt examples, icons, and media assets
- **Compatibility** – Platform, language, and framework requirements

## Tool Configuration

Each tool in the `tools/` directory can configure:

- **Schema** – Zod-based input validation
- **Payment** – Per-tool payment settings using `definePayment`
- **MCP Integration** – Enable/disable MCP server exposure
- **Handler** – Async POST function for processing requests

## Use This Template

To create your own MCP agent with x402 support:

1. Clone this repository
2. Modify `metadata.ts` with your project details
3. Update `tools/ai-oracle.ts` or create new tools
4. Configure payment settings and wallet addresses
5. Build and test with MCP Inspector
6. Deploy to your preferred hosting platform

## Resources

- [OpenTool Documentation](https://docs.openpond.dev)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [X402 Payment Protocol](https://github.com/openpond/x402-spec)
