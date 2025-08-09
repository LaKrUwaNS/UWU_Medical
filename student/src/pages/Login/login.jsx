import React, { useState } from 'react';
import image from '../../assets/image.js';

import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
      console.log('Login attempt:', { email, password });
    }, 2000);
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className='login-wrapper'>
      <div className="bg-overlay"
           style={{backgroundImage: `url(${images.Login})`}}>
      </div>

      <div className="main-contentlogin">
        <div className="login-card">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo">
            <img src={image.Login} alt="University Logo" className='uni-logo-image' />

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
            onClick={handleSubmit}
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

          {/* Sign Up Section */}
          <div className="signup-section">
            <span className="signup-text">Don't have an account? </span>
            <a href="#" className="signup-link">Sign up</a>
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