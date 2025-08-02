import React from 'react'
import './Loadinganimate.css';
import images from '../../assets/Image'

function Loading() {
    return (
        <div>
            <div className='pulse-container'>
                <img src={images.uniLogo} alt="Loading...." className='pulse-logo' />
            </div>
        </div>
    )
}

export default Loading