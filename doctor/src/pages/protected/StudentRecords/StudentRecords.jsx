import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit } from 'lucide-react';
import './StudentRecords.css';
import { Link } from 'react-router-dom';
import Loadinganimate from '../../../components/LoadingAnimation/Loadinganimate';

const StudentRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/doctor/students');
        const result = await response.json();

        if (result.success) {
          const formattedData = result.data.map((student) => ({
            id: student.id || student._id,
            name: student.name,
            enrollmentNumber: student.indexNumber,
            year: formatYear(student.presentYear),
            gender: capitalizeFirstLetter(student.gender),
            email: student.universityEmail,
            mobile: student.contactNumber?.[0] || 'N/A',
            photo: student.photo || null
          }));

          setStudentsData(formattedData);
        } else {
          console.error('Error:', result.message);
        }
      } catch (error) {
        console.error('Network Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const formatYear = (yearNum) => {
    if (yearNum === 1) return '1st';
    if (yearNum === 2) return '2nd';
    if (yearNum === 3) return '3rd';
    if (yearNum === 4) return '4th';
    return `${yearNum}th`;
  };

  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender =
      filterGender === 'all' || student.gender.toLowerCase() === filterGender.toLowerCase();

    const matchesYear =
      filterYear === 'all' || student.year === filterYear;

    return matchesSearch && matchesGender && matchesYear;
  });

  if (loading) {
    // Full-screen loader
    return (
      <div className="loading-container">
        <Loadinganimate />
      </div>
    );
  }

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
                <option value="4th">4th Year</option>
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
                            {student.photo ? (
                              <img
                                src={student.photo}
                                alt={student.name}
                                className="student-avatar-img"
                              />
                            ) : (
                              student.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 2)
                            )}
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
