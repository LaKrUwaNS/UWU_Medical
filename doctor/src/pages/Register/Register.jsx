import React from 'react'
import './Register.css';
import images from '../../assets/images.js';
import { useState } from 'react';

function Register() {
    const [selectRole,setSelectRole] =useState('Doctor');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData =new FormData(e.target);
        const data =object.formEntries(formData.entries());

        if (selectRole === 'Doctor'){
            console.log('Doctor Registration Data:',data);
            //Replace with actual API call or route

        } else{
            console.log('Staff Registration Data:',data);
            //Replace with actual API call or route
        }
    };
  return (
        <div className="register-container">
            <div className='image-section'>
                <img src={images.register} alt="Register" className="register-image" />
            </div>

            <div className="register-form-sec">
                <div className="header">
                    <h1 className='title'>Register</h1>
                    <img className='logo'src={images.logo} alt="logo" />
                   
                </div>
                 <p className='sub-title'>Register as A Doctor</p>
                <div className="role-toggle">
                   <div className="role-toggle">
                <button
                    className={`doctor-btn ${selectRole === 'Doctor' ? 'active' : ''}`}
                    onClick={() => setSelectRole('Doctor')}
                >
                    Doctor
                </button>

                <button
                    className={`staff-btn ${selectRole === 'Staff' ? 'active' : ''}`}
                    onClick={() => setSelectRole('Staff')}
                >
                    Staff
                </button>
</div>

                </div>

                <form className="register-form" onSubmit={handleSubmit}>

                    <p className='text'>Enter Username and full name</p>
                    <input name="username" type="text" placeholder='Username' className="form-input"  required />
                    <input name="fullname"type="text" placeholder='Full name' className="form-input"  required/>
                    <p className='text'>Enter personal number</p>
                    <input name="mobile"type="tel" placeholder='Mobile Number' className="form-input"  required/> 
                    <p className='text'>Enter Work and personal Emails</p>
                     <input name="personalEmail" type="email" placeholder="Personal Email" className="form-input"  required />
                    <input name="universityEmail" type="email" placeholder="University Email" className="form-input"  required />

                    <div className='bottom'>
                    <input  name="verifyKey" type="text" placeholder="Verify Key" className="form-input"  required />

                    <div>
                        <p className='policy-text'>Read our security policy  <a className="readme-link"href="#">Read Me</a></p>
                    

                        <div className="checkbox-wrapper">
                            <label className='agree' >
                                <input type="checkbox" required/>
                                 Read and Agreed to the security policy
                            </label>
                        </div>
                    </div>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className='submit-btn'>Register</button>
                        <button type='button' className='cancel-btn'>Cancel</button>
                    </div>

                <p className='contact-admin'>Contact the Admin</p>

                </form>
            </div>

        </div>
        

  )
}

export default Register