# Mediverse

<div align="center">

![Mediverse Logo](https://img.shields.io/badge/Mediverse-Healthcare%20Platform-00D4AA?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMiAxMmgtNGwtMyA5TDkgM2wtMyA5SDIiLz48L3N2Zz4=)

**AI-Powered Healthcare Guidance Platform**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=flat-square&logo=vercel)](https://mediverse-black.vercel.app)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8.0-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://mediverse-black.vercel.app) • [Features](#features) • [Installation](#installation) • [Usage](#usage) • [Tech Stack](#tech-stack)

</div>

---

## Overview

Mediverse is a comprehensive React-based web application designed to provide AI-powered health guidance and medical device integration. The platform offers real-time health monitoring, AR-based device scanning, hospital finder with GPS integration, and multi-language support for a global user base.

## Features

### 🏥 Health Monitoring Dashboard
- **Real-time Health Readings**: Track vital signs including temperature, blood pressure, blood glucose, heart rate, SpO2, and BMI
- **Interactive Charts**: Visual representation of health trends over time with Line and Bar chart options
- **Reading History**: Complete history of all health measurements with timestamps
- **Unit Conversion**: Toggle between units (Celsius/Fahrenheit, mg/dL/mmol/L, kg/lbs)

### 📱 AR Medical Device Scanner
- **Device Integration**: Support for multiple medical devices:
  - Thermometer (Digital & Infrared)
  - Blood Pressure Monitor
  - Blood Glucose Meter
  - Pulse Oximeter
  - Digital Scale/BMI Calculator
- **Real-time Analysis**: Instant health analysis with AI-powered recommendations
- **Voice Feedback**: Audio announcements of readings in multiple languages

### 🗺️ Hospital Finder
- **Real-time GPS Location**: Uses actual user location for accurate results
- **OpenStreetMap Integration**: Powered by Overpass API for real hospital data
- **Distance Calculation**: Shows distance to nearby hospitals using Haversine formula
- **Emergency Services**: Quick access to nearby healthcare facilities

### 🌍 Multi-Language Support
- English
- Hindi (हिंदी)
- Spanish (Español)
- French (Français)
- German (Deutsch)
- Chinese (中文)
- Japanese (日本語)
- Korean (한국어)
- Arabic (العربية)
- Portuguese (Português)

### 👤 User Profiles
- **Civilian Mode**: For general public health monitoring
- **Student Mode**: Specialized features for medical students
- **Profile Management**: Personal health data storage and management
- **Google OAuth Integration**: Secure authentication

### 📊 Health Analytics
- **Trend Analysis**: Track health metrics over time
- **Chart Visualizations**: Line and bar charts for data interpretation
- **Risk Assessment**: Color-coded health status indicators (Green/Yellow/Red)
- **Personalized Recommendations**: AI-generated health advice based on readings

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Frontend UI Framework |
| **React Router 7** | Client-side Routing |
| **Firebase** | Authentication & Database |
| **OpenStreetMap Overpass API** | Real-time Hospital Data |
| **CSS3** | Styling with CSS Variables |
| **Vercel** | Deployment & Hosting |

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for authentication)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/utkarshware/Mediverse.git
   cd Mediverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Create a Firebase project and update `src/firebase/config.js` with your credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   
   Opens [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
Mediverse/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── ar-med/              # AR Medical Scanner Module
│       ├── public/
│       │   ├── ar.html
│       │   ├── viewer.html
│       │   └── models/
│       ├── server/
│       └── src/
├── src/
│   ├── App.js               # Main application component
│   ├── App.css              # Global styles
│   ├── index.js             # Application entry point
│   ├── assets/              # Static assets
│   ├── components/          # Reusable components
│   │   ├── Navbar.js        # Navigation bar
│   │   ├── Hero.js          # Landing page hero section
│   │   ├── Features.js      # Feature showcase
│   │   ├── HowItWorks.js    # Process explanation
│   │   ├── Contact.js       # Contact form
│   │   ├── Footer.js        # Site footer
│   │   ├── ManualInput.js   # Health data input
│   │   └── CustomSelect.js  # Custom dropdown
│   ├── firebase/
│   │   └── config.js        # Firebase configuration
│   └── pages/
│       ├── Landing.js       # Home page
│       ├── Login.js         # Login page
│       ├── ARScan.js        # AR Scanner page
│       ├── CivilianAuth.js  # Civilian authentication
│       ├── CivilianDashboard.js
│       ├── CivilianProfile.js
│       ├── StudentAuth.js   # Student authentication
│       ├── StudentDashboard.js
│       └── StudentProfile.js
├── package.json
├── vercel.json              # Vercel deployment config
└── README.md
```

## Usage

### Getting Started
1. Visit the [live demo](https://mediverse-black.vercel.app)
2. Click "Get Started" to access the platform
3. Choose your user type (Civilian or Student)
4. Sign in with Google or email

### Health Monitoring
1. Navigate to the AR Scanner page
2. Select your medical device type
3. Enter or scan your health readings
4. View instant analysis and recommendations

### Finding Nearby Hospitals
1. Go to Emergency Services section
2. Allow location access when prompted
3. View real-time list of nearby hospitals with distances
4. Click on any hospital for navigation

### Viewing Health History
1. Access your Profile page
2. Scroll to Health Monitoring section
3. Toggle between Chart and History views
4. Use Line/Bar chart options for data visualization

## API Integration

### OpenStreetMap Overpass API
The hospital finder uses the Overpass API to fetch real hospital data:

```javascript
const query = `
  [out:json][timeout:25];
  (
    node["amenity"="hospital"](around:10000,${lat},${lng});
    way["amenity"="hospital"](around:10000,${lat},${lng});
  );
  out body;
`;
```

### Firebase Services
- **Authentication**: Google OAuth and Email/Password
- **Firestore**: User profile and health data storage
- **Analytics**: Usage tracking and insights

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
```bash
npm run deploy
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Environment Variables

For production deployment, set these environment variables:

| Variable | Description |
|----------|-------------|
| `REACT_APP_FIREBASE_API_KEY` | Firebase API Key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase Project ID |

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Mobile Browsers | ✅ Full |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - UI Framework
- [Firebase](https://firebase.google.com/) - Backend Services
- [OpenStreetMap](https://www.openstreetmap.org/) - Map Data
- [Vercel](https://vercel.com/) - Hosting Platform

---

<div align="center">

**Made with ❤️ for better healthcare**

[⬆ Back to Top](#mediverse)

</div>
