import { useState } from "react";
import CustomSelect from "./CustomSelect";

export default function ManualInput({ variant }) {
  const [device, setDevice] = useState("");
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const analyze = () => {
    let status = "Normal";
    let message = "Your readings are within a safe range.";

    if (device === "bp") {
      const sys = Number(inputs.systolic);
      const dia = Number(inputs.diastolic);

      if (sys >= 140 || dia >= 90) {
        status = "Critical";
        message =
          "High blood pressure detected. Please consult a doctor immediately.";
      } else if (sys >= 120 || dia >= 80) {
        status = "Caution";
        message =
          "Blood pressure slightly elevated. Reduce salt intake and monitor regularly.";
      }
    }

    if (device === "oximeter") {
      const spo2 = Number(inputs.spo2);

      if (spo2 < 90) {
        status = "Critical";
        message =
          "Oxygen level is dangerously low. Seek emergency medical help.";
      } else if (spo2 < 94) {
        status = "Caution";
        message = "Oxygen level slightly low. Rest and monitor closely.";
      }
    }

    if (device === "glucose") {
      const sugar = Number(inputs.glucose);

      if (sugar >= 200) {
        status = "Critical";
        message =
          "Very high blood sugar. Immediate medical attention recommended.";
      } else if (sugar >= 140) {
        status = "Caution";
        message = "Elevated blood sugar. Follow diet control and monitor.";
      }
    }

    if (device === "temperature") {
      const temp = Number(inputs.temp);

      if (temp >= 39) {
        status = "Critical";
        message = "High fever detected. Consult a doctor immediately.";
      } else if (temp >= 37.5) {
        status = "Caution";
        message = "Mild fever. Rest and monitor temperature.";
      }
    }

    setResult({ status, message });
  };

  return (
    <section className="manual-input-section">
      <h2>Manual Health Input</h2>
      <p>Enter your device readings to get AI-based guidance</p>

      {/* DEVICE SELECT */}
      {variant === "civilian" ? (
        <CustomSelect
          value={device}
          onChange={(val) => {
            setDevice(val);
            setInputs({});
            setResult(null);
          }}
          placeholder="Select Medical Device"
          options={[
            { value: "bp", label: "Blood Pressure Monitor" },
            { value: "oximeter", label: "Pulse Oximeter" },
            { value: "glucose", label: "Glucometer" },
            { value: "temperature", label: "Thermometer" },
          ]}
        />
      ) : (
        <select
          className="manual-select"
          value={device}
          onChange={(e) => {
            setDevice(e.target.value);
            setInputs({});
            setResult(null);
          }}
        >
          <option value="">Select Medical Device</option>
          <option value="bp">Blood Pressure Monitor</option>
          <option value="oximeter">Pulse Oximeter</option>
          <option value="glucose">Glucometer</option>
          <option value="temperature">Thermometer</option>
        </select>
      )}

      {/* INPUTS */}
      {device === "bp" && (
        <div className="input-grid">
          <input
            type="number"
            placeholder="Systolic (mmHg)"
            onChange={(e) => setInputs({ ...inputs, systolic: e.target.value })}
          />
          <input
            type="number"
            placeholder="Diastolic (mmHg)"
            onChange={(e) =>
              setInputs({ ...inputs, diastolic: e.target.value })
            }
          />
        </div>
      )}

      {device === "oximeter" && (
        <div className="input-grid">
          <input
            type="number"
            placeholder="SpO₂ (%)"
            onChange={(e) => setInputs({ ...inputs, spo2: e.target.value })}
          />
          <input type="number" placeholder="Pulse Rate (bpm)" />
        </div>
      )}

      {device === "glucose" && (
        <input
          type="number"
          placeholder="Blood Sugar (mg/dL)"
          onChange={(e) => setInputs({ ...inputs, glucose: e.target.value })}
        />
      )}

      {device === "temperature" && (
        <input
          type="number"
          placeholder="Temperature (°C)"
          onChange={(e) => setInputs({ ...inputs, temp: e.target.value })}
        />
      )}

      {/* ACTION */}
      {device && (
        <button className="analyze-btn" onClick={analyze}>
          Get Guidance
        </button>
      )}

      {/* RESULT */}
      {result && (
        <div className={`result-box ${result.status.toLowerCase()}`}>
          <h3>Status: {result.status}</h3>
          <p>{result.message}</p>
        </div>
      )}
    </section>
  );
}
