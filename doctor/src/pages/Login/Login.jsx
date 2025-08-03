import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import images from '../../assets/images.js';
import './Login.css';

function Login() {
    const [professionalEmail, setProfessionalEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!professionalEmail || !password) {
            setMessage('Please fill in all fields');
            return;
        }

        setIsLoading(true);

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
                setMessage('Login Successful! Redirecting...');
                
                // Small delay for better UX
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                setMessage(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Connection error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateToRegister = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleLogin();
        }
    };

    return (
        <div className='login-container'>
            <img src={images.fixbg}  alt='Medical background' className='login-banner-image' />
            
            <div className='login-form'>
                <div className='header-section'>
                    <img src={images.uni_Logo} alt="University Logo" className='uni-logo-image' />
                    <h1 className='Login'>Welcome back</h1>
                    <p className='top-second-text'>Please sign in to your account</p>
                </div>

                <div className='input-section'>
                    <div className='input-group'>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            className='input-field'
                            value={professionalEmail}
                            onChange={(e) => setProfessionalEmail(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading}
                            autoComplete="email"
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            type='password'
                            placeholder='Enter your password'
                            className='input-field'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading}
                            autoComplete="current-password"
                        />
                    </div>
                    <div className='forgot-link-container'>
                        <Link to='/forgot-password' className='foroget'>
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <div className='button-section'>
                    <button 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                    
                </div>

                {message && (
                    <div className={`message-text ${message.includes('Successful') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <div className='signup-section'>
                    <p>
                        Don't have an account?
                        <Link to='/register' className="a-link">Sign up</Link>
                    </p>
                </div>

                <div className='bottom-section1'>
                    <div className='bottom-text1'>
                        University of Uva Wellassa
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;