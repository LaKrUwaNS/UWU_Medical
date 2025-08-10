import React, { useState, useEffect } from 'react';
import './MedicineData.css';
import images from '../../../assets/images';
import UserProfile from '../../../components/UserProfile/UseraProfile';

const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
        case 'in stock':
            return 'status-badge green';
        case 'low stock':
            return 'status-badge yellow';
        case 'out of stock':
            return 'status-badge red';
        default:
            return 'status-badge';
    }
};

function MedicineData() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        status: 'in stock',
        expire: '',
        id: '',
        quantity: ''
    });

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch('http://localhost:5000/medicine-list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // If your API requires authentication, add the token here, for example:
                        // 'Authorization': `Bearer YOUR_TOKEN_HERE`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                if (data.success) {
                    // Map the backend data to your frontend format
                    const mappedMedicines = data.data.map(med => ({
                        _id: med._id,
                        name: med.medicineName,
                        status: med.status,
                        expire: med.expirationDate ? med.expirationDate.slice(0, 10) : '',
                        id: med.inventoryKey || (med.inventoryId ? med.inventoryId.inventoryKey : ''),
                        quantity: med.quantity.toString(),
                    }));

                    setMedicines(mappedMedicines);
                } else {
                    setError('Failed to load medicines');
                }
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, []);

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
                status: 'in stock',
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
            status: 'in stock',
            expire: '',
            id: '',
            quantity: ''
        });
    };

    if (loading) return <div>Loading medicines...</div>;
    if (error) return <div>Error: {error}</div>;

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
                            filteredMedicines.map((med) => (
                                <tr key={med._id}>
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
                        <div className="modal-header">
                            <h3>Add New Medicine</h3>
                            <button className="close-button" onClick={closeModal}>
                                ×
                            </button>
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
                                    <option value="in stock">Have</option>
                                    <option value="low stock">Low</option>
                                    <option value="out of stock">No</option>
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
                                    placeholder="e.g., INV-001"
                                    className="form-input"
                                />
                            </div>

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
