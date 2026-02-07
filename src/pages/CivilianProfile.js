import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import AnimatedBackground from "../components/AnimatedBackground";
import Footer from "../components/Footer";

const Icons = {
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  save: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
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
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  device: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  height: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M2 12h4M18 12h4" />
    </svg>
  ),
  weight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
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
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
};

const DEFAULT_AVATARS = [
  {
    id: 1,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
    name: "Healthy",
  },
  {
    id: 2,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
    name: "Active",
  },
  {
    id: 3,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3",
    name: "Wellness",
  },
  {
    id: 4,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user4",
    name: "Vitality",
  },
  {
    id: 5,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user5",
    name: "Strong",
  },
  {
    id: 6,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user6",
    name: "Balanced",
  },
];

export default function CivilianProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [healthReadings, setHealthReadings] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState("bp_monitor");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, "civilians", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setEditForm({
              name: data.name || currentUser.displayName || "",
              age: data.age || "",
              city: data.city || "",
              gender: data.gender || "",
              height: data.height || "",
              weight: data.weight || "",
              bloodType: data.bloodType || "",
              emergencyContact: data.emergencyContact || "",
            });
          }
          const storedData = localStorage.getItem("aiDeviceData");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setScanHistory([
              {
                id: 1,
                device: parsedData.name || "Unknown Device",
                result: "Analyzed",
                date: new Date(parsedData.timestamp).toLocaleDateString(),
              },
            ]);
          }
          // Load health readings history
          const readingsHistory = localStorage.getItem("healthReadingsHistory");
          if (readingsHistory) {
            setHealthReadings(JSON.parse(readingsHistory));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/civilian-auth");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  // Get device icon based on type
  const getDeviceIcon = (type) => {
    switch (type) {
      case "bp_monitor":
        return Icons.heart;
      case "glucometer":
        return Icons.droplet;
      case "thermometer":
        return Icons.thermometer;
      case "oximeter":
        return Icons.activity;
      default:
        return Icons.device;
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

  // Get latest health status based on readings
  const getHealthStatus = () => {
    if (healthReadings.length === 0)
      return { status: "No Data", color: "#6b7280" };
    const recentReadings = healthReadings.slice(0, 5);
    const categories = recentReadings.map((r) => r.category);
    if (categories.includes("emergency") || categories.includes("highRisk")) {
      return { status: "Needs Attention", color: "#ef4444" };
    }
    if (categories.includes("risk") || categories.includes("elevated")) {
      return { status: "Monitoring", color: "#f59e0b" };
    }
    return { status: "Stable", color: "#10b981" };
  };

  // Get readings for chart (last 7 readings of selected type)
  const getChartData = () => {
    const filtered = healthReadings
      .filter((r) => r.deviceType === selectedChartType)
      .slice(0, 7)
      .reverse();
    return filtered;
  };

  // Clear all readings
  const clearReadings = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all health readings history?",
      )
    ) {
      localStorage.removeItem("healthReadingsHistory");
      setHealthReadings([]);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("aiDeviceData");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "civilians", user.uid), {
        ...editForm,
        updatedAt: new Date().toISOString(),
      });
      setUserData((prev) => ({ ...prev, ...editForm }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
    setSaving(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const avatarUrl = event.target.result;
        try {
          await updateDoc(doc(db, "civilians", user.uid), { avatarUrl });
          setUserData((prev) => ({ ...prev, avatarUrl }));
        } catch (error) {
          console.error("Error uploading avatar:", error);
        }
        setShowAvatarModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectAvatar = async (avatarSrc) => {
    try {
      await updateDoc(doc(db, "civilians", user.uid), { avatarUrl: avatarSrc });
      setUserData((prev) => ({ ...prev, avatarUrl: avatarSrc }));
    } catch (error) {
      console.error("Error selecting avatar:", error);
    }
    setShowAvatarModal(false);
  };

  if (loading)
    return (
      <div className="profile-loading">
        <div className="loading-spinner-large"></div>
        <p>Loading profile...</p>
      </div>
    );

  const displayName =
    editForm.name || userData?.name || user?.displayName || "User";
  const displayEmail = userData?.email || user?.email || "";
  const avatarUrl = userData?.avatarUrl || user?.photoURL;

  return (
    <div className="profile-page-modern">
      <AnimatedBackground variant="light" />
      <nav className="profile-navbar">
        <div className="profile-navbar-container">
          <div className="profile-navbar-left">
            <button className="nav-btn" onClick={() => navigate("/civilian")}>
              {Icons.back}
              <span>Dashboard</span>
            </button>
          </div>
          <div className="profile-navbar-center">
            <span className="brand-text">MEDIVERSE</span>
            <span className="brand-badge">Everyone</span>
          </div>
          <div className="profile-navbar-right">
            <button className="nav-btn home" onClick={() => navigate("/")}>
              {Icons.home}
              <span>Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="profile-container-modern">
        <div className="profile-card-modern">
          <div className="profile-avatar-section">
            <div
              className="profile-avatar"
              onClick={() => setShowAvatarModal(true)}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} />
              ) : (
                <span>{displayName.charAt(0).toUpperCase()}</span>
              )}
              <div className="avatar-edit-overlay">{Icons.camera}</div>
            </div>
            <div className="profile-name-section">
              <h2>{displayName}</h2>
              <p>{displayEmail}</p>
              <span className="profile-badge">Everyone</span>
            </div>
            {!isEditing ? (
              <button
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                {Icons.edit}
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="edit-actions">
                <button
                  className="save-btn"
                  onClick={handleEditSubmit}
                  disabled={saving}
                >
                  {Icons.save}
                  <span>{saving ? "Saving..." : "Save"}</span>
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  {Icons.x}
                </button>
              </div>
            )}
          </div>
          {isEditing ? (
            <div className="profile-edit-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, age: e.target.value }))
                    }
                    placeholder="Enter your age"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={editForm.city}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, city: e.target.value }))
                    }
                    placeholder="Enter your city"
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    value={editForm.height}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        height: e.target.value,
                      }))
                    }
                    placeholder="Height in cm"
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    value={editForm.weight}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        weight: e.target.value,
                      }))
                    }
                    placeholder="Weight in kg"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Type</label>
                  <select
                    value={editForm.bloodType}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        bloodType: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Emergency Contact</label>
                  <input
                    type="tel"
                    value={editForm.emergencyContact}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        emergencyContact: e.target.value,
                      }))
                    }
                    placeholder="Emergency phone"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="profile-info-grid">
              <div className="info-item">
                {Icons.calendar}
                <div className="info-content">
                  <span className="info-label">Age</span>
                  <span className="info-value">{userData?.age || "-"}</span>
                </div>
              </div>
              <div className="info-item">
                {Icons.location}
                <div className="info-content">
                  <span className="info-label">City</span>
                  <span className="info-value">{userData?.city || "-"}</span>
                </div>
              </div>
              <div className="info-item">
                {Icons.user}
                <div className="info-content">
                  <span className="info-label">Gender</span>
                  <span className="info-value">{userData?.gender || "-"}</span>
                </div>
              </div>
              <div className="info-item">
                {Icons.height}
                <div className="info-content">
                  <span className="info-label">Height</span>
                  <span className="info-value">
                    {userData?.height ? `${userData.height} cm` : "-"}
                  </span>
                </div>
              </div>
              <div className="info-item">
                {Icons.weight}
                <div className="info-content">
                  <span className="info-label">Weight</span>
                  <span className="info-value">
                    {userData?.weight ? `${userData.weight} kg` : "-"}
                  </span>
                </div>
              </div>
              <div className="info-item">
                {Icons.heart}
                <div className="info-content">
                  <span className="info-label">Blood Type</span>
                  <span className="info-value">
                    {userData?.bloodType || "-"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="profile-stats-grid">
          <div className="stat-card-modern">
            <div className="stat-icon">{Icons.chart}</div>
            <div className="stat-info">
              <span className="stat-value">{healthReadings.length}</span>
              <span className="stat-label">Total Readings</span>
            </div>
          </div>
          <div className="stat-card-modern">
            <div
              className="stat-icon"
              style={{ color: getHealthStatus().color }}
            >
              {Icons.check}
            </div>
            <div className="stat-info">
              <span
                className="stat-value"
                style={{ color: getHealthStatus().color }}
              >
                {getHealthStatus().status}
              </span>
              <span className="stat-label">Health Status</span>
            </div>
          </div>
          <div className="stat-card-modern">
            <div className="stat-icon warning">{Icons.activity}</div>
            <div className="stat-info">
              <span className="stat-value">
                {healthReadings.length > 0
                  ? healthReadings[0].category?.charAt(0).toUpperCase() +
                    healthReadings[0].category?.slice(1)
                  : "No Data"}
              </span>
              <span className="stat-label">Last Reading</span>
            </div>
          </div>
        </div>

        {/* Health Readings Chart Section */}
        {healthReadings.length > 0 && (
          <div className="health-chart-section">
            <div className="chart-header">
              <h3>{Icons.chart} Health Monitoring</h3>
              <div className="chart-controls">
                <select
                  value={selectedChartType}
                  onChange={(e) => setSelectedChartType(e.target.value)}
                  className="chart-type-select"
                >
                  <option value="bp_monitor">Blood Pressure</option>
                  <option value="glucometer">Glucose</option>
                  <option value="thermometer">Temperature</option>
                  <option value="oximeter">Oxygen Level</option>
                </select>
                <button className="clear-readings-btn" onClick={clearReadings}>
                  {Icons.trash}
                </button>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-bars">
                {getChartData().map((reading, index) => {
                  let value = 0;
                  let maxValue = 200;
                  let label = "";

                  if (selectedChartType === "bp_monitor") {
                    value = parseInt(reading.values?.systolic) || 0;
                    maxValue = 200;
                    label = `${reading.values?.systolic || 0}/${reading.values?.diastolic || 0}`;
                  } else if (selectedChartType === "glucometer") {
                    value = parseInt(reading.values?.glucose) || 0;
                    maxValue = 400;
                    label = `${value} mg/dL`;
                  } else if (selectedChartType === "thermometer") {
                    value = parseFloat(reading.values?.temperature) || 0;
                    maxValue = 110;
                    label = `${value}°`;
                  } else if (selectedChartType === "oximeter") {
                    value = parseInt(reading.values?.spo2) || 0;
                    maxValue = 100;
                    label = `${value}%`;
                  }

                  const heightPercent = Math.min((value / maxValue) * 100, 100);
                  const date = new Date(reading.timestamp).toLocaleDateString(
                    undefined,
                    { month: "short", day: "numeric" },
                  );

                  return (
                    <div
                      key={reading.id || index}
                      className="chart-bar-wrapper"
                    >
                      <div
                        className="chart-bar"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: getCategoryColor(reading.category),
                        }}
                      >
                        <span className="bar-value">{label}</span>
                      </div>
                      <span className="bar-date">{date}</span>
                    </div>
                  );
                })}
              </div>
              {getChartData().length === 0 && (
                <div className="no-chart-data">
                  <p>
                    No{" "}
                    {selectedChartType === "bp_monitor"
                      ? "Blood Pressure"
                      : selectedChartType === "glucometer"
                        ? "Glucose"
                        : selectedChartType === "thermometer"
                          ? "Temperature"
                          : "SpO2"}{" "}
                    readings recorded yet
                  </p>
                </div>
              )}
            </div>

            <div className="readings-legend">
              <span className="legend-item">
                <span
                  className="legend-dot"
                  style={{ background: "#10b981" }}
                ></span>
                Normal
              </span>
              <span className="legend-item">
                <span
                  className="legend-dot"
                  style={{ background: "#f59e0b" }}
                ></span>
                Elevated
              </span>
              <span className="legend-item">
                <span
                  className="legend-dot"
                  style={{ background: "#f97316" }}
                ></span>
                Risk
              </span>
              <span className="legend-item">
                <span
                  className="legend-dot"
                  style={{ background: "#ef4444" }}
                ></span>
                High Risk
              </span>
            </div>
          </div>
        )}

        {/* Health Readings History */}
        {healthReadings.length > 0 && (
          <div className="history-section-modern">
            <h3>Reading History</h3>
            <div className="history-list">
              {healthReadings.slice(0, 10).map((reading) => (
                <div key={reading.id} className="history-item-modern">
                  <div
                    className="history-icon"
                    style={{ color: getCategoryColor(reading.category) }}
                  >
                    {getDeviceIcon(reading.deviceType)}
                  </div>
                  <div className="history-content">
                    <h4>
                      {reading.deviceType === "bp_monitor"
                        ? "Blood Pressure"
                        : reading.deviceType === "glucometer"
                          ? "Blood Glucose"
                          : reading.deviceType === "thermometer"
                            ? "Temperature"
                            : reading.deviceType === "oximeter"
                              ? "Oxygen Level"
                              : reading.deviceType}
                    </h4>
                    <p>
                      {new Date(reading.timestamp).toLocaleDateString()} -{" "}
                      {new Date(reading.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <span
                    className={`history-status`}
                    style={{
                      backgroundColor: getCategoryColor(reading.category),
                    }}
                  >
                    {reading.category?.charAt(0).toUpperCase() +
                      reading.category?.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {scanHistory.length > 0 && healthReadings.length === 0 && (
          <div className="history-section-modern">
            <h3>Recent Activity</h3>
            <div className="history-list">
              {scanHistory.map((item) => (
                <div key={item.id} className="history-item-modern">
                  <div className="history-icon">{Icons.device}</div>
                  <div className="history-content">
                    <h4>{item.device}</h4>
                    <p>{item.date}</p>
                  </div>
                  <span
                    className={`history-status ${item.result.toLowerCase()}`}
                  >
                    {item.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="profile-actions-modern">
          <button
            className="action-btn primary"
            onClick={() => navigate("/civilian")}
          >
            {Icons.device}
            <span>Scan Device</span>
          </button>
          <button className="action-btn danger" onClick={handleLogout}>
            {Icons.logout}
            <span>Logout</span>
          </button>
        </div>
      </div>

      {showAvatarModal && (
        <div
          className="avatar-modal-overlay"
          onClick={() => setShowAvatarModal(false)}
        >
          <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="avatar-modal-header">
              <h3>Change Profile Picture</h3>
              <button
                className="modal-close"
                onClick={() => setShowAvatarModal(false)}
              >
                {Icons.x}
              </button>
            </div>
            <div className="avatar-options">
              <button
                className="avatar-upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                {Icons.upload}
                <span>Upload Photo</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
            </div>
            <div className="avatar-divider">
              <span>or choose an avatar</span>
            </div>
            <div className="avatar-grid">
              {DEFAULT_AVATARS.map((avatar) => (
                <div
                  key={avatar.id}
                  className="avatar-option"
                  onClick={() => selectAvatar(avatar.src)}
                >
                  <img src={avatar.src} alt={avatar.name} />
                  <span>{avatar.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
