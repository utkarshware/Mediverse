import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

// Extended Device Database
const DEVICE_DATABASE = {
  bp_monitor: {
    name: "Blood Pressure Monitor",
    category: "Cardiovascular",
    modelPath: "/ar-med/public/models/Edited_BPMachine.glb",
    color: "#ec4899",
    difficulty: "Beginner",
    about:
      "A digital sphygmomanometer that measures arterial blood pressure using an inflatable cuff and electronic sensors.",
    usage: "Wrap the cuff around your upper arm, sit relaxed, and press start.",
    criticalValues: {
      systolicHigh: 180,
      diastolicHigh: 120,
      systolicLow: 90,
      diastolicLow: 60,
    },
    specialistType: "Cardiologist",
    measures: [
      {
        label: "Systolic",
        description: "Pressure when heart beats (normal: 90-120 mmHg)",
      },
      {
        label: "Diastolic",
        description: "Pressure between beats (normal: 60-80 mmHg)",
      },
      { label: "Pulse", description: "Heart rate (normal: 60-100 bpm)" },
    ],
    steps: [
      {
        title: "Prepare",
        explanation: "Sit quietly for 5 minutes. Rest arm at heart level.",
        mistakes: "Avoid caffeine 30 min before.",
      },
      {
        title: "Position Cuff",
        explanation: "Wrap cuff snugly 2-3 cm above elbow.",
        mistakes: "Too loose = high readings.",
      },
      {
        title: "Start Measurement",
        explanation: "Press start. Stay still and quiet.",
        mistakes: "Movement causes errors.",
      },
      {
        title: "Read Results",
        explanation: "Normal is below 120/80 mmHg.",
        mistakes: "Take 2-3 readings.",
      },
    ],
    keywords: ["blood pressure", "bp", "hypertension", "heart", "cuff"],
  },
  glucometer: {
    name: "Glucometer",
    category: "Endocrine",
    modelPath: "/ar-med/public/models/ketuatukei3.glb",
    color: "#ef4444",
    difficulty: "Intermediate",
    about: "Measures blood glucose levels for diabetes management.",
    usage: "Insert test strip, prick finger, apply blood to strip.",
    criticalValues: { high: 400, low: 70 },
    specialistType: "Endocrinologist",
    measures: [
      { label: "Blood Glucose", description: "Fasting: 70-100 mg/dL" },
    ],
    steps: [
      {
        title: "Prepare",
        explanation: "Wash and dry hands thoroughly.",
        mistakes: "Wet hands contaminate sample.",
      },
      {
        title: "Insert Strip",
        explanation: "Insert fresh test strip.",
        mistakes: "Don't touch sensor area.",
      },
      {
        title: "Prick Finger",
        explanation: "Prick side of fingertip.",
        mistakes: "Rotate sites to prevent calluses.",
      },
      {
        title: "Apply Blood",
        explanation: "Touch blood to strip edge.",
        mistakes: "Don't add more blood after.",
      },
      {
        title: "Read Results",
        explanation: "Record with time and meal status.",
        mistakes: ">400 or <70 needs attention.",
      },
    ],
    keywords: ["glucose", "blood sugar", "diabetes", "lancet"],
  },
  thermometer: {
    name: "Digital Thermometer",
    category: "General",
    modelPath: null,
    color: "#f59e0b",
    difficulty: "Beginner",
    about: "Measures body temperature quickly and accurately.",
    usage: "Place under tongue or in ear, wait for beep.",
    criticalValues: { high: 103, low: 95 },
    specialistType: "General Physician",
    measures: [{ label: "Temperature", description: "Normal: 97.8-99.1 F" }],
    steps: [
      {
        title: "Prepare",
        explanation: "Clean probe, turn on device.",
        mistakes: "Wait 15 min after eating.",
      },
      {
        title: "Position",
        explanation: "Place under tongue or in ear.",
        mistakes: "Mouth breathing lowers reading.",
      },
      {
        title: "Wait",
        explanation: "Hold until beep (30-60 sec).",
        mistakes: "Removing early = inaccurate.",
      },
      {
        title: "Read",
        explanation: "Fever is 100.4 F or higher.",
        mistakes: ">103 F needs immediate care.",
      },
    ],
    keywords: ["temperature", "fever", "thermometer"],
  },
  oximeter: {
    name: "Pulse Oximeter",
    category: "Respiratory",
    modelPath: null,
    color: "#8b5cf6",
    difficulty: "Beginner",
    about: "Measures blood oxygen saturation and pulse rate.",
    usage: "Clip onto fingertip and wait for readings.",
    criticalValues: { lowSpO2: 90 },
    specialistType: "Pulmonologist",
    measures: [
      { label: "SpO2", description: "Normal: 95-100%" },
      { label: "Pulse", description: "Normal: 60-100 bpm" },
    ],
    steps: [
      {
        title: "Prepare",
        explanation: "Remove nail polish. Warm hands.",
        mistakes: "Cold fingers affect accuracy.",
      },
      {
        title: "Insert Finger",
        explanation: "Insert index/middle finger fully.",
        mistakes: "Don't use thumb.",
      },
      {
        title: "Wait",
        explanation: "Keep still for 10-15 seconds.",
        mistakes: "Movement causes fluctuation.",
      },
      {
        title: "Read",
        explanation: "95-100% normal. <90% is emergency.",
        mistakes: "<90% call for help.",
      },
    ],
    keywords: ["oxygen", "spo2", "pulse", "oximeter", "breathing"],
  },
  stethoscope: {
    name: "Stethoscope",
    category: "Diagnostic",
    modelPath: null,
    color: "#10b981",
    difficulty: "Advanced",
    about: "Acoustic device for listening to heart and lung sounds.",
    usage: "Place chest piece on skin to listen to internal sounds.",
    criticalValues: null,
    specialistType: "General Physician",
    measures: [
      { label: "Heart Sounds", description: "S1 (lub) and S2 (dub)" },
      { label: "Breath Sounds", description: "Vesicular vs wheezes/crackles" },
    ],
    steps: [
      {
        title: "Prepare",
        explanation: "Warm chest piece. Quiet environment.",
        mistakes: "Cold causes muscle tension.",
      },
      {
        title: "Position Earpieces",
        explanation: "Insert pointing toward nose.",
        mistakes: "Backward = no sound.",
      },
      {
        title: "Listen Heart",
        explanation: "4 auscultation points.",
        mistakes: "Don't listen through clothing.",
      },
      {
        title: "Listen Lungs",
        explanation: "6-8 points on posterior chest.",
        mistakes: "Compare left and right.",
      },
    ],
    keywords: ["stethoscope", "auscultation", "heart sounds", "lung sounds"],
  },
  ecg_monitor: {
    name: "ECG/EKG Monitor",
    category: "Cardiovascular",
    modelPath: null,
    color: "#06b6d4",
    difficulty: "Advanced",
    about: "Records electrical activity of the heart.",
    usage: "Attach electrodes to chest and limbs.",
    criticalValues: { heartRateHigh: 150, heartRateLow: 40 },
    specialistType: "Cardiologist",
    measures: [
      { label: "Heart Rate", description: "Normal: 60-100 bpm" },
      { label: "Rhythm", description: "Sinus rhythm vs arrhythmias" },
    ],
    steps: [
      {
        title: "Prepare Patient",
        explanation: "Lie flat, remove jewelry, clean sites.",
        mistakes: "Hair/sweat affects contact.",
      },
      {
        title: "Limb Leads",
        explanation: "RA, LA, RL (ground), LL.",
        mistakes: "Wrong placement = misdiagnosis.",
      },
      {
        title: "Chest Leads",
        explanation: "V1-V6 on precordium.",
        mistakes: "V lead errors most common.",
      },
      {
        title: "Record",
        explanation: "Record 10+ seconds.",
        mistakes: "Movement creates artifacts.",
      },
    ],
    keywords: ["ecg", "ekg", "electrocardiogram", "heart", "rhythm"],
  },
};

const Icons = {
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  emergency: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  volume: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  ),
  volumeOff: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
    </svg>
  ),
  rotate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 4v6h-6M1 20v-6h6" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  prev: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 7.65l.78.77L12 20.65l7.65-7.65.77-.78a5.4 5.4 0 000-7.65z" />
    </svg>
  ),
  activity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  thermometer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z" />
    </svg>
  ),
  droplet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  fullscreen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
    </svg>
  ),
  message: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    </svg>
  ),
  stethoscope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9v6a3 3 0 003 3h1a3 3 0 003-3V9M6 9a3 3 0 00-3 3v0a3 3 0 003 3M13 9a3 3 0 013 3v0a3 3 0 01-3 3" />
      <circle cx="18" cy="12" r="2" />
      <path d="M18 14v3a3 3 0 01-3 3h-1" />
    </svg>
  ),
  ecg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
};

const deviceIcons = {
  bp_monitor: Icons.heart,
  glucometer: Icons.droplet,
  thermometer: Icons.thermometer,
  oximeter: Icons.activity,
  stethoscope: Icons.stethoscope,
  ecg_monitor: Icons.ecg,
};

