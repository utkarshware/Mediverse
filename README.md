<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Mediverse – Project Summary</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 2rem;
      background: #0b1020;
      color: #f5f5f5;
    }
    h1, h2, h3 {
      color: #ffffff;
      margin-top: 1.8rem;
    }
    h1 {
      margin-top: 0;
      font-size: 2rem;
    }
    h2 {
      font-size: 1.4rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding-bottom: 0.3rem;
    }
    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.4rem;
    }
    p {
      margin: 0.4rem 0 0.8rem;
    }
    ul {
      margin: 0.2rem 0 0.8rem 1.2rem;
    }
    li {
      margin: 0.2rem 0;
    }
    code {
      background: rgba(255,255,255,0.07);
      padding: 0.15rem 0.3rem;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.9rem;
    }
    pre {
      background: #050814;
      border-radius: 6px;
      padding: 0.8rem 1rem;
      overflow-x: auto;
      font-size: 0.9rem;
    }
    pre code {
      padding: 0;
      background: transparent;
    }
    .tagline {
      color: #c9ccff;
      font-size: 0.95rem;
      margin-top: -0.4rem;
      margin-bottom: 0.8rem;
    }
    .pill {
      display: inline-block;
      background: rgba(131, 146, 255, 0.16);
      border: 1px solid rgba(131, 146, 255, 0.4);
      border-radius: 999px;
      padding: 0.1rem 0.6rem;
      font-size: 0.8rem;
      margin-right: 0.4rem;
      margin-bottom: 0.2rem;
    }
    .section-note {
      font-size: 0.85rem;
      color: #a5a8c7;
      margin-top: -0.2rem;
      margin-bottom: 0.6rem;
    }
    .disclaimer {
      border-left: 3px solid #ffb347;
      padding-left: 0.6rem;
      font-size: 0.9rem;
      color: #ffd9a0;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <h1>Mediverse – Project Summary</h1>
  <p class="tagline">
    Interactive 3D medical device trainer + GenAI guidance for civilians and students.
  </p>

  <div>
    <span class="pill">React 19</span>
    <span class="pill">Three.js</span>
    <span class="pill">Google Gemini</span>
    <span class="pill">Firebase</span>
    <span class="pill">Node.js · Express</span>
    <span class="pill">Google OAuth</span>
  </div>

  <p>
    Mediverse is an AI‑powered, 3D‑first health platform that turns complex medical devices and vitals into simple, actionable guidance for civilians, while doubling as an immersive training lab for healthcare students.[web:17][web:21] It is explicitly positioned as a guidance and triage tool, not a diagnostic system, using public clinical thresholds and focusing on correct device usage.[web:19][web:20]
  </p>

  <h2>Tech Stack</h2>

  <h3>Frontend</h3>
  <ul>
    <li><b>React 19</b> for a modular, high‑performance UI with separate dashboards for Civilians and Students.[web:12]</li>
    <li><b>React Router</b> for smooth, client‑side routing between views and roles.</li>
    <li><b>CSS3</b> for responsive, premium styling and dark‑mode friendly visuals.[web:16]</li>
  </ul>

  <h3>3D &amp; AI</h3>
  <ul>
    <li><b>Three.js</b> (WebGL) to render interactive 3D digital twins of devices (BP monitor, glucometer, pulse oximeter, thermometer) with full rotate/zoom controls.[web:21][web:24]</li>
    <li><b>Google Gemini</b> integrated as an in‑viewer chatbot to answer natural‑language questions about the device and basic physiology in context.[web:17][web:19]</li>
    <li><b>Logic‑based AI</b> to map vitals (BP, SpO₂, Glucose, Temp) to Red/Amber/Green guidance using standard thresholds instead of black‑box diagnosis.[web:19][web:20]</li>
  </ul>

  <h3>Backend &amp; Infrastructure</h3>
  <ul>
    <li><b>Firebase</b> for hosting, authentication, and future real‑time data storage of vitals and usage.[web:17]</li>
    <li><b>Node.js + Express</b> API as a bridge between the frontend and Gemini, handling prompt construction, role logic, and rate limiting.[web:12]</li>
    <li><b>Google OAuth</b> for one‑click, secure sign‑in with role tagging for students and civilians.[web:17]</li>
  </ul>

  <h2>Core Features</h2>

  <h3>Interactive 3D Device Trainer</h3>
  <p>
    Users explore high‑fidelity 3D models of medical devices, rotating and zooming to understand each component, while the system verifies correct placement and usage steps.[web:21][web:24] Integrated Gemini chat lets them ask questions like “How do I wear this cuff?” and get device‑specific answers in real time.[web:17][web:19]
  </p>

  <h3>Dual‑Role Dashboards</h3>
  <ul>
    <li><b>Civilian mode:</b> “Pocket hospital” with nearby hospital search, appointment booking, and instant vitals‑based feedback (e.g., “Critical – Seek help now”).[web:17][web:20]</li>
    <li><b>Student mode:</b> Learning workspace with guided 3D flows, step‑by‑step device procedures, and quiz/checklist layers for competency building.[web:21][web:18]</li>
  </ul>

  <h3>AI Health Guidance System</h3>
  <p>
    Users enter readings (BP, SpO₂, Glucose, Temp), which are evaluated against WHO/ICMR‑style ranges to produce color‑coded states and human‑readable advice like “Monitor”, “Consult soon”, or “Emergency”.[web:19][web:20] This keeps Mediverse in the “guidance, not diagnosis” zone while still being practically useful.
  </p>

  <div class="disclaimer">
    <b>Disclaimer:</b> Mediverse is an educational and triage support tool, not a medical diagnostic system. Users are always advised to consult licensed healthcare professionals for clinical decisions.[web:19]
  </div>

  <h2>Installation &amp; Setup (Detailed)</h2>
  <p class="section-note">
    Example workflow assuming a React + Vite/CRA frontend, Node/Express backend, and Firebase + Gemini integration.
  </p>

  <h3>1. Clone the Repository</h3>
  <pre><code>git clone https://github.com/utkarshware/Mediverse.git
cd Mediverse</code></pre>

  <h3>2. Environment Configuration</h3>
  <p>Create a <code>.env</code> file in both the frontend and backend (if they are separate folders) with keys like:</p>
  <pre><code># Backend (.env)
GEMINI_API_KEY=&lt;your_google_gemini_api_key&gt;
OAUTH_CLIENT_ID=&lt;your_google_oauth_client_id&gt;
OAUTH_CLIENT_SECRET=&lt;your_google_oauth_client_secret&gt;
OAUTH_REDIRECT_URI=&lt;your_oauth_redirect_url&gt;

# Firebase (shared or frontend .env)
VITE_FIREBASE_API_KEY=&lt;firebase_api_key&gt;
VITE_FIREBASE_AUTH_DOMAIN=&lt;firebase_auth_domain&gt;
VITE_FIREBASE_PROJECT_ID=&lt;firebase_project_id&gt;
VITE_FIREBASE_STORAGE_BUCKET=&lt;firebase_bucket&gt;
VITE_FIREBASE_MESSAGING_SENDER_ID=&lt;firebase_sender_id&gt;
VITE_FIREBASE_APP_ID=&lt;firebase_app_id&gt;</code></pre>

  <h3>3. Install Dependencies</h3>

  <h4>Frontend</h4>
  <pre><code>cd frontend   # or the actual frontend folder
npm install   # or: pnpm install / yarn install</code></pre>

  <h4>Backend</h4>
  <pre><code>cd backend    # or the actual backend folder
npm install   # installs Express, axios/fetch, etc.</code></pre>

  <h3>4. Run in Development</h3>

  <h4>Backend server</h4>
  <pre><code>cd backend
npm run dev   # e.g., nodemon index.js or your dev script</code></pre>

  <h4>Frontend dev server</h4>
  <pre><code>cd frontend
npm run dev   # Vite/CRA dev server (usually http://localhost:5173 or 3000)</code></pre>

  <p>
    Ensure the frontend’s API base URL (e.g., <code>VITE_API_BASE_URL=http://localhost:5000</code>) points to the running Express backend so the Gemini chatbot and vitals API calls work correctly.[web:12]
  </p>

  <h3>5. Building for Production</h3>

  <h4>Frontend build</h4>
  <pre><code>cd frontend
npm run build   # produces optimized static assets in /dist or /build</code></pre>

  <h4>Deployment</h4>
  <ul>
    <li>Deploy the frontend build output to <b>Firebase Hosting</b> or any static host.[web:17]</li>
    <li>Deploy the Express backend to a Node‑compatible host (Render, Railway, Firebase Functions, etc.), configuring environment variables in the host dashboard.[web:17][web:23]</li>
    <li>Update frontend environment to use the production API URL for the chatbot and vitals endpoints.</li>
  </ul>

  <h2>Roadmap (Short)</h2>
  <ul>
    <li>ABHA/UHI integration for India‑wide health records and interoperable bookings.[web:17]</li>
    <li>Bluetooth/IoT integration with BP and glucose devices to auto‑ingest readings.[web:23]</li>
    <li>Voice‑first chatbot in 10+ Indian languages for rural and low‑literacy users.[web:16][web:20]</li>
    <li>B2B student modules and hyperlocal hospital/pharmacy marketplace for monetization.[web:21][web:23]</li>
  </ul>
</body>
</html>
