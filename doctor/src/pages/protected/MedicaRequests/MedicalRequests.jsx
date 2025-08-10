import React, { useState } from 'react';
import './MedicalRequests.css';
import RequestCard from '../../../components/RequestCard/RequestCard';
import DoctorInfo from '../../../components/DoctorInfo/DoctorInfo';

import nirmal from '../../../assets/Medical-Request/nirmal.png';
import ashen from '../../../assets/Medical-Request/Ashen.jpg';
import images from "../../../assets/images";
import UserProfile from "../../../components/UserProfile/UseraProfile";


const medicalRequests = [
  {
    id: 1,
    name: "Chamila Nirmal",
    regNo: "UWU/ICT/22/068",
    dateFrom: "2025/05/02",
    dateTo: "2025/06/03",
    message: "I have a severe headache and fever. I need a medical certificate to excuse my absence from classes.",
    condition: "Headache and Fever",
    report: "External report",
    image: nirmal,
  },
  {
    id: 2,
    name: "Kavindu Ashen",
    regNo: "UWU/ICT/22/066",
    dateFrom: "2025/06/22",
    dateTo: "2025/06/29",
    message: "I have severe Neck pain so I need a medical Certificate ",
    condition: "Neck Pain",
    report: "External report",
    image: ashen,
  },
  // ... other data objects
  {
    id: 3,
    name: "Chamila Nirmal",
    regNo: "UWU/ICT/22/068",
    dateFrom: "2025/05/02",
    dateTo: "2025/06/03",
    message: "I have a severe headache and fever. I need a medical certificate to excuse my absence from classes.",
    condition: "Headache and Fever",
    report: "External report",
    image: nirmal,
  },
  {
    id: 4,
    name: "Kavindu Ashen",
    regNo: "UWU/ICT/22/066",
    dateFrom: "2025/06/22",
    dateTo: "2025/06/29",
    message: "I have severe Neck pain so I need a medical Certificate ",
    condition: "Neck Pain",
    report: "External report",
    image: ashen,
  },
  {
    id: 5,
    name: "Chamila Nirmal",
    regNo: "UWU/ICT/22/068",
    dateFrom: "2025/05/02",
    dateTo: "2025/06/03",
    message: "I have a severe headache and fever. I need a medical certificate to excuse my absence from classes.",
    condition: "Headache and Fever",
    report: "External report",
    image: nirmal,
  },
  {
    id: 6,
    name: "Kavindu Ashen",
    regNo: "UWU/ICT/22/066",
    dateFrom: "2025/06/22",
    dateTo: "2025/06/29",
    message: "I have severe Neck pain so I need a medical Certificate ",
    condition: "Neck Pain",
    report: "External report",
    image: ashen,
  },
  {
    id: 7,
    name: "Chamila Nirmal",
    regNo: "UWU/ICT/22/068",
    dateFrom: "2025/05/02",
    dateTo: "2025/06/03",
    message: "I have a severe headache and fever. I need a medical certificate to excuse my absence from classes.",
    condition: "Headache and Fever",
    report: "External report",
    image: nirmal,
  },
  {
    id: 8,
    name: "Kavindu Ashen",
    regNo: "UWU/ICT/22/066",
    dateFrom: "2025/06/22",
    dateTo: "2025/06/29",
    message: "I have severe Neck pain so I need a medical Certificate ",
    condition: "Neck Pain",
    report: "External report",
    image: ashen,
  },
];

function MedicalRequests() {
  const [requests, setRequests] = useState(medicalRequests);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleDelete = (id) => {
    const updated = requests.filter((req) => req.id !== id);
    setRequests(updated);
  };

  return (
    <div style={{ position: 'relative' }}>
       
      <div style={{ display: 'flex' }}>
        <main className="medical-request-page">
          <div className="header-MR">
            <h2 className="MR">Medical Requests</h2>
            <UserProfile 
            className="User-profile"
            name="Dr. Lakruwan Sharaka" 
            image={images.lakruwan} />
          </div>

          {requests.length === 0 ? (
            <div className="empty-state">
              <p>No medical requests available.</p>
            </div>
          ) : (
            <div className={`requests-grid ${isSidebarCollapsed ? 'three-cols' : 'two-cols'}`}>
              {requests.map((req) => (
                <RequestCard
                  key={req.id}
                  data={req}
                  onDelete={() => handleDelete(req.id)}
                  className="request-card"
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MedicalRequests;
