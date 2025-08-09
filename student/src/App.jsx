import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/home";
import HomeUi from "./pages/HomeUi/MedicalCenterPortal";
import Login from "./pages/Login/login"
import Register from "./pages/Register/Register"
import Apply_Medical from "./pages/Apply_Medical/ApplyMedical";


function App() {
  //const isLoggedIn = !!localStorage.getItem("token"); // Example logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medical" element={<HomeUi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ApplyMedical" element={<Apply_Medical />} />

      </Routes>
    </Router>
  );
}

export default App;
