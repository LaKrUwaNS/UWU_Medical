import React, { useState } from 'react';
import { Search, Filter, Eye, Edit } from 'lucide-react';
import './StudentRecords.css';
import { Link } from 'react-router-dom';

const StudentRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterYear, setFilterYear] = useState('all');

  const studentsData = [
    {
      id:1,
      name: 'Kavindu Dhanushka',
      enrollmentNumber: 'UWU/ICT/22/064',
      year: '3rd',
      gender: 'Male',
      email: 'ethan.carter@students.com',
      mobile: '555-123-4567'
    },
    {
      id:2,
      name: 'Nimal Balasuuriya',
      enrollmentNumber: 'UWU/ICT/22/014',
      year: '1st',
      gender: 'Female',
      email: 'sophia.bennett@students.com',
      mobile: '555-987-6543'
    },
    {
      id:3,
      name: 'Sahan Tharaka',
      enrollmentNumber: 'UWU/ICT/22/084',
      year: '3rd',
      gender: 'Male',
      email: 'lucas.foster@students.com',
      mobile: '555-246-8013'
    },
    {
      id:4,
      name: 'Wasna Dilmi',
      enrollmentNumber: 'UWU/ICT/22/094',
      year: '2nd',
      gender: 'Female',
      email: 'ava.davis@students.com',
      mobile: '555-135-7924'
    },
    {
      id:5,
      name: 'Ayesh Tharaka',
      enrollmentNumber: 'UWU/ICT/22/070',
      year: '1st',
      gender: 'Male',
      email: 'noah.green@students.com',
      mobile: '555-369-4572'
    },
    {
      id:6,
      name: 'Nuwan Thushara',
      enrollmentNumber: 'UWU/ICT/22/077',
      year: '3rd',
      gender: 'Female',
      email: 'isabella.hayes@students.com',
      mobile: '555-786-4561'
    },
    {
      id:7,
      name: 'Dasun Shanaka',
      enrollmentNumber: 'UWU/ICT/22/024',
      year: '2nd',
      gender: 'Male',
      email: 'jackson.miller@students.com',
      mobile: '555-874-3219'
    },
    {
      id:8,
      name: 'Taniya Fernando',
      enrollmentNumber: 'UWU/ICT/22/044',
      year: '1st',
      gender: 'Female',
      email: 'olivia.lewis@students.com',
      mobile: '555-951-7528'
    },
    {
      id:9,
      name: 'Chamila Nirmal',
      enrollmentNumber: 'UWU/ICT/22/078',
      year: '3rd',
      gender: 'Male',
      email: 'liam.morgan@students.com',
      mobile: '555-159-3576'
    },
    {
      id:10,
      name: 'Sachini Himaya',
      enrollmentNumber: 'UWU/ICT/22/069',
      year: '2nd',
      gender: 'Female',
      email: 'emma.nelson@students.com',
      mobile: '555-753-2846'
    }
  ];

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender = filterGender === 'all' || student.gender.toLowerCase() === filterGender.toLowerCase();
    const matchesYear = filterYear === 'all' || student.year === filterYear;

    return matchesSearch && matchesGender && matchesYear;
  });

  return (
    <div className="app-container">
      <main className="main-content">
        <header className="page-header">
          <h2 className="page-title">Student Records</h2>
          <p className="page-description">
            Manage and view student information for the medical program
          </p>
        </header>

        {/* Filters */}
        <section className="filters-card">
          <div className="filters-content">
            <div className="filters-left">
              <div className="search-container">
                <Search className="search-icon" size={20} aria-label="Search icon" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  aria-label="Search input"
                />
              </div>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="filter-select"
                aria-label="Gender filter"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="filter-select"
                aria-label="Year filter"
              >
                <option value="all">All Years</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
              </select>
            </div>
            <div className="filters-right">
              <button className="btn btn-secondary" aria-label="More filters">
                <Filter size={16} />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </section>

        {/* Students Table */}
        <section className="table-container">
          <div className="table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Enrollment No</th>
                  <th>Year</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.enrollmentNumber}>
                    <td>
                      <Link
                        to={`/student-data/${student.id}`}
                        className="student-link"
                        title="View Student Profile"
                      >
                        <div className="student-info">
                          <div className="student-avatar">
                            {student.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                          <div className="student-name">{student.name}</div>
                        </div>
                      </Link>
                    </td>
                    <td>{student.enrollmentNumber}</td>
                    <td><span className="year-badge">{student.year}</span></td>
                    <td>{student.gender}</td>
                    <td>{student.email}</td>
                    <td>{student.mobile}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/student-data/${student.id}`}
                          className="action-btn view-btn"
                          title="View Student"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/student-data/${student.id}/edit`}
                          className="action-btn edit-btn"
                          title="Edit Student"
                        >
                          <Edit size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="7" className="no-data">No matching students found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentRecords;