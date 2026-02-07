import { HashRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LanguageProvider } from "./context/LanguageContext";
import "./App.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import StudentAuth from "./pages/StudentAuth";
import CivilianAuth from "./pages/CivilianAuth";
import CivilianProfile from "./pages/CivilianProfile";
import StudentProfile from "./pages/StudentProfile";
import ARScan from "./pages/ARScan";

function App() {
  return (
    <GoogleOAuthProvider clientId="744215141895-mfqmihkt481cnvakqb2ioj8m5ugr21rj.apps.googleusercontent.com">
      <LanguageProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-auth" element={<StudentAuth />} />
            <Route path="/civilian-auth" element={<CivilianAuth />} />
            <Route path="/civilian" element={<ARScan mode="civilian" />} />
            <Route path="/civilian/profile" element={<CivilianProfile />} />
            <Route path="/student" element={<ARScan mode="student" />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/ar-scan" element={<ARScan mode="civilian" />} />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
