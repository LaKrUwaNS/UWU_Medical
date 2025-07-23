import React, { useState } from 'react';
import './MedicalRequests.css';
import RequestCard from '../../../components/RequestCard/RequestCard';
import Data from '../../../Data/MedicalRequestsData';
import SlideBar from '../../../components/SlideBar/SlideBar';
import DoctorInfo from '../../../components/DoctorInfo/DoctorInfo';

function MedicalRequests() {
  const [requests, setRequests] = useState(Data);
  const [isSidebarCollapsed,setIsSidebarCollapsed] = useState(false);

  const handleDelete = (id) => {
    const updated = requests.filter(req => req.id !== id); // ✅ Fixed comparison
    setRequests(updated);
  };

  return (

    <div style={{position:'relative'}}>
      <DoctorInfo />
    <div style={{ display: 'flex' }}>


      <main className="medical-request-page">
        <div className="header">
          <h2 className='MR'>Medical Requests</h2>
          <div className="docter-info">

          </div>
        </div>
        
       {requests.length === 0 ? (
  <div className="empty-state">
    <p>No medical requests available.</p>
  </div>
) : (
  <div className={`requests-grid ${isSidebarCollapsed ? 'three-cols' :'two-cols'}`}>
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
