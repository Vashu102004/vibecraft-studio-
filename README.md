# VibeCraft Studio: Contextual Local Business Ad-Layer
Built for the Microsoft Agents League Hackathon — Creative Apps Track

VibeCraft Studio is an innovative, AI-assisted development platform designed to empower small businesses and local retail merchants. It acts as an intelligent creative layer that transforms business attributes, local market context, and campaign requirements into high-conversion, responsive HTML/CSS layouts and culturally grounded marketing copy.

---

## 💡 Core Innovation & Features

- **Grounded Contextual Intelligence:** Unlike generic ad generators, VibeCraft utilizes localized parameters to tailor content specifically for regional commercial hubs (such as Indore and central Indian retail markets).
- **Automated Component Layouts:** Generates clean, asset-free, pure CSS/HTML fluid banner wrappers instantly, reducing dependency on heavy image processing.
- **Dynamic Cultural Adaptation:** Translates campaign definitions into natural, high-impact Hinglish marketing text, boosting engagement for local user bases.
- **The Live Canvas Sandbox:** A premium, dark-themed dashboard built with React.js and Tailwind CSS featuring dynamic sandbox rendering for real-time adjustments.

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS (Glassmorphic Core Architecture)
- **Backend:** Node.js, Express.js, Model Context Protocol (MCP) SDK
- **AI Ecosystem:** GitHub Copilot (VS Code & CLI) for AI-assisted structural generation, powered by model routing capabilities.
- **Intelligence Layer:** Built around the architectural specifications of Microsoft Foundry IQ for agentic knowledge retrieval and strict compliance gating.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have Node.js (v18+) installed on your machine.

### 2. Backend & MCP Server Configuration
```bash
cd backend
npm install
```
Configure your environment variables inside a secure `.env` file (never committed to version control):
```env
PORT=5000
FOUNDRY_IQ_KEY=your_microsoft_foundry_api_key_here
```
To run the backend server on standard I/O:
```bash
node src/server.js
```

### 3. VS Code / GitHub Copilot Integration
To connect this engine directly into your VS Code Copilot Chat environment, add the server to your global `mcp.json` configuration file:

**Path:** `C:\Users\<Your-Username>\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\mcp.json`
```json
{
  "mcpServers": {
    "vibecraft-design-layer": {
      "command": "node",
      "args": ["C:/YOUR_ABSOLUTE_PATH_TO_PROJECT/agents-league-hackathon/backend/src/server.js"],
      "env": {}
    }
  }
}
```

### 4. Frontend Local Development
```bash
cd frontend
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to interact with the Live Canvas Room.

---

## 🔒 Security & Compliance Best Practices
- Strict data hygiene implemented: `.env` configuration files are mapped in `.gitignore`.
- No API keys, tokens, or customer-identifiable information (PII) are stored or tracked globally.
- Clean component lifecycle rendering isolates data injection to protect internal organizational schemas.
