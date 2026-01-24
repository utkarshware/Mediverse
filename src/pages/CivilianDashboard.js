import CivilianNavbar from "../components/CivilianNavbar";
import ManualInput from "../components/ManualInput";

export default function CivilianDashboard() {
  return (
    <div className="civilian-dashboard">
      {/* CIVILIAN NAVBAR */}
      <CivilianNavbar />

      {/* SCAN SECTION */}
      <section className="scan-section">
        <div className="scan-card">
          <h2>Scan Medical Device</h2>
          <p>
            Use your camera to scan the device and analyze readings automatically
          </p>
          <button className="scan-btn">Start Scan</button>
        </div>
      </section>

      {/* MANUAL INPUT + AI GUIDANCE */}
      <ManualInput />

      {/* NEARBY HOSPITALS */}
      <section className="hospital-section">
        <h2>Nearby Hospitals</h2>

        <div className="hospital-grid">
          <div className="hospital-card">
            <h3>City Hospital</h3>
            <p>Distance: 2.1 km</p>

            <div className="hospital-actions">
              <button className="appointment-btn">
                Schedule Appointment
              </button>
              <button className="emergency-btn">Call Emergency</button>
            </div>
          </div>

          <div className="hospital-card">
            <h3>Care Clinic</h3>
            <p>Distance: 3.4 km</p>

            <div className="hospital-actions">
              <button className="appointment-btn">
                Schedule Appointment
              </button>
              <button className="emergency-btn">Call Emergency</button>
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCY NUMBERS */}
      <section className="emergency-section">
        <h2>Emergency Numbers</h2>

        <div className="emergency-grid">
          <div className="emergency-card">
            <h3>Ambulance</h3>
            <p>108</p>
          </div>

          <div className="emergency-card">
            <h3>City Hospital</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="emergency-card">
            <h3>Care Clinic</h3>
            <p>+91 91234 56789</p>
          </div>
        </div>
      </section>
    </div>
  );
}
