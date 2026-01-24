import { useNavigate } from "react-router-dom";

export default function CivilianNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="civilian-navbar">
      <h2 className="logo">MEDIVERSE</h2>

      <div className="nav-right">
        <button
          className="profile-btn"
          onClick={() => navigate("/civilian/profile")}
        >
          My Profile
        </button>
      </div>
    </nav>
  );
}
