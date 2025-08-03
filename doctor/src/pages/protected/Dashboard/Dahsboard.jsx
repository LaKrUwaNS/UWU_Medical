import React, { useEffect, useState } from "react";
import './Dashboard.css';
import images from "../../../assets/images";
import Loadinganimate from '../../../components/LoadingAnimation/Loadinganimate';


// Components
import UserProfile from '../../../components/UserProfile/UseraProfile';
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

  if (loading) {
    return <Loadinganimate />;
  }

  if (!dashboardStats) {
    return <div className="error">Failed to load dashboard data</div>;
  }

  return (
    <div className="dashboard">
      {/* --- Header --- */}
      <header className="dashboard-header">
        <h2>Daily Data</h2>
        <div className="search-section">
          <input type="text" placeholder="Search About Student" />
          <button><img className="search-icon" src={images.search} alt="search-icon" /></button>
        </div>
        <UserProfile name="Dr. Lakruwan Sharaka" image={images.lakruwan} />
      </header>

      {/* --- Top Summary Cards --- */}
      <div className="dashboard-cards">
        <div className="card student">
          <div className="card-header">
            <span>Student Count</span>
          </div>
          <img className="card-img" src={images.studentImage} alt="Student Icon" />
          <div className="count-box">{dashboardStats.studentCount}</div>
          <p className="increase">+{dashboardStats.studentIncrease} students more than last month</p>
        </div>

        <div className="card staff">
          <div className="card-header">
            <span>Staff Today</span>
          </div>
          <img className="card-img" src={images.staffImage} alt="Staff Icon" />
          <div className="count-box">{dashboardStats.staffCount}</div>
          <div className="status-row-labels">
            <div className="absent-sec">
              <span>Absent</span>
              <span className="status-circle-absent">{dashboardStats.staffAbsent}</span>
            </div>
            <div className="leave-sec">
              <span>Leave</span>
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
        <StudentDataCard students={studentList} />
        <DonutChart patientData={patientData} />
      </div>

      {/* --- Row: Next Patient + Bar Chart --- */}
      <div className="dashboard-row">
        <div className="next-patient-wrapper">
          {nextPatient ? (
            <NextPatientCard
              name={nextPatient.indexNumber}
              id={nextPatient.id}
              imageUrl={nextPatient.photo}
              onProcess={() => alert('Processing...')}
              onCancel={() => alert('Cancelled')}
            />
          ) : (
            <div className="no-patient">No upcoming medical appointments</div>
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
