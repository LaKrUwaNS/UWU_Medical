import React, { useState } from 'react';
import './Register.css';
import images from '../../assets/images.js';
import { useNavigate } from 'react-router-dom';
import Verificationmessage from '../../components/VerificationMessage/Verificationmessage.jsx';

function Register() {
    const [selectRole, setSelectRole] = useState('Doctor');
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [professionalEmail, setProfessionalEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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
        
        setIsLoading(false);
    };

    return (
        <>
            <div className="register-container">
                <img 
                    src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1000" 
                    alt='Medical stethoscope' 
                    className='register-image' 
                />

                <div className="register-form-sec">
                    <div className="header">
                        <h1 className='title'>Create Account</h1>
                        <img className='logo' src={images.logo} alt="logo" />
                    </div>

                    <p className='sub-title'>Register as a {selectRole}</p>

                    <div className="role-toggle">
                        <button
                            type='button'
                            className={`doctor-btn ${selectRole === 'Doctor' ? 'active' : ''}`}
                            onClick={() => setSelectRole('Doctor')}
                            disabled={isLoading}
                        >
                            Doctor
                        </button>
                        <button
                            type='button'
                            className={`staff-btn ${selectRole === 'Staff' ? 'active' : ''}`}
                            onClick={() => setSelectRole('Staff')}
                            disabled={isLoading}
                        >
                            Staff
                        </button>
                    </div>

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div>
                            <p className='text'>Username and Full Name</p>
                            <div className="names">
                                <input 
                                    name="username" 
                                    type="text" 
                                    placeholder='Enter username' 
                                    className="form-input-half" 
                                    required 
                                    disabled={isLoading}
                                />
                                <input 
                                    name="fullname" 
                                    type="text" 
                                    placeholder='Enter full name' 
                                    className="form-input-half" 
                                    required 
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <p className='text'>Password</p>
                            <input 
                                name="password" 
                                type="password" 
                                placeholder='Create a strong password with 8 digits' 
                                className="form-input" 
                                required 
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <p className='text'>Mobile Number</p>
                            <input 
                                name="mobile" 
                                type="tel" 
                                placeholder='Enter mobile number' 
                                className="form-input" 
                                required 
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <p className='text'>Email Addresses</p>
                            <input 
                                name="personalEmail" 
                                type="email" 
                                placeholder="Enter personal email" 
                                className="form-input" 
                                required 
                                disabled={isLoading}
                            />
                            <p><br></br></p>
                            <input 
                                name="professionalEmail" 
                                type="email" 
                                placeholder="Enter university email (We will send a otp code to this email)" 
                                className="form-input" 
                                required 
                                disabled={isLoading}
                            />
                        </div>

                        <div className='bottom'>
                            <div>
                                <p className='text'>Verification Key</p>
                                <input 
                                    name="verifyKey" 
                                    type="text" 
                                    placeholder="Enter verification key" 
                                    className="form-input" 
                                    required 
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="policy-section">
                                <p className='policy-text'>
                                    Read our security policy{' '}
                                    <a className="readme-link" href="#" target="_blank" rel="noopener noreferrer">
                                        Read More
                                    </a>
                                </p>

                                <div className="checkbox-wrapper">
                                    <input type="checkbox" required disabled={isLoading} />
                                    <label className='agree'>
                                        I have read and agree to the security policy
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-buttons">
                            <button 
                                type="submit" 
                                className='submit-btn' 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                            <button 
                                type='button' 
                                className='cancel-btn' 
                                onClick={() => navigate('/login')}
                                disabled={isLoading}
                            >
                                Back to Login
                            </button>
                        </div>

                        <p className='contact-admin'>Need help? Contact Admin</p>
                    </form>
                </div>
            </div>

            {showVerificationPopup && <Verificationmessage email={professionalEmail} />}
        </>
    );
}

export default Register;