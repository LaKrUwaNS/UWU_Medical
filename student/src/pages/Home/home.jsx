import React, { useEffect, useState } from 'react';
import { FileText, Upload, Download, Search, Shield, Users, Database, Activity, Clock, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import './home.css'; // Assuming you have a CSS file for styles

const UMCLanding = () => {
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
                    entry.target.classList.add('animate-in');
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const fileSystemFeatures = [
        {
            icon: <Upload className="w-8 h-8" />,
            title: "Secure File Upload",
            description: "HIPAA-compliant file upload system with automatic virus scanning and validation for medical documents, lab reports, and patient records.",
            features: ["Multi-format support (PDF, DICOM, JPG, PNG)", "Real-time upload progress", "Automatic metadata extraction", "File size optimization"]
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
            description: "Enterprise-grade security with end-to-end encryption, audit trails, and compliance with healthcare regulations.",
            features: ["256-bit AES encryption", "Access audit logs", "HIPAA compliance", "Role-based permissions"]
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Collaborative Access",
            description: "Streamlined sharing and collaboration tools for medical teams with granular permission controls and real-time notifications.",
            features: ["Team collaboration spaces", "Real-time file sharing", "Comment and annotation tools", "Activity notifications"]
        },
        {
            icon: <Activity className="w-8 h-8" />,
            title: "Analytics & Reporting",
            description: "Comprehensive analytics dashboard with usage statistics, storage insights, and compliance reporting for administrators.",
            features: ["Storage usage analytics", "Access pattern reports", "Compliance dashboards", "Performance metrics"]
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
            description: "Drag and drop files or use bulk upload for medical documents, ensuring automatic validation and metadata extraction."
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
            description: "Quick retrieval through advanced search, role-based access controls, and seamless integration with existing medical systems."
        }
    ];

    return (
        <div className="umc-container">
            {/* Navigation */}
            <nav className="nav-container">
                <div className="nav-content">
                    <div className="nav-brand">
                        <div className="nav-logo">
                            <FileText className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="nav-text">
                            <h1 className="nav-title">UMC Files</h1>
                            <p className="nav-subtitle">Medical Document Management</p>
                        </div>
                    </div>

                    <div className="nav-links">
                        <a href="#home" className={activeSection === 'home' ? 'nav-link active' : 'nav-link'}>Home</a>
                        <a href="#features" className={activeSection === 'features' ? 'nav-link active' : 'nav-link'}>Features</a>
                        <a href="#workflow" className={activeSection === 'workflow' ? 'nav-link active' : 'nav-link'}>Workflow</a>
                        <a href="#contact" className={activeSection === 'contact' ? 'nav-link active' : 'nav-link'}>Contact</a>
                    </div>

                    <div className="nav-actions">
                        <button className="nav-login-btn">
                            <Users className="w-4 h-4" />
                            Staff Login
                        </button>
                        <button
                            className="nav-mobile-toggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`nav-mobile ${isMenuOpen ? 'nav-mobile-open' : ''}`}>
                    <a href="#home" className="nav-mobile-link">Home</a>
                    <a href="#features" className="nav-mobile-link">Features</a>
                    <a href="#workflow" className="nav-mobile-link">Workflow</a>
                    <a href="#contact" className="nav-mobile-link">Contact</a>
                    <button className="nav-mobile-btn">Staff Login</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero-section animate-on-scroll">
                <div className="hero-bg-elements">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                    <div className="hero-orb hero-orb-3"></div>
                </div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-text">🚀 Next-Gen Medical File Management</span>
                    </div>

                    <h1 className="hero-title">
                        Secure <span className="hero-highlight">Medical Document</span><br />
                        Management System
                    </h1>

                    <p className="hero-description">
                        Advanced file handling system designed specifically for University Medical Centers.
                        Streamline document workflows, ensure HIPAA compliance, and enhance medical data accessibility
                        with our intelligent file management platform.
                    </p>

                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
                            Explore Features
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="btn-secondary">
                            <Download className="w-5 h-5" />
                            System Demo
                        </button>
                    </div>

                    <div className="hero-stats">
                        {systemStats.map((stat, index) => (
                            <div key={index} className="hero-stat">
                                <div className="hero-stat-icon">{stat.icon}</div>
                                <div className="hero-stat-content">
                                    <div className="hero-stat-number">{stat.number}</div>
                                    <div className="hero-stat-label">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-file-demo">
                        <div className="file-upload-demo">
                            <Upload className="w-12 h-12 text-green-600 mb-4" />
                            <div className="upload-progress">
                                <div className="progress-bar"></div>
                            </div>
                            <p className="upload-text">Uploading patient_records.pdf</p>
                        </div>

                        <div className="file-grid-demo">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="file-item-demo">
                                    <FileText className="w-6 h-6 text-green-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section animate-on-scroll">
                <div className="section-container">
                    <div className="section-header">
                        <div className="section-badge">
                            <span className="section-badge-text">Core Capabilities</span>
                        </div>
                        <h2 className="section-title">
                            Advanced <span className="section-highlight">File Management</span> Features
                        </h2>
                        <p className="section-description">
                            Comprehensive document handling system built for medical environments with
                            security, efficiency, and compliance at its core.
                        </p>
                    </div>

                    <div className="features-grid">
                        {fileSystemFeatures.map((feature, index) => (
                            <div key={index} className="feature-card animate-on-scroll">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                                <ul className="feature-list">
                                    {feature.features.map((item, idx) => (
                                        <li key={idx} className="feature-item">
                                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section id="workflow" className="workflow-section animate-on-scroll">
                <div className="section-container">
                    <div className="section-header">
                        <div className="section-badge">
                            <span className="section-badge-text">System Workflow</span>
                        </div>
                        <h2 className="section-title">
                            Streamlined <span className="section-highlight">Document Processing</span>
                        </h2>
                        <p className="section-description">
                            Our intelligent file management system follows a proven workflow to ensure
                            maximum efficiency and security for all medical documents.
                        </p>
                    </div>

                    <div className="workflow-container">
                        {workflows.map((workflow, index) => (
                            <div key={index} className="workflow-step animate-on-scroll">
                                <div className="workflow-number">{workflow.step}</div>
                                <div className="workflow-content">
                                    <h3 className="workflow-title">{workflow.title}</h3>
                                    <p className="workflow-description">{workflow.description}</p>
                                </div>
                                {index < workflows.length - 1 && (
                                    <div className="workflow-connector">
                                        <ArrowRight className="w-6 h-6 text-green-600" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section animate-on-scroll">
                <div className="section-container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h2 className="contact-title">
                                Ready to Transform Your <span className="section-highlight">Document Management</span>?
                            </h2>
                            <p className="contact-description">
                                Get started with our advanced medical file management system.
                                Contact our team for implementation support and training.
                            </p>

                            <div className="contact-features">
                                <div className="contact-feature">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <span>Free system consultation</span>
                                </div>
                                <div className="contact-feature">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <span>Custom integration support</span>
                                </div>
                                <div className="contact-feature">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <span>Comprehensive staff training</span>
                                </div>
                                <div className="contact-feature">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <span>24/7 technical support</span>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-container">
                            <div className="contact-form">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Medical Center Name"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <select className="form-select">
                                        <option value="">Select Interest Area</option>
                                        <option value="implementation">System Implementation</option>
                                        <option value="demo">Product Demo</option>
                                        <option value="support">Technical Support</option>
                                        <option value="training">Staff Training</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        placeholder="Tell us about your current file management challenges..."
                                        className="form-textarea"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <button className="form-submit">
                                    Request Consultation
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="section-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <FileText className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="footer-text">
                                <h3 className="footer-title">UMC File Management System</h3>
                                <p className="footer-description">
                                    Advanced medical document management for modern healthcare institutions.
                                </p>
                            </div>
                        </div>

                        <div className="footer-info">
                            <p className="footer-copyright">
                                © 2024 University Medical Center. All rights reserved.
                            </p>
                            <p className="footer-tagline">
                                Securing medical data, streamlining workflows, enabling better healthcare.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UMCLanding;