# VibeCraft Studio Pro 2.0 🚀
**Built for the Microsoft Agents League Hackathon — Creative Apps Track**

VibeCraft Studio is an innovative, **Agentic Development Platform** designed to empower local retail merchants. It acts as an intelligent creative layer that orchestrates multiple agentic tools to generate culturally grounded marketing copy and responsive, dynamic visual layouts.

---

### Microsoft IQ Integration
Our platform **deeply integrates the Microsoft Foundry IQ concept**.
Instead of using a generic AI wrapper, we have built a **Model Context Protocol (MCP) Backend** that simulates a connection to an Enterprise Knowledge Graph. 

When a user inputs their business name (e.g., "Maa Rewa Auto Parts"), the system **grounds** the AI by retrieving specific local demographic data, cultural nuances (e.g., Central India market preferences), and brand safety guidelines before any creative generation begins. This ensures that the generated marketing assets are not hallucinated but strictly tailored to the local audience.

---

### How GitHub Copilot Assisted Me
This entire application was rapidly developed and scaled using **GitHub Copilot** & **Agentic Workflows**. 

* **Scaffolding the Architecture:** Copilot generated the boilerplate MERN/React folder structure, saving us hours of manual setup.
* **Canvas Studio Pro Engine:** Advanced math for the Drag & Drop (`react-rnd`) layer positioning, Z-Index management, and Semantic Reflow logic was accelerated through collaborative prompting.
* **Bug Fixing:** Solved complex React Babel JSX errors, DOM Ghosting from CSS `transform: scale`, and layout overlapping issues via intelligent context.
* **Creative Prompting:** We used Copilot to synthesize the unique "Hinglish" marketing copy generator that drives our frontend UI.

---

## 🎨 3. Grounded Context & Canvas Pro UX

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
