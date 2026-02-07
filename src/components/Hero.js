import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/hero-bg.jpg";

export default function Hero() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScanClick = () => {
    navigate("/ar-scan");
  };

  const handleLearnMore = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.6)
        ), url(${heroBg})`,
      }}
    >
      {/* Animated floating elements */}
      <div className="hero-particles">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />
        ))}
      </div>

      {/* Glowing orb that follows mouse */}
      <div
        className="hero-glow-orb"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-pulse"></span>
          <span>AI-Powered Healthcare</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-welcome">WELCOME TO</span>
          <br />
          <span className="hero-brand">MEDIVERSE</span>
        </h1>

        <p className="hero-subtitle">
          Your AI Health Partner - Smart diagnostics, instant guidance,
          personalized care
        </p>

        <div className="hero-buttons">
          <button
            className={`hero-scan-btn primary ${isHovered ? "hovered" : ""}`}
            onClick={handleScanClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="btn-text">Scan Device</span>
            <svg
              className="btn-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button className="hero-scan-btn secondary" onClick={handleLearnMore}>
            <span className="btn-text">Learn More</span>
            <svg
              className="btn-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Medical Devices</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">AI Support</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Private & Secure</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}
