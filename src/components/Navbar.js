import { useNavigate } from "react-router-dom";

export default function Navbar({ onContactClick }) {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goHome = () => {
    navigate("/");
    // Ensure we scroll to the very top of the landing page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-logo" onClick={goHome}>MEDIVERSE</div>

        <div className="navbar-links">
          <span className="nav-link" onClick={goHome}>
            Home
          </span>

          <span
            className="nav-link"
            onClick={() => scrollToSection("services")}
          >
            Services
          </span>

          <span className="nav-link" onClick={() => scrollToSection("contact")}>
            Contact
          </span>

          <button className="nav-login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
