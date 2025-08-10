import React, { useEffect, useState } from 'react';
import { Search, Edit, Trash2, Filter, Users } from 'lucide-react';
import './StudentRecords.css';

const API_BASE = 'http://localhost:5000/staff'; // adjust if needed

const StudentRecords = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    indexNumber: '',
    degree: '',
    presentYear: '',
    contactNumber: '',
  });

  const faculties = [
    'All',
    'Technological Studies',
    'Applied Science',
    'Management',
    'Animal Science and Export Agriculture',
    'Medicine',
  ];

  // Fetch all students from API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/students`);
      const data = await res.json();
      if (data.success) {
        setStudents(data.data.students);
      } else {
        setError('Failed to fetch students');
      }
    } catch (err) {
      setError('Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students based on search and faculty
  const filteredStudents = students.filter((student) => {
    const facultyName = student.degree || ''; // mapping degree to faculty might require adjustment
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.indexNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facultyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFaculty =
      selectedFaculty === '' ||
      selectedFaculty === 'All' ||
      facultyName === selectedFaculty;

    return matchesSearch && matchesFaculty;
  });

  // Open modal to add or edit
  const openModalForEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name || '',
      indexNumber: student.indexNumber || '',
      degree: student.degree || '',
      presentYear: student.presentYear || '',
      contactNumber: student.contactNumber?.join(', ') || '',
    });
    setShowModal(true);
  };

  const openModalForAdd = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      indexNumber: '',
      degree: '',
      presentYear: '',
      contactNumber: '',
    });
    setShowModal(true);
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new student
  const handleAddStudent = async () => {
    try {
      const payload = {
        ...formData,
        presentYear: Number(formData.presentYear),
        contactNumber: formData.contactNumber
          .split(',')
          .map((c) => c.trim())
          .filter((c) => c),
      };

      const res = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        fetchStudents();
        setShowModal(false);
      } else {
        alert('Failed to add student');
      }
    } catch (err) {
      alert('Error adding student');
    }
  };

  // Update existing student
  const handleUpdateStudent = async () => {
    try {
      const payload = {
        ...formData,
        presentYear: Number(formData.presentYear),
        contactNumber: formData.contactNumber
          .split(',')
          .map((c) => c.trim())
          .filter((c) => c),
      };

      const res = await fetch(`${API_BASE}/students/${editingStudent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        fetchStudents();
        setShowModal(false);
        setEditingStudent(null);
      } else {
        alert('Failed to update student');
      }
    } catch (err) {
      alert('Error updating student');
    }
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const res = await fetch(`${API_BASE}/students/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchStudents();
      } else {
        alert('Failed to delete student');
      }
    } catch (err) {
      alert('Error deleting student');
    }
  };

  // Map degree codes to faculty names (if needed)
  const degreeToFaculty = (degree) => {
    // example mapping; update to your own logic if needed
    const map = {
      ICT: 'Technological Studies',
      ASC: 'Applied Science',
      MGT: 'Management',
      ASEA: 'Animal Science and Export Agriculture',
      MED: 'Medicine',
    };
    return map[degree] || degree || 'Unknown';
  };

  // For badge color by faculty
  const getFacultyColor = (faculty) => {
    const colors = {
      'Technological Studies': '#10b981',
      'Applied Science': '#059669',
      Management: '#34d399',
      'Animal Science and Export Agriculture': '#047857',
      Medicine: '#065f46',
    };
    return colors[faculty] || '#6b7280';
  };

  return (
    <div className="student-records-container">
      <div className="main-content">
        <div className="page-header">
          <h1>Student Records</h1>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{students.length}</span>
              <span className="stat-label">Total Students</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {new Set(students.map((s) => degreeToFaculty(s.degree))).size}
              </span>
              <span className="stat-label">Faculties</span>
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="search-filter">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search students, index number, or faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <Filter className="filter-icon" />
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
              >
                {faculties.map((faculty) => (
                  <option key={faculty} value={faculty === 'All' ? '' : faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn-primary"
              onClick={openModalForAdd}
              style={{ marginLeft: 'auto' }}
            >
              Add Student
            </button>
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <p>Loading...</p>
          ) : filteredStudents.length === 0 ? (
            <div className="empty-state">
              <Users size={48} />
              <h3>No students found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <table className="students-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Index No.</th>
                  <th>Faculty</th>
                  <th>Year</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const faculty = degreeToFaculty(student.degree);
                  return (
                    <tr key={student._id} className="table-row">
                      <td>
                        <div className="student-name">
                          <div
                            className="student-avatar"
                            style={{ backgroundColor: getFacultyColor(faculty) }}
                          >
                            {student.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </div>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="index-number">{student.indexNumber}</span>
                      </td>
                      <td>
                        <span
                          className="faculty-badge"
                          style={{
                            backgroundColor: `${getFacultyColor(faculty)}15`,
                            color: getFacultyColor(faculty),
                          }}
                        >
                          {faculty}
                        </span>
                      </td>
                      <td>{student.presentYear || '-'}</td>
                      <td>
                        <span className="contact-number">
                          {student.contactNumber?.join(', ') || '-'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons-cell">
                          <button
                            className="btn-icon edit"
                            onClick={() => openModalForEdit(student)}
                            title="Edit student"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="btn-icon delete"
                            onClick={() => handleDeleteStudent(student._id)}
                            title="Delete student"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowModal(false);
            setEditingStudent(null);
            setFormData({
              name: '',
              indexNumber: '',
              degree: '',
              presentYear: '',
              contactNumber: '',
            });
          }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter student name"
                />
              </div>
              <div className="form-group">
                <label>Index Number</label>
                <input
                  type="text"
                  name="indexNumber"
                  value={formData.indexNumber}
                  onChange={handleFormChange}
                  placeholder="Enter index number (e.g. 2023/ICT/01/001)"
                />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleFormChange}
                  placeholder="Enter degree code (e.g. ICT)"
                />
              </div>
              <div className="form-group">
                <label>Present Year</label>
                <input
                  type="number"
                  name="presentYear"
                  value={formData.presentYear}
                  onChange={handleFormChange}
                  min={1}
                  max={4}
                  placeholder="Enter current study year (1-4)"
                />
              </div>
              <div className="form-group">
                <label>Contact Numbers (comma separated)</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleFormChange}
                  placeholder="Enter contact numbers separated by commas"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowModal(false);
                  setEditingStudent(null);
                  setFormData({
                    name: '',
                    indexNumber: '',
                    degree: '',
                    presentYear: '',
                    contactNumber: '',
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={editingStudent ? handleUpdateStudent : handleAddStudent}
              >
                {editingStudent ? 'Update' : 'Add'} Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRecords;
