import { useNavigate } from "react-router-dom";

export default function CivilianProfile() {
  const navigate = useNavigate();

  const user = {
    name: "Rahul Sharma",
    age: 34,
    phone: "+91 98765 43210",
  };

  const history = [
    { id: 1, device: "Blood Pressure Monitor", result: "Normal", date: "12 Jan 2026" },
    { id: 2, device: "Pulse Oximeter", result: "Caution", date: "18 Jan 2026" },
    { id: 3, device: "Glucometer", result: "Normal", date: "22 Jan 2026" },
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* PROFILE HEADER */}
        <div className="profile-header">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>

          <div>
            <h1>{user.name}</h1>
            <p>Age {user.age} · {user.phone}</p>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="summary-grid">
          <div className="summary-card">
            <h3>{history.length}</h3>
            <p>Total Scans</p>
          </div>

          <div className="summary-card">
            <h3>{history[history.length - 1].result}</h3>
            <p>Last Status</p>
          </div>

          <div className="summary-card">
            <h3>Stable</h3>
            <p>Health Trend</p>
          </div>
        </div>

        {/* TIMELINE */}
        <h2 className="section-title">Health History</h2>

        <div className="timeline">
          {history.map(item => (
            <div key={item.id} className="timeline-item">
              <div className={`timeline-dot ${item.result.toLowerCase()}`} />
              <div className="timeline-content">
                <h4>{item.device}</h4>
                <p>{item.date}</p>
              </div>
              <span className={`status-badge ${item.result.toLowerCase()}`}>
                {item.result}
              </span>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="profile-actions">
          <button onClick={() => navigate("/civilian")}>
            Back to Dashboard
          </button>
          <button className="logout-btn" onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
