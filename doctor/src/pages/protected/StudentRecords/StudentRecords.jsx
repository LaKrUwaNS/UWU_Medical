import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, MoreVertical } from 'lucide-react';
import './StudentRecords.css';
import { useNavigate, Link } from 'react-router-dom';
import Loadinganimate from '../../../components/LoadingAnimation/Loadinganimate';
import images from "../../../assets/images";

const StudentRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/doctor/students', {
          method: 'GET',
          credentials: 'include', // 👈 ADD THIS - same as Layout component
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        console.log("Raw API result:", result);

        if (response.ok && result.success) {
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
          // If authentication failed, redirect to login
          if (response.status === 401) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Network Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [navigate]);

  const formatYear = (yearNum) => {
    if (yearNum === 1) return '1st';
    if (yearNum === 2) return '2nd';
    if (yearNum === 3) return '3rd';
    if (yearNum === 4) return '4th';
    return `${yearNum}th`;
  };

  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const getYearBadgeClass = (year) => {
    switch (year) {
      case '1st': return 'year-badge-1st';
      case '2nd': return 'year-badge-2nd';
      case '3rd': return 'year-badge-3rd';
      case '4th': return 'year-badge-4th';
      default: return 'year-badge-default';
    }
  };

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      (student.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (student.enrollmentNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (student.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesGender =
      filterGender === 'all' || (student.gender?.toLowerCase() === filterGender.toLowerCase());

    const matchesYear =
      filterYear === 'all' || student.year?.toString() === filterYear.toString();

    return matchesSearch && matchesGender && matchesYear;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <Loadinganimate />
      </div>
    );
  }

  return (
    <div className="app-container">
      <main className="main-content">
        {/* Header */}
        <header className="page-header">
          <div className="title-section">
            <h1 className="page-title">Student Records</h1>
          </div>
        </header>

        {/* Filters Section */}
        <section className="filters-card">
          <div className="filters-content">
            <div className="filters-left">
              {/* Search Input */}
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

              {/* Gender Filter */}
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

              {/* Year Filter */}
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
              <thead className="table-header">
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
              <tbody className="table-body">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.enrollmentNumber} className="table-row">
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
                                <span className="student-initials">
                                  {getInitials(student.name)}
                                </span>
                              )}
                            </div>
                            <div className="student-details">
                              <div className="student-name">{student.name}</div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <span className="enrollment-number">{student.enrollmentNumber}</span>
                      </td>
                      <td>
                        <span className={`year-badge ${getYearBadgeClass(student.year)}`}>
                          {student.year}
                        </span>
                      </td>
                      <td>
                        <span className="gender-text">{student.gender}</span>
                      </td>
                      <td>
                        <a
                          href={`mailto:${student.email}`}
                          className="email-link"
                          title="Send email"
                        >
                          {student.email}
                        </a>
                      </td>
                      <td>
                        <span className="mobile-number">{student.mobile}</span>
                      </td>
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
                          <button
                            className="action-btn more-btn"
                            title="More Options"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      <div className="no-data-content">
                        <p className="no-data-title">No matching students found</p>
                        <p className="no-data-subtitle">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Info */}
        <div className="table-footer">
          <p className="table-info">
            Showing {filteredStudents.length} of {studentsData.length} students
          </p>
          <p className="last-updated">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>
    </div>
  );
};

export default StudentRecords;