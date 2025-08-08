import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Plus, FileText, Calendar, User, Stethoscope, Bell, Users } from 'lucide-react';
import './MedicalReports.css';

const MedicalReports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      student: 'Ethan Carter',
      doctor: 'Dr. Olivia Bennett',
      reportType: 'General Checkup',
      date: '2024-07-20',
      diagnosis: 'Overall health is good. Blood pressure normal, heart rate steady.',
      symptoms: 'No significant symptoms reported',
      treatment: 'Continue regular exercise and balanced diet',
      notes: 'Patient appears healthy. Recommend annual checkup.',
      medications: 'None prescribed'
    },
    {
      id: 2,
      student: 'Sophia Clark',
      doctor: 'Dr. Liam Harris',
      reportType: 'Allergy Test',
      date: '2024-07-18',
      diagnosis: 'Mild seasonal allergies detected. Positive for pollen sensitivity.',
      symptoms: 'Sneezing, runny nose, watery eyes during spring season',
      treatment: 'Antihistamine medication, avoid outdoor activities during high pollen days',
      notes: 'Patient should monitor symptoms and return if condition worsens.',
      medications: 'Cetirizine 10mg daily during allergy season'
    },
    {
      id: 3,
      student: 'Noah Turner',
      doctor: 'Dr. Ava Morgan',
      reportType: 'Physical Therapy',
      date: '2024-07-15',
      diagnosis: 'Lower back strain from sports activity. Muscle tension in lumbar region.',
      symptoms: 'Lower back pain, stiffness, difficulty bending',
      treatment: 'Physical therapy sessions, stretching exercises, heat therapy',
      notes: 'Progress is good. Continue therapy for 2 more weeks.',
      medications: 'Ibuprofen 400mg as needed for pain'
    },
    {
      id: 4,
      student: 'Isabella Reed',
      doctor: 'Dr. Owen Foster',
      reportType: 'Vaccination',
      date: '2024-07-12',
      diagnosis: 'Routine vaccination completed successfully.',
      symptoms: 'None',
      treatment: 'Hepatitis B vaccine administered',
      notes: 'No adverse reactions. Patient tolerated vaccination well.',
      medications: 'None required'
    },
    {
      id: 5,
      student: 'Jackson Hayes',
      doctor: 'Dr. Chloe Walker',
      reportType: 'Blood Test',
      date: '2024-07-10',
      diagnosis: 'Blood work shows slightly elevated cholesterol levels.',
      symptoms: 'No symptoms, routine screening',
      treatment: 'Dietary modifications, increase exercise, follow-up in 3 months',
      notes: 'Patient advised on dietary changes. Schedule follow-up blood work.',
      medications: 'None prescribed, lifestyle changes recommended'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('');
  const [studentFilter, setStudentFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [newReport, setNewReport] = useState({
    student: '',
    doctor: '',
    reportType: '',
    date: ''
  });

  const reportTypes = ['All', 'General Checkup', 'Allergy Test', 'Physical Therapy', 'Vaccination', 'Blood Test', 'X-Ray', 'Mental Health'];
  const dateRanges = ['All Time', 'Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months'];
  const doctors = ['Dr. Olivia Bennett', 'Dr. Liam Harris', 'Dr. Ava Morgan', 'Dr. Owen Foster', 'Dr. Chloe Walker'];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReportType = reportTypeFilter === '' || reportTypeFilter === 'All' || 
                             report.reportType === reportTypeFilter;
    const matchesStudent = studentFilter === '' || studentFilter === 'All' || 
                          report.student === studentFilter;
    return matchesSearch && matchesReportType && matchesStudent;
  });

  const getReportTypeIcon = (type) => {
    const icons = {
      'General Checkup': <Stethoscope size={16} />,
      'Allergy Test': <FileText size={16} />,
      'Physical Therapy': <User size={16} />,
      'Vaccination': <FileText size={16} />,
      'Blood Test': <FileText size={16} />,
      'X-Ray': <FileText size={16} />,
      'Mental Health': <User size={16} />
    };
    return icons[type] || <FileText size={16} />;
  };

  const getReportTypeColor = (type) => {
    const colors = {
      'General Checkup': '#10b981',
      'Allergy Test': '#f59e0b',
      'Physical Therapy': '#3b82f6',
      'Vaccination': '#8b5cf6',
      'Blood Test': '#ef4444',
      'X-Ray': '#6b7280',
      'Mental Health': '#ec4899'
    };
    return colors[type] || '#6b7280';
  };

  const handleViewReport = (report) => {
    setViewingReport(report);
    setShowViewModal(true);
  };

  const handleAddReport = () => {
    if (newReport.student && newReport.doctor && newReport.reportType && newReport.date) {
      const report = {
        id: Date.now(),
        ...newReport,
        diagnosis: '',
        symptoms: '',
        treatment: '',
        notes: '',
        medications: ''
      };
      setReports([...reports, report]);
      setNewReport({ student: '', doctor: '', reportType: '', date: '' });
      setShowAddModal(false);
    }
  };

  const handleEditReport = (report) => {
    setEditingReport(report);
    setNewReport(report);
    setShowAddModal(true);
  };

  const handleUpdateReport = () => {
    setReports(reports.map(r => 
      r.id === editingReport.id ? newReport : r
    ));
    setEditingReport(null);
    setNewReport({ student: '', doctor: '', reportType: '', date: '' });
    setShowAddModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const uniqueStudents = ['All', ...new Set(reports.map(r => r.student))];

  return (
    <div className="medical-reports-container">
   

      <div className="main-content">
        <div className="page-header">
          <div className="header-content">
            <h1>Medical Reports</h1>
            <p className="page-description">View and manage patient medical reports and documentation</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <FileText className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{reports.length}</span>
                <span className="stat-label">Total Reports</span>
              </div>
            </div>
            <div className="stat-card">
              <Calendar className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{reports.filter(r => {
                  const today = new Date();
                  const reportDate = new Date(r.date);
                  const diffTime = Math.abs(today - reportDate);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}</span>
                <span className="stat-label">This Week</span>
              </div>
            </div>
            <div className="stat-card">
              <Stethoscope className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{new Set(reports.map(r => r.doctor)).size}</span>
                <span className="stat-label">Doctors</span>
              </div>
            </div>
          </div>
        </div>

        <div className="search-section">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by student name, doctor, or report type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-section">
          <div className="filters">
            <div className="filter-group">
              <label>Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                {dateRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Report Type</label>
              <select
                value={reportTypeFilter}
                onChange={(e) => setReportTypeFilter(e.target.value)}
              >
                {reportTypes.map(type => (
                  <option key={type} value={type === 'All' ? '' : type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Student</label>
              <select
                value={studentFilter}
                onChange={(e) => setStudentFilter(e.target.value)}
              >
                {uniqueStudents.map(student => (
                  <option key={student} value={student === 'All' ? '' : student}>{student}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="action-buttons">
           
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              <Plus size={18} />
              New Report
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Doctor</th>
                <th>Report Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report.id} className="table-row">
                  <td>
                    <div className="student-info">
                      <div className="student-avatar">
                        {report.student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="student-name">{report.student}</span>
                    </div>
                  </td>
                  <td>
                    <div className="doctor-info">
                      <Stethoscope className="doctor-icon" />
                      <span className="doctor-name">{report.doctor}</span>
                    </div>
                  </td>
                  <td>
                    <div className="report-type-container">
                      <span 
                        className="report-type-badge" 
                        style={{
                          backgroundColor: `${getReportTypeColor(report.reportType)}15`, 
                          color: getReportTypeColor(report.reportType)
                        }}
                      >
                        {getReportTypeIcon(report.reportType)}
                        {report.reportType}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="date-info">
                      <Calendar size={16} className="date-icon" />
                      <span>{formatDate(report.date)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons-cell">
                      <button 
                        className="btn-icon view" 
                        onClick={() => handleViewReport(report)}
                        title="View report"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="btn-icon edit" 
                        onClick={() => handleEditReport(report)}
                        title="Edit report"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn-icon download" 
                        title="Download report"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="empty-state">
            <FileText size={48} />
            <h3>No reports found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* View Report Modal */}
      {showViewModal && viewingReport && (
        <div className="modal-overlay" onClick={() => {
          setShowViewModal(false);
          setViewingReport(null);
        }}>
          <div className="modal report-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="report-header-info">
                <h2>Medical Report</h2>
                <div className="report-meta">
                  <span className="report-id">Report ID: #{viewingReport.id}</span>
                  <span className="report-date">{formatDate(viewingReport.date)}</span>
                </div>
              </div>
            </div>
            <div className="modal-body report-body">
              <div className="report-section">
                <div className="patient-doctor-info">
                  <div className="info-card">
                    <h4>Patient Information</h4>
                    <div className="info-item">
                      <User size={16} />
                      <span>{viewingReport.student}</span>
                    </div>
                  </div>
                  <div className="info-card">
                    <h4>Doctor Information</h4>
                    <div className="info-item">
                      <Stethoscope size={16} />
                      <span>{viewingReport.doctor}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="report-section">
                <h4>Report Type</h4>
                <div className="report-type-display">
                  <span 
                    className="report-type-badge large" 
                    style={{
                      backgroundColor: `${getReportTypeColor(viewingReport.reportType)}15`, 
                      color: getReportTypeColor(viewingReport.reportType)
                    }}
                  >
                    {getReportTypeIcon(viewingReport.reportType)}
                    {viewingReport.reportType}
                  </span>
                </div>
              </div>

              <div className="report-section">
                <h4>Diagnosis</h4>
                <p className="report-content">{viewingReport.diagnosis}</p>
              </div>

              <div className="report-section">
                <h4>Reported Symptoms</h4>
                <p className="report-content">{viewingReport.symptoms}</p>
              </div>

              <div className="report-section">
                <h4>Treatment Plan</h4>
                <p className="report-content">{viewingReport.treatment}</p>
              </div>

              <div className="report-section">
                <h4>Medications</h4>
                <p className="report-content">{viewingReport.medications}</p>
              </div>

              <div className="report-section">
                <h4>Additional Notes</h4>
                <p className="report-content">{viewingReport.notes}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setShowViewModal(false);
                  setViewingReport(null);
                }}
              >
                Close
              </button>
              <button className="btn-primary">
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Report Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => {
          setShowAddModal(false);
          setEditingReport(null);
          setNewReport({ student: '', doctor: '', reportType: '', date: '' });
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingReport ? 'Edit Report' : 'New Medical Report'}</h2>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  value={newReport.student}
                  onChange={(e) => setNewReport({...newReport, student: e.target.value})}
                  placeholder="Enter student name"
                />
              </div>
              <div className="form-group">
                <label>Doctor</label>
                <select
                  value={newReport.doctor}
                  onChange={(e) => setNewReport({...newReport, doctor: e.target.value})}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Report Type</label>
                <select
                  value={newReport.reportType}
                  onChange={(e) => setNewReport({...newReport, reportType: e.target.value})}
                >
                  <option value="">Select Report Type</option>
                  {reportTypes.filter(type => type !== 'All').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newReport.date}
                  onChange={(e) => setNewReport({...newReport, date: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setShowAddModal(false);
                  setEditingReport(null);
                  setNewReport({ student: '', doctor: '', reportType: '', date: '' });
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={editingReport ? handleUpdateReport : handleAddReport}
              >
                {editingReport ? 'Update' : 'Create'} Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalReports;