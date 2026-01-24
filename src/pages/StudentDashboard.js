import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="student-dashboard">
      {/* STUDENT NAVBAR */}
      <nav className="student-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span>Mediverse</span>
            <span className="badge-text">Student</span>
          </div>
          <button className="profile-btn" onClick={() => navigate("/profile")}>
            👤 My Profile
          </button>
        </div>
      </nav>

      {/* SCAN SECTION */}
      <section className="scan-section">
        <div className="scan-card">
          <h2>Scan Medical Device</h2>
          <p>
            Use AR-assisted scanning to identify devices and learn how they work
          </p>
          <button className="scan-btn">Start Scan</button>
        </div>
      </section>

      {/* LEARN SECTION */}
      <section className="learn-section">
        <h2>Learn Medical Devices</h2>

        <div className="learn-grid">
          <div className="learn-card">
            <img
              src="https://images.unsplash.com/photo-1580281657521-6b9c3f0b87f4?auto=format&fit=crop&w=1200&q=80"
              alt="Blood Pressure Monitor"
              loading="lazy"
            />
            <h3>Blood Pressure Monitor</h3>
            <p>Understand readings, cuff placement & critical values</p>
            <button>Learn</button>
          </div>

          <div className="learn-card">
            <img
              src="https://images.unsplash.com/photo-1584036561584-b03c19da874c?auto=format&fit=crop&w=1200&q=80"
              alt="Glucometer"
              loading="lazy"
            />
            <h3>Glucometer</h3>
            <p>Learn glucose testing steps & normal ranges</p>
            <button>Learn</button>
          </div>

          <div className="learn-card">
            <img
              src="https://images.unsplash.com/photo-1584467735871-b0f7c2b3f3b6?auto=format&fit=crop&w=1200&q=80"
              alt="Thermometer"
              loading="lazy"
            />
            <h3>Thermometer</h3>
            <p>Correct usage & fever interpretation</p>
            <button>Learn</button>
          </div>

          <div className="learn-card">
            <img
              src="https://images.unsplash.com/photo-1580281658391-0b6c5c1db3c6?auto=format&fit=crop&w=1200&q=80"
              alt="Pulse Oximeter"
              loading="lazy"
            />
            <h3>Pulse Oximeter</h3>
            <p>Oxygen levels & emergency thresholds</p>
            <button>Learn</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
