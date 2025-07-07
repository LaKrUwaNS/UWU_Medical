import React from 'react'
import './Verificationmessage.css'

function Verificationmessage() {
    return (
        <div className='full-container'>
            <div className='container '>
                <div className='topic'>
                    <h2>Validate Your Working Mail</h2>
                </div>
                <div className='input-box'>
                    <input type='text' maxLength="1" className='otp-section' />
                    <input type='text' maxLength="1" className='otp-section' />
                    <input type='text' maxLength="1" className='otp-section' />
                    <input type='text' maxLength="1" className='otp-section' />
                    <input type='text' maxLength="1" className='otp-section' />

                </div>
                <div className='message'>
                    <p>We have sent a one-time verification email to your professional email address.<br></br> Please check your inbox, use the verification link, and re-enter your details.<br></br> Make sure to enter the correct password</p>
                </div>
                <div className='submit-button'>
                    <button className='submit'>Submit</button>
                </div>
                <p className='resend'> <a href='####'>Resend the Main</a> </p>
            </div>
        </div>
    )
}

export default Verificationmessage