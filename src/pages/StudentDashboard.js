import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import bpMonitor from "../assets/Blood Pressure Monitor.jpg";
import glucometer from "../assets/Glucometer.jpg";
import thermometer from "../assets/Thermometer.jpg";
import pulseOximeter from "../assets/Pulse Oximeter.jpg";

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
          <button
            className="scan-btn"
            onClick={() => (window.location.href = "http://localhost:3001")}
          >
            Start Scan
          </button>
        </div>
      </section>

      {/* LEARN SECTION */}
      <section className="learn-section">
        <h2>Learn Medical Devices</h2>

        <div className="learn-grid">
          <div className="learn-card">
            <img src={bpMonitor} alt="Blood Pressure Monitor" />
            <h3>Blood Pressure Monitor</h3>
            <p>Understand readings, cuff placement & critical values</p>
            <button>Learn</button>
          </div>

          <div className="learn-card">
            <img src={glucometer} alt="Glucometer" />
            <h3>Glucometer</h3>
            <p>Learn glucose testing steps & normal ranges</p>
            <button>Learn</button>
          </div>

          <div className="learn-card">
            <img src={thermometer} alt="Thermometer" />
            <h3>Thermometer</h3>
            <p>Correct usage & fever interpretation</p>
            <button>Learn</button>
          </div>

          <div className="learn-card">
            <img src={pulseOximeter} alt="Pulse Oximeter" />
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
