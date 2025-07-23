// src/layout/Layout.jsx
import React,{useState} from "react";
import SlideBar from "../../components/SlideBar/SlideBar";
import { Navigate } from 'react-router-dom';
import './layout.css';


const Layout = ({ children }) => {
    const [isCollapsed,setIsCollapsed] = useState(false);



        const handleToggle = () =>{
            setIsCollapsed(prev => !prev);
        };
    

    return (
        <div className="main-layout">
           <div className={`sidebar-container ${isCollapsed ? "collapsed" :""}`}>
                <SlideBar isCollapsed={isCollapsed} onToggle={handleToggle} />

           </div>
           <div className={`main-content ${isCollapsed ? "collapsed" :""}`}>
                {children}

           </div>
        </div>
    );
};

export default Layout;
