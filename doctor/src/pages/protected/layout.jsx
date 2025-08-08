import React, { useEffect, useState } from "react";
import SlideBar from "../../components/SlideBar/SlideBar";
import { Navigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import "./layout.css";

const Layout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [doctor, setDoctor] = useState(null);

    // Handle toggle for sidebar collapse
    const handleToggle = () => {
        setIsCollapsed(prev => !prev);
    };

    useEffect(() => {
        const checkDoctorLogin = async () => {
            try {
                const res = await fetch("http://localhost:5000/doctor/check-login", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await res.json();

                if (data.success && data.isAuthorized) {
                    setIsAuthenticated(true);
                    setDoctor(data.doctor);
                } else {
                    setIsAuthenticated(false);
                    setDoctor(null);
                }
            } catch {
                setIsAuthenticated(false);
                setDoctor(null);
            }
        };

        checkDoctorLogin();
        const interval = setInterval(checkDoctorLogin, 3600000);
        return () => clearInterval(interval);
    }, []);

    if (isAuthenticated === null) {
        return <div className="checking">Checking login status...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <DoctorContext.Provider value={doctor}>
            <div className="main-layout">
                {/* Fix the typo: sidebar-conatainer -> sidebar-container */}
                <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
                    <SlideBar isCollapsed={isCollapsed} onToggle={handleToggle} />
                </div>
                <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
                    {children}
                </div>
            </div>
        </DoctorContext.Provider>
    );
};

export default Layout;