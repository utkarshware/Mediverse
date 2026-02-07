export default function Logo({
  size = 40,
  variant = "default",
  showText = true,
}) {
  const colors = {
    default: { primary: "#67e8f9", secondary: "#a78bfa", accent: "#22d3ee" },
    student: { primary: "#a78bfa", secondary: "#8b5cf6", accent: "#c4b5fd" },
    everyone: { primary: "#67e8f9", secondary: "#22d3ee", accent: "#a5f3fc" },
  };

  const c = colors[variant] || colors.default;

  return (
    <div
      className="mediverse-logo"
      style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient
            id={`logo-gradient-${variant}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={c.primary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={c.secondary} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient
            id={`pulse-gradient-${variant}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={c.primary} />
            <stop offset="50%" stopColor={c.accent} />
            <stop offset="100%" stopColor={c.secondary} />
          </linearGradient>
        </defs>

        {/* Outer Ring */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke={c.primary}
          strokeWidth="1.5"
          strokeOpacity="0.3"
          fill={`url(#logo-gradient-${variant})`}
        />

        {/* Inner Decorative Ring */}
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke={c.secondary}
          strokeWidth="0.75"
          strokeOpacity="0.2"
          fill="none"
          strokeDasharray="4 4"
        />

        {/* Health Pulse Line (ECG/Heartbeat) */}
        <path
          d="M6 24 L14 24 L17 18 L21 30 L25 12 L29 32 L32 20 L35 24 L42 24"
          stroke={`url(#pulse-gradient-${variant})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Central Cross (Medical Symbol) */}
        <g opacity="0.15">
          <rect x="21" y="14" width="6" height="20" rx="1" fill={c.primary} />
          <rect x="14" y="21" width="20" height="6" rx="1" fill={c.primary} />
        </g>

        {/* Tech Dots */}
        <circle cx="10" cy="24" r="2" fill={c.primary} opacity="0.6" />
        <circle cx="38" cy="24" r="2" fill={c.secondary} opacity="0.6" />
      </svg>

      {showText && (
        <span
          style={{
            fontSize: size * 0.5,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.025em",
          }}
        >
          Mediverse
        </span>
      )}
    </div>
  );
}

// Compact version for tight spaces
export function LogoIcon({ size = 32, variant = "default" }) {
  const colors = {
    default: { primary: "#67e8f9", secondary: "#a78bfa" },
    student: { primary: "#a78bfa", secondary: "#8b5cf6" },
    everyone: { primary: "#67e8f9", secondary: "#22d3ee" },
  };

  const c = colors[variant] || colors.default;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`icon-gradient-${variant}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={c.primary} />
          <stop offset="100%" stopColor={c.secondary} />
        </linearGradient>
      </defs>

      <circle
        cx="16"
        cy="16"
        r="14"
        stroke={c.primary}
        strokeWidth="1.5"
        strokeOpacity="0.3"
        fill="none"
      />

      <path
        d="M4 16 L9 16 L11 12 L14 20 L17 8 L20 22 L22 14 L24 16 L28 16"
        stroke={`url(#icon-gradient-${variant})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
