import React, { useEffect, useState } from 'react';
import './StudentData.css';
import UserProfile from '../../../components/UserProfile/UseraProfile';
import images from '../../../assets/images';
import Loadinganimate from '../../../components/LoadingAnimation/Loadinganimate';

const StudentData = () => {
  const [student, setStudent] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const studentId = "688f6ea8a8ec46502f5be318"; // Change dynamically if needed

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/doctor/student/${studentId}`, {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Add if needed
          },
        });

        const data = await response.json();

        if (!data.success) {
          setErrorMsg(data.message || 'Failed to fetch student data');
          setLoading(false);
          return;
        }

        setStudent(data.data.student);
        setPrescriptions(data.data.prescriptions);
      } catch (error) {
        setErrorMsg('Error fetching data. Server might be down.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const filteredPrescriptions = prescriptions.filter((record) => {
    if (!searchDate) return true;
    const recordDate = new Date(record.date).toISOString().split('T')[0];
    return recordDate === searchDate;
  });

  if (loading) return <div className="student-data-wrapper"><Loadinganimate /></div>;
  if (errorMsg) return <div className="student-data-wrapper"><p className="error">{errorMsg}</p></div>;

  return (
    <div className="student-data-wrapper">
      <div className="student-data-header-2">
        <h2 className="student-data-title">Student Data</h2>
        <div className='pro-header'>
          <button className="new-add-btn">New Add</button>
          <div className="profile">
            <UserProfile name="Dr. Lakruwan Sharaka" image={images.lakruwan} />
          </div>
        </div>
      </div>

      <div className="student-data-container">
        <div className="student-data-content">
          {/* Profile Section */}
          <div className="student-profile">
            <img className="profile-img" src={student.photo || images.defaultProfile} alt="Profile" />
            <div className="name-num">
              <p>{student.name}</p>
              <p className="index">{student.indexNumber}</p>
            </div>
            <div className="faculty"><p>{student.degree || "No Department Info"}</p></div>
            <div className="year-gender">
              <p>{student.presentYear} Year Student</p>
              <p>{student.gender}</p>
            </div>
            <div className="email-box">
              <p className="email">{student.universityEmail}</p>
            </div>
            <div className="contacts">
              <p>Emergency Contacts:</p>
              {student.contactNumber.map((num, idx) => (
                <span key={idx}>{num}<br /></span>
              ))}
              <p><strong>Emergency Number:</strong> {student.emergencyNumber}</p>
            </div>
            <div className="tags">
              <div className="tag-title"><p>Tags</p></div>
              <span className="tag b-plus">{student.bloodType}</span>
              {student.allergies.length === 0 ? (
                <span className="tag allergy">No allergies</span>
              ) : (
                student.allergies.map((allergy, idx) => (
                  <span key={idx} className="tag allergy">{allergy}</span>
                ))
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <label htmlFor="searchDate"><strong>Filter by Date:</strong></label>
            <input
              type="date"
              id="searchDate"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="date-input"
            />
          </div>

          {/* Medical History Section */}
          <div className="medical-history">
            {filteredPrescriptions.length === 0 ? (
              <p style={{ padding: '10px', color: '#888' }}>No records found for selected date.</p>
            ) : (
              filteredPrescriptions.map((record, index) => (
                <div className="record-card" key={index}>
                  <div className='record-details'>
                    <div className="record-header">
                      <div><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</div>
                      <div><strong>Doctor:</strong> {record.doctorId || 'Not Assigned'}</div>
                      <div><strong>Status:</strong> {record.queueStatus.charAt(0).toUpperCase() + record.queueStatus.slice(1)}</div>
                    </div>
                    <div className="description">
                      <strong className='description-title'>Description:</strong>
                      <p className='description-para'>{record.description}</p>
                    </div>
                  </div>
                  <table className="drug-table">
                    <thead>
                      <tr>
                        <th>Drug</th>
                        <th>Quantity</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.drugs.map((drug, i) => (
                        <tr key={i}>
                          <td>{drug.medicineId?.medicineName || "Unknown"}</td>
                          <td>{drug.quantity}</td>
                          <td className="once after">After Meal</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentData;
