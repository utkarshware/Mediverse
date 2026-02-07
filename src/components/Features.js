import { useState } from "react";
import { useNavigate } from "react-router-dom";

const servicesData = [
  {
    id: "scan",
    title: "AI Device Scanner",
    description:
      "Point your camera at any medical device and get instant identification with detailed usage instructions.",
    features: ["50+ Devices", "Real-time AI", "Step-by-step Guide"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M3 9h2M19 9h2M3 15h2M19 15h2" />
      </svg>
    ),
  },
  {
    id: "simulation",
    title: "3D Simulation",
    description:
      "Interactive 3D models with voice guidance show you exactly how to use each device correctly.",
    features: ["3D Models", "Audio Guide", "Interactive"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "analysis",
    title: "Health Analysis",
    description:
      "Get intelligent interpretation of your readings with personalized health insights and trends.",
    features: ["AI Insights", "Trend Tracking", "Risk Assessment"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 3v18h18" />
        <path d="M18 17V9M13 17V5M8 17v-3" />
      </svg>
    ),
  },
  {
    id: "emergency",
    title: "Emergency Support",
    description:
      "Quick access to emergency protocols, nearby hospitals, and instant emergency contact activation.",
    features: ["One-tap SOS", "Hospital Finder", "24/7 Available"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

export default function Features() {
  const [activeService, setActiveService] = useState(null);
  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    if (serviceId === "scan") {
      navigate("/ar-scan");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div className="services-header">
          <span className="section-badge">Our Services</span>
          <h2>Everything you need for better health</h2>
          <p>
            Comprehensive AI-powered tools designed to help you understand and
            manage your health effectively
          </p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${activeService === index ? "active" : ""}`}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="service-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="service-icon-wrapper">
                <div className="service-icon">{service.icon}</div>
              </div>

              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <div className="service-tags">
                  {service.features.map((feature, i) => (
                    <span key={i} className="service-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="service-btn"
                onClick={() => handleServiceClick(service.id)}
              >
                <span>Explore</span>
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
          ))}
        </div>

        <div className="services-bottom-cta">
          <p>Ready to take control of your health?</p>
          <button
            className="services-cta-btn"
            onClick={() => navigate("/login")}
          >
            <span>Get Started Free</span>
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
    </section>
  );
}
