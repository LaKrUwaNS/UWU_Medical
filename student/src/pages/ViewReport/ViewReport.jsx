import React from 'react';
import './ViewReport.css';

const ViewReport = () => {
  const studentData = {
    name: "Kavindu Ashen Senarath",
    id: "UWU/ICT/2064",
    course: "Technological studies",
    year: "Second Year",
    gender: "Male",
    email: "ict220064@std.uwu.ac.lk",
    avatar: "/api/placeholder/80/80",
    emergencyContacts: [
      "077 XXXXXXXX",
      "077 XXXXXXXX"
    ],
    tags: ["B+", "Regular patient", "Tomato Allergic"]
  };

  const medicalReports = [
    {
      date: "2023.05.23",
      doctor: "Dr.Kavindu Ashen Senarath",
      sickness: "Doni Kees",
      nextVisit: "None",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      drugHistory: [
        { drug: "Panadol", times: "3 Times", description: "one after eating" },
        { drug: "Panadol", times: "3 Times", description: "one after eating" },
        { drug: "Panadol", times: "3 Times", description: "Two after eating" },
        { drug: "Panadol", times: "3 Times", description: "one after eating" }
      ]
    },
    {
      date: "2023.03.10",
      doctor: "Dr.Chamila Nirmal",
      sickness: "Doni Kees",
      nextVisit: "None",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      drugHistory: [
        { drug: "Panadol", times: "3 Times", description: "one after eating" },
        { drug: "Panadol", times: "3 Times", description: "one after eating" },
        { drug: "Panadol", times: "3 Times", description: "Two after eating" },
        { drug: "Panadol", times: "3 Times", description: "one after eating" }
      ]
    }
  ];

  const getTagColor = (tag) => {
    if (tag === "B+") return "blood-type";
    if (tag === "Regular patient") return "regular-patient";
    if (tag === "Tomato Allergic") return "allergy";
    return "default";
  };

  return (
    <div className="medical-reports-container">
      {/* Student Profile Section */}
      <div className="student-profile">
        <div className="profile-left">
          <img src={studentData.avatar} alt="Student Avatar" className="avatar" />
          <div className="student-info">
            <h2 className="student-name">{studentData.name}</h2>
            <p className="student-id">{studentData.id}</p>
            <p className="course">{studentData.course}</p>
            <p className="year-gender">{studentData.year} • {studentData.gender}</p>
            <p className="email">{studentData.email}</p>
          </div>
        </div>
        
        <div className="profile-right">
          <div className="emergency-contacts">
            <h3>Emergency Contacts</h3>
            {studentData.emergencyContacts.map((contact, index) => (
              <p key={index}>{contact}</p>
            ))}
          </div>
          
          <div className="tags-section">
            <h3>Tags</h3>
            <div className="tags">
              {studentData.tags.map((tag, index) => (
                <span key={index} className={`tag ${getTagColor(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Medical Reports Section */}
      <div className="medical-reports">
        {medicalReports.map((report, reportIndex) => (
          <div key={reportIndex} className="report-card">
            <div className="report-header">
              <div className="report-info">
                <div className="info-row">
                  <span className="label">Date:</span>
                  <span className="value">{report.date}</span>
                </div>
                <div className="info-row">
                  <span className="label">Doctor:</span>
                  <span className="value">{report.doctor}</span>
                </div>
                <div className="info-row">
                  <span className="label">Sickness:</span>
                  <span className="value">{report.sickness}</span>
                </div>
                <div className="info-row">
                  <span className="label">Next Visit:</span>
                  <span className="value">{report.nextVisit}</span>
                </div>
              </div>
              
              <div className="drug-history-header">
                <div className="drug-header-row">
                  <span className="drug-col">Drug</span>
                  <span className="times-col">Times</span>
                  <span className="desc-col">Description</span>
                </div>
                {report.drugHistory.map((drug, drugIndex) => (
                  <div key={drugIndex} className="drug-row">
                    <span className="drug-col">{drug.drug}</span>
                    <span className="times-col">{drug.times}</span>
                    <span className="desc-col">{drug.description}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="description-section">
              <h4>Description</h4>
              <p>{report.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReport;