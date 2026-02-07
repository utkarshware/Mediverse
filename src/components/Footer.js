import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = {
    product: [
      { label: "Features", action: () => scrollToSection("services") },
      { label: "How It Works", action: () => scrollToSection("how") },
      { label: "AR Scanner", action: () => navigate("/ar-scan") },
      { label: "AI Analysis", action: () => navigate("/login") },
    ],
    company: [
      { label: "About Us", action: () => {} },
      { label: "Careers", action: () => {} },
      { label: "Blog", action: () => {} },
      { label: "Press", action: () => {} },
    ],
    support: [
      { label: "Help Center", action: () => {} },
      { label: "Contact Us", action: () => scrollToSection("contact") },
      { label: "Privacy Policy", action: () => {} },
      { label: "Terms of Service", action: () => {} },
    ],
  };

  return (
    <footer className="footer-modern">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span>MEDIVERSE</span>
            </div>
            <p className="footer-tagline">
              Your AI-powered health companion. Smart diagnostics, instant
              guidance, personalized care.
            </p>
            <div className="footer-social">
              <button type="button" className="social-btn" aria-label="Twitter">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </button>
              <button type="button" className="social-btn" aria-label="LinkedIn">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </button>
              <button type="button" className="social-btn" aria-label="GitHub">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </button>
              <button type="button" className="social-btn" aria-label="Instagram">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="footer-links-section">
            <div className="footer-links-group">
              <h4>Product</h4>
              <ul>
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <button type="button" className="footer-link-btn" onClick={link.action}>{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-group">
              <h4>Company</h4>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <button type="button" className="footer-link-btn" onClick={link.action}>{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links-group">
              <h4>Support</h4>
              <ul>
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button type="button" className="footer-link-btn" onClick={link.action}>{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h4>Stay Updated</h4>
            <p>
              Subscribe to our newsletter for the latest health tips and
              updates.
            </p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Enter your email" />
            <button type="submit">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} MEDIVERSE. All rights reserved.</p>
          <div className="footer-bottom-links">
            <button type="button" className="footer-bottom-btn">Privacy Policy</button>
            <span className="separator"></span>
            <button type="button" className="footer-bottom-btn">Terms of Service</button>
            <span className="separator"></span>
            <button type="button" className="footer-bottom-btn">Cookie Policy</button>
          </div>
        </div>
      </div>

      <div className="footer-decoration">
        <div className="footer-gradient"></div>
      </div>
    </footer>
  );
}
