import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';
import './Reports.css';
import images from '../../../assets/images';
import { toast } from 'react-hot-toast';
import Loadinganimate from '../../../components/LoadingAnimation/Loadinganimate';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ff4d4d', '#4db8ff'];

const Reports = () => {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    TotalStudents: 0,
    TotalMedicalRequests: 0,
    TotalPrescriptions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('http://localhost:5000/doctor/reports', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',

          }
        });

        const data = await res.json();
        if (data.success) {
          setChartData(data.data.chartData || []);
          setStats(data.data.cards || {});
          toast.success("Reports loaded successfully");
        } else {
          toast.error(data.message || "Failed to load reports");
        }
      } catch (error) {
        toast.error("Error fetching reports");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div><Loadinganimate /></div>;
  }

  return (
    <div className="medical-dashboard">
      {/* Main Content */}
      <div className="dashboard-content">
        {/* Bar Chart Section */}
        <div className="chart-section">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        {/* Statistics Cards */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-content">
              <h3>Total Students</h3>
              <div className="stat-number">{stats.TotalStudents}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h3>Medical Requests</h3>
              <div className="stat-number">{stats.TotalMedicalRequests}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h3>Total Medicals</h3>
              <div className="stat-number">{stats.TotalPrescriptions}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
