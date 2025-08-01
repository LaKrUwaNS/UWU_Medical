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
  Staff 
  
} from "./pages";
import Register from "./pages/Register/Register";
import Layout from "./pages/protected/layout";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const isLoggedIn = !!localStorage.getItem("token"); // Example logic

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (wrapped with Layout) */}
        
          <>
            <Route path="/dashboard" element={<Layout><Dahsboard /></Layout>} />
            <Route path="/medical-requests" element={<Layout><MedicalRequests /></Layout>} />
            <Route path="/medicine-data" element={<Layout><MedicineData /></Layout>} />
            <Route path="/reminder" element={<Layout><Reminder /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/reports" element={<Layout><Reports /></Layout>} />
            <Route path="/students/:id" element={<Layout><StudentData /></Layout>} />
            <Route path="/updates" element={<Layout><Updates /></Layout>} />
            <Route path="/staff" element={<Layout><Staff /></Layout>} />
            
          </>
        
          
           
            
          
        
      </Routes>
    </Router>
  );
}

export default App;
