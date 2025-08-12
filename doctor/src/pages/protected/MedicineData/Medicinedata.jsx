import React, { useState, useEffect } from 'react';
import './MedicineData.css';
import { Toaster, toast } from 'react-hot-toast';

const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
        case 'have': return 'status-badge green';
        case 'low': return 'status-badge yellow';
        case 'no': return 'status-badge red';
        default: return 'status-badge';
    }
};

function MedicineData() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState(null);
    const [inventoryId, setInventoryId] = useState('');
    const [inventoryList, setInventoryList] = useState([]);

    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        status: 'Have',
        expire: '',
        id: '',
        quantity: ''
    });

    const [originalData, setOriginalData] = useState(null);

    const fetchMedicines = async () => {
        try {
            const res = await fetch('http://localhost:5000/doctor/medicine', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            if (data.success) {
                const formattedData = data.data.map(med => ({
                    _id: med._id,
                    name: med.medicineName,
                    status: med.status,
                    expire: med.expirationDate?.split('T')[0] || '',
                    id: med.inventoryKey,
                    quantity: med.quantity,
                    inventoryId: med.inventoryId || ''
                }));
                setMedicines(formattedData);
            } else {
                console.error('Failed to fetch medicines:', data.message);
            }
        } catch (error) {
            console.error('Error fetching medicines:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchInventoryData = async () => {
        try {
            const res = await fetch('http://localhost:5000/doctor/inventory', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setInventoryList(data.data);
            } else {
                console.error('Failed to fetch inventory:', data.message);
            }
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    useEffect(() => {
        fetchMedicines();
        fetchInventoryData();
    }, []);

    const filteredMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'id') {
            setFormData(prev => ({ ...prev, id: value }));

            const selectedInventory = inventoryList.find(inv => inv.inventoryKey === value);
            setInventoryId(selectedInventory ? selectedInventory._id : '');
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.expire || !formData.id || formData.quantity === '') {
            toast.error('Please fill in all required fields');
            return;
        }

        if (!inventoryId) {
            toast.error('Please select a valid Inventory ID');
            return;
        }

        const normalizedStatus = formData.status.trim();

        // Build payload with only changed fields if editing
        let payload = {};
        if (editingIndex !== null && originalData) {
            if (formData.name.trim() !== originalData.name) payload.medicineName = formData.name.trim();
            if (normalizedStatus !== originalData.status) payload.status = normalizedStatus;
            if (Number(formData.quantity) !== originalData.quantity) payload.quantity = Number(formData.quantity);
            if (formData.id.trim() !== originalData.id) payload.inventoryKey = formData.id.trim();
            if (formData.expire !== originalData.expire) payload.expirationDate = new Date(formData.expire).toISOString();
            if (inventoryId !== originalData.inventoryId) payload.inventoryId = inventoryId;

            if (Object.keys(payload).length === 0) {
                toast.error('No changes detected to update.');
                return;
            }
        } else {
            // For new medicine add all data
            payload = {
                medicineName: formData.name.trim(),
                status: normalizedStatus,
                quantity: Number(formData.quantity),
                inventoryKey: formData.id.trim(),
                expirationDate: new Date(formData.expire).toISOString(),
                inventoryId: inventoryId
            };
        }

        try {
            let url = 'http://localhost:5000/doctor/adding-new-medicine';
            let method = 'POST';

            if (editingIndex !== null) {
                url = `http://localhost:5000/doctor/updating-medicine/${formData._id}`;
                method = 'PUT';
            }

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });

            const text = await res.text();
            console.log('Response status:', res.status);
            console.log('Response text:', text);

            if (!res.ok) {
                toast.error(`Error ${res.status}: ${text}`);
                return;
            }

            const data = JSON.parse(text);

            if (data.success) {
                fetchMedicines();
                resetForm();
                toast.success(editingIndex !== null ? 'Medicine updated successfully!' : 'Medicine added successfully!')
            } else {
                toast.error(data.message || 'Operation failed.');
            }
        } catch (error) {
            console.error('Error saving medicine:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    const handleEdit = (index) => {
        const med = medicines[index];
        setFormData(med);
        setOriginalData(med);
        setEditingIndex(index);
        setIsModalOpen(true);

        const selectedInventory = inventoryList.find(inv => inv.inventoryKey === med.id);
        setInventoryId(selectedInventory ? selectedInventory._id : '');
    };

    const handleDelete = async (index) => {
        const medId = medicines[index]._id;
        if (window.confirm('Are you sure you want to delete this medicine?')) {
            try {
                const res = await fetch(`http://localhost:5000/doctor/deleting-medicine/${medId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    fetchMedicines();
                    toast.success('Medicine deleted successfully!');
                } else {
                    toast.error(data.message || 'Failed to delete medicine.');
                }
            } catch (error) {
                console.error('Error deleting medicine:', error);
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            name: '',
            status: 'Have',
            expire: '',
            id: '',
            quantity: ''
        });
        setEditingIndex(null);
        setInventoryId('');
        setOriginalData(null);
        setIsModalOpen(false);
    };

    return (
        <div className='medicine-page'>
            <Toaster position="top-center" reverseOrder={false} />
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
                </div>
            </div>

            <div className="table-container">
                {loading ? (
                    <p>Loading medicine data...</p>
                ) : (
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
                                filteredMedicines.map((med) => (
                                    <tr key={med._id}>
                                        <td>{med.name}</td>
                                        <td><span className={getStatusClass(med.status)}>{med.status}</span></td>
                                        <td>{med.expire}</td>
                                        <td>{med.id}</td>
                                        <td>{med.quantity}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="edit-btn" onClick={() => handleEdit(medicines.findIndex(m => m._id === med._id))}>✏️</button>
                                                <button className="medicine-delete-btn" et onClick={() => handleDelete(medicines.findIndex(m => m._id === med._id))}>🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
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
                                <select
                                    name="id"
                                    value={formData.id}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="">Select Inventory ID</option>
                                    {inventoryList.map((inv) => (
                                        <option key={inv._id} value={inv.inventoryKey}>
                                            {inv.inventoryKey}
                                        </option>
                                    ))}
                                </select>
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
                                    min={0}
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
