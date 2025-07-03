import React from 'react'
import images from '../../assets/images.js'
import './Login.css'
import { useState } from 'react'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessege] = useState('');

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            setMessege('Login Successfull');
        }
        else {
            setMessege(data.message);
        }

    };

    const handleRegister = async () => {
        const response = await fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            setMessege('Registaion Successfull');
        }
        else {
            setMessege(data.message);
        }
    }

    return (
        <div className='login-container'>
            <div className='left-side'>
                <img src={images.fix} alt='Login Banner' className='login-banner-image' />
            </div>

            <div className='right-side'>

                <div className='top-section'>
                    <div className='top-login-text'>
                        <h1 className='Login'>Login</h1>
                        <p className='top-second-text'>good day docter make your logging</p>
                    </div>
                    <div className='uni-logo'>
                        <img src={images.uni_Logo} alt="university logo " className='uni-logo-image' />
                    </div>
                </div>
                <div className='input-section '>
                    <input type='text' placeholder='Username' className='input-field' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type='password' placeholder='Password' className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <a href='####' className='foroget'>Fogot Password or email</a>
                </div>
                <div className='button-section'>
                    <button className='login-button' onClick={handleLogin}>Login </button>
                    <button className='register-button' onclick={handleRegister}>Register</button>
                </div>
                <p className='signup-section'>New Docter Account <span className='signup-text'><a className="a-link" href='###'>sign up</a></span></p>
                <div className='bottom-line'>

                </div>
                <p className='bottom-text'>Welcome to the webservice of the university of Uva Wellassa </p>

                <a className='bottom-link' href='####'>Contact the Admin </a>

            </div>

        </div>
    )
}

export default Login