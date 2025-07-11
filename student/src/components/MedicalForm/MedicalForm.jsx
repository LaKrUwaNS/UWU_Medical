import React from 'react';
import './MedicalForm.css';

function MedicalForm() {
  return (
   <div className="form-container">
    <h2>Submit Medical Request</h2>


    <label htmlFor=''>Reason For Visit</label>
    <select id='' name='' required>
      <option >Select</option>
      <option value="headache">Headache</option>
      <option value="fever">Fever</option>
    </select>

    <label htmlFor='symptoms'>Describe Your Symptoms</label>
    <textarea id='symptoms' name='symptoms' rows="3" required />

     <label htmlFor="history">Medical History</label>
      <textarea id="history" name="history" rows="3" />

    <label>Preferred Time Slot</label>
      <div className="timeslot">
        <div className="slot-item">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div className="slot-item">
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" required />
        </div>
      </div>
     <button className="submit"type="submit">Submit Request</button>

   </div>
  )
}

export default MedicalForm;