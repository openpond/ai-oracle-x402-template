# AI Oracle MCP X402 Template

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
   - `TURNKEY_WALLET_ADDRESS` – Your Turnkey wallet address for receiving payments
   - Additional API keys as needed for the OpenPond gateway

1. **Install dependencies:**
   ```bash
   npm install
   ```

1. **Build the project:**
   ```bash
   npm run build
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
- **Payment Configuration** – Monetization with USDC on Base Sepolia
- **MCP Server** – Full Model Context Protocol server implementation
- **Type-Safe Schemas** – Input validation using Zod
- **Deployment Ready** – Build scripts for generating production-ready MCP servers

## Generated Files

After building, you'll find these files in `dist/`:

- **`mcp-server.js`** – stdio MCP server for Node/Lambda execution
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
