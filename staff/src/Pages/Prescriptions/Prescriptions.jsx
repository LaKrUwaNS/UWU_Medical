import React, { useState } from 'react';
import { Search, Eye, Filter } from 'lucide-react';
import PrescriptionDetails from '../PrescriptionDetails/PrescriptionDetails';
import './Prescriptions.css';

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'details'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students] = useState([
    {
      id: 1,
      name: 'Sophia Carter',
      enrollmentNumber: 'STU2545',
      degreeProgram: 'Biology',
      date: '2024-07-26',
      time: '10:00 AM'
    },
    {
      id: 2,
      name: 'Liam Bennett',
      enrollmentNumber: 'STU6780',
      degreeProgram: 'Engineering',
      date: '2024-07-26',
      time: '11:30 AM'
    },
    {
      id: 3,
      name: 'Chloe Harper',
      enrollmentNumber: 'STU4680',
      degreeProgram: 'Psychology',
      date: '2024-07-26',
      time: '01:00 PM'
    },
    {
      id: 4,
      name: 'Owen Foster',
      enrollmentNumber: 'STU3579',
      degreeProgram: 'Computer Science',
      date: '2024-07-26',
      time: '02:45 PM'
    },
    {
      id: 5,
      name: 'Isabella Mitchell',
      enrollmentNumber: 'STU6765',
      degreeProgram: 'Business Administration',
      date: '2024-07-26',
      time: '04:15 PM'
    }
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.degreeProgram.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPrescription = (student) => {
    setSelectedStudent(student);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedStudent(null);
  };

  // If viewing prescription details, show the details page
  if (currentView === 'details') {
    return <PrescriptionDetails student={selectedStudent} onBack={handleBackToList} />;
  }

  return (
    <div className="prescription-container">
      <div className="header-section">
        <div className="title-section">
          <h1 className="main-title">Student Prescriptions</h1>
          <p className="subtitle">Manage and view student medication prescriptions</p>
        </div>
      </div>

      <div className="controls-section">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by name, enrollment number, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        
      </div>

      <div className="table-container">
        <div className="table-wrapper">
          <table className="prescriptions-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Enrollment Number</th>
                <th>Degree Program</th>
                <th>Date</th>
                <th>Time</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="table-row">
                  <td className="student-name">{student.name}</td>
                  <td className="enrollment-number">{student.enrollmentNumber}</td>
                  <td>
                    <span className="program-badge">{student.degreeProgram}</span>
                  </td>
                  <td className="date-cell">{student.date}</td>
                  <td className="time-cell">{student.time}</td>
                  <td>
                    <button 
                      className="view-btn"
                      onClick={() => handleViewPrescription(student)}
                    >
                      <Eye size={16} />
                      View Prescription
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="footer-info">
        <p>Showing {filteredStudents.length} of {students.length} prescriptions</p>
      </div>
    </div>
  );
};

export default Prescriptions;