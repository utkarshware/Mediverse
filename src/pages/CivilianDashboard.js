import { useState } from "react";
import CivilianNavbar from "../components/CivilianNavbar";
import ManualInput from "../components/ManualInput";
import Footer from "../components/Footer";

export default function CivilianDashboard() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    doctorType: "",
    notes: "",
  });
  const [appointments, setAppointments] = useState([]);

  const hospitals = [
    {
      id: 1,
      name: "City Hospital",
      distance: "2.1 km",
      phone: "+91 98765 43210",
    },

    {
      id: 2,
      name: "Care Clinic",
      distance: "3.4 km",
      phone: "+91 91234 56789",
    },
  ];

  const doctorTypes = [
    "General Checkup",
    "Cardiologist",
    "Pediatrician",
    "Orthopedic",
    "Dermatologist",
  ];

  const handleScheduleClick = (hospital) => {
    setSelectedHospital(hospital);
    setShowAppointmentModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookAppointment = () => {
    if (
      !appointmentData.date ||
      !appointmentData.time ||
      !appointmentData.doctorType
    ) {
      alert("Please fill all required fields");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      hospital: selectedHospital.name,
      date: appointmentData.date,
      time: appointmentData.time,
      doctorType: appointmentData.doctorType,
      notes: appointmentData.notes,
      status: "Confirmed",
    };

    setAppointments([...appointments, newAppointment]);
    setAppointmentData({ date: "", time: "", doctorType: "", notes: "" });
    setShowAppointmentModal(false);
    alert(
      `Appointment booked at ${selectedHospital.name} on ${appointmentData.date} at ${appointmentData.time}`,
    );
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  const closeModal = () => {
    setShowAppointmentModal(false);
    setAppointmentData({ date: "", time: "", doctorType: "", notes: "" });
  };
  return (
    <div className="civilian-dashboard">
      {/* CIVILIAN NAVBAR */}
      <CivilianNavbar />

      {/* SCAN SECTION */}
      <section className="scan-section">
        <div className="scan-card">
          <h2>Scan Medical Device</h2>
          <p>
            Use your camera to scan the device and analyze readings
            automatically
          </p>
          <button
            className="scan-btn"
            onClick={() =>
              (window.location.href =
                process.env.REACT_APP_AR_MED_URL || "http://localhost:3001")
            }
          >
            Start Scan
          </button>
        </div>
      </section>

      {/* MANUAL INPUT + AI GUIDANCE */}
      <ManualInput variant="civilian" />

      {/* NEARBY HOSPITALS */}
      <section className="hospital-section">
        <h2>Nearby Hospitals</h2>

        <div className="hospital-grid">
          {hospitals.map((hospital) => (
            <div className="hospital-card" key={hospital.id}>
              <h3>{hospital.name}</h3>
              <p>Distance: {hospital.distance}</p>

              <div className="hospital-actions">
                <button
                  className="appointment-btn"
                  onClick={() => handleScheduleClick(hospital)}
                >
                  Schedule Appointment
                </button>
                <button className="emergency-btn">Call Emergency</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKED APPOINTMENTS */}
      {appointments.length > 0 && (
        <section className="appointments-section">
          <h2>Your Appointments</h2>
          <div className="appointments-list">
            {appointments.map((apt) => (
              <div className="appointment-item" key={apt.id}>
                <div className="appointment-details">
                  <h3>{apt.hospital}</h3>
                  <p>
                    <strong>Doctor Type:</strong> {apt.doctorType}
                  </p>
                  <p>
                    <strong>Date:</strong> {apt.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {apt.time}
                  </p>
                  {apt.notes && (
                    <p>
                      <strong>Notes:</strong> {apt.notes}
                    </p>
                  )}
                  <span className="appointment-status">{apt.status}</span>
                </div>
                <button
                  className="cancel-apt-btn"
                  onClick={() => handleCancelAppointment(apt.id)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EMERGENCY NUMBERS */}
      <section className="emergency-section">
        <h2>Emergency Numbers</h2>

        <div className="emergency-grid">
          <div className="emergency-card">
            <h3>Ambulance</h3>
            <p>108</p>
          </div>

          <div className="emergency-card">
            <h3>City Hospital</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="emergency-card">
            <h3>Care Clinic</h3>
            <p>+91 91234 56789</p>
          </div>
        </div>
      </section>

      {/* APPOINTMENT SCHEDULING MODAL */}
      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="appointment-modal">
            <div className="modal-header">
              <h2>Schedule Appointment at {selectedHospital?.name}</h2>
              <button className="close-modal-btn" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="modal-content">
              <div className="form-group">
                <label>Select Doctor Type *</label>
                <select
                  name="doctorType"
                  value={appointmentData.doctorType}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Choose a doctor</option>
                  {doctorTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Select Date *</label>
                <input
                  type="date"
                  name="date"
                  value={appointmentData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="form-group">
                <label>Select Time *</label>
                <input
                  type="time"
                  name="time"
                  value={appointmentData.time}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={appointmentData.notes}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Any specific concerns or requirements..."
                  rows="3"
                ></textarea>
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn-confirm" onClick={handleBookAppointment}>
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
