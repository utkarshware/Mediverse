import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import studentImg from "../assets/student.jpg";
import everyoneImg from "../assets/everyone.jpeg";

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
          <div
            className="login-option student-option"
            onClick={() => navigate("/student-auth")}
          >
            <div className="image-wrapper">
              <img src={studentImg} alt="Medical Student Learning" />
              <div className="image-overlay">
                <span className="badge">For Students</span>
              </div>
            </div>
            <div className="option-content">
              <h3>Student</h3>
              <p>
                Learn medical device usage with AI-guided training and AR
                simulations.
              </p>
            </div>
          </div>

          {/* CIVILIAN */}
          <div
            className="login-option civilian-option"
            onClick={() => navigate("/civilian-auth")}
          >
            <div className="image-wrapper">
              <img src={everyoneImg} alt="Health Monitoring and Care" />
              <div className="image-overlay">
                <span className="badge">For Everyone</span>
              </div>
            </div>
            <div className="option-content">
              <h3>Everyone</h3>
              <p>
                Scan devices, understand readings, get AI-driven guidance,
                emergency contacts, and instant appointment booking.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
