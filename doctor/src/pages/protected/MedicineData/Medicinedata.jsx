import React, { useState } from 'react';
import './MedicineData.css';
import images from '../../../assets/images';
import UserProfile from '../../../components/UserProfile/UseraProfile';

const medicineList = [
    { name: 'Paracetamol', status: 'Have', expire: '2025-05-24', id: 'F2256', quantity: 10 },
    { name: 'Ibuprofen', status: 'Low', expire: '2025-07-10', id: 'F2257', quantity: 5 },
    { name: 'Amoxicillin', status: 'No', expire: '2025-03-15', id: 'F2258', quantity: 0 },
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
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        status: 'Have',
        expire: '',
        id: '',
        quantity: ''
    });

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
        if (formData.name && formData.expire && formData.id && formData.quantity !== '') {
            if (editingIndex !== null) {
                const updatedMedicines = medicines.map((med, index) =>
                    index === editingIndex ? formData : med
                );
                setMedicines(updatedMedicines);
                setEditingIndex(null);
            } else {
                setMedicines(prev => [...prev, formData]);
            }
            resetForm();
        } else {
            alert('Please fill in all required fields');
        }
    };

    const handleEdit = (index) => {
        setFormData(medicines[index]);
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleDelete = (index) => {
        if (window.confirm('Are you sure you want to delete this medicine?')) {
            const updatedMedicines = medicines.filter((_, i) => i !== index);
            setMedicines(updatedMedicines);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            status: 'Have',
            expire: '',
            id: '',
            quantity: ''
        });
        setIsModalOpen(false);
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
                    <button className='add-button' onClick={() => setIsModalOpen(true)}>New Add</button>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMedicines.length === 0 ? (
                            <tr>
                                <td colSpan='6' className='no-data-message'>
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
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-btn" onClick={() => handleEdit(idx)} title="Edit Medicine">✏️</button>
                                            <button className="delete-btn" onClick={() => handleDelete(idx)} title="Delete Medicine">🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingIndex !== null ? 'Edit Medicine' : 'Add New Medicine'}</h3>
                            <button className="close-button" onClick={resetForm}>×</button>
                        </div>
                        <div className="modal-body">
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
                            <div className="form-group">
                                <label>Quantity *</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 10"
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-button" onClick={resetForm}>Cancel</button>
                            <button className="submit-button" onClick={handleSubmit}>
                                {editingIndex !== null ? 'Update Medicine' : 'Add Medicine'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MedicineData;
