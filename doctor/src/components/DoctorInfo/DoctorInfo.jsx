import React from 'react'
import './DoctorInfo.css';
import Doctorimg1 from '../../assets/DoctorInfo/Lakruwan.jpg';

function DoctorInfo() {
  return (
    <div className="doctor-info">
        <img src={Doctorimg1} alt="Doctor" className='doctor-img' />
        <p className='doctor-name'>Dr.Lakruwan</p>
    </div>
  )
}

export default DoctorInfo