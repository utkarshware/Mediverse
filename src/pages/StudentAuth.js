import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase/config";
import Footer from "../components/Footer";

// College email domains that are allowed
const ALLOWED_COLLEGE_DOMAINS = [
  ".edu",
  ".edu.in",
  ".ac.in",
  ".ac.uk",
  ".edu.au",
  ".edu.sg",
  ".edu.my",
  ".ac.nz",
  ".edu.pk",
  ".edu.bd",
  ".edu.np",
  ".edu.lk",
  // Add more as needed
];

// Function to validate college email
const isCollegeEmail = (email) => {
  if (!email) return false;
  const lowercaseEmail = email.toLowerCase();
  return ALLOWED_COLLEGE_DOMAINS.some((domain) =>
    lowercaseEmail.endsWith(domain),
  );
};

export default function StudentAuth() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    year: "",
    course: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user exists in students collection
        const userDoc = await getDoc(doc(db, "students", user.uid));
        if (userDoc.exists()) {
          navigate("/student");
          return;
        }
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      // Set persistence based on remember me
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence,
      );

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Validate college email for Google login
      if (!isCollegeEmail(user.email)) {
        await auth.signOut();
        setError(
          "Please use a valid college/university email address (.edu, .ac.in, etc.)",
        );
        setLoading(false);
        return;
      }

      await setDoc(
        doc(db, "students", user.uid),
        {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          role: "student",
        },
        { merge: true },
      );

      navigate("/student");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (name === "email") {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate college email
    if (!isCollegeEmail(formData.email)) {
      setError(
        "Please use a valid college/university email address (.edu, .ac.in, etc.)",
      );
      setLoading(false);
      return;
    }

    try {
      // Set persistence based on remember me
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence,
      );

      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );

        await setDoc(doc(db, "students", userCredential.user.uid), {
          name: formData.name,
          email: formData.email,
          college: formData.college,
          year: formData.year,
          course: formData.course,
          createdAt: new Date().toISOString(),
          role: "student",
        });

        navigate("/student");
      } else {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );
        navigate("/student");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      const errorMessages = {
        "auth/email-already-in-use":
          "This email is already registered. Please sign in instead.",
        "auth/weak-password": "Password should be at least 6 characters.",
        "auth/user-not-found":
          "No account found with this email. Please sign up first.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/invalid-email": "Invalid email address.",
        "auth/invalid-credential":
          "Invalid email or password. Please try again.",
      };
      setError(
        errorMessages[error.code] || "Authentication failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth state
  if (checkingAuth) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner-large"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <section className="auth-page-modern student-theme">
      {/* Animated background */}
      <div className="auth-bg-animation">
        <div
          className="auth-gradient-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="auth-gradient-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
          }}
        />
        <div
          className="auth-gradient-orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />
        <div className="auth-grid-pattern" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="auth-container-modern">
        {/* Left Panel - Branding */}
        <div className="auth-brand-panel">
          <div className="brand-content">
            <div className="brand-logo">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span>MEDIVERSE</span>
            </div>
            <h1>Learn Medical Devices</h1>
            <p>
              Master healthcare technology with hands-on learning, AR
              simulations, and expert guidance.
            </p>

            <div className="brand-features">
              <div className="brand-feature">
                <div className="feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Interactive Learning</h4>
                  <p>AR-powered device tutorials</p>
                </div>
              </div>
              <div className="brand-feature">
                <div className="feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Practice Tests</h4>
                  <p>Assess your knowledge</p>
                </div>
              </div>
              <div className="brand-feature">
                <div className="feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="8" r="7" />
                    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Certifications</h4>
                  <p>Earn recognized certificates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="auth-form-panel">
          <div className="auth-form-container">
            <div className="auth-header-modern">
              <div className="auth-type-badge student-badge">Student</div>
              <h2>{isSignUp ? "Join as Student" : "Student Login"}</h2>
              <p>
                {isSignUp
                  ? "Start learning medical devices today"
                  : "Continue your learning journey"}
              </p>
            </div>

            <button
              className="google-btn-modern"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="google-icon" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="divider-modern">
              <span>or continue with email</span>
            </div>

            {error && (
              <div className="error-message-modern">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form className="auth-form-modern" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="form-group-modern">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="7" r="4" />
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    </svg>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group-modern">
                <label htmlFor="email">College Email Address</label>
                <div className="input-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@university.edu"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <span className="input-hint">
                  Use your college email (.edu, .ac.in, etc.)
                </span>
              </div>

              <div className="form-group-modern">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {isSignUp && (
                <>
                  <div className="form-group-modern">
                    <label htmlFor="college">College/University</label>
                    <div className="input-wrapper">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        placeholder="University of Delhi"
                        value={formData.college}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group-modern">
                      <label htmlFor="year">Year of Study</label>
                      <div className="input-wrapper">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        <select
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="1st">1st Year</option>
                          <option value="2nd">2nd Year</option>
                          <option value="3rd">3rd Year</option>
                          <option value="4th">4th Year</option>
                          <option value="5th">5th Year</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group-modern">
                      <label htmlFor="course">Course</label>
                      <div className="input-wrapper">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                        </svg>
                        <input
                          type="text"
                          id="course"
                          name="course"
                          placeholder="MBBS, B.Tech"
                          value={formData.course}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="remember-me-wrapper">
                <label className="remember-checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="auth-toggle-modern">
              <p>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>

            <button
              className="back-btn-modern"
              onClick={() => navigate("/login")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Role Selection</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
