import React, { useEffect, useState } from "react";
import SlideBar from "../../components/SlideBar/SlideBar";
import { Navigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import UserProfile from '../../components/UserProfile/UseraProfile';
import "./layout.css";

const Layout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [doctor, setDoctor] = useState(null);

    const handleToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    useEffect(() => {
        const checkDoctorLogin = async () => {
            try {
                const res = await fetch("http://localhost:5000/doctor/check-login", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    setIsAuthenticated(false);
                    setDoctor(null);
                    return;
                }

                const data = await res.json();

                if (data.success && data.data?.doctor) {
                    setIsAuthenticated(true);
                    setDoctor(data.data.doctor);
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
                {/* Sidebar */}
                <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
                    <SlideBar isCollapsed={isCollapsed} onToggle={handleToggle} />
                </div>

                {/* Main content */}
                <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
                    {/* Top bar with UserProfile */}
                    <div className="top-bar">
                        {doctor && (
                            <UserProfile
                                name={`Dr. ${doctor.fullName}`}
                                image={doctor.photo}
                            />
                        )}
                    </div>

                    {children}
                </div>
            </div>
        </DoctorContext.Provider>
    );
};

export default Layout;
