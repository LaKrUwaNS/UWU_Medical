import React from 'react';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import './PrescriptionDetails.css';

const PrescriptionDetails = ({ student, onBack }) => {
  const prescriptionData = {
    enrollmentId: student?.enrollmentNumber || 'STU2545',
    program: student?.degreeProgram || 'Bachelor of Science in Nursing',
    studentName: student?.name || 'Sophia Carter',
    medications: [
      {
        id: 1,
        name: 'Ibuprofen',
        quantity: '200mg',
        description: 'For pain relief'
      },
      {
        id: 2,
        name: 'Amoxicillin',
        quantity: '500mg',
        description: 'Antibiotic for infections'
      },
      {
        id: 3,
        name: 'Cetirizine',
        quantity: '10mg',
        description: 'Antihistamine for allergies'
      }
    ]
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading prescription...');
  };

  return (
    <div className="prescription-details-container">
      <div className="prescription-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to List
        </button>
        
        <div className="header-actions">
          <button className="action-btn" onClick={handlePrint}>
            <Printer size={18} />
            Print
          </button>
          <button className="action-btn" onClick={handleDownload}>
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      <div className="prescription-card">
        <div className="prescription-title-section">
          <h1 className="prescription-title">Student Prescription</h1>
          <p className="prescription-subtitle">
            Enrollment ID: {prescriptionData.enrollmentId} | Program: {prescriptionData.program}
          </p>
        </div>

        <div className="student-info">
          <h2 className="student-name-title">{prescriptionData.studentName}</h2>
        </div>

        <div className="medications-section">
          <div className="table-header">
            <div className="header-cell">Medicine Name</div>
            <div className="header-cell">Quantity</div>
            <div className="header-cell">Description</div>
          </div>

          <div className="medications-list">
            {prescriptionData.medications.map((medication) => (
              <div key={medication.id} className="medication-row">
                <div className="medication-cell medicine-name">
                  {medication.name}
                </div>
                <div className="medication-cell quantity">
                  {medication.quantity}
                </div>
                <div className="medication-cell description">
                  {medication.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;