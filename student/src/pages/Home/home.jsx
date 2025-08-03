import React, { useEffect, useState } from 'react';
import { FileText, Download, Search, Shield, Users, Database, Activity, Clock, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import './Home.css';

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const fileSystemFeatures = [
        {
            icon: <Database className="w-8 h-8" />,
            title: "Secure File Upload",
            description: "Enterprise-grade file upload system with automatic virus scanning and validation for documents, reports, and records.",
            features: ["Multi-format support (PDF, DOC, JPG, PNG)", "Real-time upload progress", "Automatic metadata extraction", "File size optimization"]
        },
        {
            icon: <Database className="w-8 h-8" />,
            title: "Intelligent Storage",
            description: "Advanced document management with automated categorization, version control, and intelligent archiving for optimal storage efficiency.",
            features: ["Auto-categorization by document type", "Version history tracking", "Duplicate detection", "Smart archiving policies"]
        },
        {
            icon: <Search className="w-8 h-8" />,
            title: "Advanced Search & Retrieval",
            description: "Lightning-fast search capabilities with OCR text recognition, metadata filtering, and AI-powered content discovery.",
            features: ["Full-text search with OCR", "Advanced filtering options", "Quick access bookmarks", "Search history and suggestions"]
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Security & Compliance",
            description: "Enterprise-grade security with end-to-end encryption, audit trails, and compliance with industry regulations.",
            features: ["256-bit AES encryption", "Access audit logs", "Industry compliance", "Role-based permissions"]
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Collaborative Access",
            description: "Streamlined sharing and collaboration tools for teams with granular permission controls and real-time notifications.",
            features: ["Team collaboration spaces", "Real-time file sharing", "Comment and annotation tools", "Activity notifications"]
        },
        {
            icon: <Activity className="w-8 h-8" />,
            title: "Analytics & Reporting",
            description: "Comprehensive analytics with usage statistics, storage insights, and compliance reporting for administrators.",
            features: ["Storage usage analytics", "Access pattern reports", "Compliance monitoring", "Performance metrics"]
        }
    ];

    const systemStats = [
        { number: "500K+", label: "Documents Processed", icon: <FileText className="w-6 h-6" /> },
        { number: "99.9%", label: "System Uptime", icon: <CheckCircle className="w-6 h-6" /> },
        { number: "50TB+", label: "Secure Storage", icon: <Database className="w-6 h-6" /> },
        { number: "<2s", label: "Average Search Time", icon: <Clock className="w-6 h-6" /> }
    ];

    const workflows = [
        {
            step: "01",
            title: "Document Upload",
            description: "Drag and drop files or use bulk upload for documents, ensuring automatic validation and metadata extraction."
        },
        {
            step: "02",
            title: "Intelligent Processing",
            description: "AI-powered categorization, OCR text extraction, and automatic indexing for enhanced searchability and organization."
        },
        {
            step: "03",
            title: "Secure Storage",
            description: "Encrypted storage with redundant backups, version control, and compliance-ready audit trails for all file operations."
        },
        {
            step: "04",
            title: "Easy Access",
            description: "Quick retrieval through advanced search, role-based access controls, and seamless integration with existing systems."
        }
    ];

    return (
        <div className="umc-container">
            {/* Navigation */}
            <nav className="nav-container">
                <div className="nav-content">
                    <div className="nav-flex">
                        <div className="nav-logo">
                            <div className="logo-icon">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="logo-text">
                                <h1>University Medical Center File Management System</h1>
                                <p>Document Management</p>
                            </div>
                        </div>

                        <div className="nav-links">
                            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
                            <a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
                            <a href="#workflow" className={`nav-link ${activeSection === 'workflow' ? 'active' : ''}`}>Workflow</a>
                            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
                        </div>

                        <div className="nav-actions">
                            <button className="btn-login">
                                <Users className="w-4 h-4" />
                                <span>Staff Login</span>
                            </button>
                            <button
                                className="mobile-menu-btn"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="mobile-menu">
                            <a href="#home">Home</a>
                            <a href="#features">Features</a>
                            <a href="#workflow">Workflow</a>
                            <a href="#contact">Contact</a>
                            <button className="mobile-login">
                                <Users className="w-4 h-4" />
                                <span>Staff Login</span>
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section with Background Image */}
            <section id="home" className="hero-section">
                <div className="hero-content">
                    <div className="hero-inner">
                        

                        <h1 className="hero-title">
                            Secure <span className="highlight">Document</span><br />
                            Management System
                        </h1>

                        <p className="hero-description">
                            Advanced file handling system designed for modern organizations.
                            Streamline document workflows, ensure compliance, and enhance data accessibility
                            with our intelligent file management platform.
                        </p>

                        <div className="hero-buttons">
                            <button 
                                className="btn-primary"
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                            >
                                <span>Student Login</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="btn-secondary">
                                <Download className="w-5 h-5" />
                                <span>Documentry</span>
                            </button>
                        </div>

                        <div className="hero-stats">
                            {systemStats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <div className="stat-icon">{stat.icon}</div>
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="section section-white">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">
                            Core Capabilities
                        </div>
                        <h2 className="section-title">
                            Advanced <span className="highlight">File Management</span> Features
                        </h2>
                        <p className="section-description">
                            Comprehensive document handling system built for modern organizations with
                            security, efficiency, and compliance at its core.
                        </p>
                    </div>

                    <div className="features-grid">
                        {fileSystemFeatures.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
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

            {/* Workflow Section */}
            <section id="workflow" className="section section-gray">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">
                            System Workflow
                        </div>
                        <h2 className="section-title">
                            Streamlined <span className="highlight">Document Processing</span>
                        </h2>
                        <p className="section-description">
                            Our intelligent file management system follows a proven workflow to ensure
                            maximum efficiency and security for all documents.
                        </p>
                    </div>

                    <div className="workflow-grid">
                        {workflows.map((workflow, index) => (
                            <div key={index} className="workflow-item">
                                <div className="workflow-step">
                                    {workflow.step}
                                </div>
                                <h3 className="workflow-title">{workflow.title}</h3>
                                <p className="workflow-description">{workflow.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section section-white">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-content">
                            <h2 className="contact-title">
                                Ready to Transform Your <span className="highlight">Document Management</span>?
                            </h2>
                            <p className="contact-description">
                                Get started with our advanced file management system.
                                Contact our team for implementation support and training.
                            </p>

                            <div className="contact-features">
                                {[
                                    "Free system consultation",
                                    "Custom integration support", 
                                    "Comprehensive staff training",
                                    "24/7 technical support"
                                ].map((feature, index) => (
                                    <div key={index} className="contact-feature">
                                        <CheckCircle className="w-6 h-6 check-icon" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="contact-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="form-input"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="form-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Organization Name"
                                    className="form-input"
                                />
                                <select className="form-input">
                                    <option value="">Select Interest Area</option>
                                    <option value="implementation">System Implementation</option>
                                    <option value="demo">Product Demo</option>
                                    <option value="support">Technical Support</option>
                                    <option value="training">Staff Training</option>
                                </select>
                                <textarea
                                    placeholder="Tell us about your current file management challenges..."
                                    className="form-input form-textarea"
                                    rows="4"
                                ></textarea>
                                <button className="form-submit">
                                    <span>Request Consultation</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <div className="footer-logo-icon">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="footer-info">
                                <h3>UMC File Management System</h3>
                                <p>
                                    Advanced document management for modern organizations.
                                </p>
                            </div>
                        </div>

                        <div className="footer-text">
                            <p>
                                © 2024 University Management Center. All rights reserved.
                            </p>
                            <p>
                                Securing data, streamlining workflows, enabling better productivity.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;