import React from "react";
import './home.css';
import images from "../../assets/Image";


function Home(){
    return(
        <div className="home-wrapper" style={{ backgroundImage: `url(${images.home})` }}>

            home

        </div>
    )
}

export default Home