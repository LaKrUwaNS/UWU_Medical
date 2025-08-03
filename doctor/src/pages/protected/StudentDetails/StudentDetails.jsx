import React, { useState, useMemo } from 'react';
import './StudentData.css';

const StudentData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const students = [
    { id: 'ST003001', name: 'Oscar Taylor', gender: 'Male', faculty: 'Engineering', year: '3rd Year', email: 'oscar.taylor@student.com', contact: '555-298-1' },
    { id: 'ST003002', name: 'Oliver Morgan', gender: 'Male', faculty: 'Arts', year: '1st Year', email: 'oliver.morgan@student.com', contact: '555-298-2' },
    { id: 'ST003003', name: 'Matthew Harris', gender: 'Male', faculty: 'Medicine', year: '1st Year', email: 'matthew.harris@student.com', contact: '555-298-3' },
    { id: 'ST003004', name: 'Daniel Roberts', gender: 'Female', faculty: 'Business', year: '2nd Year', email: 'daniel.roberts@student.com', contact: '555-298-4' },
    { id: 'ST003005', name: 'Sophia Martinez', gender: 'Male', faculty: 'Medicine', year: '3rd Year', email: 'sophia.martinez@student.com', contact: '555-298-5' },
    { id: 'ST003006', name: 'Ava Martin', gender: 'Female', faculty: 'Law', year: '2nd Year', email: 'ava.martin@student.com', contact: '555-298-6' },
    { id: 'ST003007', name: 'Jackson Williams', gender: 'Male', faculty: 'Architecture', year: '4th Year', email: 'jackson.williams@student.com', contact: '555-298-7' },
    { id: 'ST003008', name: 'Isabella Anderson', gender: 'Female', faculty: 'Education', year: '1st Year', email: 'isabella.anderson@student.com', contact: '555-298-8' },
    { id: 'ST003009', name: 'Liam Rodriguez', gender: 'Male', faculty: 'Technology', year: '3rd Year', email: 'liam.rodriguez@student.com', contact: '555-298-9' },
    { id: 'ST003010', name: 'Mia Anderson', gender: 'Female', faculty: 'Design', year: '2nd Year', email: 'mia.anderson@student.com', contact: '555-298-10' }
  ];

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFaculty = student.faculty.toLowerCase().includes(facultyFilter.toLowerCase());
      const matchesYear = student.year.toLowerCase().includes(yearFilter.toLowerCase());
      const matchesGender = genderFilter === '' || student.gender === genderFilter;

      return matchesSearch && matchesFaculty && matchesYear && matchesGender;
    });
  }, [searchTerm, facultyFilter, yearFilter, genderFilter, students]);

  const uniqueFaculties = [...new Set(students.map(s => s.faculty))];
  const uniqueYears = [...new Set(students.map(s => s.year))];

  return (
    <div className="student-data-app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🏥</span>
            University Medical Center
          </div>
          <div className="search-container">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              className="search-input"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="user-profile">👤</div>
        </div>
      </header>

      <div className="container">
        <h1 className="page-title">Student Data</h1>
        <p className="subtitle">Manage and view student information for University Medical Center programs</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{students.length}</div>
            <div className="stat-label">Total Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{uniqueFaculties.length}</div>
            <div className="stat-label">Active Programs</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Enrollment Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{filteredStudents.length}</div>
            <div className="stat-label">Filtered Results</div>
          </div>
        </div>

        <div className="filters">
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by Faculty..."
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
          />
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by Year..."
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          />
          <select
            className="filter-input"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setFacultyFilter('');
              setYearFilter('');
              setGenderFilter('');
            }}
          >
            Clear Filters
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Faculty</th>
                <th>Academic Year</th>
                <th>Email Address</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <span className="student-id">{student.id}</span>
                    </td>
                    <td>{student.name}</td>
                    <td>{student.gender}</td>
                    <td>{student.faculty}</td>
                    <td>{student.year}</td>
                    <td>
                      <a href={`mailto:${student.email}`} className="email-link">
                        {student.email}
                      </a>
                    </td>
                    <td>
                      <span className="contact-number">{student.contact}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-results">
                    No students found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredStudents.length > 0 && (
          <div className="table-footer">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentData;