import React, { useState } from 'react';
import './MedicineData.css';
import images from '../../../assets/images';
import UserProfile from '../../../components/UserProfile/UseraProfile';

const medicineList = [
    { name: 'Paracetamol', status: 'Have', expire: '2025-05-24', id: 'F2256', quantity: '10 bottles' },
    { name: 'Paracetamol', status: 'Low', expire: '2025-05-24', id: 'F2256', quantity: '10 bottles' },
    { name: 'Vitamin C', status: 'No', expire: '2025-05-24', id: 'F2256', quantity: '10 bottles' },
    { name: 'Paracetamol', status: 'Have', expire: '2025-05-24', id: 'F2257', quantity: '8 bottles' },
    { name: 'Paracetamol', status: 'Have', expire: '2025-05-24', id: 'F2258', quantity: '12 bottles' },
    { name: 'Paracetamol', status: 'Low', expire: '2025-05-24', id: 'F2259', quantity: '4 bottles' },
    { name: 'Jeewani', status: 'No', expire: '2025-05-24', id: 'F2260', quantity: '0 bottles' },
];

const getStatusClass = (status) => {
    switch (status) {
        case 'Have': return 'status-badge green';
        case 'Low': return 'status-badge yellow';
        case 'No': return 'status-badge red';
        default: return 'status-badge';
    }
};

function MedicineData() {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered medicine list based on search term
    const filteredMedicines = medicineList.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='medicine-page'>
            <div className="top-header">
                <h2>Medicine Data</h2>

                <div className="top-actions">
                    <input
                        type="text"
                        placeholder='Search About Medicine'
                        className='search-bar-medicine-data'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='add-button'>New Add</button>

                    <div className="doctor-profile">
                        <UserProfile name="Dr. Lakruwan Sharaka" image={images.lakruwan} />
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
                        {filteredMedicines.length === 0 ? (
                            <tr>
                                <td colSpan='5' className='no-data-message'>
                                    🚫 No medicine data found for "{searchTerm}".
                                </td>
                            </tr>
                        ) : (
                            filteredMedicines.map((med, idx) => (
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
}

export default MedicineData;
