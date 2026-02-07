import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Footer from "../components/Footer";
import studentImg from "../assets/student.jpg";
import everyoneImg from "../assets/everyone.jpeg";

export default function Login() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const FeatureIcons = {
    training: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    steps: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    ar: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    progress: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    scan: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    health: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    hospital: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9v.01" />
        <path d="M9 12v.01" />
        <path d="M9 15v.01" />
        <path d="M9 18v.01" />
      </svg>
    ),
    emergency: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  };

  const features = {
    student: [
      {
        icon: FeatureIcons.training,
        text: t.login?.studentFeature1 || "Interactive 3D Medical Training",
      },
      {
        icon: FeatureIcons.steps,
        text: t.login?.studentFeature2 || "Step-by-step Device Guidance",
      },
      {
        icon: FeatureIcons.ar,
        text: t.login?.studentFeature3 || "Practice with AR Simulations",
      },
      {
        icon: FeatureIcons.progress,
        text: t.login?.studentFeature4 || "Track Your Learning Progress",
      },
    ],
    everyone: [
      {
        icon: FeatureIcons.scan,
        text: t.login?.everyoneFeature1 || "Scan & Identify Medical Devices",
      },
      {
        icon: FeatureIcons.health,
        text: t.login?.everyoneFeature2 || "Understand Your Health Readings",
      },
      {
        icon: FeatureIcons.hospital,
        text: t.login?.everyoneFeature3 || "Find Nearby Hospitals Instantly",
      },
      {
        icon: FeatureIcons.emergency,
        text: t.login?.everyoneFeature4 || "One-Click Emergency Assistance",
      },
    ],
  };

  return (
    <section className="login-page redesigned">
      {/* Language Selector */}
      <div className="login-language-selector">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="bn">বাংলা</option>
        </select>
      </div>

      <div className="login-container redesigned">
        <div className="login-hero">
          <h2>{t.login?.welcome || "Welcome to Mediverse"}</h2>
          <p className="login-subtitle">
            {t.login?.subtitle || "Your AI-Powered Health Companion"}
          </p>
          <p className="login-desc">
            {t.login?.selectRole ||
              "Choose how you want to experience Mediverse"}
          </p>
        </div>

        <div className="login-cards">
          {/* STUDENT CARD */}
          <div className="login-card student-card">
            <div className="card-image-section">
              <img src={studentImg} alt="Medical Student Learning" />
              <div className="card-badge">
                <span>{t.login?.forStudents || "For Students"}</span>
              </div>
            </div>

            <div className="card-content">
              <h3>{t.login?.student || "Student"}</h3>
              <p className="card-desc">
                {t.login?.studentDesc ||
                  "Learn medical device usage with AI-guided training, interactive 3D models, and AR simulations."}
              </p>

              <ul className="feature-list">
                {features.student.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-icon">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button
                className="card-action-btn student-btn"
                onClick={() => navigate("/student-auth")}
              >
                <span>{t.login?.getStarted || "Get Started"}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* EVERYONE CARD */}
          <div className="login-card everyone-card">
            <div className="card-image-section">
              <img src={everyoneImg} alt="Health Monitoring and Care" />
              <div className="card-badge everyone">
                <span>{t.login?.forEveryone || "For Everyone"}</span>
              </div>
            </div>

            <div className="card-content">
              <h3>{t.login?.everyone || "Everyone"}</h3>
              <p className="card-desc">
                {t.login?.everyoneDesc ||
                  "Scan devices, understand health readings, get AI guidance, find hospitals, and access emergency help."}
              </p>

              <ul className="feature-list">
                {features.everyone.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-icon">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button
                className="card-action-btn everyone-btn"
                onClick={() => navigate("/civilian-auth")}
              >
                <span>{t.login?.getStarted || "Get Started"}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="login-footer-info">
          <p>
            {t.login?.emergencyNote ||
              "In case of medical emergency, always dial"}{" "}
            <strong>108</strong> {t.login?.or || "or"} <strong>102</strong>
          </p>
        </div>
      </div>
      <Footer />
    </section>
  );
}
