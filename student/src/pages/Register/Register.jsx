import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import images from '../../assets/Image';
import Verificationmessage from '../../components/VerificationMessage/Verificationmessage.jsx';



function Register() {
    const [selectedGender, setSelectedGender] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [professionalEmail, setProfessionalEmail] = useState('');
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        indexNumber: '',
        mobile: '',
        personalMail: '',
        professionalMail: '', // This should map to universityEmail
        bloodType: '',
        medicalInfo: '',
        emergencyNumber: '', // Added emergency number field
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const checkPasswordStrength = (password) => {
        if (password.length === 0) {
            setPasswordStrength('');
            return;
        }

        let score = 0;

        // Length check
        if (password.length >= 6) score += 1; // Changed to match API requirement (min 6 chars)
        if (password.length >= 12) score += 1;

        // Character variety checks
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        if (score < 3) {
            setPasswordStrength('weak');
        } else if (score < 4) {
            setPasswordStrength('fair');
        } else if (score < 5) {
            setPasswordStrength('good');
        } else {
            setPasswordStrength('strong');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 'weak':
                return {
                    icon: '🔓',
                    text: 'Weak - Add more characters and variety',
                    class: 'weak'
                };
            case 'fair':
                return {
                    icon: '🔸',
                    text: 'Fair - Add special characters or numbers',
                    class: 'fair'
                };
            case 'good':
                return {
                    icon: '✅',
                    text: 'Good - Strong password',
                    class: 'good'
                };
            case 'strong':
                return {
                    icon: '🔒',
                    text: 'Excellent - Very secure password',
                    class: 'strong'
                };
            default:
                return null;
        }
    };

    const clearForm = () => {
        setFormData({
            name: '',
            indexNumber: '',
            mobile: '',
            personalMail: '',
            professionalMail: '',
            bloodType: '',
            medicalInfo: '',
            emergencyNumber: '',
        });
        setSelectedGender('');
        setPassword('');
        setConfirmPassword('');
        setPasswordStrength('');
    };

    const validateForm = () => {
        const { name, indexNumber, mobile, professionalMail, bloodType, emergencyNumber } = formData;

        if (!name.trim()) {
            alert('Please enter your name');
            return false;
        }
        if (!indexNumber.trim()) {
            alert('Please enter your index number');
            return false;
        }
        if (!selectedGender) {
            alert('Please select your gender');
            return false;
        }
        if (!mobile.trim()) {
            alert('Please enter your mobile number');
            return false;
        }
        if (!emergencyNumber.trim()) {
            alert('Please enter your emergency contact number');
            return false;
        }
        if (!professionalMail.trim()) { // University email is required
            alert('Please enter your university email');
            return false;
        }
        if (!bloodType) {
            alert('Please select your blood type');
            return false;
        }

        if (!password) {
            alert('Please enter a password');
            return false;
        }

        if (password.length < 6) { // Changed to match API requirement
            alert('Password must be at least 6 characters long');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return false;
        }

        if (passwordStrength === 'weak') {
            alert('Please choose a stronger password');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(professionalMail)) {
            alert('Please enter a valid university email address');
            return false;
        }

        const mobileRegex = /^[0-9+\-\s()]{10,15}$/;
        if (!mobileRegex.test(mobile)) {
            alert('Please enter a valid mobile number');
            return false;
        }
        if (!mobileRegex.test(emergencyNumber)) {
            alert('Please enter a valid emergency contact number');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Create the request body matching the API structure exactly
        const requestBody = {
            indexNumber: formData.indexNumber,
            universityEmail: formData.professionalMail, // Map professionalMail to universityEmail
            password: password,
            name: formData.name,
            gender: selectedGender,
            contactNumber: [formData.mobile], // API expects array of contact numbers
            emergencyNumber: formData.emergencyNumber,
            bloodType: formData.bloodType,
            allergies: formData.medicalInfo ? [formData.medicalInfo] : [] // API expects array, make it optional
        };

        console.log('Sending request body:', requestBody); // Debug log

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/student/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(requestBody),
            });

            const result = await response.json();
            console.log('Response:', result); // Debug log

            if (response.ok && result.success) {
                // alert(result.message || 'Registration successful');
                setProfessionalEmail(requestBody.universityEmail);
                setShowVerificationPopup(true);
                // Handle successful registration (e.g., redirect to verification page)
            } else {
                alert("Registration failed: " + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error("Error:", error);
            alert('Something went wrong! Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const strengthInfo = getPasswordStrengthText();

    return (
        <>
            <div className='register-wrapper'>
                <div className="bg-overlay"
                    style={{ backgroundImage: `url(${images.Register || images.Login})` }}>
                </div>

                <div className="main-contentRegister">
                    <div className="register-card">
                        {/* Logo */}
                        <div className="logo-container">
                            <div className="logo">
                                <img src={images.LoginUniLogo} alt="University Logo" className='uni-logo-image' />
                            </div>
                        </div>

                        {/* Welcome Section */}
                        <div className="welcome-section">
                            <h1 className="welcome-title">
                                R<span className="highlight">eg</span>ister
                            </h1>
                            <p className="welcome-subtitle">Uva Wellassa University Medical Center</p>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-section">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Index Number (e.g., 2023/ICT/02/123)"
                                        name="indexNumber"
                                        value={formData.indexNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Gender Selection */}
                                <div className="gender-group">
                                    <button
                                        type="button"
                                        className={`gender-btn1 ${selectedGender === 'male' ? 'active' : ''}`}
                                        onClick={() => handleGenderSelect('male')}
                                    >
                                        Male
                                    </button>
                                    <button
                                        type="button"
                                        className={`gender-btn1 ${selectedGender === 'female' ? 'active' : ''}`}
                                        onClick={() => handleGenderSelect('female')}
                                    >
                                        Female
                                    </button>
                                    <button
                                        type="button"
                                        className={`gender-btn1 ${selectedGender === 'other' ? 'active' : ''}`}
                                        onClick={() => handleGenderSelect('other')}
                                    >
                                        Other
                                    </button>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="tel"
                                        className="form-input"
                                        placeholder="Mobile Number"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="tel"
                                        className="form-input"
                                        placeholder="Emergency Contact Number"
                                        name="emergencyNumber"
                                        value={formData.emergencyNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="Personal Email (Optional)"
                                        name="personalMail"
                                        value={formData.personalMail}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="University Email"
                                        name="professionalMail"
                                        value={formData.professionalMail}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Password Fields */}
                                <div className="password-row">
                                    <input
                                        type="password"
                                        className="form-input"
                                        placeholder="Password (min 6 characters)"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <input
                                        type="password"
                                        className="form-input"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Password Strength Indicator */}
                                {password && strengthInfo && (
                                    <div className={`password-strength ${strengthInfo.class}`}>
                                        <span className="password-icon">{strengthInfo.icon}</span>
                                        <span>{strengthInfo.text}</span>
                                        <div className="strength-bar">
                                            <div className={`strength-fill ${strengthInfo.class}`}></div>
                                        </div>
                                    </div>
                                )}

                                {/* Password Match Indicator */}
                                {confirmPassword && (
                                    <div className={`password-match ${password === confirmPassword ? 'match' : 'no-match'}`}>
                                        <span className="password-icon">
                                            {password === confirmPassword ? '✅' : '❌'}
                                        </span>
                                        <span>
                                            {password === confirmPassword ? 'Passwords match perfectly' : 'Passwords do not match'}
                                        </span>
                                    </div>
                                )}

                                <div className="input-group">
                                    <select
                                        className="form-select"
                                        name="bloodType"
                                        value={formData.bloodType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Blood Type</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Medical conditions or allergies (Optional)"
                                        name="medicalInfo"
                                        rows="3"
                                        value={formData.medicalInfo}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="button-group">
                                <button
                                    type="button"
                                    className="btn1 btn1-clear"
                                    onClick={clearForm}
                                    disabled={isLoading}
                                >
                                    Clear
                                </button>
                                <button
                                    type="submit"
                                    className="btn1 btn1-submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="loading-spinner"></span>
                                            Registering...
                                        </>
                                    ) : (
                                        'Register'
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="signin-section">
                            <span className="signin-text">Already have an account? </span>
                            <Link to='/login' className="a-link">Sign in</Link>
                        </div>

                        {/* University Footer */}
                        <div className="university-footer">
                            <p className="university-text">University of Uva Wellassa</p>
                        </div>
                    </div>
                </div>
            </div>
            {showVerificationPopup && <Verificationmessage email={professionalEmail} />}
        </>
    );
}

export default Register;