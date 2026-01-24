import { HashRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import StudentAuth from "./pages/StudentAuth";
import CivilianAuth from "./pages/CivilianAuth";
import CivilianDashboard from "./pages/CivilianDashboard";
import CivilianProfile from "./pages/CivilianProfile";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <GoogleOAuthProvider clientId="744215141895-mfqmihkt481cnvakqb2ioj8m5ugr21rj.apps.googleusercontent.com">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-auth" element={<StudentAuth />} />
          <Route path="/civilian-auth" element={<CivilianAuth />} />
          <Route path="/civilian" element={<CivilianDashboard />} />
          <Route path="/civilian/profile" element={<CivilianProfile />} />
          <Route path="/student" element={<StudentDashboard />} />
        </Routes>
      </HashRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
