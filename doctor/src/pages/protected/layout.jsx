// src/layout/Layout.jsx

import SlideBar from "../../components/SlideBar/SlideBar";
import { Navigate } from 'react-router-dom';
import './layout.css';
import { useEffect, useState } from "react";


const Layout = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const res = await fetch('http://localhost:5000/check-login', {
    //                 method: 'GET',
    //                 credentials: 'include',
    //             });
    //             const data = await res.json();
    //             setIsAuthenticated(data.success);
    //         } catch (error) {
    //             console.error('Auth check failed :', error);
    //             setIsAuthenticated(false);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     checkAuth();
    // }, []);

    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;



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
