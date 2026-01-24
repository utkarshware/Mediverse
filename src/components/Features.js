export default function Features() {
  return (
    <section className="features" id="services">
      <div className="container">
        <p className="section-tag">AI-POWERED HEALTH GUIDANCE</p>
        <h2>Expert assistance for your health journey</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80"
              alt="Device setup guidance"
              loading="lazy"
            />
            <h3>AI-Driven device guidance</h3>
            <p>Get personalized assistance for using medical devices.</p>
          </div>

          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80"
              alt="Reading interpretation"
              loading="lazy"
            />
            <h3>Smart interpretation of readings</h3>
            <p>Understand your health data with intelligent analysis.</p>
          </div>

          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1584467735871-b0f7c2b3f3b6?auto=format&fit=crop&w=1200&q=80"
              alt="Emergency assistance"
              loading="lazy"
            />
            <h3>Emergency assistance protocols</h3>
            <p>Immediate support for health emergencies.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
