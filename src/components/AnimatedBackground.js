import { useEffect, useState } from "react";

export default function AnimatedBackground({ variant = "default" }) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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

  const orbStyles = {
    default: {
      orb1: "linear-gradient(135deg, rgba(103, 232, 249, 0.3), rgba(167, 139, 250, 0.15))",
      orb2: "linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(244, 114, 182, 0.15))",
      orb3: "linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(103, 232, 249, 0.2))",
    },
    light: {
      orb1: "linear-gradient(135deg, rgba(103, 232, 249, 0.15), rgba(167, 139, 250, 0.08))",
      orb2: "linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(244, 114, 182, 0.08))",
      orb3: "linear-gradient(135deg, rgba(52, 211, 153, 0.08), rgba(103, 232, 249, 0.1))",
    },
    student: {
      orb1: "linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(244, 114, 182, 0.15))",
      orb2: "linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(251, 146, 60, 0.15))",
      orb3: "linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(244, 114, 182, 0.15))",
    },
  };

  const colors = orbStyles[variant] || orbStyles.default;

  return (
    <div className="animated-bg-container">
      {/* Gradient Orbs */}
      <div
        className="bg-gradient-orb bg-orb-1"
        style={{
          background: colors.orb1,
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />
      <div
        className="bg-gradient-orb bg-orb-2"
        style={{
          background: colors.orb2,
          transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
        }}
      />
      <div
        className="bg-gradient-orb bg-orb-3"
        style={{
          background: colors.orb3,
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.01}px)`,
        }}
      />

      {/* Grid Pattern */}
      <div className="bg-grid-pattern" />

      {/* Floating Particles */}
      <div className="bg-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bg-particle"
            style={{
              left: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${12 + (i % 5) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Lines */}
      <svg
        className="bg-lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className="bg-line bg-line-1"
          d="M0,50 Q25,30 50,50 T100,50"
          fill="none"
          stroke="rgba(103, 232, 249, 0.1)"
          strokeWidth="0.2"
        />
        <path
          className="bg-line bg-line-2"
          d="M0,60 Q30,40 60,60 T100,60"
          fill="none"
          stroke="rgba(167, 139, 250, 0.08)"
          strokeWidth="0.15"
        />
      </svg>
    </div>
  );
}
