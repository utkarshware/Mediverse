import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();

  return (
    <section className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome to Mediverse</h2>
          <p>Select your role to continue</p>
        </div>

        <div className="login-options">
          {/* STUDENT */}
          <div className="login-option student-option">
            <div className="image-wrapper">
              <img
                src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Student Learning Medical Devices"
                onError={(e) => {
                  e.target.src = "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400";
                }}
              />
              <div className="image-overlay">
                <span className="badge">For Students</span>
              </div>
            </div>
            <div className="option-content">
              <h3>Student</h3>
              <p>
                Master medical devices, learn critical handling techniques, and build expertise with AI guidance
              </p>
              <button className="student-btn" onClick={() => navigate("/student")}>
                Continue as Student
              </button>
            </div>
          </div>

          {/* CIVILIAN */}
          <div className="login-option civilian-option">
            <div className="image-wrapper">
              <img
                src="https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Civilian Health Support"
                onError={(e) => {
                  e.target.src = "https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=400";
                }}
              />
              <div className="image-overlay">
                <span className="badge">For Everyone</span>
              </div>
            </div>
            <div className="option-content">
              <h3>Civilian</h3>
              <p>
                Scan devices, analyze health readings, get instant AI-powered health insights and support
              </p>
              <button className="civilian-btn" onClick={() => navigate("/civilian")}>
                Continue as Civilian
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
