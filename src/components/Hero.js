import heroBg from "../assets/hero-bg.jpg";

export default function Hero() {
  const handleScanClick = () => {
    window.location.href = "http://localhost:3001";
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
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-welcome">WELCOME TO</span>
          <br />
          <span className="hero-brand">MEDIVERSE</span>
        </h1>

        <p className="hero-subtitle">Your AI Health Partner</p>
        <button className="hero-scan-btn" onClick={handleScanClick}>
          Scan Device
        </button>
      </div>
    </section>
  );
}
