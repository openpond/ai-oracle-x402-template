export const metadata = {
  // Core metadata fields (top-level in registry.json)
  name: "ai-oracle-x402-template",
  displayName: "AI Oracle MCP X402 Template",
  description: "A template for creating MCP agents with x402 support",
  version: "1.0.0",
  chains: ["base-sepolia"],
  author: "OpenPond",
  website: "https://github.com/openpond/ai-oracle-x402-template",
  repository: "https://github.com/openpond/ai-oracle-x402-template",
  category: "example", // Single category for top-level field
  termsOfService: "Please review terms before use.",
  // Payment configuration
  payment: {
    amountUSDC: 0.001,
    description: "Very low cost example tools for learning and testing",
    x402: true,
    plain402: true,
    acceptedMethods: ["x402", "402"],
    acceptedCurrencies: ["USDC"],
    chains: ["base-sepolia"],
    facilitator: "opentool",
  },
  discovery: {
    keywords: ["example", "demo", "tutorial", "basic", "math"],
    category: "education",
    useCases: [
      "Learning how to build MCP tools with OpenTool",
      "Template for creating new OpenTool projects",
      "Demonstrating basic tool functionality",
      "Testing deployment and registration workflows",
    ],
    capabilities: [
      "mathematical-operations",
      "basic-interactions",
      "educational-examples",
    ],
    requirements: {
      authentication: [],
      permissions: [],
      dependencies: [],
      minimumInputs: ["varies by tool"],
    },
    pricing: {
      model: "pay-per-use",
      defaultAmount: 0.001,
      description: "Very low cost example tools for learning and testing",
    },
    compatibility: {
      platforms: ["web", "mobile", "server", "cli"],
      languages: ["any"],
      frameworks: ["mcp", "opentool"],
      regions: ["global"],
    },
  },

  // New UI Enhancement fields
  promptExamples: [
    "Calculate the square root of 144",
    "Add 25 and 37 together",
    "What's 15 multiplied by 8?",
    "Help me solve: (10 + 5) * 3",
  ],
  iconPath: "/icons/calculator.svg",
  videoPath: "/videos/opentool-demo.mp4",
  image: "/icons/calculator.svg",
  animation_url: "/videos/opentool-demo.mp4",
};
