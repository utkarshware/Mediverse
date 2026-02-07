import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import bpMonitor from "../assets/Blood Pressure Monitor.jpg";
import glucometer from "../assets/Glucometer.jpg";
import thermometer from "../assets/Thermometer.jpg";
import pulseOximeter from "../assets/Pulse Oximeter.jpg";

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="student-dashboard">
      <AnimatedBackground variant="student" />

      {/* STUDENT NAVBAR */}
      <nav className="student-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span>Mediverse</span>
            <span className="badge-text">Student</span>
          </div>
          <button
            className="profile-btn"
            onClick={() => navigate("/student/profile")}
          >
            <svg
              className="profile-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            </svg>
            My Profile
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
          <button className="scan-btn" onClick={() => navigate("/ar-scan")}>
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
