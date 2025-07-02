import React from 'react'
import './requestCard.css';

function RequestCard({data,onDelete,className}) {
  return (
    <div className="request-card">
      <div className="request-header">
        <div className="user-info">
        <img src={data.image} alt="profile" className='profile-img' />
      
            <div>

                  <h4>{data.name}</h4>
                  <p>{data.regNo}</p>
            </div>
            </div>
            <div className="date-box">
                <p>{data.dataFrom}</p>
                <p>{data.dateTo}</p>

            </div>
      
      </div>

      <p className='request-message'>{data.message}</p>

      <div className="report-box">
        <p><strong>{data.condition}</strong></p>
        <p>{data.report}</p>
      </div>

      <div className="button-row">
        <button className='cancel-btn' onClick={() => {
          if (window.confirm("Are you sure you want to cancel this request?")) {
            onDelete();
          }
        }}
        >Cancel</button>
        <button className='submit-btn'>Submit</button>
      </div>

      
    </div>
    
  )
}

export default RequestCard