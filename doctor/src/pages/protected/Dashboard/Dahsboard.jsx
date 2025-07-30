import React from "react";
import './Dashboard.css';
import images from "../../../assets/images";

// Components
import UserProfile from '../../../components/UserProfile/UseraProfile';
import NextPatientCard from '../../../components/NextPatientCard/NextPatientCard';
import StudentDataCard from '../../../components/StudentDataCard/StudentDataCard';
import DonutChart from '../../../components/DonutChart/DonutChart';
import AttendancebarChart from '../../../components/BarChart/Barchart';

const Dashboard = () => {
  // === Student List Data ===
  const studentList = [
    {
      name: 'Nirmal',
      department: 'Information Communication',
      emn: 'BBST/22/XX',
      image: '/images/nirmal.jpg',
    },
    {
      name: 'Prasaa',
      department: 'BIO system technology',
      emn: 'BBST/22/XX',
      image: '/images/prasaa.jpg',
    },
    {
      name: 'Ashen',
      department: 'Information Communication',
      emn: 'BBST/22/XX',
      image: '/images/ashen.jpg',
    },
    {
      name: 'Kavindu',
      department: 'Engineering Technology',
      emn: 'BBST/22/XX',
      image: '/images/kavindu.jpg',
    },
  ];

  // === Donut Chart Data ===
  const patientData = [
    { name: 'ICT', value: 5 },
    { name: 'ET', value: 4 },
    { name: 'ENM', value: 6 },
    { name: 'AQT', value: 3 },
  ];

  // === Bar Chart Data ===
  const weeklyData = [
    { day: 'Mon', patients: 1 },
    { day: 'Tue', patients: 4 },
    { day: 'Wed', patients: 3 },
    { day: 'Thu', patients: 6 },
    { day: 'Fri', patients: 7 },
    { day: 'Sat', patients: 1 },
    { day: 'Sun', patients: 0 },
  ];

  // === Next Patient Info ===
  const nextPatient = {
    name: "Lakruwan Sharaka",
    id: "UWU/ICT/22/XX",
    imageUrl: images.lakruwan,
  };
  const dashboardStats = {
        studentCount: 20,
        studentIncrease: 5,
        staffCount: 2,
        staffAbsent: 1,
        staffLeave: 2,
        medicalRequests: 5,
        nextMedicalTime: "13.30"
};


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
          <p className="increase">+{dashboardStats.studentIncrease} students more than last day</p>
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
              <span className="status-circle-leave">{dashboardStats.staffAbsent}</span>
            </div>
          </div>
        </div>

        <div className="card medical">
          <div className="card-header">
            <span>Medical request</span>
          </div>
          <img className="card-img" src={images.MedicaReq} alt="Medical Icon" />
          <div className="count-box">{dashboardStats.medicalRequests}</div>
          <p className="next-request">
            Next medical request at <span className="time">{dashboardStats.nextMedicalTime}</span>
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
          <NextPatientCard
            name={nextPatient.name}
            id={nextPatient.id}
            imageUrl={nextPatient.imageUrl}
            onProcess={() => alert('Processing...')}
            onCancel={() => alert('Cancelled')}
          />
        </div>
        <div className="BarChart-wrapper">
          <AttendancebarChart attendanceData={weeklyData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
