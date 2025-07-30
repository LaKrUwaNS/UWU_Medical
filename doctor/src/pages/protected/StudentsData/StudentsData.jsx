import React from 'react';
import './StudentsData.css';
import UserProfile from '../../../components/UserProfile/UseraProfile';
import { FaUserCircle } from 'react-icons/fa';
import images from '../../../assets/images';

const studentData = [
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
    tags: ["B+", "Regular patient", "Tomato Alagic"],
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
  }
];

function StudentData() {
  return (
    <div className="student-data-wrapper">
       {/* Header */}
      
        
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
       

        {/* Content */}
        {studentData.map(student => (
          <div key={student.id} className="student-data-content">
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
                  if (tag === "B+") tagClass = "b-plus";
                  else if (tag === "Regular patient") tagClass = "regular";
                  else if (tag === "Tomato Alagic") tagClass = "allergy";

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
        ))}
      </div>
    </div>
  );
}

export default StudentData;
