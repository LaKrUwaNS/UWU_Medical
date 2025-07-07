import React from 'react'
import './Contract.css'
import images from '../../assets/images'

function Contract() {
  return (
    <div className='Contract-wrapper'>
        <div className="notice-box">
            <div className="title">
                <h2> Dev<span className='highlight'>e</span>loper Team </h2>
            </div>

            <div className="contract-img">
                <img src={images.contract}alt="contract" />
            </div>
            <div className="contract-content">
                        <p>Dear User's</p>
                        <p>
                            We, the development team, hereby confirm that the University Medical Center File Managing System Web Application
                            was thoroughly developed, tested, and deployed according to the functional requirements specified during the planning phase.
                            The system was reviewed and verified to perform its intended operations, including patient data management, medical records
                            handling, and pharmacy inventory tracking.
                        </p>
                        <p>
                    This project was completed as part of the academic curriculum, and all components were handed over in good working condition.
                </p>

                <h4>Disclaimer:</h4>
                <p>Upon the official handover of this system, we do not accept any responsibility for the following:</p>
                <ul>
                    <li>Loss or corruption of data due to internal misuse, system crashes, or hardware/software failures</li>
                    <li>Unauthorized access resulting from weak or compromised credentials, network vulnerabilities, or mismanagement by the medical center staff</li>
                    <li>Errors, bugs, or failures caused by modifications made after deployment without the involvement of the original development team</li>
                    <li>System downtime or performance issues due to lack of regular maintenance, backups, or hosting problems</li>
                </ul>
                <p>
                    The full responsibility for ongoing system maintenance, user training, data backups, and security measures lies solely
                    with the university medical center administration and IT department.
                </p>
                <p>
                    Any future support requests, feature enhancements, bug fixes, or upgrades are not covered under the scope of this initial
                    academic project and must be discussed and approved separately.
                </p>
                <p>
                    We strongly recommend that the medical center assign dedicated personnel or IT staff to monitor the system, ensure regular backups,
                    enforce strong access controls, and keep the server and database environment secure and updated.
                </p>
            </div>
            <div className="contract-footer">
                <button className='read-close-btn'>Read and Close</button>
            </div>

        </div>

    </div>
  )
}

export default Contract