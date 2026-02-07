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
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
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
};

const DEFAULT_AVATARS = [
  {
    id: 1,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=student1",
    name: "Scholar",
  },
  {
    id: 2,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=student2",
    name: "Medic",
  },
  {
    id: 3,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=student3",
    name: "Doctor",
  },
  {
    id: 4,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=student4",
    name: "Nurse",
  },
  {
    id: 5,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=student5",
    name: "Researcher",
  },
  {
    id: 6,
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=student6",
    name: "Intern",
  },
];

export default function StudentProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [learningProgress, setLearningProgress] = useState({
    devicesLearned: 0,
    totalDevices: 6,
    certificatesEarned: 0,
    hoursSpent: 0,
    currentStreak: 0,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, "students", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setEditForm({
              name: data.name || currentUser.displayName || "",
              age: data.age || "",
              city: data.city || "",
              gender: data.gender || "",
              college: data.college || "",
              year: data.year || "",
              specialization: data.specialization || "",
            });
            if (data.learningProgress)
              setLearningProgress(data.learningProgress);
          }
          const storedData = localStorage.getItem("aiDeviceData");
          if (storedData)
            setLearningProgress((prev) => ({
              ...prev,
              devicesLearned: Math.min(prev.devicesLearned + 1, 6),
            }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/student-auth");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

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
      await updateDoc(doc(db, "students", user.uid), {
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
          await updateDoc(doc(db, "students", user.uid), { avatarUrl });
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
      await updateDoc(doc(db, "students", user.uid), { avatarUrl: avatarSrc });
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
    editForm.name || userData?.name || user?.displayName || "Student";
  const displayEmail = userData?.email || user?.email || "";
  const avatarUrl = userData?.avatarUrl || user?.photoURL;
  const progressPercent =
    (learningProgress.devicesLearned / learningProgress.totalDevices) * 100;

  return (
    <div className="profile-page-modern student-profile">
      <AnimatedBackground variant="light" />
      <nav className="profile-navbar">
        <div className="profile-navbar-container">
          <div className="profile-navbar-left">
            <button className="nav-btn" onClick={() => navigate("/student")}>
              {Icons.back}
              <span>Dashboard</span>
            </button>
          </div>
          <div className="profile-navbar-center">
            <span className="brand-text">MEDIVERSE</span>
            <span className="brand-badge student">Student</span>
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
              className="profile-avatar student"
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
              <span className="profile-badge student">Medical Student</span>
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
                  <label>College/University</label>
                  <input
                    type="text"
                    value={editForm.college}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        college: e.target.value,
                      }))
                    }
                    placeholder="Enter your college"
                  />
                </div>
                <div className="form-group">
                  <label>Year of Study</label>
                  <select
                    value={editForm.year}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, year: e.target.value }))
                    }
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Intern">Intern</option>
                    <option value="Resident">Resident</option>
                  </select>
                </div>
              </div>
              <div className="form-group full-width">
                <label>Specialization</label>
                <input
                  type="text"
                  value={editForm.specialization}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      specialization: e.target.value,
                    }))
                  }
                  placeholder="e.g., Cardiology, General Medicine"
                />
              </div>
            </div>
          ) : (
            <div className="profile-info-grid">
              <div className="info-item">
                {Icons.graduation}
                <div className="info-content">
                  <span className="info-label">Institution</span>
                  <span className="info-value">{userData?.college || "-"}</span>
                </div>
              </div>
              <div className="info-item">
                {Icons.book}
                <div className="info-content">
                  <span className="info-label">Year</span>
                  <span className="info-value">{userData?.year || "-"}</span>
                </div>
              </div>
              <div className="info-item">
                {Icons.target}
                <div className="info-content">
                  <span className="info-label">Specialization</span>
                  <span className="info-value">
                    {userData?.specialization || "-"}
                  </span>
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
                {Icons.calendar}
                <div className="info-content">
                  <span className="info-label">Age</span>
                  <span className="info-value">{userData?.age || "-"}</span>
                </div>
              </div>
              <div className="info-item">
                {Icons.user}
                <div className="info-content">
                  <span className="info-label">Gender</span>
                  <span className="info-value">{userData?.gender || "-"}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="learning-progress-section">
          <h3>Learning Progress</h3>
          <div className="progress-overview">
            <div className="progress-ring-container">
              <svg className="progress-ring" viewBox="0 0 120 120">
                <circle className="progress-ring-bg" cx="60" cy="60" r="52" />
                <circle
                  className="progress-ring-fill"
                  cx="60"
                  cy="60"
                  r="52"
                  style={{
                    strokeDashoffset: 327 - (327 * progressPercent) / 100,
                  }}
                />
              </svg>
              <div className="progress-ring-text">
                <span className="progress-value">
                  {Math.round(progressPercent)}%
                </span>
                <span className="progress-label">Complete</span>
              </div>
            </div>
            <div className="progress-details">
              <div className="progress-stat">
                <span className="stat-number">
                  {learningProgress.devicesLearned}
                </span>
                <span className="stat-text">
                  of {learningProgress.totalDevices} Devices
                </span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="progress-encouragement">
                {progressPercent < 50
                  ? "Keep learning! You're making great progress."
                  : progressPercent < 100
                    ? "Excellent work! Almost there!"
                    : "Congratulations! You've mastered all devices!"}
              </p>
            </div>
          </div>
        </div>

        <div className="profile-stats-grid">
          <div className="stat-card-modern student">
            <div className="stat-icon">{Icons.device}</div>
            <div className="stat-info">
              <span className="stat-value">
                {learningProgress.devicesLearned}
              </span>
              <span className="stat-label">Devices Learned</span>
            </div>
          </div>
          <div className="stat-card-modern student">
            <div className="stat-icon success">{Icons.award}</div>
            <div className="stat-info">
              <span className="stat-value">
                {learningProgress.certificatesEarned}
              </span>
              <span className="stat-label">Certificates</span>
            </div>
          </div>
          <div className="stat-card-modern student">
            <div className="stat-icon warning">{Icons.clock}</div>
            <div className="stat-info">
              <span className="stat-value">{learningProgress.hoursSpent}h</span>
              <span className="stat-label">Learning Time</span>
            </div>
          </div>
          <div className="stat-card-modern student">
            <div className="stat-icon streak">{Icons.star}</div>
            <div className="stat-info">
              <span className="stat-value">
                {learningProgress.currentStreak}
              </span>
              <span className="stat-label">Day Streak</span>
            </div>
          </div>
        </div>

        <div className="achievements-section">
          <h3>Achievements</h3>
          <div className="achievements-grid">
            <div
              className={`achievement-card ${learningProgress.devicesLearned >= 1 ? "unlocked" : "locked"}`}
            >
              <div className="achievement-icon">{Icons.star}</div>
              <span className="achievement-title">First Steps</span>
              <span className="achievement-desc">Learn your first device</span>
            </div>
            <div
              className={`achievement-card ${learningProgress.devicesLearned >= 3 ? "unlocked" : "locked"}`}
            >
              <div className="achievement-icon">{Icons.target}</div>
              <span className="achievement-title">Dedicated Learner</span>
              <span className="achievement-desc">Learn 3 devices</span>
            </div>
            <div
              className={`achievement-card ${learningProgress.devicesLearned >= 6 ? "unlocked" : "locked"}`}
            >
              <div className="achievement-icon">{Icons.award}</div>
              <span className="achievement-title">Device Master</span>
              <span className="achievement-desc">Complete all devices</span>
            </div>
            <div
              className={`achievement-card ${learningProgress.currentStreak >= 7 ? "unlocked" : "locked"}`}
            >
              <div className="achievement-icon">{Icons.clock}</div>
              <span className="achievement-title">Consistent</span>
              <span className="achievement-desc">7 day learning streak</span>
            </div>
          </div>
        </div>

        <div className="profile-actions-modern">
          <button
            className="action-btn primary student"
            onClick={() => navigate("/student")}
          >
            {Icons.device}
            <span>Continue Learning</span>
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
