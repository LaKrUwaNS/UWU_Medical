import React, { useState } from 'react';
import './Register.css';
import images from '../../assets/images.js';
import { useNavigate } from 'react-router-dom';
import Verificationmessage from '../../components/VerificationMessage/Verificationmessage.jsx';

function Register() {
    const [selectRole, setSelectRole] = useState('Doctor');
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [professionalEmail, setProfessionalEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const requestBody = {
            userName: data.username,
            fullName: data.fullname,
            password: data.password,
            personalEmail: data.personalEmail,
            professionalEmail: data.professionalEmail,
            securityCode: data.verifyKey,
            title: selectRole
        };

        if (selectRole === 'Doctor') {
            try {
                const response = await fetch('http://localhost:5000/doctor/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(requestBody),
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message || 'Registration successful');

                    // Send OTP after successful registration
                    await fetch('http://localhost:5000/doctor/send-otp', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify({ professionalEmail: requestBody.professionalEmail })
                    });

                    setProfessionalEmail(requestBody.professionalEmail);
                    setShowVerificationPopup(true);
                } else {
                    alert("Registration failed: " + result.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert('Something went wrong!');
            }
        } else {
            console.log('Staff registration data', requestBody);
            alert("Staff registration is not connected to backend yet.");
        }
    };

    return (
        <>
            <div className="register-container">
                <div className='image-section'>
                    <img src={images.register} alt="Register" className="register-image" />
                </div>

                <div className="register-form-sec">
                    <div className="header">
                        <h1 className='title'>Register</h1>
                        <img className='logo' src={images.logo} alt="logo" />
                    </div>

                    <p className='sub-title'>Register as A {selectRole}</p>

                    <div className="role-toggle">
                        <button
                            type='button'
                            className={`doctor-btn ${selectRole === 'Doctor' ? 'active' : ''}`}
                            onClick={() => setSelectRole('Doctor')}
                        >
                            Doctor
                        </button>
                        <button
                            type='button'
                            className={`staff-btn ${selectRole === 'Staff' ? 'active' : ''}`}
                            onClick={() => setSelectRole('Staff')}
                        >
                            Staff
                        </button>
                    </div>

                    <form className="register-form" onSubmit={handleSubmit}>
                        <p className='text'>Enter Username and Full Name</p>
                        <div className="names">
                            <input name="username" type="text" placeholder='Username' className="form-input-half" required />
                            <input name="fullname" type="text" placeholder='Full name' className="form-input-half" required />
                        </div>

                        <input name="password" type="password" placeholder='Password' className="form-input" required />

                        <p className='text'>Enter personal number</p>
                        <input name="mobile" type="tel" placeholder='Mobile Number' className="form-input" required />

                        <p className='text'>Enter Work and Personal Emails</p>
                        <input name="personalEmail" type="email" placeholder="Personal Email" className="form-input" required />
                        <input name="professionalEmail" type="email" placeholder="University Email" className="form-input" required />

                        <div className='bottom'>
                            <input name="verifyKey" type="text" placeholder="Verify Key" className="form-input" required />

                            <div>
                                <p className='policy-text'>Read our security policy <a className="readme-link" href="#">Read Me</a></p>

                                <div className="checkbox-wrapper">
                                    <label className='agree'>
                                        <input type="checkbox" required />
                                        Read and agreed to the security policy
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-buttons">
                            <button type="submit" className='submit-btn'>Register</button>
                            <button type='button' className='cancel-btn' onClick={() => navigate('/login')}>Cancel</button>
                        </div>

                        <p className='contact-admin'>Contact the Admin</p>
                    </form>
                </div>
            </div>

            {showVerificationPopup && <Verificationmessage email={professionalEmail} />}
        </>
    );
}

export default Register;
