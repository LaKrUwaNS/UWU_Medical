// App.jsx
import "./App.css";
import {
  Dahsboard,
  Login,
  MedicalRequests,
  MedicineData,
  Reminder,
  Reports,
  Settings,
  StudentData,
  Updates,
} from "./pages";
import Register from "./pages/Register/Register";

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/protected/layout";
import { useEffect } from "react";


function AuthWrapper({ children }) {
  const navigate = useNavigate();


  return children;
}

function App() {
  return (
    <Router>
      <AuthWrapper>
        <Routes>

          {/* Public routes */}
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* All layout-wrapped routes */}

          <Route path="/dashboard" element={<Layout><Dahsboard /></Layout>} />
          <Route path="/medical-requests" element={<Layout><MedicalRequests /></Layout>} />
          <Route path="/medicine-data" element={<Layout><MedicineData /></Layout>} />
          <Route path="/reminder" element={<Layout><Reminder /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/students/:id" element={<Layout><StudentData /></Layout>} />
          <Route path="/updates" element={<Layout><Updates /></Layout>} />


        </Routes>
      </AuthWrapper>
    </Router>
  );
}

export default App;
