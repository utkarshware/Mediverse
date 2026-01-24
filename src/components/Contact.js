export default function Contact({ show }) {
  if (!show) return null;

  return (
    <section className="contact" id="contact">
      <div className="container contact-grid">
        <div>
          <p className="section-tag">GET IN TOUCH</p>
          <h2>We're here to assist you!</h2>

          <form className="contact-form">
            <input placeholder="Name" />
            <input placeholder="Email address" />
            <input placeholder="Phone number" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="contact-info">
          <h4>Contact Info</h4>
          <p><strong>Email:</strong> support@mediverse.com</p>
          <p><strong>Location:</strong> Pune, MH, IN</p>
          <p><strong>Hours:</strong> 9:00am – 10:00pm</p>
        </div>
      </div>
    </section>
  );
}
