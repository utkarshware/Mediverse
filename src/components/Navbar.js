import { useNavigate } from "react-router-dom";

export default function Navbar({ onContactClick }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-logo">MEDIVERSE</div>

        <div className="navbar-links">
          <span className="nav-link" onClick={() => navigate("/")}>
            Home
          </span>

          <span className="nav-link" onClick={() => navigate("/#services")}>
            Services
          </span>

          <span className="nav-link" onClick={onContactClick}>
            Contact
          </span>

          <button
            className="nav-login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
