export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="container">
        <h1 className="section-tag">Services</h1>
        <h2>Your AI-powered health companion</h2>

        <div className="how-grid">
          <div className="how-card">
            <img
              src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80"
              alt="Device setup"
              loading="lazy"
            />
            <h4>Step 1: Device setup assistance</h4>
            <p>Get personalized device setup guidance.</p>
            <span>Learn more</span>
          </div>

          <div className="how-card">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80"
              alt="Reading interpretation"
              loading="lazy"
            />
            <h4>Step 2: Accurate reading interpretation</h4>
            <p>Receive intelligent interpretation of readings.</p>
            <span>Learn more</span>
          </div>

          <div className="how-card">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
              alt="Risk analysis"
              loading="lazy"
            />
            <h4>Step 3: Risk analysis insights</h4>
            <p>Get personalized risk analysis insights.</p>
            <span>Learn more</span>
          </div>

          <div className="how-card">
            <img
              src="https://images.unsplash.com/photo-1584467735871-b0f7c2b3f3b6?auto=format&fit=crop&w=1200&q=80"
              alt="Emergency assistance"
              loading="lazy"
            />
            <h4>Step 4: Emergency assistance activation</h4>
            <p>Activate emergency assistance with ease.</p>
            <span>Learn more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
