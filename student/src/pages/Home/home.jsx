import React from "react";
import './home.css';
import images from "../../assets/Image";


function Home(){
    return(
       
        <div className="home-wrapper" >

            <div className="bg-overlay"
            style={{ backgroundImage: `url(${images.home})` }}>
            </div>

            <div className="header">
                <img className="logo-img"src={images.logo} alt="logo" />
                <button className="login-btn">Doctor Login</button>
            </div>

            <div className="content">
                <h1 className="main-title">
                     your <span className="highlight">Health</span> Over Missition<br />
                    University Medical Center

                </h1>
                <p className="description">
                    At the heart of Uva Wellassa University, our Medical Center is committed to providing compassionate,
                    professional, and student-focused healthcare services. <br />
                    Whether you're booking an appointment, seeking medical advice, or learning about our dedicated team,
                    we're here to support your well-being every step of the way.

                </p>
                <p className="mobile-description">
                    UWU Medical Center offers compassionate, student-focused healthcare services for your well-being.
                </p>
                <button className="enter-btn">Enter &gt;&gt;</button>

            </div>

            <img className='smilingDocs'src={images.SmilingDoctors} alt="doctors" />

           

        </div>
        
    );
}

export default Home