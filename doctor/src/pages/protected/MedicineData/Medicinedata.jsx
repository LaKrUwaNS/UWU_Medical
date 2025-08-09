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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicines, setMedicines] = useState(medicineList);
    const [formData, setFormData] = useState({
        name: '',
        status: 'Have',
        expire: '',
        id: '',
        quantity: ''
    });

    // Filtered medicine list based on search term
    const filteredMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (formData.name && formData.expire && formData.id && formData.quantity) {
            setMedicines(prev => [...prev, formData]);
            setFormData({
                name: '',
                status: 'Have',
                expire: '',
                id: '',
                quantity: ''
            });
            setIsModalOpen(false);
        } else {
            alert('Please fill in all required fields');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            name: '',
            status: 'Have',
            expire: '',
            id: '',
            quantity: ''
        });
    };

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
                    <button 
                        className='add-button'
                        onClick={() => setIsModalOpen(true)}
                    >
                        New Add
                    </button>

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

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h3>Add New Medicine</h3>
                            <button className="close-button" onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            {/* Drug Name */}
                            <div className="form-group">
                                <label>Drug Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter drug name"
                                    className="form-input"
                                />
                            </div>

                            {/* Status */}
                            <div className="form-group">
                                <label>Status *</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="Have">Have</option>
                                    <option value="Low">Low</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Expire Date */}
                            <div className="form-group">
                                <label>Expire Date *</label>
                                <input
                                    type="date"
                                    name="expire"
                                    value={formData.expire}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            {/* Inventory ID */}
                            <div className="form-group">
                                <label>Inventory ID *</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleInputChange}
                                    placeholder="e.g., F2256"
                                    className="form-input"
                                />
                            </div>

                            {/* Quantity */}
                            <div className="form-group">
                                <label>Quantity *</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 10 bottles"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer">
                            <button className="cancel-button" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="submit-button" onClick={handleSubmit}>
                                Add Medicine
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MedicineData;