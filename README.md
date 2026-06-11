# VibeCraft Studio Pro 2.0 🚀
**Built for the Microsoft Agents League Hackathon — Creative Apps Track**

VibeCraft Studio is an innovative, **Agentic Development Platform** designed to empower local retail merchants. It acts as an intelligent creative layer that orchestrates multiple agentic tools to generate culturally grounded marketing copy and responsive, dynamic visual layouts.

---

## 🏆 1. Hackathon Conditions & Alignment

We have strictly adhered to the **Microsoft Agents League Hackathon** conditions for the **Creative Apps Track**:

* **GitHub Copilot Usage:** The entire MERN architecture, Canvas Drag & Drop math (`react-rnd`), and CSS Grid layout algorithms were rapidly scaffolded and debugged using GitHub Copilot and Copilot Chat.
* **Agentic Model Context Protocol (MCP):** Instead of a simple prompt wrapper, we built a true **MCP Server Backend**. The frontend communicates with the agentic backend to pull real-time data schemas.
* **Microsoft Foundry IQ Integration:** Our platform simulates an Enterprise Knowledge Graph. It grounds the AI with local demographic context (e.g., Central India market nuances) to ensure the creative output is culturally accurate and brand-safe, entirely avoiding hallucination.
* **Creative App Impact:** We solved a real-world problem by enabling zero-tech retail merchants to generate beautiful, High-Res 4K marketing assets instantly without any design skills.

---

## 🎨 2. Grounded Context & Canvas Pro UX

VibeCraft Studio breaks away from standard chat interfaces by offering a **Fully Interactive Canvas Editor**:
1. **Smart Context:** Select a festival (Diwali, Holi, Eid, Navratri, etc.) and the system instantly updates the background, gradient, premium fonts, and **Smart Quotes** automatically.
2. **Pre-Built Auto Layouts:** Don't know how to design? Choose from 4 auto-snapping layouts: *Modern Centered, Classic Split, Bottom Heavy, and Creative Float*. The canvas elements instantly align themselves beautifully.
3. **Drag & Drop Editing:** Absolute freedom. Move texts, toggle premium frames, add dynamic animated emoji stickers, and arrange layers.
4. **4K High-Res Export:** Generate professional, razor-sharp posters mapped pixel-to-pixel ready for WhatsApp marketing.

---

## 🔐 4. Security & Environment Variables

Security is paramount. We have ensured that:
* **No API Keys or Secrets are exposed.** All sensitive tokens (if any) are strictly managed via a `.env` file in the backend (`process.env.API_KEY`).
* The root project and all sub-folders have strict `.gitignore` rules that prevent `.env` from ever being pushed to GitHub.
* The automatic GitHub scanner will remain completely clean.

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS v4, Lucide Icons, `react-rnd` (Drag & Drop), `html-to-image`
- **Backend:** Node.js, Express.js, Model Context Protocol (MCP) SDK
- **Intelligence Layer:** Microsoft Foundry IQ integration for contextual grounding.

---

## 🚀 Quick Start Guide

### 1. Start the Backend
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173`.
