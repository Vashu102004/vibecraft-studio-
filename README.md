# VibeCraft Agent Studio 🚀
**Built for the Microsoft Agents League Hackathon — Creative Apps Track**

VibeCraft Studio is an innovative, **Agentic Development Platform** designed to empower local retail merchants. It acts as an intelligent creative layer that retrieves business context from a simulated enterprise knowledge graph and orchestrates multiple agentic tools to generate culturally grounded marketing copy and responsive, asset-free HTML/CSS layouts.

---

## 🎯 Hackathon Core Requirements Fulfilled

### 1. Meaningful GitHub Copilot Usage
VibeCraft was developed entirely with the assistance of GitHub Copilot. 
- **Copilot Chat (VS Code):** Used for rapid architecture scaffolding, resolving Vite/Tailwind v4 integration bugs, and structuring the Agentic MCP server logic.
- **MCP Server Integration:** The backend functions as a Model Context Protocol (MCP) server. Copilot is given access to an *Agentic Suite of Tools* instead of a single endpoint, forcing it to reason and orchestrate tasks.

### 2. Microsoft Foundry IQ Integration
VibeCraft integrates a simulated **Microsoft Foundry IQ** intelligence layer.
- **Agentic Knowledge Retrieval:** The MCP server exposes `query_foundry_iq_knowledge`. When a business name is provided, Copilot retrieves a simulated enterprise knowledge graph containing *Brand Voice, Safety Guidelines, and Regional Demographics* specific to Central Indian markets.
- **Grounded Execution:** The creative tools (`generate_grounded_copy`, `render_css_canvas`) are strictly gated by the retrieved Foundry IQ context to reduce hallucinations and ensure brand safety.

### 3. Creative Application
VibeCraft replaces generic AI prompt wrappers with a **Live Canvas Sandbox**. It generates pure, lightweight CSS banner wrappers and culturally adapted Hinglish marketing text, turning raw metadata into high-conversion creative assets for non-technical shop owners.

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS v4 (Agentic Pipeline Terminal UI)
- **Backend:** Node.js, Express.js, Model Context Protocol (MCP) SDK
- **Intelligence Layer:** Simulated Microsoft Foundry IQ for contextual grounding.

---

## 🚀 Quick Start Guide

### 1. Backend & MCP Server Configuration
```bash
cd backend
npm install
node src/server.js
```

### 2. VS Code / GitHub Copilot Evaluation (For Judges)
To test the Agentic MCP Server directly in VS Code Copilot Chat:
1. Add the server to your global `mcp.json`:
**Path:** `C:\Users\<Your-Username>\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\mcp.json`
```json
{
  "mcpServers": {
    "vibecraft-agentic-layer": {
      "command": "node",
      "args": ["C:/YOUR_ABSOLUTE_PATH_TO_PROJECT/agents-league-hackathon/backend/src/server.js"]
    }
  }
}
```
2. Restart VS Code.
3. Open Copilot Chat and run this prompt:
> *"Use the vibecraft tools to query Foundry IQ for 'Maa Rewa Auto Parts', then generate grounded copy for a 'Diwali Dhamaka', and finally render the css canvas."*

### 3. Frontend Web Sandbox
To view the Live Agentic Pipeline Workspace:
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173` (or the port provided by Vite).

---

## 🔒 Security & Compliance Best Practices
- Strict data hygiene implemented: `.env` configuration files are mapped in `.gitignore`.
- No API keys or PII are tracked globally.
- Clean component lifecycle rendering isolates data injection to protect internal organizational schemas.
