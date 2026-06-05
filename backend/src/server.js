import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { handleLayoutGeneration } from "./tools/designTools.js";
import dotenv from "dotenv";

// Load environment variables (.env file se keys read karne ke liye)
dotenv.config();

// Initialize VibeCraft MCP Server
const server = new Server(
  { 
    name: "vibecraft-design-layer", 
    version: "1.0.0" 
  },
  { 
    capabilities: { 
      tools: {} 
    } 
  }
);

/**
 * 1. Tools Registration
 * Yeh hamare unique dynamic content aur design tool ko GitHub Copilot ecosystem mein expose karega.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_design_layout",
        description: "Generates creative HTML/CSS layouts and culturally grounded Hinglish ad copy for small businesses based on Microsoft Foundry IQ context.",
        inputSchema: {
          type: "object",
          properties: {
            businessName: { 
              type: "string", 
              description: "Name of the business or shop (e.g., Maa Rewa Auto Parts, Royal Cafe)" 
            },
            eventType: { 
              type: "string", 
              description: "The event theme or festival offer (e.g., Diwali Dhamaka, Grand Opening, Monsoon Sale)" 
            },
            primaryColor: { 
              type: "string", 
              description: "Optional theme Hex code for branding (e.g., #ff9800 for gold/orange vibe)" 
            }
          },
          required: ["businessName", "eventType"],
        },
      },
    ],
  };
});

/**
 * 2. Tool Execution Link
 * Jab developer VS Code Chat mein input dega, toh yeh requests seedhe 'designTools.js' ke execution layer par jayengi.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "generate_design_layout") {
    try {
      return await handleLayoutGeneration(request.params.arguments);
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Error executing VibeCraft tool: ${error.message}`,
          },
        ],
      };
    }
  }
  throw new Error("Requested tool not found on VibeCraft server.");
});

/**
 * 3. Standard I/O Transport Connect
 * GitHub Copilot stdio channels ke through hi background process runs ko manage karta hai.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🚀 VibeCraft MCP Server with Foundry IQ is successfully running on stdio!");
}

main().catch((error) => {
  console.error("Fatal Server Error:", error);
  process.exit(1);
});
