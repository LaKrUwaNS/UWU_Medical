import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import './DonutChart.css';

const DonutChart = ({ patientData }) => {
    const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

    return (
        <div className="donut-chart-container">
            <h3 className="chart-title">Patient Departments</h3>
            <PieChart width={400} height={200}>
                <Pie
                    data={patientData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                >
                    {patientData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend verticalAlign="bottom" height={26} />
            </PieChart>
        </div>
    );
};

export default DonutChart;
