import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import images from '../../assets/Image';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async () => {
        if (!email || !password) {
            setMessage('Please fill in all fields');
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // enable cookies for session
                body: JSON.stringify({ universityEmail: email, password })
            });

            const data = await response.json();

            if (data.success) {
                setMessage('Login Successful! Redirecting...');

                // Small delay for better UX
                setTimeout(() => {
                    navigate('/medical');
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
        <div className='login-wrapper'>
            <div className="bg-overlay"
                style={{ backgroundImage: `url(${images.Login})` }}>
            </div>

            <div className="main-contentlogin">
                <div className="login-card">
                    {/* Logo */}
                    <div className="logo-container">
                        <div className="logo">
                            <img src={images.LoginUniLogo} alt="University Logo" className='uni-logo-image' />

                        </div>
                    </div>

                    {/* Welcome Section */}
                    <div className="welcome-section">
                        <h1 className="welcome-title">Welcome back</h1>
                        <p className="welcome-subtitle">Please sign in to your account</p>
                    </div>

                    {/* Form Section */}
                    <div className="form-section">
                        <div className="input-group">
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="forgot-password">
                        <a href="#">Forgot password?</a>
                    </div>

                    {/* Sign In Button */}
                    <button
                        className="signin-btn"
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                

                {message && (
                    <div className={`message-text ${message.includes('Successful') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                {/* Sign Up Section */}
                <div className="signup-section">
                    <span className="signup-text">Don't have an account? </span>
                        <Link to='/register' className="a-link">Sign up</Link>
                </div>

                {/* University Footer */}
                <div className="university-footer">
                    <p className="university-text">University of Uva Wellassa</p>
                </div>
            </div>
        </div>
</div>
    );
}

export default Login;