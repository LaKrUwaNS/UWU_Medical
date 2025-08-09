import React, { useState } from 'react';
import { Calendar, Clock, Search, Filter, Plus, Edit, Check, X, Eye, Users, BarChart } from 'lucide-react';
import './AppointmentRequests.css';

const AppointmentRequests = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      studentName: 'Dilan Senanayake',
      requestDate: '2024-07-20',
      reason: 'Flu symptoms',
      status: 'Pending'
    },
    {
      id: 2,
      studentName: 'Anura Kumara',
      requestDate: '2024-07-18',
      reason: 'Routine checkup',
      status: 'Scheduled'
    },
    {
      id: 3,
      studentName: 'Kolitha Rajapaksha',
      requestDate: '2024-07-15',
      reason: 'Sports injury',
      status: 'Completed'
    },
    {
      id: 4,
      studentName: 'Malshi Perera',
      requestDate: '2024-07-12',
      reason: 'Allergies',
      status: 'Pending'
    },
    {
      id: 5,
      studentName: 'Harith Dissanayake',
      requestDate: '2024-07-10',
      reason: 'Vaccination',
      status: 'Scheduled'
    }
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    studentName: '',
    requestDate: '',
    reason: '',
    status: 'Pending'
  });

  const tabs = ['All', 'Pending', 'Scheduled', 'Completed'];
  const reasons = ['Flu symptoms', 'Routine checkup', 'Sports injury', 'Allergies', 'Vaccination', 'Mental health', 'Other'];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || appointment.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusStats = () => {
    return {
      total: appointments.length,
      pending: appointments.filter(a => a.status === 'Pending').length,
      scheduled: appointments.filter(a => a.status === 'Scheduled').length,
      completed: appointments.filter(a => a.status === 'Completed').length
    };
  };

  const stats = getStatusStats();

  const handleAddAppointment = () => {
    if (newAppointment.studentName && newAppointment.requestDate && newAppointment.reason) {
      const appointment = {
        id: Date.now(),
        ...newAppointment
      };
      setAppointments([...appointments, appointment]);
      setNewAppointment({ studentName: '', requestDate: '', reason: '', status: 'Pending' });
      setShowAddModal(false);
    }
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setNewAppointment(appointment);
    setShowAddModal(true);
  };

  const handleUpdateAppointment = () => {
    setAppointments(appointments.map(a => 
      a.id === editingAppointment.id ? newAppointment : a
    ));
    setEditingAppointment(null);
    setNewAppointment({ studentName: '', requestDate: '', reason: '', status: 'Pending' });
    setShowAddModal(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status: newStatus } : a
    ));
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#f59e0b',
      'Scheduled': '#10b981',
      'Completed': '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock size={16} />;
      case 'Scheduled': return <Calendar size={16} />;
      case 'Completed': return <Check size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="appointments-container">
    

      <div className="main-content">
        <div className="page-header">
          <h1>Appointment Requests</h1>
          <div className="header-stats">
            <div className="stat-card">
              <BarChart className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Total Requests</span>
              </div>
            </div>
            <div className="stat-card pending">
              <Clock className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{stats.pending}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
            <div className="stat-card scheduled">
              <Calendar className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{stats.scheduled}</span>
                <span className="stat-label">Scheduled</span>
              </div>
            </div>
            <div className="stat-card completed">
              <Check className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{stats.completed}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                <span className="tab-count">
                  {tab === 'All' ? stats.total : stats[tab.toLowerCase()] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="controls">
          <div className="search-filter">
            <div className="search-box-AR">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search appointments, student names, or reasons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
         
        </div>

        <div className="table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Request Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id} className="table-row">
                  <td>
                    <div className="student-info">
                      <div className="student-avatar">
                        {appointment.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="student-name">{appointment.studentName}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-info">
                      <Calendar size={16} className="date-icon" />
                      <span>{formatDate(appointment.requestDate)}</span>
                    </div>
                  </td>
                  <td>
                    <span className="reason-tag">{appointment.reason}</span>
                  </td>
                  <td>
                    <div className="status-container">
                      <span 
                        className="status-badge" 
                        style={{
                          backgroundColor: `${getStatusColor(appointment.status)}15`, 
                          color: getStatusColor(appointment.status)
                        }}
                      >
                        {getStatusIcon(appointment.status)}
                        {appointment.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons-cell">
                      <button 
                        className="btn-icon view" 
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="btn-icon edit" 
                        onClick={() => handleEditAppointment(appointment)}
                        title="Edit appointment"
                      >
                        <Edit size={16} />
                      </button>
                      {appointment.status === 'Pending' && (
                        <>
                          <button 
                            className="btn-icon approve" 
                            onClick={() => handleStatusChange(appointment.id, 'Scheduled')}
                            title="Schedule appointment"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            className="btn-icon reject" 
                            onClick={() => handleStatusChange(appointment.id, 'Completed')}
                            title="Mark as completed"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      {appointment.status === 'Scheduled' && (
                        <button 
                          className="btn-icon complete" 
                          onClick={() => handleStatusChange(appointment.id, 'Completed')}
                          title="Mark as completed"
                        >
                          <Check size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="empty-state">
            <Calendar size={48} />
            <h3>No appointments found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => {
          setShowAddModal(false);
          setEditingAppointment(null);
          setNewAppointment({ studentName: '', requestDate: '', reason: '', status: 'Pending' });
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingAppointment ? 'Edit Appointment' : 'New Appointment Request'}</h2>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  value={newAppointment.studentName}
                  onChange={(e) => setNewAppointment({...newAppointment, studentName: e.target.value})}
                  placeholder="Enter student name"
                />
              </div>
              <div className="form-group">
                <label>Request Date</label>
                <input
                  type="date"
                  value={newAppointment.requestDate}
                  onChange={(e) => setNewAppointment({...newAppointment, requestDate: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Reason</label>
                <select
                  value={newAppointment.reason}
                  onChange={(e) => setNewAppointment({...newAppointment, reason: e.target.value})}
                >
                  <option value="">Select Reason</option>
                  {reasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newAppointment.status}
                  onChange={(e) => setNewAppointment({...newAppointment, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setShowAddModal(false);
                  setEditingAppointment(null);
                  setNewAppointment({ studentName: '', requestDate: '', reason: '', status: 'Pending' });
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={editingAppointment ? handleUpdateAppointment : handleAddAppointment}
              >
                {editingAppointment ? 'Update' : 'Create'} Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentRequests;