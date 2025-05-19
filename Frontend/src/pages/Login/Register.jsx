import React from 'react'
import './Register.css'
import Images from '../../assets/Image'

const Register = () => {
  return (
    <section className='Register'>
      <div className='Register-container'>
        <div className='Register-form'>
         { /*The photo is cropped  */}
          <div className='side-image'>

            <img className='img'src={Images.Register} alt="Register" />

          </div>

          <div className='form-section'>

            <div className='title-section'>
              <h1 className='title'>Register</h1>
              <h3 className='sub-title'>Register as a Doctor</h3>

            </div>
              <img className='logo'src={Images.Logo} alt="Logo" />

           
              
          
          </div>
          
          
          </div>
      </div>
      
    </section>

      
    
  )
}

export default Register
