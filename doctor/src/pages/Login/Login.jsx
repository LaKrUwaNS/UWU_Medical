import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../../assets/images.js';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage('Login Successful');
        } else {
            setMessage(data.message || 'Login Failed');
        }
    };

    const handleRegister = async () => {
        const response = await fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage('Registration Successful');
        } else {
            setMessage(data.message || 'Registration Failed');
        }
    };

    // Navigate to register page
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
                        type='text'
                        placeholder='Username'
                        className='input-field'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='input-field'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a href='#' className='foroget'>Forgot Password or Email</a>
                </div>

                <div className='button-section'>
                    <button className='login-button' onClick={handleLogin}>Login</button>
                    <button className='register-button' onClick={handleRegister}>Register</button>
                </div>

                <p className='signup-section'>
                    New Doctor Account?
                    <span className='signup-text'>
                        <a className="a-link" href='#' onClick={handleNavigateToRegister}> Sign up</a>
                    </span>
                </p>

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
