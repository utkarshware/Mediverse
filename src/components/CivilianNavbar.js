import { useNavigate } from "react-router-dom";

export default function CivilianNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="civilian-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>Mediverse</span>
          <span className="badge-text">Civilian</span>
        </div>
        <button className="profile-btn" onClick={() => navigate("/civilian/profile")}>
          👤 My Profile
        </button>
      </div>
    </nav>
  );
}
