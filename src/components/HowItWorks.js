import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Scan Your Device",
    description:
      "Use your camera or upload an image to instantly identify your medical device with AI-powered recognition.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M3 9h2M19 9h2M3 15h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2" />
      </svg>
    ),
    color: "#67e8f9",
  },
  {
    number: "02",
    title: "3D Device Simulation",
    description:
      "Get interactive 3D device usage simulation with audio guidance to learn proper handling techniques.",
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
    color: "#a78bfa",
  },
  {
    number: "03",
    title: "Get AI Analysis",
    description:
      "Receive intelligent interpretation of your readings with personalized health insights and recommendations.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    color: "#34d399",
  },
  {
    number: "04",
    title: "Understand Results",
    description:
      "Clear explanations of what your vitals mean with easy-to-understand health metrics and trends.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    color: "#f472b6",
  },
  {
    number: "05",
    title: "Take Action",
    description:
      "Connect with healthcare providers, schedule appointments, or access emergency assistance when needed.",
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
    color: "#fb923c",
  },
];

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="how-section" id="how">
      <div className="how-container">
        <div className="how-header">
          <span className="section-badge">How It Works</span>
          <h2>Simple steps to better health</h2>
          <p>Get started with Mediverse in just a few simple steps</p>
        </div>

        <div className="how-timeline">
          <div className="timeline-line">
            <div
              className="timeline-progress"
              style={{
                height:
                  hoveredStep !== null ? `${(hoveredStep + 1) * 20}%` : "0%",
              }}
            />
          </div>

          <div className="how-steps">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`how-step ${hoveredStep === index ? "active" : ""}`}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{ "--step-color": step.color }}
              >
                <div className="step-marker">
                  <div className="step-number">{step.number}</div>
                  <div className="step-icon">{step.icon}</div>
                </div>

                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="step-indicator">
                    <span className="indicator-dot"></span>
                    <span className="indicator-line"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="how-cta">
          <p>Ready to get started?</p>
          <button className="how-cta-btn" onClick={() => navigate("/ar-scan")}>
            <span>Try It Now</span>
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
