import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import images from '../../assets/images.js';
import './Login.css';

function Login() {
    const [professionalEmail, setProfessionalEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!professionalEmail || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/doctor/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // enable cookies for session
                body: JSON.stringify({ email: professionalEmail, password })
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message || 'Login Successful');
                setMessage(data.message || 'Login Successful')

                // Redirect to protected route
                navigate('/dashboard');
            } else {
                alert(data.message || 'Login failed');
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    };

    const handleNavigateToRegister = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className='login-container'>
            <div className='left-side'>
                <img src={images.fix} alt='Login Banner' className='login-banner-image' />
            </div>

            <div className='right-side'>
                <div className='top-section'>
                    <div className='top-login-text'>
                        <h1 className='Login'>Login</h1>
                        <p className='top-second-text'>Good day doctor, please log in</p>
                    </div>
                    <div className='uni-logo'>
                        <img src={images.uni_Logo} alt="University Logo" className='uni-logo-image' />
                    </div>
                </div>

                <div className='input-section'>
                    <input
                        type='email'
                        placeholder='Professional Email'
                        className='input-field'
                        value={professionalEmail}
                        onChange={(e) => setProfessionalEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='input-field'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                    />
                    <Link to='/forgot-password' className='foroget'>Forgot Password or Email</Link>
                </div>

                <div className='button-section'>
                    <button className='login-button' onClick={handleLogin}>Login</button>
                    <button className='register-button' onClick={handleNavigateToRegister}>Register</button>
                </div>

                <p className='signup-section'>
                    New Doctor Account?
                    <span className='signup-text'>
                        <Link to='/register' className="a-link">Sign up</Link>
                    </span>
                </p>

                {message && <p className="message-text">{message}</p>}

                <div className='bottom-line'></div>

                <p className='bottom-text'>
                    Welcome to the web service of the University of Uva Wellassa
                </p>

                <a className='bottom-link' href='#'>Contact the Admin</a>
            </div>
        </div>
    );
}

export default Login;
