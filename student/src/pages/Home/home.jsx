import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Download,
    Search,
    Shield,
    Users,
    Database,
    Activity,
    Clock,
    CheckCircle,
    ArrowRight,
    Menu,
    X,
    Stethoscope,
    Calendar,
    UserCheck,
    UserPlus
} from 'lucide-react';
import './Home.css';
import landingBelow from '../../assets/Home/landingBelow.png';
import images from '../../assets/Image';

const Home = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Student Login - Navigate to internal route
    const StudentLogin = () => {
        navigate('/login');
    };

    // Doctor Login - External
    const DoctorLogin = () => {
        window.open(' http://localhost:5174/', '_blank', 'noopener,noreferrer');
    };

    // Staff Login - External
    const StaffLogin = () => {
        window.open(' http://localhost:5175/', '_blank', 'noopener,noreferrer');
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const medicalSystemFeatures = [
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Digital Medical Records",
            description: "Secure digital storage and management of student medical records, replacing traditional paper-based filing systems.",
            features: ["Electronic health records (EHR)", "Digital prescription management", "Medical history tracking", "Secure document storage"]
        },
        {
            icon: <UserCheck className="w-8 h-8" />,
            title: "Student Portal",
            description: "User-friendly interface for students to access their medical information, request reports, and check doctor availability.",
            features: ["View personal medical history", "Request medical reports online", "Check doctor availability", "Download medical certificates"]
        },
        {
            icon: <Stethoscope className="w-8 h-8" />,
            title: "Doctor Dashboard",
            description: "Comprehensive tools for medical staff to manage patient records, update treatments, and issue prescriptions efficiently.",
            features: ["Access patient medical history", "Update treatment records", "Issue digital prescriptions", "Schedule appointments"]
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Security & Privacy",
            description: "HIPAA-compliant security measures ensuring patient data confidentiality with role-based access controls.",
            features: ["Role-based user access", "Encrypted data storage", "Audit trail logging", "HIPAA compliance"]
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Appointment Management",
            description: "Streamlined appointment scheduling system connecting students with available medical staff.",
            features: ["Online appointment booking", "Doctor availability calendar", "Automated notifications", "Appointment history tracking"]
        },
        {
            icon: <Activity className="w-8 h-8" />,
            title: "Reporting & Analytics",
            description: "Generate comprehensive medical reports and maintain detailed analytics for administrative purposes.",
            features: ["Medical report generation", "Treatment statistics", "Usage analytics", "Administrative dashboards"]
        }
    ];

    const systemStats = [
        { number: "1000+", label: "Student Records", icon: <Users className="w-6 h-6" /> },
        { number: "99.9%", label: "System Uptime", icon: <CheckCircle className="w-6 h-6" /> },
        { number: "24/7", label: "System Access", icon: <Clock className="w-6 h-6" /> },
        { number: "<3s", label: "Record Retrieval", icon: <Search className="w-6 h-6" /> }
    ];

    const workflows = [
        {
            step: "01",
            title: "Student Registration",
            description: "Students register in the system and create their medical profiles with basic health information and contact details."
        },
        {
            step: "02",
            title: "Medical Consultation",
            description: "Doctors access student records during consultations, update medical history, and add new treatment information."
        },
        {
            step: "03",
            title: "Digital Prescription",
            description: "Medical staff issue digital prescriptions and medical certificates that are securely stored in the system."
        },
        {
            step: "04",
            title: "Report Access",
            description: "Students can easily access and download their medical reports, certificates, and prescription history online."
        }
    ];

    return (
        <div className="umc-container">
            {/* Navigation */}
            <nav className="nav-container">
                <div className="nav-content">
                    <div className="nav-flex">
                        <div className="nav-logo">
                            <div className="logo-icon-L">
                                <img className="L-logo" src={images.logo} alt="logo" />
                            </div>
                            <div className="logo-text">
                                <h1>UWU Medical Center</h1>
                                <p>Digital Health Records System</p>
                            </div>
                        </div>

                        <div className="nav-links">
                            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
                            <a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
                            <a href="#workflow" className={`nav-link ${activeSection === 'workflow' ? 'active' : ''}`}>How It Works</a>
                            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>About</a>
                        </div>

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div className="mobile-menu">
                            <a href="#home">Home</a>
                            <a href="#features">Features</a>
                            <a href="#workflow">How It Works</a>
                            <a href="#contact">About</a>
                            <div className="mobile-login-buttons">
                                <button className="mobile-login student-btn" onClick={StudentLogin}>
                                    <Users className="w-5 h-5" />
                                    <span>Student</span>
                                </button>
                                <button className="mobile-login doctor-btn" onClick={DoctorLogin}>
                                    <Stethoscope className="w-5 h-5" />
                                    <span>Doctor</span>
                                </button>
                                <button className="mobile-login staff-btn" onClick={StaffLogin}>
                                    <UserPlus className="w-5 h-5" />
                                    <span>Staff</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero-section">
                <div className="hero-content">
                    <div className="hero-inner">
                        <div className="hero-badge">
                            Uva Wellassa University Medical Center
                        </div>

                        <h1 className="hero-title">
                            Digital Medical Records<br />Management System
                        </h1>

                        <p className="hero-description">
                            Streamline medical record management at UWU Medical Center. Secure, efficient, and user-friendly system for students, doctors, and administrative staff.
                        </p>

                        <div className="hero-buttons">
                            <button className="btn-primary student-primary" onClick={StudentLogin}>
                                <Users className="w-5 h-5" />
                                <span>Student Portal</span>
                            </button>
                            <button className="btn-primary doctor-primary" onClick={DoctorLogin}>
                                <Stethoscope className="w-5 h-5" />
                                <span>Doctor Portal</span>
                            </button>
                            <button className="btn-primary staff-primary" onClick={StaffLogin}>
                                <UserPlus className="w-5 h-5" />
                                <span>Staff Portal</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="section section-white">
                <div className="home-container">
                    <div className="section-header">
                        <div className="section-badge">System Features</div>
                        <h2>Comprehensive Healthcare Management</h2>
                        <p>
                            Our system provides complete digital health record management tailored for the Uva Wellassa University Medical Center environment.
                        </p>
                    </div>

                    <div className="features-grid">
                        {medicalSystemFeatures.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                                <ul className="feature-list">
                                    {feature.features.map((item, idx) => (
                                        <li key={idx}>
                                            <CheckCircle className="w-4 h-4 check-icon" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="home-container">
                    <div className="stats-grid">
                        {systemStats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section id="workflow" className="section section-gray">
                <div className="home-container">
                    <div className="section-header">
                        <div className="section-badge">How It Works</div>
                        <h2 className="section-title">Simple Medical Record Process</h2>
                        <p className="section-description">
                            Our streamlined workflow ensures efficient management of medical records from registration to report access.
                        </p>
                    </div>

                    <div className="workflow-grid">
                        {workflows.map((workflow, index) => (
                            <div key={index} className="workflow-item">
                                <div className="workflow-step">{workflow.step}</div>
                                <h3 className="workflow-title">{workflow.title}</h3>
                                <p className="workflow-description">{workflow.description}</p>
                                {index < workflows.length - 1 && (
                                    <ArrowRight className="workflow-arrow" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="contact" className="section section-white">
                <div className="home-container">
                    <div className="contact-grid">
                        <div className="contact-content">
                            <h2 className="contact-title">About UWU Medical Center System</h2>
                            <h5 className="contact-description">
                                Developed by ICT students as part of their Independent Study Project, this system modernizes healthcare record management at Uva Wellassa University Medical Center.
                            </h5>
                            <div className="below">
                                <img className="landingBelow" src={landingBelow} alt="Medical Center System" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="home-container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <div className="footer-logo-icon">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <div className="footer-info">
                                <h3>UWU Medical Center System</h3>
                                <p>Digital healthcare record management for students and staff.</p>
                            </div>
                        </div>
                        <div className="footer-text">
                            <p>© 2024 Uva Wellassa University Medical Center. All rights reserved.</p>
                            <p>ICT 222-2: Independent Study Project I - Group 12</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
