import React from 'react'
import './Login.css'
import Images from '../../assets/Image'


function Login() {
  return (
    <section className='login'>
      <div className='Left-side'>
        <img className='login-img' src={Images.Login} alt="login-baner-img" />
      </div>
      <div className='Right-side'>
        <div className='right-side-top-content'>
          <div className='right-top-text-content'>
            <h2 className='login-font'>Login</h2>
            <span className='span'>Good Day Docter Make Your Login </span>
          </div>
          <div className='top-img'>
            <img className='right-top-img' src={Images.Logo} alt="login-top-img" />
          </div>
        </div>
        <div className='input-field'>
          <input type='text' placeholder='User Name' className='input' />
          <input type='password' placeholder='Password' className='input' />
        </div>
        <div className='link-font'>
          <a className='link-font-one' href="####">Forget Password or email</a>
        </div>
        <div className='button-section'>
          <button className='login-btn'>Login</button>
          <button className='sign-btn'>Cancel</button>
        </div>
        <div className='bottom-text-one'>
          <span className='text-one'>New Docter Account </span>
          <a className='text-two' href="####">Sign Up</a>
        </div>
        <div className='bottom-text-two'>
          <span className='welcome-font'>Welcome to the Webservice of the University of Uva Wellassa</span>
        </div>
        <div className='bottom-text-three'>
          <a className='text-three' href="####">Contact the Admin</a>
        </div>

      </div>

    </section>

  )
}

export default Login