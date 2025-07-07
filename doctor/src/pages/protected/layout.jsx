// src/layout/Layout.jsx

import SlideBar from "../../components/SlideBar/SlideBar";
import { Navigate } from 'react-router-dom';
import './layout.css';


const Layout = ({ children }) => {

    return (
        <div className="main-layout">
            <div className="sidebar-container">
                <SlideBar />
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
