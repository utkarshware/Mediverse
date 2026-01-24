import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css"; 

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CivilianDashboard from "./pages/CivilianDashboard";
import CivilianProfile from "./pages/CivilianProfile";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/civilian" element={<CivilianDashboard />} />
        <Route path="/civilian/profile" element={<CivilianProfile />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
