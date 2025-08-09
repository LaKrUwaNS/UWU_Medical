import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/home";
import HomeUi from "./pages/HomeUi/MedicalCenterPortal";
import Login from "./pages/Login/login"
import Apply_Medical from "./pages/Apply_Medical/ApplyMedical";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medical" element={<HomeUi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ApplyMedical" element={<Apply_Medical />} />

      </Routes>
    </Router>
  );
}

export default App;
