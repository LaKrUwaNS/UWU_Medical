import React from 'react';
import {PieChart,Pie,Cell,Legend} from 'recharts';
import './DonutChart.css';


const data = [
    { name: 'ICT', value: 5 },
    { name: 'ET', value: 4 },
    { name: 'ENM', value: 6 },
    { name: 'AQT', value: 3 },
    
];
const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042'];

const DonutChart = () =>{
    return(
        <div className="donut-chart-container">
            <h3 className='chart-title'>Patient Departments</h3>
            <PieChart width={400} height={200}>
                <Pie
                    data ={data}
                    cx='50%'
                    cy='50%'
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    >
                        {data.map((entry,index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign='bottom' height={26} />
            </PieChart>
        </div>
    );

};

export default DonutChart;
