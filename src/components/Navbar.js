import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onContactClick }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goHome = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  return (
    <nav className={`home-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={goHome}>
          <span>Mediverse</span>
          <span className="badge-text">Health</span>
        </div>

        <div className="nav-links">
          <button type="button" onClick={goHome}>
            Home
          </button>
          <button type="button" onClick={() => scrollToSection("services")}>
            Services
          </button>
          <button type="button" onClick={() => scrollToSection("how")}>
            How It Works
          </button>
          <button type="button" onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </div>

        <button className="get-started-btn" onClick={() => navigate("/login")}>
          <span>Get Started</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="16"
            height="16"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
