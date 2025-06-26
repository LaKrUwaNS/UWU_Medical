import React from 'react'
import images from '../../assets/Image';
import './login.css';


function Login() {
  return (
    <div className='login-wrapper'>
        <div className="bg-overlay"
        style={{backgroundImage :`url(${images.Login})`}}
        >
        </div>
        <div className="header">
            <img src={images.logo} alt="logo" />
            <h1 className='name'>UVA WELLASSA UNIVERSITY <br/>MEDICAL CENTER</h1>
        </div>

        <div className="login-box">
            <h1>L<span className='highlight'>O</span>GIN</h1>
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />

            <div className="froget-password">
                <a href="#">Frogot password</a>
            </div>

            <div className="login-btns">
                <button className='clear-btn'>CLEAR</button>
                <button className='submit-btn'>SUBMIT</button>
            </div>

            <div className="register-link">
                 <a href="#">Register as a student</a>
            </div>


        </div>


    </div>
  )
}

export default Login;