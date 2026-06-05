import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { queryFoundryIQKnowledge, generateGroundedCopy, renderCssCanvas } from "./tools/designTools.js";
import dotenv from "dotenv";

// Load environment variables (.env file se keys read karne ke liye)
dotenv.config();

// Initialize VibeCraft MCP Server
const server = new Server(
  { 
    name: "vibecraft-agentic-layer", 
    version: "2.0.0" 
  },
  { 
    capabilities: { 
      tools: {} 
    } 
  }
);

/**
 * 1. Tools Registration
 * Expanding to a true Agentic Suite for Microsoft Agents League Hackathon.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query_foundry_iq_knowledge",
        description: "Simulates querying Microsoft Foundry IQ for local market trends, demographic data, and enterprise brand voice guidelines for a specific business.",
        inputSchema: {
          type: "object",
          properties: {
            businessName: { type: "string", description: "Name of the business (e.g., Maa Rewa Auto Parts)" }
          },
          required: ["businessName"],
        },
      },
      {
        name: "generate_grounded_copy",
        description: "Generates creative Hinglish marketing copy strictly grounded in the brandVoice retrieved from Foundry IQ.",
        inputSchema: {
          type: "object",
          properties: {
            businessName: { type: "string" },
            eventType: { type: "string", description: "The event theme (e.g., Diwali Dhamaka)" },
            brandVoice: { type: "string", description: "The brand voice returned by query_foundry_iq_knowledge" }
          },
          required: ["businessName", "eventType", "brandVoice"],
        },
      },
      {
        name: "render_css_canvas",
        description: "Renders the final premium, asset-free HTML/CSS component layout using the context data.",
        inputSchema: {
          type: "object",
          properties: {
            businessName: { type: "string" },
            eventType: { type: "string" },
            primaryColor: { type: "string", description: "Hex color code" },
            regionalVibe: { type: "string", description: "The regional vibe returned by query_foundry_iq_knowledge" }
          },
          required: ["businessName", "eventType"],
        },
      }
    ],
  };
});

/**
 * 2. Tool Execution Link
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      case "query_foundry_iq_knowledge":
        return await queryFoundryIQKnowledge(request.params.arguments);
      case "generate_grounded_copy":
        return await generateGroundedCopy(request.params.arguments);
      case "render_css_canvas":
        return await renderCssCanvas(request.params.arguments);
      default:
        throw new Error("Requested tool not found on VibeCraft Agentic Server.");
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `❌ Agent Execution Error: ${error.message}` }],
    };
  }
});

/**
 * 3. Standard I/O Transport Connect
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🚀 VibeCraft Agentic MCP Server (Foundry IQ Enabled) is fully operational on stdio!");
}

main().catch((error) => {
  console.error("Fatal Server Error:", error);
  process.exit(1);
});
