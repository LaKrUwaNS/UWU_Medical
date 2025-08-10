import React, { useState, useRef } from 'react';
import './Verificationmessage.css';
import { useNavigate } from 'react-router-dom';

function Verificationmessage({ email }) {
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [error, setError] = useState("");
    const inputsRef = useRef([]);
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d?$/.test(value)) return; // allow only digits

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value !== "" && index < 4) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpCode = otp.join("");

        if (otpCode.length < 5) {
            setError("Please enter all 5 digits of the OTP");
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/student/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, otp: otpCode }),
            });

            const data = await res.json();

            if (data.success) {
                alert(data.message || 'OTP Verified');
                navigate('/dashboard');
            } else {
                setError(data.message || 'Invalid or expired OTP. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className='full-container'>
            <div className='container'>
                <div className='topic'>
                    <h2>Validate Your Working Email</h2>
                </div>

                <div className='input-box'>
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            type='text'
                            maxLength="1"
                            className='otp-section'
                            value={digit}
                            onChange={(e) => handleChange(e, idx)}
                            ref={(el) => inputsRef.current[idx] = el}
                        />
                    ))}
                </div>

                {error && <p className='error-message'>{error}</p>}

                <div className='message'>
                    <p>We have sent a one-time OTP to your professional email address. <br />
                        Please enter the code below to verify your email and continue.</p>
                </div>

                <div className='submit-button'>
                    <button className='submit' onClick={handleSubmit}>Submit</button>
                </div>

                <p className='resend' onClick={() => navigate('/register')}>Resend the Mail</p>
            </div>
        </div>
    );
}

export default Verificationmessage;
