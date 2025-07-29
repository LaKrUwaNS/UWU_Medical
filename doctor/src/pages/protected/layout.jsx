import React, { useEffect, useState } from "react";
import SlideBar from "../../components/SlideBar/SlideBar";
import { Navigate } from 'react-router-dom';
import './layout.css';

const Layout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const handleToggle = () => {
        setIsCollapsed(prev => !prev);
    };

    useEffect(() => {
        let interval;

        const checkDoctorLogin = async () => {
            try {
                const res = await fetch("http://localhost:5000/doctor/check-login", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await res.json();

                if (data.success && data.isAuthorized) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkDoctorLogin(); // Run once immediately

        interval = setInterval(checkDoctorLogin, 300000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    if (isAuthenticated === null) {
        return <div className="checking">Checking login status...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="main-layout">
            <div className={`sidebar-conatainer ${isCollapsed ? 'collapsed' : ''}`}>
                <SlideBar isCollapsed={isCollapsed} onToggle={handleToggle} />
            </div>
            <div className={`main-content ${isCollapsed ? 'collapsed' : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
