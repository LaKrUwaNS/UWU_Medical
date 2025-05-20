import React from 'react';
import './Register.css';
import Images from '../../assets/Image';

const Register = () => {
  return (
    <section className='Register'>
      <div className='Register-container'>

        <div className='Register-form'> {/* This is the middle box */}

          {/* Side image section */}
          <div className='side-image'>
            <img className='img' src={Images.Register} alt="Register" />
          </div>
           <div className='form-right'>
                  {/* Form section */}
                  <div className='form-section-title'>

                    {/* Title section */}
                    <div className='title-section'>
                      <h1 className='title'>Register</h1>
                      <h3 className='sub-title'>Register as a Doctor</h3>
                    </div>

                    {/* Logo */}
                    <img className='logo' src={Images.Logo} alt="Logo" />
                  </div>
                  <div className='form-section'>
                    <div className='input-row'>
                      <input type="text" placeholder='User Name' className='w-half'/>
                      <input type="text" placeholder='Display Name' className='w-half'/>

                    </div>
                    <div className='email-row'>
                      <input type="email" placeholder='University Email' className='w-full'/>
                      <input type="email" placeholder='Personal Email' className='w-full'/>
                     </div> 
                   <button className='upload-btn' type='button'>
                        <img className='upload-icon' src={Images.Upload} alt="Upload" />
                      </button>
                    <div className='password'>
                      <input type="password" placeholder='Add Password' className='w-full'/>
                      <input type="password" placeholder='Confirm Password' className='w-full'/>

                    </div>
                    <div className='emp-security'>
                          <input type="text" placeholder='University EMP' className='w-half'/>
                          <input type="text" placeholder='Security Code' className='w-half'/>

                    </div>
                    <div className='btn-row'>
                      <button className='btn-register' type='button'>Register</button>
                      <button className='btn-cancel' type='button'>Cancel</button> 

                    </div>



                  </div>
           </div>

        </div>

      </div>
    </section>
  );
};

export default Register;
