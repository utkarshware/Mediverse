export default function StudentDashboard() {
  return (
    <div className="student-dashboard">
      {/* HEADER */}
      <section className="student-header">
        <h1>Student Dashboard</h1>
        <p>Learn medical devices & understand critical points safely</p>
      </section>

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
              src="https://images.unsplash.com/photo-1580281657521-6b9c3f0b87f4?auto=format&fit=crop&w=800&q=80"
              alt="BP Monitor"
            />
            <h3>Blood Pressure Monitor</h3>
            <p>Understand readings, cuff placement & critical values</p>
            <button>Learn</button>
          </div>

          <div className="learn-card">
            <img
              src="https://images.unsplash.com/photo-1584036561584-b03c19da874c?auto=format&fit=crop&w=800&q=80"
              alt="Glucometer"
            />
            <h3>Glucometer</h3>
            <p>Learn glucose testing steps & normal ranges</p>
            <button>Learn</button>
          </div>

          <div className="learn-card">
            <img
              src="https://images.unsplash.com/photo-1584467735871-b0f7c2b3f3b6?auto=format&fit=crop&w=800&q=80"
              alt="Thermometer"
            />
            <h3>Thermometer</h3>
            <p>Correct usage & fever interpretation</p>
            <button>Learn</button>
          </div>

          <div className="learn-card">
            <img
              src="https://images.unsplash.com/photo-1580281658391-0b6c5c1db3c6?auto=format&fit=crop&w=800&q=80"
              alt="Pulse Oximeter"
            />
            <h3>Pulse Oximeter</h3>
            <p>Oxygen levels & emergency thresholds</p>
            <button>Learn</button>
          </div>
        </div>
      </section>
    </div>
  );
}
