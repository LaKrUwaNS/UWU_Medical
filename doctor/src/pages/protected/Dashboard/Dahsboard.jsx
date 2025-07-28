import React from "react";
import './Dashboard.css';
import images from "../../../assets/images";
import UserProfile from '../../../components/UserProfile/UseraProfile';
import NextPatientCard from '../../../components/NextPatientCard/NextPatientCard';
import StudentDataCard from '../../../components/StudentDataCard/StudentDataCard';
import DonutChart from '../../../components/DonutChart/DonutChart';
import BarChart from '../../../components/BarChart/Barchart';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Top Header */}
      <header className="dashboard-header">
        <h2>Daily Data</h2>
        <div className="search-section">
          <input type="text" placeholder="Search About Student" />
          <button><img className="search-icon" src={images.search} alt="search-icon" /></button>
        </div>
        <UserProfile />
      </header>

      {/* Top Cards */}
      <div className="dashboard-cards">
        <div className="card student">
          <div className="card-header">
            <span>Student Count</span>
          </div>
          <img className="card-img" src={images.studentImage} alt="Student Icon" />
          <div className="count-box">20</div>
          <p className="increase">+5 students more than last day</p>
        </div>

        <div className="card staff">
          <div className="card-header">
            <span>Staff Today</span>
          </div>
          <img className="card-img" src={images.staffImage} alt="Staff Icon" />
          <div className="count-box">2</div>
          <div className="status-row-labels">
            
            
            <div className="absent-sec">
              <span>Absent</span>
              <span className="status-circle-absent">1</span>

            </div>
            <div className="leave-sec">
              <span>Leave</span>
               <span className="status-circle-leave">2</span>

            </div>
          </div>
          
            
           
         
        </div>

        <div className="card medical">
          <div className="card-header">
            <span>Medical request</span>
          </div>
          <img className="card-img" src={images.MedicaReq} alt="Medical Icon" />
          <div className="count-box">5</div>
          <p className="next-request">
            Next medical request at <span className="time">13.30</span>
          </p>
        </div>
      </div>

      {/* Row: Student Data + Donut Chart */}
      <div className="dashboard-row">
        <StudentDataCard />
        <DonutChart />
      </div>

      {/* Row: Next Patient + Bar Chart */}
      <div className="dashboard-row">
          <div className="next-patient-wrapper">
            
              <NextPatientCard
                name="Lakruwan Sharaka"
                id="UWU/ICT/22/XX"
                imageUrl={images.lakruwan}
                onProcess={() => alert('Processing...')}
                onCancel={() => alert('Cancelled')}
              />
        </div>
        <div className="BarChart-wrapper">
        <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
