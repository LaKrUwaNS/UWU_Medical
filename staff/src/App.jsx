import './App.css';
import Slidebar from './Components/Slidebar/Slidebar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentRequests from "./Pages/AppointmentRequests/AppointmentRequests";
import MedicalReports from "./Pages/MedicalReports/MedicalReports";
import Prescriptions from "./Pages/Prescriptions/Prescriptions";
import StudentRecords from "./Pages/StudentRecords/StudentRecords";

function App() {
  return (
    <Router>
      <Slidebar />
      <div style={{
        marginLeft: "280px",  // matches sidebar width
        padding: "20px",
        minHeight: "100vh",
        overflow: "auto",
        background: "#f9fafb"
      }}>
        <Routes>
          <Route path="/medical-requests" element={<AppointmentRequests />} />
          <Route path="/medical-reports" element={<MedicalReports />} />
          <Route path="/prescription" element={<Prescriptions />} />
          <Route path="/student-records" element={<StudentRecords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