export default function ARScan({ mode = "civilian" }) {
  const navigate = useNavigate();
  const isStudent = mode === "student";
  const viewerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const [stage, setStage] = useState("select");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanModal, setShowScanModal] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [emergencyDevice, setEmergencyDevice] = useState(null);
  const [showCallConfirm, setShowCallConfirm] = useState(null);

  // Multilingual support
  const { language, setLanguage, t, speak: langSpeak } = useLanguage();

  // Manual Reading Input states
  const [showManualInput, setShowManualInput] = useState(false);
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [manualReadings, setManualReadings] = useState({
    systolic: "",
    diastolic: "",
    pulse: "",
    glucose: "",
    glucoseUnit: "mg/dL", // mg/dL or mmol/L
    temperature: "",
    temperatureUnit: "F", // F or C
    spo2: "",
    weight: "",
    weightUnit: "kg", // kg or lbs
    deviceType: "bp_monitor",
  });

  // Hospital finder state
  const [showHospitalFinder, setShowHospitalFinder] = useState(false);

  const speak = useCallback(
    (text) => {
      if (!audioEnabled) return;
      langSpeak(text);
    },
    [audioEnabled, langSpeak],
  );

  const filteredDevices = Object.entries(DEVICE_DATABASE).filter(
    ([key, device]) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        device.name.toLowerCase().includes(query) ||
        device.category.toLowerCase().includes(query) ||
        device.keywords.some((k) => k.includes(query))
      );
    },
  );

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      alert("Unable to access camera. Please allow camera permissions.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setCapturedImage(canvas.toDataURL("image/jpeg"));
    stopCamera();
    setTimeout(() => {
      alert("Device recognized: Blood Pressure Monitor");
      handleDeviceSelect("bp_monitor");
      setShowScanModal(false);
      setCapturedImage(null);
    }, 1500);
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
        setTimeout(() => {
          alert("Device recognized: Blood Pressure Monitor");
          handleDeviceSelect("bp_monitor");
          setShowScanModal(false);
          setCapturedImage(null);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reading Analysis Function
  const analyzeReading = () => {
    const {
      deviceType,
      systolic,
      diastolic,
      glucose,
      glucoseUnit,
      temperature,
      temperatureUnit,
      spo2,
    } = manualReadings;
    let category = "normal";
    let message = "";
    let recommendation = "";
    let device = DEVICE_DATABASE[deviceType];

    if (deviceType === "bp_monitor") {
      const sys = parseInt(systolic);
      const dia = parseInt(diastolic);

      if (isNaN(sys) || isNaN(dia)) {
        alert(
          t.manualInput?.enterValidReading || "Please enter valid readings",
        );
        return;
      }

      if (sys < 90 || dia < 60) {
        category = "risk";
        message = t.analysis?.bpLow || "Blood pressure is low (Hypotension)";
        recommendation =
          t.analysis?.bpLowRec ||
          "Increase fluid intake, rest, and monitor. Consult doctor if symptoms persist.";
      } else if (sys < 120 && dia < 80) {
        category = "normal";
        message = t.analysis?.bpNormal || "Blood pressure is normal";
        recommendation =
          t.analysis?.bpNormalRec ||
          "Maintain healthy lifestyle. Continue regular monitoring.";
      } else if (sys < 130 && dia < 85) {
        category = "elevated";
        message =
          t.analysis?.bpElevated || "Blood pressure is slightly elevated";
        recommendation =
          t.analysis?.bpElevatedRec ||
          "Reduce salt intake, exercise regularly, manage stress.";
      } else if (sys < 140 || dia < 90) {
        category = "risk";
        message =
          t.analysis?.bpRisk || "Blood pressure indicates Stage 1 Hypertension";
        recommendation =
          t.analysis?.bpRiskRec ||
          "Consult a doctor. Lifestyle changes recommended.";
      } else if (sys < 180 || dia < 120) {
        category = "highRisk";
        message =
          t.analysis?.bpHighRisk ||
          "Blood pressure indicates Stage 2 Hypertension";
        recommendation =
          t.analysis?.bpHighRiskRec ||
          "Seek medical attention soon. Medication may be needed.";
      } else {
        category = "emergency";
        message =
          t.analysis?.bpEmergency ||
          "Hypertensive Crisis! Immediate medical attention required!";
        recommendation =
          t.analysis?.bpEmergencyRec ||
          "Call emergency services immediately or go to nearest hospital.";
      }
    } else if (deviceType === "glucometer") {
      let glu = parseFloat(glucose);

      if (isNaN(glu)) {
        alert(t.manualInput?.enterValidReading || "Please enter valid reading");
        return;
      }

      // Convert mmol/L to mg/dL for analysis (1 mmol/L = 18.0182 mg/dL)
      if (glucoseUnit === "mmol/L") {
        glu = glu * 18.0182;
      }

      if (glu < 70) {
        category = "emergency";
        message =
          t.analysis?.glucoseLow ||
          "Severe Hypoglycemia! Blood sugar is dangerously low!";
        recommendation =
          t.analysis?.glucoseLowRec ||
          "Consume fast-acting sugar immediately. Seek emergency help if unresponsive.";
      } else if (glu < 100) {
        category = "normal";
        message =
          t.analysis?.glucoseNormal || "Blood glucose is normal (Fasting)";
        recommendation =
          t.analysis?.glucoseNormalRec ||
          "Maintain balanced diet. Continue regular monitoring.";
      } else if (glu < 126) {
        category = "elevated";
        message =
          t.analysis?.glucosePrediabetes || "Prediabetes range (Fasting)";
        recommendation =
          t.analysis?.glucosePrediabetesRec ||
          "Reduce sugar intake, exercise more. Consult doctor.";
      } else if (glu < 200) {
        category = "risk";
        message =
          t.analysis?.glucoseDiabetes || "Diabetes range - High blood sugar";
        recommendation =
          t.analysis?.glucoseDiabetesRec ||
          "Consult endocrinologist. Medication may be needed.";
      } else if (glu < 400) {
        category = "highRisk";
        message = t.analysis?.glucoseVeryHigh || "Very high blood sugar";
        recommendation =
          t.analysis?.glucoseVeryHighRec ||
          "Seek medical attention. Monitor for ketones.";
      } else {
        category = "emergency";
        message =
          t.analysis?.glucoseEmergency ||
          "Diabetic Emergency! Blood sugar critically high!";
        recommendation =
          t.analysis?.glucoseEmergencyRec ||
          "Go to emergency room immediately. Risk of diabetic coma.";
      }
    } else if (deviceType === "thermometer") {
      let temp = parseFloat(temperature);

      if (isNaN(temp)) {
        alert(t.manualInput?.enterValidReading || "Please enter valid reading");
        return;
      }

      // Convert Celsius to Fahrenheit for analysis
      if (temperatureUnit === "C") {
        temp = (temp * 9) / 5 + 32;
      }

      if (temp < 95) {
        category = "emergency";
        message =
          t.analysis?.tempHypothermia ||
          "Hypothermia! Body temperature is dangerously low!";
        recommendation =
          t.analysis?.tempHypothermiaRec ||
          "Warm up gradually. Seek emergency care immediately.";
      } else if (temp < 97.8) {
        category = "risk";
        message = t.analysis?.tempLow || "Below normal body temperature";
        recommendation =
          t.analysis?.tempLowRec ||
          "Warm up, rest, and monitor. Consult doctor if persistent.";
      } else if (temp <= 99.1) {
        category = "normal";
        message = t.analysis?.tempNormal || "Normal body temperature";
        recommendation =
          t.analysis?.tempNormalRec ||
          "Temperature is healthy. No action needed.";
      } else if (temp < 100.4) {
        category = "elevated";
        message =
          t.analysis?.tempSlightFever || "Slight elevation in temperature";
        recommendation =
          t.analysis?.tempSlightFeverRec ||
          "Rest and stay hydrated. Monitor for changes.";
      } else if (temp < 103) {
        category = "risk";
        message = t.analysis?.tempFever || "Fever detected";
        recommendation =
          t.analysis?.tempFeverRec ||
          "Take fever reducers, rest, stay hydrated. See doctor if persists.";
      } else {
        category = "emergency";
        message =
          t.analysis?.tempEmergency ||
          "High Fever Emergency! Temperature is dangerously high!";
        recommendation =
          t.analysis?.tempEmergencyRec ||
          "Seek emergency care immediately. Cool down with lukewarm water.";
      }
    } else if (deviceType === "oximeter") {
      const oxygen = parseInt(spo2);

      if (isNaN(oxygen)) {
        alert(t.manualInput?.enterValidReading || "Please enter valid reading");
        return;
      }

      if (oxygen >= 95) {
        category = "normal";
        message = t.analysis?.oxygenNormal || "Blood oxygen level is normal";
        recommendation =
          t.analysis?.oxygenNormalRec ||
          "Oxygen saturation is healthy. Continue normal activities.";
      } else if (oxygen >= 92) {
        category = "elevated";
        message =
          t.analysis?.oxygenBorderline ||
          "Blood oxygen is slightly below optimal";
        recommendation =
          t.analysis?.oxygenBorderlineRec ||
          "Practice deep breathing. Monitor closely.";
      } else if (oxygen >= 90) {
        category = "risk";
        message = t.analysis?.oxygenLow || "Low blood oxygen level";
        recommendation =
          t.analysis?.oxygenLowRec ||
          "Seek medical attention. Supplemental oxygen may be needed.";
      } else {
        category = "emergency";
        message =
          t.analysis?.oxygenEmergency ||
          "Severe Hypoxemia! Oxygen level is critically low!";
        recommendation =
          t.analysis?.oxygenEmergencyRec ||
          "Call emergency services immediately! Life-threatening condition.";
      }
    }

    const result = {
      category,
      message,
      recommendation,
      device: device,
      readings: manualReadings,
      timestamp: new Date().toISOString(),
    };

    setAnalysisResult(result);
    setShowAnalysisResult(true);
    setShowManualInput(false);

    // Save reading to history in localStorage
    try {
      const existingHistory = JSON.parse(
        localStorage.getItem("healthReadingsHistory") || "[]",
      );
      const newReading = {
        id: Date.now(),
        deviceType: manualReadings.deviceType,
        category,
        message,
        values: { ...manualReadings },
        timestamp: new Date().toISOString(),
      };
      existingHistory.unshift(newReading);
      // Keep only last 50 readings
      const trimmedHistory = existingHistory.slice(0, 50);
      localStorage.setItem(
        "healthReadingsHistory",
        JSON.stringify(trimmedHistory),
      );
    } catch (e) {
      console.error("Error saving reading to history:", e);
    }

    // Speak the result
    speak(message + ". " + recommendation);

    // Auto-trigger emergency popup for critical readings
    if (category === "emergency") {
      setTimeout(() => {
        triggerEmergency(device);
      }, 500);
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case "normal":
        return "#10b981";
      case "elevated":
        return "#f59e0b";
      case "risk":
        return "#f97316";
      case "highRisk":
        return "#ef4444";
      case "emergency":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const labels = {
      normal: t.categories?.normal || "Normal",
      elevated: t.categories?.elevated || "Elevated",
      risk: t.categories?.risk || "Risk",
      highRisk: t.categories?.highRisk || "High Risk",
      emergency: t.categories?.emergency || "Emergency",
    };
    return labels[category] || category;
  };

  // Emergency functions (only for civilian mode)
  const getUserLocation = useCallback(() => {
    setLoadingHospitals(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);
          fetchNearbyHospitals(loc);
        },
        () => {
          alert(
            t.emergency?.locationError ||
              "Unable to get location. Please enable location services.",
          );
          setLoadingHospitals(false);
          // Use fallback mock data
          fetchNearbyHospitals(null);
        },
      );
    } else {
      fetchNearbyHospitals(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const fetchNearbyHospitals = useCallback(
    async (location) => {
      const specialistType = emergencyDevice?.specialistType || "General";

      // Calculate distance between two coordinates using Haversine formula
      const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      // If we have real location, fetch from OpenStreetMap's Overpass API
      if (location && location.lat && location.lng) {
        try {
          // Query for hospitals and clinics within 10km radius
          const radius = 10000; // 10km in meters
          const overpassQuery = `
          [out:json][timeout:25];
          (
            node["amenity"="hospital"](around:${radius},${location.lat},${location.lng});
            way["amenity"="hospital"](around:${radius},${location.lat},${location.lng});
            node["amenity"="clinic"](around:${radius},${location.lat},${location.lng});
            way["amenity"="clinic"](around:${radius},${location.lat},${location.lng});
            node["healthcare"="hospital"](around:${radius},${location.lat},${location.lng});
            way["healthcare"="hospital"](around:${radius},${location.lat},${location.lng});
          );
          out body center;
        `;

          const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
              method: "POST",
              body: "data=" + encodeURIComponent(overpassQuery),
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            },
          );

          if (response.ok) {
            const data = await response.json();

            if (data.elements && data.elements.length > 0) {
              const hospitals = data.elements
                .map((element, index) => {
                  const lat = element.lat || element.center?.lat;
                  const lon = element.lon || element.center?.lon;
                  const distance =
                    lat && lon
                      ? calculateDistance(location.lat, location.lng, lat, lon)
                      : 999;

                  return {
                    id: element.id || index + 1,
                    name:
                      element.tags?.name ||
                      element.tags?.["name:en"] ||
                      "Medical Facility",
                    specialty:
                      element.tags?.healthcare ||
                      element.tags?.["healthcare:speciality"] ||
                      specialistType,
                    distance: `${distance.toFixed(1)} km`,
                    distanceValue: distance,
                    phone:
                      element.tags?.phone ||
                      element.tags?.["contact:phone"] ||
                      "108",
                    timing: element.tags?.opening_hours || "24/7",
                    address:
                      [
                        element.tags?.["addr:street"],
                        element.tags?.["addr:city"],
                        element.tags?.["addr:district"],
                      ]
                        .filter(Boolean)
                        .join(", ") || "See on map",
                    rating: null,
                    emergencyAvailable:
                      element.tags?.emergency === "yes" ||
                      element.tags?.amenity === "hospital",
                    ambulanceService: element.tags?.emergency === "yes",
                    lat: lat,
                    lon: lon,
                  };
                })
                .filter((h) => h.distanceValue < 15) // Filter to within 15km
                .sort((a, b) => a.distanceValue - b.distanceValue)
                .slice(0, 10); // Limit to 10 closest

              if (hospitals.length > 0) {
                setNearbyHospitals(hospitals);
                setLoadingHospitals(false);
                return;
              }
            }
          }
        } catch (error) {
          console.error("Error fetching hospitals from Overpass API:", error);
        }
      }

      // Fallback: Show message about enabling location for real results
      const fallbackHospitals = [
        {
          id: 1,
          name: "Enable Location for Real Results",
          specialty: "General",
          distance: "Unknown",
          phone: "108",
          timing: "24/7",
          address: "Please enable location services to find hospitals near you",
          rating: null,
          emergencyAvailable: true,
          ambulanceService: true,
        },
        {
          id: 2,
          name: "Emergency Helpline (India)",
          specialty: "All Emergencies",
          distance: "N/A",
          phone: "112",
          timing: "24/7",
          address: "National Emergency Number",
          rating: null,
          emergencyAvailable: true,
          ambulanceService: true,
        },
        {
          id: 3,
          name: "Ambulance Service",
          specialty: "Emergency Transport",
          distance: "N/A",
          phone: "108",
          timing: "24/7",
          address: "Free Ambulance Service",
          rating: null,
          emergencyAvailable: true,
          ambulanceService: true,
        },
        {
          id: 4,
          name: "Health Helpline",
          specialty: "Health Advice",
          distance: "N/A",
          phone: "104",
          timing: "24/7",
          address: "Government Health Advisory",
          rating: null,
          emergencyAvailable: false,
          ambulanceService: false,
        },
      ];

      setNearbyHospitals(fallbackHospitals);
      setLoadingHospitals(false);
    },
    [emergencyDevice],
  );

  const triggerEmergency = useCallback(
    (device) => {
      setEmergencyDevice(device);
      setShowEmergency(true);
      getUserLocation();
      speak(
        t.emergency?.activated ||
          "Emergency mode activated. Finding nearest hospitals.",
      );
    },
    [getUserLocation, speak, t],
  );

  const confirmCall = (hospital) => {
    window.location.href = "tel:" + hospital.phone.replace(/[^0-9+]/g, "");
    setShowCallConfirm(null);
  };

  const openInMaps = (hospital) => {
    // If we have coordinates, use them for more accurate navigation
    if (hospital.lat && hospital.lon) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}&destination_place_id=${hospital.name}`,
        "_blank",
      );
    } else {
      const query = encodeURIComponent(hospital.name + " " + hospital.address);
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        "_blank",
      );
    }
  };

  // 3D Scene
  const initScene = useCallback(() => {
    if (!viewerRef.current || sceneRef.current) return;

    const loadScripts = async () => {
      if (!window.THREE) {
        await new Promise((resolve) => {
          const s = document.createElement("script");
          s.src = "https://unpkg.com/three@0.147.0/build/three.min.js";
          s.onload = resolve;
          document.body.appendChild(s);
        });
        await new Promise((resolve) => {
          const s = document.createElement("script");
          s.src =
            "https://unpkg.com/three@0.147.0/examples/js/controls/OrbitControls.js";
          s.onload = resolve;
          document.body.appendChild(s);
        });
        await new Promise((resolve) => {
          const s = document.createElement("script");
          s.src =
            "https://unpkg.com/three@0.147.0/examples/js/loaders/GLTFLoader.js";
          s.onload = resolve;
          document.body.appendChild(s);
        });
      }

      const THREE = window.THREE;
      if (!THREE || !viewerRef.current) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        60,
        viewerRef.current.clientWidth / viewerRef.current.clientHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 1.5, 3);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(
        viewerRef.current.clientWidth,
        viewerRef.current.clientHeight,
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      viewerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const light = new THREE.DirectionalLight(0xffffff, 0.8);
      light.position.set(5, 10, 7);
      scene.add(light);

      const grid = new THREE.GridHelper(10, 20, 0x67e8f9, 0x1a1a2e);
      grid.material.opacity = 0.3;
      grid.material.transparent = true;
      scene.add(grid);

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!viewerRef.current) return;
        camera.aspect =
          viewerRef.current.clientWidth / viewerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          viewerRef.current.clientWidth,
          viewerRef.current.clientHeight,
        );
      };
      window.addEventListener("resize", handleResize);

      if (selectedDevice?.modelPath) {
        const loader = new THREE.GLTFLoader();
        // Try loading the model from public folder
        const modelUrl = process.env.PUBLIC_URL + selectedDevice.modelPath;
        console.log("Loading 3D model from:", modelUrl);

        loader.load(
          modelUrl,
          (gltf) => {
            console.log("Model loaded successfully");
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            model.scale.setScalar(2.5 / (maxDim || 1));
            model.position.y = 0.5;
            scene.add(model);
            setModelLoaded(true);
            setLoadingProgress(100);
          },
          (p) => {
            if (p.total > 0) setLoadingProgress((p.loaded / p.total) * 100);
          },
          (error) => {
            console.error("Error loading 3D model:", error);
            // Create a fallback 3D box with device color
            const geometry = new THREE.BoxGeometry(1.5, 1, 0.5);
            const material = new THREE.MeshStandardMaterial({
              color: selectedDevice?.color || 0x67e8f9,
              metalness: 0.3,
              roughness: 0.7,
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.y = 0.5;
            scene.add(cube);

            // Add text indicator
            console.log(
              "Using fallback 3D placeholder for:",
              selectedDevice?.name,
            );
            setModelLoaded(true);
            setLoadingProgress(100);
          },
        );
      } else {
        // Create a placeholder 3D object for devices without models
        const geometry = new THREE.BoxGeometry(1.5, 1, 0.5);
        const material = new THREE.MeshStandardMaterial({
          color: selectedDevice?.color || 0x67e8f9,
          metalness: 0.3,
          roughness: 0.7,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = 0.5;
        scene.add(cube);
        setModelLoaded(true);
        setLoadingProgress(100);
      }
    };
    loadScripts();
  }, [selectedDevice]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
      if (cameraStream)
        cameraStream.getTracks().forEach((track) => track.stop());
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stage === "viewer") setTimeout(initScene, 100);
  }, [stage, initScene]);

  useEffect(() => {
    if (stage === "viewer" && selectedDevice && modelLoaded) {
      const step = selectedDevice.steps[currentStep];
      if (step) speak(step.title + ". " + step.explanation);
    }
  }, [currentStep, stage, selectedDevice, modelLoaded, speak]);

  // Auto-fetch hospitals for Everyone mode on component mount
  useEffect(() => {
    if (!isStudent && stage === "select") {
      getUserLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStudent]);

  const handleDeviceSelect = (deviceKey) => {
    const config = DEVICE_DATABASE[deviceKey];
    setSelectedDevice({ key: deviceKey, ...config });
    setStage("loading");
    localStorage.setItem(
      "aiDeviceData",
      JSON.stringify({
        device: deviceKey,
        ...config,
        timestamp: new Date().toISOString(),
      }),
    );
    setTimeout(() => setStage("viewer"), 1500);
  };

  const handleBack = () => {
    setStage("select");
    setSelectedDevice(null);
    setCurrentStep(0);
    setModelLoaded(false);
    setLoadingProgress(0);
    sceneRef.current = null;
    window.speechSynthesis.cancel();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { type: "user", text: chatInput.trim() },
    ]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Follow the step-by-step instructions for proper device usage.",
        },
      ]);
    }, 1000);
  };

  // SCAN MODAL
  const ScanModal = () => (
    <div
      className="scan-modal-overlay"
      onClick={() => {
        setShowScanModal(false);
        stopCamera();
        setCapturedImage(null);
      }}
    >
      <div className="scan-modal" onClick={(e) => e.stopPropagation()}>
        <div className="scan-modal-header">
          <h2>Scan Medical Device</h2>
          <button
            className="modal-close"
            onClick={() => {
              setShowScanModal(false);
              stopCamera();
              setCapturedImage(null);
            }}
          >
            {Icons.x}
          </button>
        </div>
        {!cameraStream && !capturedImage ? (
          <div className="scan-options">
            <button className="scan-option-btn" onClick={startCamera}>
              <span className="option-icon">{Icons.camera}</span>
              <span className="option-title">Take Photo</span>
              <span className="option-desc">Use camera to scan device</span>
            </button>
            <button
              className="scan-option-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="option-icon">{Icons.upload}</span>
              <span className="option-title">Upload Image</span>
              <span className="option-desc">Select from gallery</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>
        ) : cameraStream ? (
          <div className="camera-view">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-feed"
            />
            <div className="camera-controls">
              <button className="camera-btn cancel" onClick={stopCamera}>
                Cancel
              </button>
              <button className="camera-btn capture" onClick={capturePhoto}>
                {Icons.camera}
              </button>
            </div>
          </div>
        ) : (
          <div className="captured-preview">
            <img src={capturedImage} alt="Captured" />
            <p>Analyzing device...</p>
            <div className="analyzing-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );

  // EMERGENCY MODAL (only for civilian)
  const EmergencyModal = () => (
    <div className="emergency-modal-overlay">
      <div className="emergency-modal">
        <div className="emergency-header">
          <span className="emergency-icon">{Icons.emergency}</span>
          <h2>{t.emergency?.title || "Emergency Assistance"}</h2>
          <button
            className="modal-close"
            onClick={() => setShowEmergency(false)}
          >
            {Icons.x}
          </button>
        </div>
        {emergencyDevice && (
          <div className="emergency-alert">
            <p>
              {t.emergency?.criticalReading || "Critical reading detected on"}{" "}
              <strong>{emergencyDevice.name}</strong>
            </p>
            <p>
              {t.emergency?.specialistNeeded || "Specialist needed"}:{" "}
              <strong>{emergencyDevice.specialistType}</strong>
            </p>
          </div>
        )}

        <div className="emergency-actions-quick">
          <a href="tel:108" className="emergency-call-108">
            {Icons.phone}
            <span>{t.emergency?.call108 || "Call 108 (Ambulance)"}</span>
          </a>
          <a href="tel:102" className="emergency-call-102">
            {Icons.phone}
            <span>{t.emergency?.call102 || "Call 102 (Emergency)"}</span>
          </a>
        </div>

        {loadingHospitals ? (
          <div className="loading-hospitals">
            <div className="hospital-spinner"></div>
            <p>
              {t.emergency?.findingHospitals || "Finding nearby hospitals..."}
            </p>
          </div>
        ) : (
          <>
            {userLocation && (
              <div className="location-info">
                <span className="loc-icon">{Icons.location}</span>
                <span>
                  {t.emergency?.yourLocation || "Your Location"}:{" "}
                  {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                </span>
              </div>
            )}
            <div className="hospitals-list">
              {nearbyHospitals.map((h) => (
                <div key={h.id} className="hospital-card">
                  <div className="hospital-info">
                    <div className="hospital-name-row">
                      <h3>{h.name}</h3>
                      {h.emergencyAvailable && (
                        <span className="emergency-badge">24/7</span>
                      )}
                    </div>
                    <div className="hospital-meta">
                      <span>
                        <strong>{h.specialty}</strong>
                      </span>
                      <span>
                        {Icons.location} {h.distance}
                      </span>
                      <span>
                        {Icons.clock} {h.timing}
                      </span>
                      {h.rating && (
                        <span className="hospital-rating">★ {h.rating}</span>
                      )}
                    </div>
                    <p className="hospital-address">{h.address}</p>
                    {h.ambulanceService && (
                      <span className="ambulance-badge">
                        {t.emergency?.ambulanceAvailable ||
                          "Ambulance Available"}
                      </span>
                    )}
                  </div>
                  <div className="hospital-actions">
                    <button
                      className="call-btn"
                      onClick={() => setShowCallConfirm(h)}
                    >
                      {Icons.phone}
                      <span>{t.emergency?.call || "Call"}</span>
                    </button>
                    <button className="map-btn" onClick={() => openInMaps(h)}>
                      {Icons.location}
                      <span>{t.emergency?.directions || "Directions"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {showCallConfirm && (
        <div className="call-confirm-modal">
          <div className="call-confirm-content">
            <h3>{t.emergency?.confirmCall || "Confirm Emergency Call"}</h3>
            <p>
              {t.emergency?.callQuestion || "Call"}{" "}
              <strong>{showCallConfirm.name}</strong>?
            </p>
            <p className="phone-number">{showCallConfirm.phone}</p>
            <div className="confirm-actions">
              <button
                className="confirm-btn cancel"
                onClick={() => setShowCallConfirm(null)}
              >
                {t.common?.cancel || "Cancel"}
              </button>
              <button
                className="confirm-btn call"
                onClick={() => confirmCall(showCallConfirm)}
              >
                {Icons.phone} {t.emergency?.callNow || "Call Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // MANUAL INPUT MODAL (only for civilian)
  const ManualInputModal = () => (
    <div
      className="manual-input-overlay"
      onClick={() => setShowManualInput(false)}
    >
      <div className="manual-input-modal" onClick={(e) => e.stopPropagation()}>
        <div className="manual-input-header">
          <h2>{t.manualInput?.title || "Enter Health Reading"}</h2>
          <button
            className="modal-close"
            onClick={() => setShowManualInput(false)}
          >
            {Icons.x}
          </button>
        </div>

        <div className="device-selector">
          <label>{t.manualInput?.selectDevice || "Select Device"}</label>
          <div className="device-type-grid">
            {[
              {
                key: "bp_monitor",
                label: t.manualInput?.bpMonitor || "Blood Pressure",
                icon: Icons.heart,
              },
              {
                key: "glucometer",
                label: t.manualInput?.glucometer || "Glucometer",
                icon: Icons.droplet,
              },
              {
                key: "thermometer",
                label: t.manualInput?.thermometer || "Thermometer",
                icon: Icons.thermometer,
              },
              {
                key: "oximeter",
                label: t.manualInput?.oximeter || "Oximeter",
                icon: Icons.activity,
              },
            ].map((device) => (
              <button
                key={device.key}
                className={`device-type-btn ${manualReadings.deviceType === device.key ? "active" : ""}`}
                onClick={() =>
                  setManualReadings((p) => ({ ...p, deviceType: device.key }))
                }
                style={{ "--device-color": DEVICE_DATABASE[device.key]?.color }}
              >
                <span className="device-type-icon">{device.icon}</span>
                <span>{device.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="reading-inputs">
          {manualReadings.deviceType === "bp_monitor" && (
            <>
              <div className="input-group">
                <label>{t.manualInput?.systolic || "Systolic (mmHg)"}</label>
                <input
                  type="number"
                  placeholder="e.g., 120"
                  value={manualReadings.systolic}
                  onChange={(e) =>
                    setManualReadings((p) => ({
                      ...p,
                      systolic: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="input-group">
                <label>{t.manualInput?.diastolic || "Diastolic (mmHg)"}</label>
                <input
                  type="number"
                  placeholder="e.g., 80"
                  value={manualReadings.diastolic}
                  onChange={(e) =>
                    setManualReadings((p) => ({
                      ...p,
                      diastolic: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="input-group">
                <label>
                  {t.manualInput?.pulse || "Pulse (bpm)"} -{" "}
                  {t.manualInput?.optional || "Optional"}
                </label>
                <input
                  type="number"
                  placeholder="e.g., 72"
                  value={manualReadings.pulse}
                  onChange={(e) =>
                    setManualReadings((p) => ({ ...p, pulse: e.target.value }))
                  }
                />
              </div>
            </>
          )}

          {manualReadings.deviceType === "glucometer" && (
            <div className="input-group with-unit-toggle">
              <label>{t.manualInput?.glucose || "Blood Glucose"}</label>
              <div className="input-with-toggle">
                <input
                  type="number"
                  placeholder={
                    manualReadings.glucoseUnit === "mg/dL"
                      ? "e.g., 100"
                      : "e.g., 5.5"
                  }
                  value={manualReadings.glucose}
                  onChange={(e) =>
                    setManualReadings((p) => ({
                      ...p,
                      glucose: e.target.value,
                    }))
                  }
                />
                <div className="unit-toggle">
                  <button
                    className={
                      manualReadings.glucoseUnit === "mg/dL" ? "active" : ""
                    }
                    onClick={() =>
                      setManualReadings((p) => ({ ...p, glucoseUnit: "mg/dL" }))
                    }
                  >
                    mg/dL
                  </button>
                  <button
                    className={
                      manualReadings.glucoseUnit === "mmol/L" ? "active" : ""
                    }
                    onClick={() =>
                      setManualReadings((p) => ({
                        ...p,
                        glucoseUnit: "mmol/L",
                      }))
                    }
                  >
                    mmol/L
                  </button>
                </div>
              </div>
            </div>
          )}

          {manualReadings.deviceType === "thermometer" && (
            <div className="input-group with-unit-toggle">
              <label>{t.manualInput?.temperature || "Temperature"}</label>
              <div className="input-with-toggle">
                <input
                  type="number"
                  step="0.1"
                  placeholder={
                    manualReadings.temperatureUnit === "F"
                      ? "e.g., 98.6"
                      : "e.g., 37.0"
                  }
                  value={manualReadings.temperature}
                  onChange={(e) =>
                    setManualReadings((p) => ({
                      ...p,
                      temperature: e.target.value,
                    }))
                  }
                />
                <div className="unit-toggle">
                  <button
                    className={
                      manualReadings.temperatureUnit === "F" ? "active" : ""
                    }
                    onClick={() =>
                      setManualReadings((p) => ({ ...p, temperatureUnit: "F" }))
                    }
                  >
                    °F
                  </button>
                  <button
                    className={
                      manualReadings.temperatureUnit === "C" ? "active" : ""
                    }
                    onClick={() =>
                      setManualReadings((p) => ({ ...p, temperatureUnit: "C" }))
                    }
                  >
                    °C
                  </button>
                </div>
              </div>
            </div>
          )}

          {manualReadings.deviceType === "oximeter" && (
            <div className="input-group">
              <label>{t.manualInput?.spo2 || "SpO2 (%)"}</label>
              <input
                type="number"
                placeholder="e.g., 98"
                value={manualReadings.spo2}
                onChange={(e) =>
                  setManualReadings((p) => ({ ...p, spo2: e.target.value }))
                }
              />
            </div>
          )}
        </div>

        <button className="analyze-btn" onClick={analyzeReading}>
          {Icons.activity}
          <span>{t.manualInput?.analyze || "Analyze Reading"}</span>
        </button>
      </div>
    </div>
  );

  // ANALYSIS RESULT MODAL
  const AnalysisResultModal = () => (
    <div
      className="analysis-result-overlay"
      onClick={() => setShowAnalysisResult(false)}
    >
      <div
        className="analysis-result-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="analysis-result-header">
          <h2>{t.analysis?.title || "Analysis Result"}</h2>
          <button
            className="modal-close"
            onClick={() => setShowAnalysisResult(false)}
          >
            {Icons.x}
          </button>
        </div>

        {analysisResult && (
          <>
            <div
              className="category-indicator"
              style={{
                "--category-color": getCategoryColor(analysisResult.category),
              }}
            >
              <span className="category-icon">
                {analysisResult.category === "emergency"
                  ? Icons.emergency
                  : analysisResult.category === "normal"
                    ? Icons.check
                    : Icons.warning}
              </span>
              <span className="category-label">
                {getCategoryLabel(analysisResult.category)}
              </span>
            </div>

            <div className="analysis-message">
              <p className="main-message">{analysisResult.message}</p>
              <p className="recommendation">{analysisResult.recommendation}</p>
            </div>

            <div className="reading-summary">
              <h4>{t.analysis?.yourReading || "Your Reading"}</h4>
              {analysisResult.readings.deviceType === "bp_monitor" && (
                <p>
                  <strong>BP:</strong> {analysisResult.readings.systolic}/
                  {analysisResult.readings.diastolic} mmHg
                </p>
              )}
              {analysisResult.readings.deviceType === "glucometer" && (
                <p>
                  <strong>{t.manualInput?.glucose || "Glucose"}:</strong>{" "}
                  {analysisResult.readings.glucose} mg/dL
                </p>
              )}
              {analysisResult.readings.deviceType === "thermometer" && (
                <p>
                  <strong>
                    {t.manualInput?.temperature || "Temperature"}:
                  </strong>{" "}
                  {analysisResult.readings.temperature} °F
                </p>
              )}
              {analysisResult.readings.deviceType === "oximeter" && (
                <p>
                  <strong>{t.manualInput?.spo2 || "SpO2"}:</strong>{" "}
                  {analysisResult.readings.spo2}%
                </p>
              )}
            </div>

            <div className="analysis-actions compact">
              {analysisResult.category !== "normal" &&
                analysisResult.category !== "elevated" && (
                  <button
                    className="find-hospital-btn small"
                    onClick={() => {
                      setShowAnalysisResult(false);
                      setShowHospitalFinder(true);
                      triggerEmergency(analysisResult.device);
                    }}
                  >
                    {Icons.location}
                    <span>{t.analysis?.findHospital || "Find Hospital"}</span>
                  </button>
                )}
              <button
                className="speak-result-btn small"
                onClick={() =>
                  speak(
                    analysisResult.message +
                      ". " +
                      analysisResult.recommendation,
                  )
                }
              >
                {Icons.volume}
                <span>{t.analysis?.speakResult || "Speak"}</span>
              </button>
              <button
                className="close-btn"
                onClick={() => setShowAnalysisResult(false)}
              >
                {t.common?.close || "Close"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // HOSPITAL FINDER MODAL (standalone for civilian)
  const HospitalFinderModal = () => (
    <div
      className="hospital-finder-overlay"
      onClick={() => setShowHospitalFinder(false)}
    >
      <div
        className="hospital-finder-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hospital-finder-header">
          <span className="hospital-icon">{Icons.location}</span>
          <h2>{t.hospitalFinder?.title || "Nearby Hospitals"}</h2>
          <button
            className="modal-close"
            onClick={() => setShowHospitalFinder(false)}
          >
            {Icons.x}
          </button>
        </div>

        {loadingHospitals ? (
          <div className="loading-hospitals">
            <div className="hospital-spinner"></div>
            <p>
              {t.emergency?.findingHospitals || "Finding nearby hospitals..."}
            </p>
          </div>
        ) : (
          <>
            {userLocation && (
              <div className="location-info">
                <span className="loc-icon">{Icons.location}</span>
                <span>
                  {t.emergency?.yourLocation || "Your Location"}:{" "}
                  {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                </span>
              </div>
            )}
            <div className="hospitals-list">
              {nearbyHospitals.map((h) => (
                <div key={h.id} className="hospital-card">
                  <div className="hospital-info">
                    <div className="hospital-name-row">
                      <h3>{h.name}</h3>
                      {h.emergencyAvailable && (
                        <span className="emergency-badge">24/7</span>
                      )}
                    </div>
                    <div className="hospital-meta">
                      <span>
                        <strong>{h.specialty}</strong>
                      </span>
                      <span>
                        {Icons.location} {h.distance}
                      </span>
                      <span>
                        {Icons.clock} {h.timing}
                      </span>
                      {h.rating && (
                        <span className="hospital-rating">★ {h.rating}</span>
                      )}
                    </div>
                    <p className="hospital-address">{h.address}</p>
                  </div>
                  <div className="hospital-actions">
                    <button
                      className="call-btn"
                      onClick={() => setShowCallConfirm(h)}
                    >
                      {Icons.phone}
                      <span>{t.emergency?.call || "Call"}</span>
                    </button>
                    <button className="map-btn" onClick={() => openInMaps(h)}>
                      {Icons.location}
                      <span>{t.emergency?.directions || "Directions"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {showCallConfirm && (
        <div className="call-confirm-modal">
          <div className="call-confirm-content">
            <h3>{t.emergency?.confirmCall || "Confirm Call"}</h3>
            <p>
              {t.emergency?.callQuestion || "Call"}{" "}
              <strong>{showCallConfirm.name}</strong>?
            </p>
            <p className="phone-number">{showCallConfirm.phone}</p>
            <div className="confirm-actions">
              <button
                className="confirm-btn cancel"
                onClick={() => setShowCallConfirm(null)}
              >
                {t.common?.cancel || "Cancel"}
              </button>
              <button
                className="confirm-btn call"
                onClick={() => confirmCall(showCallConfirm)}
              >
                {Icons.phone} {t.emergency?.callNow || "Call Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // LANGUAGE SELECTOR COMPONENT
  const LanguageSelector = () => (
    <div className="language-selector">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
      >
        <option value="en">EN</option>
        <option value="hi">HI</option>
        <option value="mr">MR</option>
        <option value="ta">TA</option>
        <option value="te">TE</option>
        <option value="bn">BN</option>
      </select>
    </div>
  );

  // TOP NAVBAR - Production Ready
  const TopNavbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <nav className="ar-navbar production">
        <div className="ar-navbar-container">
          <div className="ar-navbar-brand" onClick={() => navigate("/")}>
            <span
              className={`brand-badge ${isStudent ? "student" : "everyone"}`}
            >
              {isStudent
                ? t.common?.student || "Student"
                : t.common?.everyone || "Everyone"}
            </span>
          </div>

          <div className={`ar-navbar-nav ${mobileMenuOpen ? "open" : ""}`}>
            <button className="ar-nav-link" onClick={() => navigate("/")}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>{t.common?.home || "Home"}</span>
            </button>

            <div className="ar-nav-actions">
              <LanguageSelector />
              <button
                className="ar-profile-btn"
                onClick={() =>
                  navigate(isStudent ? "/student/profile" : "/civilian/profile")
                }
              >
                {Icons.user}
                <span>{t.common?.profile || "Profile"}</span>
              </button>
            </div>
          </div>

          <button
            className={`ar-navbar-toggle ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    );
  };

  // SELECT STAGE
  if (stage === "select") {
    return (
      <div className="ar-scan-page">
        <TopNavbar />

        <section className="ar-hero-section">
          <div className="ar-hero-content">
            <div className="ar-hero-badge">
              <span className="badge-icon">{Icons.cube}</span>
              <span>
                {isStudent
                  ? t.arScan?.medicalTraining || "Medical Training"
                  : t.arScan?.healthCompanion || "Mediverse"}
              </span>
            </div>
            <h1>
              {isStudent
                ? t.arScan?.studentTitle || "Medical Device Trainer"
                : t.arScan?.civilianTitle || "Scan Medical Device"}
            </h1>
            <p>
              {isStudent
                ? t.arScan?.studentDesc ||
                  "Learn how to use medical devices with interactive 3D models and step-by-step guidance"
                : t.arScan?.civilianDesc ||
                  "Scan your medical device for instant guidance on how to use it properly"}
            </p>

            <div className="ar-hero-actions">
              <button
                className="scan-me-btn"
                onClick={() => setShowScanModal(true)}
              >
                {Icons.camera}
                <span>{t.arScan?.scanDevice || "Scan Device"}</span>
              </button>
              {!isStudent && (
                <button
                  className="emergency-btn"
                  onClick={() =>
                    triggerEmergency({
                      name: "General",
                      specialistType: "Emergency Medicine",
                    })
                  }
                >
                  {Icons.emergency}
                  <span>{t.emergency?.emergency || "Emergency"}</span>
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="ar-device-selection">
          <div className="ar-selection-container">
            {isStudent && (
              <>
                <div className="ar-search-bar">
                  <span className="search-icon">{Icons.search}</span>
                  <input
                    type="text"
                    placeholder={
                      t.arScan?.searchPlaceholder ||
                      "Search devices (e.g., blood pressure, glucose...)"
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="ar-category-tabs">
                  <button
                    className={!searchQuery ? "active" : ""}
                    onClick={() => setSearchQuery("")}
                  >
                    {t.arScan?.allDevices || "All Devices"}
                  </button>
                  <button onClick={() => setSearchQuery("cardiovascular")}>
                    {t.arScan?.cardiovascular || "Cardiovascular"}
                  </button>
                  <button onClick={() => setSearchQuery("endocrine")}>
                    {t.arScan?.endocrine || "Endocrine"}
                  </button>
                  <button onClick={() => setSearchQuery("respiratory")}>
                    {t.arScan?.respiratory || "Respiratory"}
                  </button>
                </div>
              </>
            )}

            <h2 className="devices-heading">
              {isStudent
                ? t.arScan?.learnDevices || "Learn Medical Devices"
                : t.arScan?.quickAccess || "Quick Access Devices"}
            </h2>

            <div className="ar-device-grid">
              {filteredDevices
                .slice(0, isStudent ? filteredDevices.length : 4)
                .map(([key, device]) => (
                  <div
                    key={key}
                    className="ar-device-select-card"
                    style={{ "--device-color": device.color }}
                  >
                    <div className="ar-device-icon-wrapper">
                      <div className="ar-device-icon-bg"></div>
                      <span className="ar-device-icon">{deviceIcons[key]}</span>
                    </div>
                    {isStudent && (
                      <div className="device-badges">
                        <span className="device-category">
                          {device.category}
                        </span>
                        <span
                          className={`device-difficulty ${device.difficulty?.toLowerCase()}`}
                        >
                          {device.difficulty}
                        </span>
                      </div>
                    )}
                    <h3>{device.name}</h3>
                    <p>{device.about.substring(0, 80)}...</p>
                    <div className="ar-device-meta">
                      <span className="meta-item">
                        <span className="meta-icon">{Icons.cube}</span>
                        {device.modelPath ? "3D" : "2D"}
                      </span>
                      <span className="meta-item">
                        <span className="meta-icon">{Icons.volume}</span>
                        {t.arScan?.audio || "Audio"}
                      </span>
                    </div>
                    <div className="device-actions">
                      <button
                        className="ar-start-btn"
                        onClick={() => handleDeviceSelect(key)}
                      >
                        <span>
                          {isStudent
                            ? t.arScan?.learn || "Learn"
                            : t.arScan?.viewGuide || "View Guide"}
                        </span>
                        <span className="btn-icon">{Icons.next}</span>
                      </button>
                      {!isStudent && device.criticalValues && (
                        <button
                          className="ar-emergency-mini"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerEmergency(device);
                          }}
                        >
                          {Icons.emergency}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {filteredDevices.length === 0 && (
              <div className="no-results">
                <p>
                  {t.arScan?.noResults || "No devices found for"} "{searchQuery}
                  "
                </p>
                <button onClick={() => setSearchQuery("")}>
                  {t.arScan?.clearSearch || "Clear Search"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Additional Actions for Everyone Mode */}
        {!isStudent && (
          <>
            {/* ENTER READING SECTION */}
            <section className="ar-reading-section">
              <div className="reading-section-container">
                <div className="section-header">
                  <span className="section-icon">{Icons.activity}</span>
                  <div className="section-title">
                    <h2>{t.manualInput?.title || "Enter Health Reading"}</h2>
                    <p>
                      Input your device readings for instant AI-powered analysis
                    </p>
                  </div>
                </div>

                <div className="reading-content">
                  <div className="device-type-selector">
                    {[
                      {
                        key: "bp_monitor",
                        label: t.manualInput?.bpMonitor || "Blood Pressure",
                        icon: Icons.heart,
                      },
                      {
                        key: "glucometer",
                        label: t.manualInput?.glucometer || "Glucometer",
                        icon: Icons.droplet,
                      },
                      {
                        key: "thermometer",
                        label: t.manualInput?.thermometer || "Thermometer",
                        icon: Icons.thermometer,
                      },
                      {
                        key: "oximeter",
                        label: t.manualInput?.oximeter || "Oximeter",
                        icon: Icons.activity,
                      },
                      {
                        key: "weight_scale",
                        label: "Weight Scale",
                        icon: Icons.activity,
                      },
                      {
                        key: "custom",
                        label: "Custom Reading",
                        icon: Icons.activity,
                      },
                    ].map((device) => (
                      <button
                        key={device.key}
                        className={`device-chip ${manualReadings.deviceType === device.key ? "active" : ""}`}
                        onClick={() =>
                          setManualReadings((p) => ({
                            ...p,
                            deviceType: device.key,
                          }))
                        }
                        style={{
                          "--device-color":
                            DEVICE_DATABASE[device.key]?.color || "#8b5cf6",
                        }}
                      >
                        <span className="chip-icon">{device.icon}</span>
                        <span>{device.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="reading-form">
                    {manualReadings.deviceType === "bp_monitor" && (
                      <div className="input-row">
                        <div className="input-field">
                          <label>{t.manualInput?.systolic || "Systolic"}</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="120"
                            value={manualReadings.systolic}
                            onChange={(e) =>
                              setManualReadings((p) => ({
                                ...p,
                                systolic: e.target.value,
                              }))
                            }
                          />
                          <span className="unit">mmHg</span>
                        </div>
                        <div className="input-field">
                          <label>
                            {t.manualInput?.diastolic || "Diastolic"}
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="80"
                            value={manualReadings.diastolic}
                            onChange={(e) =>
                              setManualReadings((p) => ({
                                ...p,
                                diastolic: e.target.value,
                              }))
                            }
                          />
                          <span className="unit">mmHg</span>
                        </div>
                        <div className="input-field">
                          <label>{t.manualInput?.pulse || "Pulse"}</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="72"
                            value={manualReadings.pulse}
                            onChange={(e) =>
                              setManualReadings((p) => ({
                                ...p,
                                pulse: e.target.value,
                              }))
                            }
                          />
                          <span className="unit">bpm</span>
                        </div>
                      </div>
                    )}

                    {manualReadings.deviceType === "glucometer" && (
                      <div className="input-row single">
                        <div className="input-field large with-unit-toggle">
                          <label>
                            {t.manualInput?.glucose || "Blood Glucose"}
                          </label>
                          <div className="input-with-toggle">
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder={
                                manualReadings.glucoseUnit === "mg/dL"
                                  ? "100"
                                  : "5.5"
                              }
                              value={manualReadings.glucose}
                              onChange={(e) =>
                                setManualReadings((p) => ({
                                  ...p,
                                  glucose: e.target.value,
                                }))
                              }
                            />
                            <div className="unit-toggle">
                              <button
                                className={
                                  manualReadings.glucoseUnit === "mg/dL"
                                    ? "active"
                                    : ""
                                }
                                onClick={() =>
                                  setManualReadings((p) => ({
                                    ...p,
                                    glucoseUnit: "mg/dL",
                                  }))
                                }
                              >
                                mg/dL
                              </button>
                              <button
                                className={
                                  manualReadings.glucoseUnit === "mmol/L"
                                    ? "active"
                                    : ""
                                }
                                onClick={() =>
                                  setManualReadings((p) => ({
                                    ...p,
                                    glucoseUnit: "mmol/L",
                                  }))
                                }
                              >
                                mmol/L
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {manualReadings.deviceType === "thermometer" && (
                      <div className="input-row single">
                        <div className="input-field large with-unit-toggle">
                          <label>
                            {t.manualInput?.temperature || "Temperature"}
                          </label>
                          <div className="input-with-toggle">
                            <input
                              type="text"
                              inputMode="decimal"
                              placeholder={
                                manualReadings.temperatureUnit === "F"
                                  ? "98.6"
                                  : "37.0"
                              }
                              value={manualReadings.temperature}
                              onChange={(e) =>
                                setManualReadings((p) => ({
                                  ...p,
                                  temperature: e.target.value,
                                }))
                              }
                            />
                            <div className="unit-toggle">
                              <button
                                className={
                                  manualReadings.temperatureUnit === "F"
                                    ? "active"
                                    : ""
                                }
                                onClick={() =>
                                  setManualReadings((p) => ({
                                    ...p,
                                    temperatureUnit: "F",
                                  }))
                                }
                              >
                                °F
                              </button>
                              <button
                                className={
                                  manualReadings.temperatureUnit === "C"
                                    ? "active"
                                    : ""
                                }
                                onClick={() =>
                                  setManualReadings((p) => ({
                                    ...p,
                                    temperatureUnit: "C",
                                  }))
                                }
                              >
                                °C
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {manualReadings.deviceType === "oximeter" && (
                      <div className="input-row">
                        <div className="input-field">
                          <label>{t.manualInput?.spo2 || "SpO2"}</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="98"
                            value={manualReadings.spo2}
                            onChange={(e) =>
                              setManualReadings((p) => ({
                                ...p,
                                spo2: e.target.value,
                              }))
                            }
                          />
                          <span className="unit">%</span>
                        </div>
                        <div className="input-field">
                          <label>{t.manualInput?.pulse || "Pulse"}</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="72"
                            value={manualReadings.pulse}
                            onChange={(e) =>
                              setManualReadings((p) => ({
                                ...p,
                                pulse: e.target.value,
                              }))
                            }
                          />
                          <span className="unit">bpm</span>
                        </div>
                      </div>
                    )}

                    {manualReadings.deviceType === "weight_scale" && (
                      <div className="input-row single">
                        <div className="input-field large with-unit-toggle">
                          <label>Weight</label>
                          <div className="input-with-toggle">
                            <input
                              type="text"
                              inputMode="decimal"
                              placeholder={
                                manualReadings.weightUnit === "kg"
                                  ? "70"
                                  : "154"
                              }
                              value={manualReadings.weight || ""}
                              onChange={(e) =>
                                setManualReadings((p) => ({
                                  ...p,
                                  weight: e.target.value,
                                }))
                              }
                            />
                            <div className="unit-toggle">
                              <button
                                className={
                                  manualReadings.weightUnit === "kg"
                                    ? "active"
                                    : ""
                                }
                                onClick={() =>
                                  setManualReadings((p) => ({
                                    ...p,
                                    weightUnit: "kg",
                                  }))
                                }
                              >
                                kg
                              </button>
                              <button
                                className={
                                  manualReadings.weightUnit === "lbs"
                                    ? "active"
                                    : ""
                                }
                                onClick={() =>
                                  setManualReadings((p) => ({
                                    ...p,
                                    weightUnit: "lbs",
                                  }))
                                }
                              >
                                lbs
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {manualReadings.deviceType === "custom" && (
                      <div className="input-row custom">
                        <div className="input-field full">
                          <label>Custom Reading</label>
                          <textarea
                            placeholder="Enter your reading details here (e.g., Heart Rate: 75 bpm, Blood Sugar: 110 mg/dL after meal...)"
                            value={manualReadings.customText || ""}
                            onChange={(e) =>
                              setManualReadings((p) => ({
                                ...p,
                                customText: e.target.value,
                              }))
                            }
                            rows="3"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      className="analyze-inline-btn"
                      onClick={analyzeReading}
                    >
                      {Icons.activity}
                      <span>{t.manualInput?.analyze || "Analyze Reading"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* HOSPITAL FINDER SECTION */}
            <section className="ar-hospital-section">
              <div className="hospital-section-container">
                <div className="section-header">
                  <span className="section-icon">{Icons.location}</span>
                  <div className="section-title">
                    <h2>{t.hospitalFinder?.title || "Nearby Hospitals"}</h2>
                    <p>Find medical facilities near your location</p>
                  </div>
                  <button
                    className="refresh-location-btn"
                    onClick={getUserLocation}
                  >
                    {Icons.location}
                    <span>Refresh</span>
                  </button>
                </div>

                {loadingHospitals ? (
                  <div className="hospitals-loading">
                    <div className="loading-spinner"></div>
                    <p>
                      {t.emergency?.findingHospitals ||
                        "Finding nearby hospitals..."}
                    </p>
                  </div>
                ) : (
                  <div className="hospitals-grid">
                    {(nearbyHospitals.length > 0
                      ? nearbyHospitals
                      : [
                          {
                            id: 1,
                            name: "Enable Location for Nearby Hospitals",
                            specialty: "Click 'Refresh' above",
                            distance: "Unknown",
                            timing: "24/7",
                            address:
                              "Allow location access to find real hospitals near you",
                            phone: "108",
                            emergencyAvailable: true,
                            rating: null,
                          },
                          {
                            id: 2,
                            name: "Emergency Helpline (India)",
                            specialty: "All Emergencies",
                            distance: "N/A",
                            timing: "24/7",
                            address: "National Emergency Number",
                            phone: "112",
                            emergencyAvailable: true,
                            rating: null,
                          },
                          {
                            id: 3,
                            name: "Ambulance Service",
                            specialty: "Emergency Transport",
                            distance: "N/A",
                            timing: "24/7",
                            address: "Free Ambulance Service",
                            phone: "108",
                            emergencyAvailable: true,
                            rating: null,
                          },
                          {
                            id: 4,
                            name: "Health Helpline",
                            specialty: "Health Advice",
                            distance: "N/A",
                            timing: "24/7",
                            address: "Government Health Advisory",
                            phone: "104",
                            emergencyAvailable: false,
                            rating: null,
                          },
                        ]
                    ).map((h) => (
                      <div key={h.id} className="hospital-inline-card">
                        <div className="hospital-inline-header">
                          <h4>{h.name}</h4>
                          {h.emergencyAvailable && (
                            <span className="emergency-tag">24/7</span>
                          )}
                        </div>
                        <div className="hospital-inline-meta">
                          <span className="meta-specialty">{h.specialty}</span>
                          <span className="meta-distance">
                            {Icons.location} {h.distance}
                          </span>
                          {h.rating && (
                            <span className="meta-rating">★ {h.rating}</span>
                          )}
                        </div>
                        <p className="hospital-inline-address">{h.address}</p>
                        <div className="hospital-inline-actions">
                          <button
                            className="action-btn call"
                            onClick={() => setShowCallConfirm(h)}
                          >
                            {Icons.phone} Call
                          </button>
                          <button
                            className="action-btn directions"
                            onClick={() => openInMaps(h)}
                          >
                            {Icons.location} Directions
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {showScanModal && <ScanModal />}
        {showManualInput && !isStudent && <ManualInputModal />}
        {showAnalysisResult && !isStudent && <AnalysisResultModal />}
        {showHospitalFinder && !isStudent && <HospitalFinderModal />}
        {showEmergency && !isStudent && <EmergencyModal />}

        <Footer />
      </div>
    );
  }

  // LOADING STAGE
  if (stage === "loading") {
    return (
      <div className="ar-scan-page">
        <div className="ar-loading-screen">
          <div className="ar-loading-content">
            <div
              className="ar-loading-icon"
              style={{ "--device-color": selectedDevice?.color }}
            >
              {deviceIcons[selectedDevice?.key]}
            </div>
            <h2>Loading {selectedDevice?.name}</h2>
            <p>Preparing your training environment...</p>
            <div className="ar-loading-bar">
              <div className="ar-loading-progress"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VIEWER STAGE
  const currentStepData = selectedDevice?.steps[currentStep];

  return (
    <div
      className={`ar-scan-page viewer-mode ${isFullscreen ? "fullscreen" : ""}`}
    >
      <div className="ar-viewer-topbar">
        <button className="ar-topbar-btn back" onClick={handleBack}>
          <span className="btn-icon">{Icons.back}</span>
          <span>Back</span>
        </button>
        <div className="ar-topbar-center">
          <span
            className="device-indicator"
            style={{ "--device-color": selectedDevice?.color }}
          >
            {deviceIcons[selectedDevice?.key]}
          </span>
          <h2>{selectedDevice?.name}</h2>
        </div>
        <div className="ar-topbar-actions">
          {!isStudent && (
            <button
              className="ar-topbar-btn emergency"
              onClick={() => triggerEmergency(selectedDevice)}
            >
              {Icons.emergency}
            </button>
          )}
          <div className="audio-language-control">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="audio-lang-select"
              title={t.arScan?.audioLanguage || "Audio Language"}
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="mr">MR</option>
              <option value="ta">TA</option>
              <option value="te">TE</option>
              <option value="bn">BN</option>
            </select>
          </div>
          <button
            className={`ar-topbar-btn ${audioEnabled ? "active" : ""}`}
            onClick={() => setAudioEnabled(!audioEnabled)}
          >
            {audioEnabled ? Icons.volume : Icons.volumeOff}
          </button>
          <button className="ar-topbar-btn" onClick={toggleFullscreen}>
            {Icons.fullscreen}
          </button>
        </div>
      </div>

      <div className="ar-viewer-layout">
        <div className="ar-panel ar-info-panel">
          <div className="ar-panel-section">
            <h3>About</h3>
            <p>{selectedDevice?.about}</p>
          </div>
          <div className="ar-panel-section">
            <h3>Usage</h3>
            <p>{selectedDevice?.usage}</p>
          </div>
          <div className="ar-panel-section">
            <h3>Measures</h3>
            <ul className="ar-measures-list">
              {selectedDevice?.measures.map((m, i) => (
                <li key={i}>
                  <strong>{m.label}</strong>
                  <span>{m.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ar-viewer-center">
          <div className="ar-3d-container" ref={viewerRef}>
            {!modelLoaded && (
              <div className="ar-model-loading">
                <div className="ar-model-spinner"></div>
                <p>Loading 3D Model... {Math.round(loadingProgress)}%</p>
              </div>
            )}
          </div>
          <div className="ar-viewer-controls">
            <div className="ar-control-hint">
              <span className="hint-icon">{Icons.rotate}</span>
              <span>Drag to rotate / Scroll to zoom</span>
            </div>
          </div>
          <div className="ar-step-indicator">
            <span className="current-step">Step {currentStep + 1}</span>
            <span className="step-divider">/</span>
            <span className="total-steps">{selectedDevice?.steps.length}</span>
          </div>
        </div>

        <div className="ar-panel ar-steps-panel">
          <div className="ar-step-card">
            <div className="ar-step-header">
              <span className="step-number">{currentStep + 1}</span>
              <h3>{currentStepData?.title}</h3>
            </div>
            <p className="ar-step-explanation">
              {currentStepData?.explanation}
            </p>
            {currentStepData?.mistakes && (
              <div className="ar-step-warning">
                <span className="warning-icon">{Icons.warning}</span>
                <p>{currentStepData.mistakes}</p>
              </div>
            )}
            <div className="ar-step-progress">
              {selectedDevice?.steps.map((_, i) => (
                <div
                  key={i}
                  className={`progress-dot ${i === currentStep ? "active" : ""} ${i < currentStep ? "completed" : ""}`}
                />
              ))}
            </div>
            <div className="ar-step-nav">
              <button
                className="ar-nav-btn prev"
                onClick={() => currentStep > 0 && setCurrentStep((p) => p - 1)}
                disabled={currentStep === 0}
              >
                <span className="btn-icon">{Icons.prev}</span>
                <span>Previous</span>
              </button>
              {currentStep < selectedDevice?.steps.length - 1 ? (
                <button
                  className="ar-nav-btn next"
                  onClick={() => setCurrentStep((p) => p + 1)}
                >
                  <span>Next</span>
                  <span className="btn-icon">{Icons.next}</span>
                </button>
              ) : (
                <button
                  className="ar-nav-btn complete"
                  onClick={() => navigate(isStudent ? "/student" : "/civilian")}
                >
                  <span className="btn-icon">{Icons.check}</span>
                  <span>Complete</span>
                </button>
              )}
            </div>
            <button
              className="ar-replay-btn"
              onClick={() =>
                speak(
                  currentStepData?.title + ". " + currentStepData?.explanation,
                )
              }
            >
              <span className="btn-icon">{Icons.volume}</span>
              <span>Replay Audio</span>
            </button>
          </div>
        </div>
      </div>

      <button
        className={`ar-chat-toggle ${showChat ? "active" : ""}`}
        onClick={() => setShowChat(!showChat)}
      >
        {Icons.message}
      </button>
      {showChat && (
        <div className="ar-chat-widget">
          <div className="ar-chat-header">
            <span className="chat-icon">{Icons.message}</span>
            <span>AI Assistant</span>
            <button className="chat-close" onClick={() => setShowChat(false)}>
              x
            </button>
          </div>
          <div className="ar-chat-messages">
            {chatMessages.length === 0 && (
              <div className="chat-welcome">
                <p>Ask me about this device!</p>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="ar-chat-input">
            <input
              type="text"
              placeholder="Type your question..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
            />
            <button onClick={sendChatMessage}>Send</button>
          </div>
        </div>
      )}

      {showEmergency && !isStudent && <EmergencyModal />}
    </div>
  );
}
