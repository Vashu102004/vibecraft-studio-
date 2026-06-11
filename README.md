# VibeCraft Agent Studio 🚀
**Built for the Microsoft Agents League Hackathon — Creative Apps Track**

VibeCraft Studio is an innovative, **Agentic Development Platform** designed to empower local retail merchants. It acts as an intelligent creative layer that orchestrates multiple agentic tools to generate culturally grounded marketing copy and responsive, asset-free HTML/CSS layouts.

---

## 🌟 1. Microsoft Foundry IQ Integration (Crucial)

Our platform **deeply integrates the Microsoft Foundry IQ concept**.
Instead of using a generic AI wrapper, we have built a **Model Context Protocol (MCP) Backend** that simulates a connection to an Enterprise Knowledge Graph. 

When a user inputs their business name (e.g., "Maa Rewa Auto Parts"), the system **grounds** the AI by retrieving specific local demographic data, cultural nuances (e.g., Central India market preferences), and brand safety guidelines before any creative generation begins. This ensures that the generated marketing assets are not hallucinated but strictly tailored to the local audience.

---

## 🤖 2. How GitHub Copilot Helped Us (Usage Log)

This entire application was rapidly developed and scaled using **GitHub Copilot**. 

* **Scaffolding the Architecture:** Copilot generated the boilerplate MERN/React folder structure, saving us hours of manual setup.
* **Complex Logic Implementation:** Copilot Chat helped design the `LivePreview` CSS rendering logic, ensuring that the dark themes, dynamic colors, and SVG/emoji cartoon graphics correctly adapt to the selected festival state in React.
* **Bug Fixing:** When integrating Tailwind CSS v4 with Vite, Copilot diagnosed and resolved dependency conflicts.
* **Creative Prompting:** We used Copilot to switch context models and synthesize the unique "Hinglish" marketing copy generator that drives our frontend UI.

---

## 🎨 3. Grounded Context & Creative UX

VibeCraft Studio breaks away from standard chat interfaces by offering a **3-Step Magic Wizard**:
1. **Context First:** The user selects their business name, category, and festival theme.
2. **Personalized Grounding:** The AI doesn't just return generic text; it synthesizes *Hinglish* copy (e.g., "Shubh Diwali Alert from Maa Rewa Auto Parts!") specifically optimized for the chosen category and Indian local markets.
3. **Dynamic Output:** A lightweight, asset-free HTML/CSS banner is live-rendered based on the exact context.
4. **Actionable UX:** One-click WhatsApp export and HTML source copy make the platform incredibly easy for non-technical shop owners to use immediately.

---

## 🔐 4. Security & Environment Variables

Security is paramount. We have ensured that:
* **No API Keys or Secrets are exposed.** All sensitive tokens (if any) are strictly managed via a `.env` file in the backend (`process.env.API_KEY`).
* The root project and all sub-folders have strict `.gitignore` rules that prevent `.env` from ever being pushed to GitHub.
* The automatic GitHub scanner will remain completely clean.

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS v4, Lucide Icons, Canvas-Confetti (Multi-step UI)
- **Backend:** Node.js, Express.js, Model Context Protocol (MCP) SDK
- **Intelligence Layer:** Microsoft Foundry IQ integration for contextual grounding.

---

## 🚀 Quick Start Guide

### 1. Start the Backend
\`\`\`bash
cd backend
npm install
npm start
\`\`\`

### 2. Start the Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
Navigate to `http://localhost:5173`.
