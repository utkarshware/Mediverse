# Mediverse – Project Summary

*Interactive 3D medical device trainer + GenAI guidance for civilians and students.*

## Technology Stack

### Frontend
- **React 19**: Modular, high-performance UI with dashboards for Civilians and Students.
- **React Router**: Smooth, client-side routing.
- **CSS3**: Responsive styling and dark mode support.

### 3D & AI
- **Three.js**: Renders interactive 3D models of devices with rotate/zoom controls.
- **Google Gemini**: Chatbot for natural-language questions about devices and physiology.
- **Logic-based AI**: Provides vitals-based feedback using color-coded indications (Red/Amber/Green).

### Backend & Infrastructure
- **Firebase**: Hosting, authentication, and real-time data storage.
- **Node.js + Express**: Handles API requests, prompt construction, and role logic.
- **Google OAuth**: Secure sign-in.

## Core Features

### Interactive 3D Device Trainer
Explore high-fidelity 3D models of medical devices with guidance for correct placement and usage.

### Dual-Role Dashboards
- **Civilian mode**: Nearby hospital search, appointment booking, and feedback on vitals.
- **Student mode**: Learning workspace with guided flows, step-by-step procedures, and quizzes.

### AI Health Guidance System
Enter readings (BP, SpO₂, etc.) to receive actionable guidance.

## Disclaimer
> **Mediverse** is an educational and triage tool, not a diagnostic system. Always consult licensed healthcare professionals for clinical decisions.

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/utkarshware/Mediverse.git
cd Mediverse
```

### 2. Environment Configuration
Create a `.env` file in both backend and frontend folders:

```bash
# Backend (.env)
GEMINI_API_KEY=<your_google_gemini_api_key>
OAUTH_CLIENT_ID=<your_google_oauth_client_id>
OAUTH_CLIENT_SECRET=<your_google_oauth_client_secret>
OAUTH_REDIRECT_URI=<your_oauth_redirect_url>

# Firebase (shared/frontend .env)
VITE_FIREBASE_API_KEY=<firebase_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<firebase_auth_domain>
VITE_FIREBASE_PROJECT_ID=<firebase_project_id>
VITE_FIREBASE_STORAGE_BUCKET=<firebase_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<firebase_sender_id>
VITE_FIREBASE_APP_ID=<firebase_app_id>
```

### 3. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 4. Run in Development

#### Backend Server
```bash
cd backend
npm run dev
```

#### Frontend Dev Server
```bash
cd frontend
npm run dev
```
Ensure the frontend’s API URL points to the running backend.

### 5. Building for Production

#### Frontend Build
```bash
cd frontend
npm run build
```
Deploy frontend build to Firebase Hosting or any static host.

#### Backend Deployment
Deploy the backend to a Node-compatible host like Render, Railway, etc.

## Roadmap
- ABHA/UHI integration for health records in India.
- IoT integration with BP/glucose devices.
- Voice-first chatbot in multiple languages.
- B2B modules for students and marketplaces.