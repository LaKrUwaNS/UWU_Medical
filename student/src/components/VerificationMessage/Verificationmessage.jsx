import React, { useState, useRef } from 'react';
import './Verificationmessage.css';
import { useNavigate } from 'react-router-dom';

function Verificationmessage({ email }) {
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [debugInfo, setDebugInfo] = useState("");
    const inputsRef = useRef([]);
    const navigate = useNavigate();

    // Debug: Log the email prop to ensure it's being passed correctly
    console.log('Email prop received:', email);
    console.log('Email type:', typeof email);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d?$/.test(value)) return; // allow only digits

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Auto-focus next input
        if (value !== "" && index < 4) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace to move to previous input
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // Test different API endpoint structures
    const testAPIEndpoints = async () => {
        const otpCode = otp.join("");
        
        if (otpCode.length < 5) {
            setError("Please enter all 5 digits first");
            return;
        }

        setDebugInfo("Testing different API formats...\n");
        
        const testCases = [
            {
                name: "Format 1: {email, otp}",
                data: { email: email, otp: otpCode }
            },
            {
                name: "Format 2: {universityEmail, otp}",
                data: { universityEmail: email, otp: otpCode }
            },
            {
                name: "Format 3: {email, otpCode}",
                data: { email: email, otpCode: otpCode }
            },
            {
                name: "Format 4: {universityEmail, otpCode}",
                data: { universityEmail: email, otpCode: otpCode }
            }
        ];

        for (let testCase of testCases) {
            try {
                console.log(`Testing ${testCase.name}:`, testCase.data);
                
                const response = await fetch('http://localhost:5000/student/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(testCase.data),
                });

                const data = await response.json();
                
                setDebugInfo(prev => prev + `\n${testCase.name}: Status ${response.status}\n${JSON.stringify(data, null, 2)}\n`);
                
                if (response.ok) {
                    console.log(`SUCCESS with ${testCase.name}!`);
                    setError("");
                    alert('OTP Verified Successfully!');
                    navigate('/dashboard');
                    return;
                }
            } catch (error) {
                console.error(`Error with ${testCase.name}:`, error);
                setDebugInfo(prev => prev + `\n${testCase.name}: ERROR - ${error.message}\n`);
            }
        }
    };

    const handleSubmit = async () => {
        const otpCode = otp.join("");

        // Validation
        if (otpCode.length < 5) {
            setError("Please enter all 5 digits of the OTP");
            return;
        }

        if (!email) {
            setError("Email not found. Please register again.");
            return;
        }

        setError("");
        setIsLoading(true);
        setDebugInfo("");

        // Based on your database structure, try different email formats
        const requestData = { 
            email: email, 
            otp: otpCode 
        };
        
        // Also try with universityEmail since that's what you used in registration
        const alternativeRequestData = {
            universityEmail: email,
            otp: otpCode
        };
        
        console.log('=== DEBUG INFO ===');
        console.log('Email received:', email);
        console.log('OTP entered:', otpCode);
        console.log('Request data:', JSON.stringify(requestData, null, 2));
        console.log('Alternative request data:', JSON.stringify(alternativeRequestData, null, 2));
        console.log('Request URL: http://localhost:5000/student/verify-otp');
        console.log('Note: Database stores OTP as hash, not plain text');

        // First try with email field
        let response;
        let data;
        
        try {
            response = await fetch('http://localhost:5000/student/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(requestData),
            });

            const responseText = await response.text();
            console.log('First attempt - Raw response:', responseText);
            
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse JSON:', parseError);
                setError('Server returned invalid response format');
                setIsLoading(false);
                return;
            }

            if (response.ok && data.success) {
                alert(data.message || 'Email verified successfully!');
                navigate('/medical');
                return;
            }
        } catch (error) {
            console.log('First attempt failed, trying alternative format...');
        }

        // If first attempt failed, try with universityEmail
        try {
            response = await fetch('http://localhost:5000/student/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(alternativeRequestData),
            });

            const responseText = await response.text();
            console.log('Second attempt - Raw response:', responseText);
            
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse JSON:', parseError);
                setError('Server returned invalid response format');
                setIsLoading(false);
                return;
            }

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            console.log('Parsed response data:', data);

            if (response.ok && data.success) {
                alert(data.message || 'Email verified successfully!');
                navigate('/medical');
            } else {
                // Show detailed error information
                const errorMsg = `Status: ${response.status}\nMessage: ${data.message || 'Unknown error'}\nDetails: ${JSON.stringify(data, null, 2)}`;
                setError(errorMsg);
                
                // Log more details for debugging
                console.error('Verification failed:', {
                    status: response.status,
                    data: data,
                    headers: [...response.headers.entries()]
                });
            }
        } catch (error) {
            console.error('Network/Request error:', error);
            setError(`Network error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to manually test the backend
    const pingBackend = async () => {
        try {
            const response = await fetch('http://localhost:5000/health', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.text();
            console.log('Backend health check:', response.status, data);
            alert(`Backend response: ${response.status} - ${data}`);
        } catch (error) {
            console.error('Backend unreachable:', error);
            alert(`Backend unreachable: ${error.message}`);
        }
    };

    return (
        <div className='full-container'>
            <div className='container'>
                <div className='topic'>
                    <h2>Validate Your Email</h2>
                </div>

               
                {/* Show email being verified */}
                {email && (
                    <div className='email-info'>
                        <p>Verifying: <strong>{email}</strong></p>
                    </div>
                )}

                <div className='input-box'>
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            type='text'
                            maxLength="1"
                            className='otp-section'
                            value={digit}
                            onChange={(e) => handleChange(e, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            ref={(el) => inputsRef.current[idx] = el}
                            disabled={isLoading}
                            autoComplete="off"
                        />
                    ))}
                </div>

              

                <div className='message'>
                    <p>We have sent a 5-digit OTP to your email address. <br />
                        Please enter the code below to verify your email and continue.</p>
                </div>

                <div className='submit-button'>
                    <button 
                        className='submit' 
                        onClick={handleSubmit}
                        disabled={isLoading || otp.some(digit => digit === "")}
                    >
                        {isLoading ? 'Verifying...' : 'Submit'}
                    </button>
                </div>

                <p className='resend' onClick={() => navigate('/register')}>
                    Resend OTP
                </p>

                
            </div>
        </div>
    );
}

export default Verificationmessage;