import aiDriven from "../assets/aidrivensolution.png";
import smartReading from "../assets/smartreading.png";
import emergency from "../assets/emergency.png";

export default function Features() {
  return (
    <section className="features" id="services">
      <div className="container">
        <p className="section-tag">AI-POWERED HEALTH GUIDANCE</p>
        <h2>Expert assistance for your health journey</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <img src={aiDriven} alt="AI Device Guidance" />
            <h3>AI-Driven device guidance</h3>
            <p>Get personalized assistance for using medical devices.</p>
          </div>

          <div className="feature-card">
            <img src={smartReading} alt="Smart Health Analysis" />
            <h3>Smart interpretation of readings</h3>
            <p>Understand your health data with intelligent analysis.</p>
          </div>

          <div className="feature-card">
            <img src={emergency} alt="Emergency Support" />
            <h3>Emergency assistance protocols</h3>
            <p>Immediate support for health emergencies.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
