import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';
import './Reports.css';

const chartData = [
  { name: 'Technology', value: 30 },
  { name: 'Animal Science', value: 20 },
  { name: 'Applied Science', value: 25 },
  { name: 'Medicine', value: 15 },
  { name: 'Management', value: 10 },
];

// Different color for each bar
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f'];

const Reports = () => {
  return (
    <div className="medical-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="user-info">
          <span>Dr. Lakruwan Sharaka</span>
          <div className="user-avatar">👨‍⚕️</div>
        </div>
      </div>

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
              <div className="stat-number">250</div>
              <div className="stat-chart">
                <div className="mini-bar" style={{height: '60%'}}></div>
                <div className="mini-bar" style={{height: '80%'}}></div>
                <div className="mini-bar" style={{height: '40%'}}></div>
                <div className="mini-bar" style={{height: '90%'}}></div>
                <div className="mini-bar" style={{height: '70%'}}></div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h3>Medical Requests</h3>
              <div className="stat-number">10</div>
              <div className="stat-chart">
                <div className="mini-bar" style={{height: '30%'}}></div>
                <div className="mini-bar" style={{height: '50%'}}></div>
                <div className="mini-bar" style={{height: '70%'}}></div>
                <div className="mini-bar" style={{height: '40%'}}></div>
                <div className="mini-bar" style={{height: '60%'}}></div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h3>Total Medicals</h3>
              <div className="stat-number">50</div>
              <div className="stat-chart">
                <div className="mini-bar" style={{height: '80%'}}></div>
                <div className="mini-bar" style={{height: '60%'}}></div>
                <div className="mini-bar" style={{height: '90%'}}></div>
                <div className="mini-bar" style={{height: '50%'}}></div>
                <div className="mini-bar" style={{height: '70%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
