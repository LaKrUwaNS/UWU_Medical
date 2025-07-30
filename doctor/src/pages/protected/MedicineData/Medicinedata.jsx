import React from 'react';
import './MedicineData.css'
import medicineList from '../../../Data/medicineList';
import Doctorimg1 from '../../../assets/DoctorInfo/Lakruwan.jpg';

    const getStatusClass = (status) => {
        switch (status) {
            case 'Have': return 'status-badge green';
            case 'Low' : return 'status-badge yellow';
            case 'No': return 'status-badge red';
            default:return 'status-badge';
        }
    };

function MedicineData() {

    
  return (
    <div className='medicine-page'>
        <div className="top-header">
            <h2>Medicine Data</h2>

            <div className="top-actions">
                <input type="text" placeholder='Search About Medicine' className='search-bar' />
                <button className='add-button'>New Add</button>

                <div className="doctor-profile">
                    <img src={Doctorimg1} alt="Doctor" />
                    <span>Dr.Lakruwan Sharaka</span>
                </div>
            </div>

        </div>

        <div className="table-container">
            <table className='medicine-table'>
                <thead>
                    <tr>
                        <th>Drug Name</th>
                        <th>Status</th>
                        <th>Expire Date</th>
                        <th>Inventory ID</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {medicineList.length == 0 ? (
                        <tr>
                            <td colSpan='5' className='no-data-message'>
                                🚫 No medicine data available.
                            </td>
                        </tr>
                    ):(
                    
                     medicineList.map((med,idx) => (
                        <tr key={idx}>
                            <td>{med.name}</td>
                            <td><span className={getStatusClass(med.status)}>{med.status}</span></td>
                            <td>{med.expire}</td>
                            <td>{med.id}</td>
                            <td>{med.quantity}</td>

                        </tr>
                     ))
                    )}
                </tbody>

            </table>

        </div>

    </div>
  );
};

export default MedicineData