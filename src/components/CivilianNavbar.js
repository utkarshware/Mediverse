import { useNavigate } from "react-router-dom";

export default function CivilianNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="civilian-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>Mediverse</span>
          <span className="badge-text">Everyone</span>
        </div>
        <button
          className="profile-btn"
          onClick={() => navigate("/civilian/profile")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="18"
            height="18"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          </svg>
          <span>My Profile</span>
        </button>
      </div>
    </nav>
  );
}
