import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StudentData.css';
import UserProfile from '../../../components/UserProfile/UseraProfile';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import images from '../../../assets/images';

// Expanded student data to match the students from StudentRecords
const studentsDatabase = [
  {
    id: 1,
    name: "Kavindu Ashen Senarath",
    index: "UWU/ICT/22/064",
    gender: "Male",
    year: "Second Year",
    faculty: "Technological studies",
    email: "ict22064@std.uwu.ac.lk",
    image: images.Kavindu,
    contacts: ["077 1234678", "077 3456897"],
    tags: ["B+", "Regular patient", "Tomato Allergy"],
    records: [
      {
        date: "2025.05.25",
        doctor: "Dr.Kavindu Ashen Senarath",
        sickness: "Headache",
        nextVisit: "None",
        description: "A physical issue with symptoms of dizziness, back pain & whole center control lost. Treated with basic medication after a full checkup and advice given.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      },
      {
        date: "2025.05.10",
        doctor: "Dr.Chamila Nirmal",
        sickness: "Fever",
        nextVisit: "None",
        description: "Symptoms of headache and mild fever observed. Basic treatment with medication was advised. No further complications identified.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Nimal Balasuuriya",
    index: "UWU/ICT/22/014",
    gender: "Female",
    year: "First Year",
    faculty: "Technological studies",
    email: "ict22014@std.uwu.ac.lk",
    image: images.Kavindu, // You can add more images or use a default
    contacts: ["077 9876543", "077 1122334"],
    tags: ["A+", "New patient"],
    records: [
      {
        date: "2025.06.15",
        doctor: "Dr.Sachini Himaya",
        sickness: "Cold",
        nextVisit: "2025.06.30",
        description: "Common cold symptoms with mild cough and runny nose. Prescribed basic medication and rest.",
        drugs: [
          { name: "Cough Syrup", times: "3 Times", note: "One before eating" },
          { name: "Vitamin C", times: "1 Time", note: "One after breakfast" },
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Sahan Tharaka",
    index: "UWU/ICT/22/084",
    gender: "Male",
    year: "Third Year",
    faculty: "Technological studies",
    email: "ict22084@std.uwu.ac.lk",
    image: images.Kavindu,
    contacts: ["077 5544332", "077 8899776"],
    tags: ["O+", "Regular patient", "Diabetes"],
    records: [
      {
        date: "2025.06.10",
        doctor: "Dr.Lakruwan Sharaka",
        sickness: "Diabetes Check",
        nextVisit: "2025.07.10",
        description: "Regular diabetes monitoring. Blood sugar levels are stable. Continuing with current medication.",
        drugs: [
          { name: "Metformin", times: "2 Times", note: "One before eating" },
          { name: "Insulin", times: "1 Time", note: "Before dinner" },
        ]
      }
    ]
  },
   {
    id: 4,
    name: "Wasana Dilmi",
    index: "UWU/ICT/22/094",
    gender: "Female",
    year: "Second Year",
    faculty: "Technological studies",
    email: "ict22064@std.uwu.ac.lk",
    image: images.Kavindu,
    contacts: ["077 1234678", "077 3456897"],
    tags: ["B+", "Regular patient", "Tomato Allergy"],
    records: [
      {
        date: "2025.05.25",
        doctor: "Dr.Kavindu Ashen Senarath",
        sickness: "Headache",
        nextVisit: "None",
        description: "A physical issue with symptoms of dizziness, back pain & whole center control lost. Treated with basic medication after a full checkup and advice given.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      },
      {
        date: "2025.05.10",
        doctor: "Dr.Chamila Nirmal",
        sickness: "Fever",
        nextVisit: "None",
        description: "Symptoms of headache and mild fever observed. Basic treatment with medication was advised. No further complications identified.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      }
    ]
  },
   {
    id: 5,
    name: "Ayesh Tharaka",
    index: "UWU/ICT/22/070",
    gender: "Male",
    year: "Second Year",
    faculty: "Technological studies",
    email: "ict22064@std.uwu.ac.lk",
    image: images.Kavindu,
    contacts: ["077 1234678", "077 3456897"],
    tags: ["B+", "Regular patient", "Tomato Allergy"],
    records: [
      {
        date: "2025.05.25",
        doctor: "Dr.Kavindu Ashen Senarath",
        sickness: "Headache",
        nextVisit: "None",
        description: "A physical issue with symptoms of dizziness, back pain & whole center control lost. Treated with basic medication after a full checkup and advice given.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      },
      {
        date: "2025.05.10",
        doctor: "Dr.Chamila Nirmal",
        sickness: "Fever",
        nextVisit: "None",
        description: "Symptoms of headache and mild fever observed. Basic treatment with medication was advised. No further complications identified.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      }
    ]
  },
   {
    id: 6,
    name: "Nuwan Thushara",
    index: "UWU/ICT/22/077",
    gender: "Male",
    year: "Second Year",
    faculty: "Technological studies",
    email: "ict22064@std.uwu.ac.lk",
    image: images.Kavindu,
    contacts: ["077 1234678", "077 3456897"],
    tags: ["B+", "Regular patient", "Tomato Allergy"],
    records: [
      {
        date: "2025.05.25",
        doctor: "Dr.Kavindu Ashen Senarath",
        sickness: "Headache",
        nextVisit: "None",
        description: "A physical issue with symptoms of dizziness, back pain & whole center control lost. Treated with basic medication after a full checkup and advice given.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      },
      {
        date: "2025.05.10",
        doctor: "Dr.Chamila Nirmal",
        sickness: "Fever",
        nextVisit: "None",
        description: "Symptoms of headache and mild fever observed. Basic treatment with medication was advised. No further complications identified.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      }
    ]
  },
   {
    id: 7,
    name: "Dasun Shanaka",
    index: "UWU/ICT/22/024",
    gender: "Male",
    year: "Second Year",
    faculty: "Technological studies",
    email: "ict22064@std.uwu.ac.lk",
    image: images.Kavindu,
    contacts: ["077 1234678", "077 3456897"],
    tags: ["B+", "Regular patient", "Tomato Allergy"],
    records: [
      {
        date: "2025.05.25",
        doctor: "Dr.Kavindu Ashen Senarath",
        sickness: "Headache",
        nextVisit: "None",
        description: "A physical issue with symptoms of dizziness, back pain & whole center control lost. Treated with basic medication after a full checkup and advice given.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      },
      {
        date: "2025.05.10",
        doctor: "Dr.Chamila Nirmal",
        sickness: "Fever",
        nextVisit: "None",
        description: "Symptoms of headache and mild fever observed. Basic treatment with medication was advised. No further complications identified.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      }
    ]
  },
   {
    id: 8,
    name: "Taniya Fernando",
    index: "UWU/ICT/22/044",
    gender: "female",
    year: "Second Year",
    faculty: "Technological studies",
    email: "ict22064@std.uwu.ac.lk",
    image: images.Kavindu,
    contacts: ["077 1234678", "077 3456897"],
    tags: ["B+", "Regular patient", "Tomato Allergy"],
    records: [
      {
        date: "2025.05.25",
        doctor: "Dr.Kavindu Ashen Senarath",
        sickness: "Headache",
        nextVisit: "None",
        description: "A physical issue with symptoms of dizziness, back pain & whole center control lost. Treated with basic medication after a full checkup and advice given.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      },
      {
        date: "2025.05.10",
        doctor: "Dr.Chamila Nirmal",
        sickness: "Fever",
        nextVisit: "None",
        description: "Symptoms of headache and mild fever observed. Basic treatment with medication was advised. No further complications identified.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      }
    ]
  },
   {
    id: 9,
    name: "Chamila Nirmal",
    index: "UWU/ICT/22/078",
    gender: "Male",
    year: "Second Year",
    faculty: "Technological studies",
    email: "ict22064@std.uwu.ac.lk",
    image: images.Kavindu,
    contacts: ["077 1234678", "077 3456897"],
    tags: ["B+", "Regular patient", "Tomato Allergy"],
    records: [
      {
        date: "2025.05.25",
        doctor: "Dr.Kavindu Ashen Senarath",
        sickness: "Headache",
        nextVisit: "None",
        description: "A physical issue with symptoms of dizziness, back pain & whole center control lost. Treated with basic medication after a full checkup and advice given.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      },
      {
        date: "2025.05.10",
        doctor: "Dr.Chamila Nirmal",
        sickness: "Fever",
        nextVisit: "None",
        description: "Symptoms of headache and mild fever observed. Basic treatment with medication was advised. No further complications identified.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      }
    ]
  },
   {
    id: 10,
    name: "Sachini Himaya",
    index: "UWU/ICT/22/069",
    gender: "female",
    year: "Second Year",
    faculty: "Technological studies",
    email: "ict22064@std.uwu.ac.lk",
    image: images.Kavindu,
    contacts: ["077 1234678", "077 3456897"],
    tags: ["B+", "Regular patient", "Tomato Allergy"],
    records: [
      {
        date: "2025.05.25",
        doctor: "Dr.Kavindu Ashen Senarath",
        sickness: "Headache",
        nextVisit: "None",
        description: "A physical issue with symptoms of dizziness, back pain & whole center control lost. Treated with basic medication after a full checkup and advice given.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      },
      {
        date: "2025.05.10",
        doctor: "Dr.Chamila Nirmal",
        sickness: "Fever",
        nextVisit: "None",
        description: "Symptoms of headache and mild fever observed. Basic treatment with medication was advised. No further complications identified.",
        drugs: [
          { name: "Paradol", times: "2 Times", note: "One after eating" },
          { name: "Panadol", times: "2 Times", note: "One after eating" },
          { name: "Panasol", times: "2 Times", note: "One after eating" },
        ]
      }
    ]
  },
  // Add more student data as needed to match your StudentRecords data
];

function StudentData() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the student data based on the enrollment number from URL
  const student = studentsDatabase.find(s => s.id === Number(id));

  // If student not found, show error message
  if (!student) {
    return (
      <div className="student-data-wrapper">
        <div className="student-data-header-2">
          <button 
            onClick={() => navigate(-1)} 
            className="back-btn"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaArrowLeft /> Back
          </button>
          <h2 className="student-data-title">Student Not Found</h2>
        </div>
        <div className="student-data-container">
          <p>No student found with enrollment number: {enrollmentNumber}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-data-wrapper">
      {/* Header */}
      <div className="student-data-header-2">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate(-1)} 
            className="back-btn"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaArrowLeft /> Back
          </button>
          <h2 className="student-data-title">Student Data - {student.name}</h2>
        </div>
        <div className='pro-header'>
          <button className="new-add-btn">New Add</button>
          <div className="profile">
            <UserProfile name="Dr. Lakruwan Sharaka" image={images.lakruwan} />
          </div>
        </div>
      </div>
      
      <div className="student-data-container">
        <div className="student-data-content">
          {/* Profile */}
          <div className="student-profile">
            <img className="profile-img" src={student.image} alt="Profile" />
            <div className="name-num">
              <p>{student.name}</p>
              <p className="index">{student.index}</p>
            </div>
            <div className="faculty">
              <p>{student.faculty}</p>
            </div>
            <div className="year-gender">
              <p>{student.year}</p>
              <p>{student.gender}</p>
            </div>
            <div className="email-box">
              <p className="email">{student.email}</p>
            </div>
            <div className="contacts">
              <p>Emergency Contacts:</p>
              {student.contacts.map((num, idx) => (
                <span key={idx}>{num}<br /></span>
              ))}
            </div>
            <div className="tags">
              <div className="tag-title"><p>Tags</p></div>
              {student.tags.map((tag, idx) => {
                let tagClass = "";
                if (tag.includes("+")) tagClass = "b-plus";
                else if (tag === "Regular patient") tagClass = "regular";
                else if (tag.toLowerCase().includes("allergy")) tagClass = "allergy";
                else if (tag === "New patient") tagClass = "new-patient";
                else if (tag === "Diabetes") tagClass = "diabetes";

                return (
                  <span key={idx} className={`tag ${tagClass}`}>
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Medical History */}
          <div className="medical-history">
            {student.records.map((record, index) => (
              <div className="record-card" key={index}>
                <div className='record-details'>
                  <div className="record-header">
                    <div><strong>Date:</strong> {record.date}</div>
                    <div><strong>Doctor:</strong> {record.doctor}</div>
                    <div><strong>Sickness:</strong> {record.sickness}</div>
                    <div><strong>Next Visit:</strong> {record.nextVisit}</div>
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
                      <th>Times</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.drugs.map((drug, i) => {
                      let noteClass = '';
                      if (drug.note.toLowerCase().includes('before')) {
                        noteClass = 'before';
                      } else if (drug.note.toLowerCase().includes('after')) {
                        noteClass = 'after';
                      }
                      return (
                        <tr key={i}>
                          <td>{drug.name}</td>
                          <td>{drug.times}</td>
                          <td className={`once ${noteClass}`}>{drug.note}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentData;