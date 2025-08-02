import React, { useState } from 'react';
import './Register.css';
import images from '../../assets/Image'

function Register() {
    const [selectedGender, setSelectedGender] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        indexNumber: '',
        mobile: '',
        personalMail: '',
        professionalMail: '',
        bloodType: '',
        medicalInfo: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
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
        });
        setSelectedGender('');
    };

    const validateForm = () => {
        const { name, indexNumber, mobile, personalMail, professionalMail, bloodType } = formData;

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
        if (!personalMail.trim()) {
            alert('Please enter your personal email');
            return false;
        }
        if (!bloodType) {
            alert('Please select your blood type');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(personalMail)) {
            alert('Please enter a valid personal email address');
            return false;
        }
        if (professionalMail && !emailRegex.test(professionalMail)) {
            alert('Please enter a valid professional email address');
            return false;
        }

        const mobileRegex = /^[0-9+\-\s()]{10,15}$/;
        if (!mobileRegex.test(mobile)) {
            alert('Please enter a valid mobile number');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const data = { ...formData, gender: selectedGender };
        console.log('Registration data:', data);
        alert('Registration submitted successfully!');

        // You can add your API call here, e.g.:
        // fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // })
        // .then(res => res.json())
        // .then(() => alert('Registration submitted successfully!'))
        // .catch(() => alert('Registration failed. Please try again.'));
    };

    return (
        <div className="register-container">
            <div className="logo-section">
                <img src={images.uniLogo} alt="unilogo" className='unilogo' />
                <div className="logo"></div>
                <h1 className="title">
                    R<span className="highlight">eg</span>ister
                </h1>
                <p className="subtitle">Uva Wellassa University Medical Center</p>
            </div>

            <form id="registrationForm" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Index Number"
                        name="indexNumber"
                        value={formData.indexNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="gender-group">
                    <button
                        type="button"
                        className={`gender-btn ${selectedGender === 'male' ? 'active' : ''}`}
                        onClick={() => handleGenderSelect('male')}
                    >
                        Male
                    </button>
                    <button
                        type="button"
                        className={`gender-btn ${selectedGender === 'female' ? 'active' : ''}`}
                        onClick={() => handleGenderSelect('female')}
                    >
                        Female
                    </button>
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        className="input-field"
                        placeholder="Mobile Number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        className="input-field"
                        placeholder="Personal Mail"
                        name="personalMail"
                        value={formData.personalMail}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        className="input-field"
                        placeholder="Professional Mail"
                        name="professionalMail"
                        value={formData.professionalMail}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <select
                        className="select-field"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Blood Type</option>
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

                <div className="form-group">
                    <textarea
                        className="textarea-field"
                        placeholder="Write Description about Your allergies or permanent medical condition"
                        name="medicalInfo"
                        rows="3"
                        value={formData.medicalInfo}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="button-group">
                    <button type="button" className="btn btn-clear" onClick={clearForm}>
                        Clear
                    </button>
                    <button type="submit" className="btn btn-submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
