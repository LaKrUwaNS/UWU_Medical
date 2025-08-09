import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter, Download, Users } from 'lucide-react';
import './StudentRecords.css';

const StudentRecords = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Iduwara Sayagi',
      indexNo: '521456',
      faculty: 'Technological Studies',
      age: 20,
      contact: '555-1234'
    },
    {
      id: 2,
      name: 'Nesara Fernando',
      indexNo: '654321',
      faculty: 'Applied Science',
      age: 22,
      contact: '555-5678'
    },
    {
      id: 3,
      name: 'Pathumika Perera',
      indexNo: '987654',
      faculty: 'Management',
      age: 21,
      contact: '555-9012'
    },
    {
      id: 4,
      name: 'Lahiru Jayasinghe',
      indexNo: '456789',
      faculty: 'Animal Science and Export Agriculture',
      age: 19,
      contact: '555-3456'
    },
    {
      id: 5,
      name: 'Saman Kumara',
      indexNo: '789012',
      faculty: 'Medicine',
      age: 23,
      contact: '555-7890'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    indexNo: '',
    faculty: '',
    age: '',
    contact: ''
  });

  const faculties = ['All', 'Technological Studies', 'Applied Science', 'Management', 'Animal Science and Export Agriculture', 'Medicine'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.indexNo.includes(searchTerm) ||
                         student.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = selectedFaculty === '' || selectedFaculty === 'All' || 
                          student.faculty === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.indexNo && newStudent.faculty) {
      const student = {
        id: Date.now(),
        ...newStudent,
        age: parseInt(newStudent.age)
      };
      setStudents([...students, student]);
      setNewStudent({ name: '', indexNo: '', faculty: '', age: '', contact: '' });
      setShowAddModal(false);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent(student);
    setShowAddModal(true);
  };

  const handleUpdateStudent = () => {
    setStudents(students.map(s => 
      s.id === editingStudent.id ? { ...newStudent, age: parseInt(newStudent.age) } : s
    ));
    setEditingStudent(null);
    setNewStudent({ name: '', indexNo: '', faculty: '', age: '', contact: '' });
    setShowAddModal(false);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const getFacultyColor = (faculty) => {
    const colors = {
      'Technological Studies': '#10b981',
      'Applied Science': '#059669',
      'Management': '#34d399',
      'Animal Science and Export Agriculture': '#047857',
      'Medicine': '#065f46'
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
              <span className="stat-number">{new Set(students.map(s => s.faculty)).size}</span>
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
                {faculties.map(faculty => (
                  <option key={faculty} value={faculty === 'All' ? '' : faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
        </div>

        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Index No.</th>
                <th>Faculty</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className="table-row">
                  <td>
                    <div className="student-name">
                      <div className="student-avatar" style={{backgroundColor: getFacultyColor(student.faculty)}}>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{student.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="index-number">{student.indexNo}</span>
                  </td>
                  <td>
                    <span 
                      className="faculty-badge" 
                      style={{backgroundColor: `${getFacultyColor(student.faculty)}15`, color: getFacultyColor(student.faculty)}}
                    >
                      {student.faculty}
                    </span>
                  </td>
                  <td>{student.age}</td>
                  <td>
                    <span className="contact-number">{student.contact}</span>
                  </td>
                  <td>
                    <div className="action-buttons-cell">
                      <button 
                        className="btn-icon edit" 
                        onClick={() => handleEditStudent(student)}
                        title="Edit student"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn-icon delete" 
                        onClick={() => handleDeleteStudent(student.id)}
                        title="Delete student"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="empty-state">
            <Users size={48} />
            <h3>No students found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => {
          setShowAddModal(false);
          setEditingStudent(null);
          setNewStudent({ name: '', indexNo: '', faculty: '', age: '', contact: '' });
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="Enter student name"
                />
              </div>
              <div className="form-group">
                <label>Index Number</label>
                <input
                  type="text"
                  value={newStudent.indexNo}
                  onChange={(e) => setNewStudent({...newStudent, indexNo: e.target.value})}
                  placeholder="Enter index number"
                />
              </div>
              <div className="form-group">
                <label>Faculty</label>
                <select
                  value={newStudent.faculty}
                  onChange={(e) => setNewStudent({...newStudent, faculty: e.target.value})}
                >
                  <option value="">Select Faculty</option>
                  {faculties.filter(f => f !== 'All').map(faculty => (
                    <option key={faculty} value={faculty}>{faculty}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={newStudent.age}
                  onChange={(e) => setNewStudent({...newStudent, age: e.target.value})}
                  placeholder="Enter age"
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  value={newStudent.contact}
                  onChange={(e) => setNewStudent({...newStudent, contact: e.target.value})}
                  placeholder="Enter contact number"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setShowAddModal(false);
                  setEditingStudent(null);
                  setNewStudent({ name: '', indexNo: '', faculty: '', age: '', contact: '' });
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