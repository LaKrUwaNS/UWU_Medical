import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './BarChart.css';

const data = [
    { day: 'Mon', patients: 1 },
    { day: 'Tue', patients: 4 },
    { day: 'Wed', patients: 3 },
    { day: 'Thu', patients: 6 },
    { day: 'Fri', patients: 7 },
    { day: 'Sat', patients: 1 },
    { day: 'Sun', patients: 0 },
];

const AttendancebarChart = () => {
    return (
        <div className="bar-chart-container">
            <h3 className="chart-title">Attendance Summary</h3>
            <BarChart width={500} height={120} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#4caf50" radius={[6, 6, 0, 0]} />
            </BarChart>
        </div>
    );
};

export default AttendancebarChart;
