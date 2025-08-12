import React, { useEffect, useState } from "react";
import './Dashboard.css';
import images from "../../../assets/images";
import Loadinganimate from '../../../components/LoadingAnimation/Loadinganimate';

// Components

import NextPatientCard from '../../../components/NextPatientCard/NextPatientCard';
import StudentDataCard from '../../../components/StudentDataCard/StudentDataCard';
import DonutChart from '../../../components/DonutChart/DonutChart';
import AttendancebarChart from '../../../components/BarChart/Barchart';

const Dashboard = () => {
  const [studentList, setStudentList] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [nextPatient, setNextPatient] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/doctor/dashboard", {
          method: "GET"
        });

        const result = await response.json();

        if (result.success) {
          const data = result.data;
          setStudentList(data.studentList);
          setPatientData(data.patientData);
          setWeeklyData(data.weeklyData);
          setNextPatient(data.nextPatient);
          setDashboardStats(data.dashboardStats);
        } else {
          console.error("Failed to fetch:", result.message);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return <Loadinganimate />;
  }

  if (!dashboardStats) {
    return <div className="error">⚠️ Failed to load dashboard data</div>;
  }

  return (
    <div className="dashboard">
      {/* --- Modern Header --- */}
      <header className="dashboard-header1">
        <h2> D<span className="green">ai</span>ly Ov<span className="green">er</span>view</h2>

      </header>

      {/* --- Modern Summary Cards --- */}
      <div className="dashboard-cards">
        <div className="card student">
          <div className="card-header">
            <span>👥 Student Count</span>
          </div>
          <img className="card-img" src={images.studentImage} alt="Student Icon" />
          <div className="count-box">{dashboardStats.studentCount}</div>
          <p className="increase">
            📈 +{dashboardStats.studentIncrease} students more than last month
          </p>
        </div>

        <div className="card staff">
          <div className="card-header">
            <span>👨‍💼 Staff Today</span>
          </div>
          <img className="card-img" src={images.staffImage} alt="Staff Icon" />
          <div className="count-box">{dashboardStats.staffCount}</div>
          <div className="status-row-labels">
            <div className="absent-sec">
              <span>Absent</span>
              <span className="status-circle-absent">{dashboardStats.staffAbsent}</span>
            </div>
            <div className="leave-sec">
              <span>On Leave</span>
              <span className="status-circle-leave">{dashboardStats.staffLeave}</span>
            </div>
          </div>
        </div>



        <div className="card medical">
          <div className="card-header">
            <span>Medical Requests</span>
          </div>
          <img className="card-img" src={images.MedicaReq} alt="Medical Icon" />
          <div className="count-box">{dashboardStats.medicalRequests}</div>
          <p className="next-request">
            Next medical request at{" "}
            <span className="time">
              {dashboardStats.nextMedicalTime === "No appointments"
                ? "No appointments"
                : new Date(dashboardStats.nextMedicalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </p>
        </div>
      </div>


      {/* --- Row: Student Table + Donut Chart --- */}
      <div className="dashboard-row">
        <div className="student-data-wrapper">
          <StudentDataCard students={studentList} />
        </div>
        <div className="donut-chart-wrapper">
          <DonutChart patientData={patientData} />
        </div>
      </div>

      {/* --- Row: Next Patient + Bar Chart --- */}
      <div className="dashboard-row">
        <div className="next-patient-wrapper">
          {nextPatient ? (
            <NextPatientCard
              name={nextPatient.indexNumber}
              id={nextPatient.id}
              imageUrl={nextPatient.photo}
              onProcess={() => alert('Processing patient...')}
              onCancel={() => alert('Appointment cancelled')}
            />
          ) : (
            <div className="no-patient">
              📅 No upcoming medical appointments
            </div>
          )}
        </div>
        <div className="BarChart-wrapper">
          <AttendancebarChart attendanceData={weeklyData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;