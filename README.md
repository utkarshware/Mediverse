# 📘 Mediverse — AI-Enhanced 3D Healthcare Guidance Platform

A responsive web platform that empowers civilians to learn medical device usage, interpret basic vitals, and gain confidence using 3D interactive visuals and AI-assisted guidance — while serving as a learning ecosystem for healthcare students.

## 🚀 Table of Contents

- Project Summary
- Key Features
- Tech Stack
- System Architecture
- Folder Structure
- Installation & Setup
- Running the Project
- Environment Variables & API Keys
- How It Works
- Deployment Options
- Future Roadmap
- Contribution Guidelines
- License

---

## 🧠 Project Summary

**Mediverse** is designed to bridge the healthcare trust gap by combining:

- **3D Digital Twins** of medical devices (like BP monitors, glucometers).
- **GenAI (Google Gemini)** integrated chatbot to answer practical questions.
- **Logic-based classification** of vitals into easy-to-understand outputs.
- **Dual-role UX**: Civilians (guidance) and Students (training).

> It’s a guidance-oriented platform, **not a diagnostic tool**.

---

## ⭐ Key Features

### 🔹 Interactive 3D Device Viewer
- Fully rotatable & scalable 3D models.
- Visual learning of device form and function.
- WebGL via Three.js.

### 🔹 AI-Assisted Guidance
- Chatbot powered by **Google Gemini API**.
- Context-aware help tied to the current device.
- Natural language interface (e.g., “How do I use this device?”).

### 🔹 Health Reading Interpreter
- Input vitals: BP, SpO₂, Glucose, Temp.
- **Logic-based Red / Amber / Green classification.**
- Plain language guidance based on global standards.

### 🔹 Dual-Role Ecosystem
- **Civilians:**
  - Learn device usage.
  - Get health interpretation.
- **Students:**
  - Interactive 3D learning.
  - Competency-based training ecosystem.

---

## 🛠 Tech Stack

| **Layer**            | **Technologies**                                              |
|----------------------|-------------------------------------------------------------|
| **Frontend**         | React (v19), React Router, CSS3                              |
| **3D Visualization** | Three.js (WebGL)                                            |
| **AI Integration**   | Google Gemini via Node/Express                              |
| **Backend**          | Node.js, Express                                            |
| **Database & Hosting** | Firebase                                                   |
| **Authentication**   | Google OAuth                                                |
| **Deployment**       | Firebase Hosting / Vercel / Netlify                         |

---

## 🏗 System Architecture

### Overview:
```plaintext
User (Civilian / Student)
         ↓
React Web App (localhost:3000)
         ↓
┌──────────────────────────────────────────┐
│  Frontend Modules                         │
│ ─ 3D Viewer (Three.js) → 3001             │
│ ─ AI Chatbot → Express/Node → Gemini API  │
│ ─ Vital Interpreter (Logic Engine)        │
└──────────────────────────────────────────┘
         ↓
Firebase (Auth + Hosting)
         ↓
Final Outputs:
• Real-time Device Guidance
• Health Risk Classification
• Trustable Learning Feedback
```

---

## 📁 Folder Structure

**Example structure**:
```
Mediverse
├── frontend                 # React app (landing, dashboard)
├── threejs-3d-viewer        # 3D scene & interaction
├── backend                  # Node/Express + Gemini API handlers
├── public
├── .env.example
├── README.md
├── package.json
└── firebase.json
```
(Note: Adjust if your actual paths differ.)

---

## ⚙️ Installation & Setup

### 💡 Prerequisites

Ensure you have the following:
- Node.js ≥ 18
- npm / yarn
- Google account (OAuth + Gemini Integration setup).
- Firebase account.

### 🛠 Steps

1. **Clone Project:**
```bash
git clone https://github.com/utkarshware/Mediverse
cd Mediverse
```

2. **Install Dependencies:**
```bash
# Install Root Dependencies
npm install

# Install Frontend
cd frontend
npm install

# Install Backend
cd ../backend
npm install

# Install 3D Viewer
cd ../threejs-3d-viewer
npm install
```
---

## ▶️ Running the Project

### 🔹 Start Frontend
```bash
cd frontend
npm start
```
- Opens browser: `localhost:3000`

### 🔹 Start 3D Viewer
```bash
cd threejs-3d-viewer
npm start
```
- Opens browser: `localhost:3001`

### 🔹 Start Backend
```bash
cd backend
npm start
```

---

## 🔑 Environment Variables & API Keys

### Prerequisite: Create a `.env` File

Copy from `.env.example` or manually add:
```bash
# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxx

# Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Backend
PORT=5000
```
💡 **Reminder:** Never commit `.env` files or keys.

---

## 📖 How It Works — Detailed Flow

- **Landing Page (Port 3000):**
  - React app with role-specific dashboards.
  - Login via Google OAuth.

- **3D Viewer (Port 3001):**
  - Interactive 3D models enable users to zoom, rotate, and learn.
  - Chat panel allows queries to AI via Gemini API.
  
- **AI Query Handling:**
  - Express backend relays requests to Gemini.
  - Context-specific guidance provided.

---

## 🚢 Deployment

### 🔹 Firebase Hosting
1. Build frontend:
```bash
cd frontend
npm run build
```

2. Deploy (via Firebase CLI):
```bash
firebase deploy
```

### 🔹 Alternative Options (Vercel / Netlify):
- Deploy frontend and backend as separate apps.
- Secure API credentials using environment variables.
  
---

## 🌱 Future Roadmap

### **Phase 1:** (Complete)
- Core MVP Completion.
- Core AI-assisted feedback loop established.

### **Phase 2 – Next 6 Months:**
- **ABHA:** Incorporating India healthcare stacks.
- **IoT Integration:** Real-time device feed support.
- **GenAI Localization:** 10+ Indian languages support.
- Enhancing voice UX.

---

## 🤝 Contribution
- We welcome issues, requests, or PRs. Start by reading `CONTRIBUTING.md`.

---