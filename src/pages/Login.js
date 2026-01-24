import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <section className="login-page">
      <div className="login-card">
        <h2>Login to Mediverse</h2>
        <p>Select how you want to continue</p>

        <div className="login-options">
          {/* STUDENT */}
          <div className="login-option">
            <img
              src="https://images.unsplash.com/photo-1580281657521-6b9c3f0b87f4?auto=format&fit=crop&w=800&q=80"
              alt="Student Medical Learning"
            />
            <h3>Student</h3>
            <p>
              Learn medical devices, critical points, and safe handling
            </p>
            <button onClick={() => navigate("/student")}>
              Login as Student
            </button>
          </div>

          {/* CIVILIAN */}
          <div className="login-option">
            <img
              src="https://images.unsplash.com/photo-1584036561584-b03c19da874c?auto=format&fit=crop&w=800&q=80"
              alt="Civilian Health Assistance"
            />
            <h3>Civilian</h3>
            <p>
              Scan devices, analyze health readings, and get assistance
            </p>
            <button onClick={() => navigate("/civilian")}>
              Login as Civilian
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
