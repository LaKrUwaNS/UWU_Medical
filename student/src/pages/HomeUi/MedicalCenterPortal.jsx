import React, { useState, useEffect } from 'react';
import { Edit, Home, Calendar, Settings, User, Stethoscope, Bell, FileText, MessageCircle, Menu, X } from 'lucide-react';

export default function MedicalCenterPortal() {
  const [activePage, setActivePage] = useState('updates');
  const [hoveredNav, setHoveredNav] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: 'apply', label: 'Apply medical', icon: Stethoscope },
    { id: 'updates', label: 'Updates', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'contact', label: 'Contact Doctor', icon: MessageCircle }
  ];

  // Additional menu items for expanded sidebar
  const additionalMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'student-data', label: 'Student Data', icon: User },
    { id: 'medical-requests', label: 'Medical Requests', icon: FileText },
    { id: 'reminders', label: 'Reminders', icon: Calendar }
  ];

  const styles = {
    // Container and Layout
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      color: '#374151',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    },
    header: {
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 30
    },
    headerTitle: {
      color: '#374151',
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '600',
      margin: 0,
      paddingRight: '16px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    mobileMenuButton: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px',
      backgroundColor: 'transparent',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'all 0.2s'
    },
    mobileMenuButtonHover: {
      backgroundColor: '#f3f4f6',
      borderColor: '#2073c2ff',
      color: '#2073c2ff'
    },
    mainLayout: {
      display: 'flex',
      position: 'relative'
    },

    // Overlay
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 35,
      display: isMobile && sidebarOpen ? 'block' : 'none'
    },

    // Sidebar Styles
    sidebar: {
      width: sidebarCollapsed && !isMobile ? '80px' : '256px',
      background: 'white',
      color: '#374151',
      minHeight: '100vh',
      position: isMobile ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
      transition: 'all 0.3s ease-in-out',
      zIndex: 40,
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      borderRight: '1px solid #e5e7eb'
    },
    logoSection: {
      padding: sidebarCollapsed && !isMobile ? '16px 8px' : '24px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: 'white',
      position: 'relative'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start',
      marginBottom: '8px'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #2073c2ff, #2073c2ff)',
      borderRadius: '8px',
      marginRight: sidebarCollapsed && !isMobile ? '0' : '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)'
    },
    logoText: {
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#374151',
      margin: 0,
      display: sidebarCollapsed && !isMobile ? 'none' : 'block'
    },
    logoSubtext: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0,
      display: sidebarCollapsed && !isMobile ? 'none' : 'block'
    },
    collapseButton: {
      position: 'absolute',
      right: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: '#f3f4f6',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      padding: '6px',
      cursor: 'pointer',
      color: '#6b7280',
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    },

    // Navigation Styles
    nav: {
      paddingTop: '24px',
      paddingLeft: sidebarCollapsed && !isMobile ? '8px' : '12px',
      paddingRight: sidebarCollapsed && !isMobile ? '8px' : '12px'
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    navItem: {
      marginBottom: '8px'
    },
    navButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start',
      padding: sidebarCollapsed && !isMobile ? '12px' : '16px',
      border: 'none',
      background: 'none',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      color: '#6b7280',
      position: 'relative'
    },
    navButtonActive: {
      background: '#5aa4e9ff',
      color: 'white',
      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
      transform: 'scale(1.02)'
    },
    navButtonHover: {
      // backgroundColor: '#f0fdf4',
      color: '#2073c2ff',
      transform: 'scale(1.01)'
    },
    navIcon: {
      width: '18px',
      height: '18px',
      marginRight: sidebarCollapsed && !isMobile ? '0' : '16px'
    },
    navLabel: {
      display: sidebarCollapsed && !isMobile ? 'none' : 'block'
    },
    menuSection: {
      marginBottom: '24px'
    },
    menuSectionTitle: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#9ca3af',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '12px',
      paddingLeft: sidebarCollapsed && !isMobile ? '0' : '16px',
      textAlign: sidebarCollapsed && !isMobile ? 'center' : 'left',
      display: sidebarCollapsed && !isMobile ? 'none' : 'block'
    },

    // Doctor Profile Styles
    doctorProfile: {
      position: 'absolute',
      bottom: '24px',
      left: sidebarCollapsed && !isMobile ? '8px' : '12px',
      right: sidebarCollapsed && !isMobile ? '8px' : '12px'
    },
    doctorCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start',
      padding: sidebarCollapsed && !isMobile ? '12px' : '16px',
      background: '#f0fdf4',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #dcfce7'
    },
    doctorAvatar: {
      width: sidebarCollapsed && !isMobile ? '32px' : '48px',
      height: sidebarCollapsed && !isMobile ? '32px' : '48px',
      background: 'linear-gradient(135deg, #2073c2ff, #2073c2ff)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: sidebarCollapsed && !isMobile ? '0' : '16px',
      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)'
    },
    doctorInfo: {
      display: sidebarCollapsed && !isMobile ? 'none' : 'block'
    },
    doctorName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      margin: 0
    },
    doctorStatus: {
      fontSize: '12px',
      color: '#2073c2ff',
      margin: 0,
      display: 'flex',
      alignItems: 'center'
    },
    onlineIndicator: {
      width: '8px',
      height: '8px',
      backgroundColor: '#2073c2ff',
      borderRadius: '50%',
      marginRight: '8px',
      animation: 'pulse 2s infinite'
    },

    // Main Content Styles
    mainContent: {
      flex: 1,
      padding: isMobile ? '16px' : '24px',
      marginLeft: isMobile ? '0' : '0',
      width: isMobile ? '100%' : `calc(100% - ${sidebarCollapsed ? '80px' : '256px'})`,
      minHeight: '100vh',
      transition: 'width 0.3s ease-in-out'
    },
    contentCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: isMobile ? '16px' : '24px',
      color: 'black',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    pageTitle: {
      fontSize: isMobile ? '24px' : '32px',
      fontWeight: 'bold',
      marginBottom: '24px',
      margin: '0 0 24px 0'
    },

    // Form Styles
    formGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'white',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      minHeight: '120px',
      resize: 'vertical',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    button: {
      width: '100%',
      backgroundColor: '#2073c2ff',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s, transform 0.1s'
    },
    buttonHover: {
      backgroundColor: '#2073c2ff',
      transform: 'translateY(-1px)'
    },

    // Update Page Styles
    updateCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    updateImage: {
      position: 'relative',
      height: isMobile ? '200px' : '256px',
      backgroundColor: '#e5e7eb'
    },
    updateImageImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    editButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      padding: '8px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    editButtonHover: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    updateContent: {
      padding: isMobile ? '16px' : '24px',
      color: 'black'
    },
    updateText: {
      fontSize: '14px',
      lineHeight: '1.6',
      marginBottom: '16px'
    },

    // Contact Page Styles
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '32px'
    },
    doctorInfoCard: {
      backgroundColor: '#eff6ff',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px'
    },
    doctorInfoHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    doctorInfoAvatar: {
      width: '64px',
      height: '64px',
      backgroundColor: '#2073c2ff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px'
    },
    doctorInfoName: {
      fontSize: '20px',
      fontWeight: '600',
      margin: '0 0 4px 0'
    },
    doctorInfoTitle: {
      color: '#6b7280',
      margin: 0
    },
    doctorInfoDetails: {
      fontSize: '14px'
    },
    doctorInfoRow: {
      marginBottom: '8px'
    },
    emergencyNotice: {
      backgroundColor: '#fef2f2',
      padding: '16px',
      borderRadius: '12px',
      borderLeft: '4px solid #f87171'
    },
    emergencyTitle: {
      fontWeight: '600',
      color: '#991b1b',
      marginBottom: '8px'
    },
    emergencyText: {
      color: '#7f1d1d',
      fontSize: '14px'
    },

    // Settings Page Styles
    settingsSection: {
      marginBottom: '24px',
      paddingBottom: '24px',
      borderBottom: '1px solid #e5e7eb'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      cursor: 'pointer'
    },
    checkbox: {
      marginRight: '12px',
      width: '16px',
      height: '16px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: 'wrap'
    },
    secondaryButton: {
      backgroundColor: '#2073c2ff',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s, transform 0.1s'
    },
    secondaryButtonHover: {
      backgroundColor: '#047857',
      transform: 'translateY(-1px)'
    }
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Dashboard - Overview';
      case 'student-data': return 'Student Data - Profile Information';
      case 'medical-requests': return 'Medical Requests - Request History';
      case 'reminders': return 'Reminders - Upcoming Appointments';
      case 'apply': return 'Apply Medical - Application Form';
      case 'updates': return 'Update - Reading';
      case 'settings': return 'Settings - Profile Configuration';
      case 'contact': return 'Contact - Doctor Communication';
      default: return '';
    }
  };

  // New page components for additional menu items
  const DashboardPage = () => (
    <div style={styles.contentCard}>
      <h1 style={styles.pageTitle}>Dashboard</h1>
      <div style={styles.formGrid}>
        <div style={{...styles.doctorInfoCard, color: 'black'}}>
          <h3 style={styles.sectionTitle}>Welcome Back!</h3>
          <p>Here's an overview of your medical center activities.</p>
          <div style={styles.doctorInfoDetails}>
            <p><strong>Next Appointment:</strong> Tomorrow at 2:00 PM</p>
            <p><strong>Pending Requests:</strong> 2</p>
            <p><strong>Recent Updates:</strong> 3 new messages</p>
          </div>
        </div>
        <div style={{...styles.doctorInfoCard, color: 'black'}}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={() => setActivePage('apply')}>
              New Medical Request
            </button>
            <button style={styles.secondaryButton} onClick={() => setActivePage('contact')}>
              Contact Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StudentDataPage = () => (
    <div style={styles.contentCard}>
      <h1 style={styles.pageTitle}>Student Data</h1>
      <div style={styles.formGrid}>
        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Student ID</label>
            <input type="text" defaultValue="STU2024001" style={styles.input} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" defaultValue="John Doe" style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input type="email" defaultValue="john.doe@university.edu" style={styles.input} />
          </div>
        </div>
        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input type="tel" defaultValue="+94 77 123 4567" style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Emergency Contact</label>
            <input type="tel" defaultValue="+94 77 987 6543" style={styles.input} />
          </div>
          <button style={styles.button}>Update Information</button>
        </div>
      </div>
    </div>
  );

  const MedicalRequestsPage = () => (
    <div style={styles.contentCard}>
      <h1 style={styles.pageTitle}>Medical Requests</h1>
      <div style={{marginBottom: '24px'}}>
        <button style={styles.button} onClick={() => setActivePage('apply')}>
          + New Medical Request
        </button>
      </div>
      <div style={styles.formGrid}>
        {[1, 2, 3].map((request) => (
          <div key={request} style={{...styles.doctorInfoCard, color: 'black'}}>
            <h3 style={styles.sectionTitle}>Request #{request}</h3>
            <div style={styles.doctorInfoDetails}>
              <p><strong>Type:</strong> General Consultation</p>
              <p><strong>Date:</strong> 2024-08-0{request}</p>
              <p><strong>Status:</strong> {request === 1 ? 'Approved' : request === 2 ? 'Pending' : 'Completed'}</p>
              <p><strong>Doctor:</strong> Dr. Lakruwan Shanika</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RemindersPage = () => (
    <div style={styles.contentCard}>
      <h1 style={styles.pageTitle}>Reminders</h1>
      <div style={styles.formGrid}>
        <div style={{...styles.doctorInfoCard, color: 'black'}}>
          <h3 style={styles.sectionTitle}>Upcoming Appointments</h3>
          <div style={styles.doctorInfoDetails}>
            <p style={styles.doctorInfoRow}><strong>Tomorrow, 2:00 PM</strong> - General Checkup</p>
            <p style={styles.doctorInfoRow}><strong>Aug 10, 10:00 AM</strong> - Vaccination</p>
            <p style={styles.doctorInfoRow}><strong>Aug 15, 3:30 PM</strong> - Follow-up</p>
          </div>
        </div>
        <div style={{...styles.emergencyNotice, color: 'black'}}>
          <h4 style={styles.emergencyTitle}>Health Reminders</h4>
          <p style={styles.emergencyText}>• Annual health checkup due next month</p>
          <p style={styles.emergencyText}>• Flu vaccination available</p>
          <p style={styles.emergencyText}>• Update emergency contact information</p>
        </div>
      </div>
    </div>
  );

  const ApplyPage = () => (
    <div style={styles.contentCard}>
      <h1 style={styles.pageTitle}>Apply for Medical Services</h1>
      <div style={styles.formGrid}>
        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              type="text" 
              style={styles.input}
              placeholder="Enter your full name"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Student ID</label>
            <input 
              type="text" 
              style={styles.input}
              placeholder="Enter your student ID"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Medical Service Type</label>
            <select style={styles.select}>
              <option>General Consultation</option>
              <option>Vaccination</option>
              <option>Health Checkup</option>
              <option>Emergency Care</option>
            </select>
          </div>
        </div>
        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Preferred Date</label>
            <input 
              type="date" 
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Symptoms/Reason</label>
            <textarea 
              style={styles.textarea}
              placeholder="Describe your symptoms or reason for visit"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.textarea)}
            ></textarea>
          </div>
          <button 
            style={styles.button}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );

  const UpdatesPage = () => (
    <div style={styles.updateCard}>
      <div style={styles.updateImage}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 300'%3E%3Crect width='800' height='300' fill='%23f3f4f6'/%3E%3Cg fill='%23374151'%3E%3Crect x='50' y='100' width='80' height='40' rx='4'/%3E%3Crect x='150' y='100' width='80' height='40' rx='4'/%3E%3Crect x='250' y='100' width='80' height='40' rx='4'/%3E%3Crect x='350' y='100' width='80' height='40' rx='4'/%3E%3Crect x='450' y='100' width='80' height='40' rx='4'/%3E%3Crect x='550' y='100' width='80' height='40' rx='4'/%3E%3Crect x='650' y='100' width='80' height='40' rx='4'/%3E%3Crect x='50' y='160' width='80' height='40' rx='4'/%3E%3Crect x='150' y='160' width='80' height='40' rx='4'/%3E%3Crect x='250' y='160' width='80' height='40' rx='4'/%3E%3Crect x='350' y='160' width='80' height='40' rx='4'/%3E%3Crect x='450' y='160' width='80' height='40' rx='4'/%3E%3Crect x='550' y='160' width='80' height='40' rx='4'/%3E%3Crect x='650' y='160' width='80' height='40' rx='4'/%3E%3Crect x='50' y='220' width='80' height='40' rx='4'/%3E%3Crect x='150' y='220' width='80' height='40' rx='4'/%3E%3Crect x='250' y='220' width='80' height='40' rx='4'/%3E%3Crect x='350' y='220' width='80' height='40' rx='4'/%3E%3Crect x='450' y='220' width='80' height='40' rx='4'/%3E%3Crect x='550' y='220' width='80' height='40' rx='4'/%3E%3Crect x='650' y='220' width='80' height='40' rx='4'/%3E%3Crect x='300' y='20' width='200' height='60' rx='8' fill='%236b7280'/%3E%3Crect x='320' y='35' width='160' height='30' rx='4' fill='%233b82f6'/%3E%3C/g%3E%3C/svg%3E"
          alt="Lecture hall with desks and screen"
          style={styles.updateImageImg}
        />
        <button 
          style={styles.editButton}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.editButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.editButton)}
        >
          <Edit size={16} color="white" />
        </button>
      </div>
      
      <div style={styles.updateContent}>
        <h1 style={styles.pageTitle}>When using lecture halls</h1>
        
        <div style={styles.formGrid}>
          <div>
            <p style={styles.updateText}>
              When using lecture halls, it is important to prioritize health and safety to create a comfortable and productive learning environment. Proper ventilation should be maintained to ensure a steady flow of fresh air, reducing the risk of airborne illnesses and improving concentration. Seating should be arranged to promote good posture, as poor sitting positions over long periods can cause back and neck pain. Adequate lighting helps prevent eye strain, while maintaining a moderate room temperature ensures comfort for all attendees. Regular cleaning and sanitization of desks, chairs, and shared equipment are essential to limit the spread of germs.
            </p>
            
            <p style={styles.updateText}>
              Cleanliness and hygiene in lecture halls play a vital role in preventing the spread of diseases. High-contact surfaces such as desks, chairs, door handles, and microphones should be cleaned regularly. Students should also be encouraged to maintain personal hygiene and follow health protocols.
            </p>
          </div>
          
          <div>
            <p style={styles.updateText}>
              Another key factor is posture and seating comfort. Students often spend long hours in lecture halls, and poorly designed seating or incorrect sitting posture can lead to back, neck, and shoulder strain. It is advisable to sit with proper back support and adjust one's position periodically. Lecturers can encourage students to take brief stretching breaks during long sessions to improve blood circulation and prevent stiffness. This not only improves physical well-being but also boosts alertness and focus.
            </p>
            
            <p style={styles.updateText}>
              Lastly, crowd management and personal responsibility are essential to maintaining a healthy lecture hall atmosphere. Overcrowding can make it difficult to maintain personal space and proper ventilation throughout the room.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div style={styles.contentCard}>
      <h1 style={styles.pageTitle}>Settings</h1>
      
      <div>
        <div style={styles.settingsSection}>
          <h2 style={styles.sectionTitle}>Profile Settings</h2>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Display Name</label>
              <input 
                type="text" 
                defaultValue="Student User" 
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input 
                type="email" 
                defaultValue="student@medicalcenter.edu" 
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>
          </div>
        </div>
        
        <div style={styles.settingsSection}>
          <h2 style={styles.sectionTitle}>Notification Preferences</h2>
          <div>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked style={styles.checkbox} />
              <span>Email notifications for appointments</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked style={styles.checkbox} />
              <span>SMS reminders</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} />
              <span>Health tips and updates</span>
            </label>
          </div>
        </div>
        
        <div>
          <h2 style={styles.sectionTitle}>Account Security</h2>
          <div style={styles.buttonGroup}>
            <button 
              style={styles.button}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
            >
              Change Password
            </button>
            <button 
              style={styles.secondaryButton}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.secondaryButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.secondaryButton)}
            >
              Enable Two-Factor Auth
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div style={styles.contentCard}>
      <h1 style={styles.pageTitle}>Contact Doctor</h1>
      <div style={styles.contactGrid}>
        <div>
          <div style={styles.doctorInfoCard}>
            <div style={styles.doctorInfoHeader}>
              <div style={styles.doctorInfoAvatar}>
                <User size={32} color="white" />
              </div>
              <div>
                <h3 style={styles.doctorInfoName}>Dr. Lakruwan Shanika</h3>
                <p style={styles.doctorInfoTitle}>General Practitioner</p>
              </div>
            </div>
            <div style={styles.doctorInfoDetails}>
              <p style={styles.doctorInfoRow}><strong>Office Hours:</strong> Mon-Fri 9:00 AM - 5:00 PM</p>
              <p style={styles.doctorInfoRow}><strong>Phone:</strong> +94 11 234 5678</p>
              <p style={styles.doctorInfoRow}><strong>Email:</strong> dr.shanika@medicalcenter.edu</p>
              <p style={styles.doctorInfoRow}><strong>Emergency:</strong> +94 11 911 0000</p>
            </div>
          </div>
          
          <div style={styles.emergencyNotice}>
            <h4 style={styles.emergencyTitle}>Emergency Notice</h4>
            <p style={styles.emergencyText}>For medical emergencies, please call emergency services immediately or visit the nearest emergency room.</p>
          </div>
        </div>
        
        <div>
          <h3 style={styles.sectionTitle}>Send a Message</h3>
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <select style={styles.select}>
                <option>General Inquiry</option>
                <option>Appointment Request</option>
                <option>Prescription Refill</option>
                <option>Test Results</option>
                <option>Other</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea 
                style={styles.textarea}
                placeholder="Type your message here..."
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.textarea)}
              ></textarea>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={styles.checkbox} />
                <span>Mark as urgent</span>
              </label>
            </div>
            <button 
              style={styles.button}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPageContent = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage />;
      case 'student-data': return <StudentDataPage />;
      case 'medical-requests': return <MedicalRequestsPage />;
      case 'reminders': return <RemindersPage />;
      case 'apply': return <ApplyPage />;
      case 'updates': return <UpdatesPage />;
      case 'settings': return <SettingsPage />;
      case 'contact': return <ContactPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div style={styles.container}>
      {/* CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>
          {getPageTitle()}
        </h1>
        <button
          style={styles.mobileMenuButton}
          onMouseEnter={(e) => {
            if (isMobile) {
              Object.assign(e.target.style, styles.mobileMenuButtonHover);
            }
          }}
          onMouseLeave={(e) => {
            if (isMobile) {
              Object.assign(e.target.style, styles.mobileMenuButton);
            }
          }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div style={styles.mainLayout}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Logo and Title */}
          <div style={styles.logoSection}>
            <div style={styles.logoContainer}>
              <div style={styles.logoIcon}>
                <Home size={18} color="white" />
              </div>
              <div style={styles.doctorInfo}>
                <div style={styles.logoText}>Medical Center</div>
                <div style={styles.logoSubtext}>Student Portal</div>
              </div>
            </div>
            <button
              style={styles.collapseButton}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb';
                e.target.style.borderColor = '#2073c2ff';
                e.target.style.color = '#2073c2ff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.color = '#6b7280';
              }}
            >
              <Menu size={16} style={{
                transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }} />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav style={styles.nav}>
            {/* Main Menu Section */}
            <div style={styles.menuSection}>
              <div style={styles.menuSectionTitle}>Main Menu</div>
              <ul style={styles.navList}>
                {additionalMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  const isHovered = hoveredNav === item.id;
                  
                  return (
                    <li key={item.id} style={styles.navItem}>
                      <button
                        onClick={() => {
                          setActivePage(item.id);
                          setSidebarOpen(false);
                        }}
                        onMouseEnter={() => setHoveredNav(item.id)}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{
                          ...styles.navButton,
                          ...(isActive ? styles.navButtonActive : {}),
                          ...(isHovered && !isActive ? styles.navButtonHover : {})
                        }}
                      >
                        <Icon 
                          size={18} 
                          color={isActive ? '#ffffff' : isHovered ? '#2073c2ff' : '#6b7280'} 
                          style={styles.navIcon}
                        />
                        <span style={styles.navLabel}>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Current Menu Items */}
            <div style={styles.menuSection}>
              <div style={styles.menuSectionTitle}>Services</div>
              <ul style={styles.navList}>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  const isHovered = hoveredNav === item.id;
                  
                  return (
                    <li key={item.id} style={styles.navItem}>
                      <button
                        onClick={() => {
                          setActivePage(item.id);
                          setSidebarOpen(false);
                        }}
                        onMouseEnter={() => setHoveredNav(item.id)}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{
                          ...styles.navButton,
                          ...(isActive ? styles.navButtonActive : {}),
                          ...(isHovered && !isActive ? styles.navButtonHover : {})
                        }}
                      >
                        <Icon 
                          size={18} 
                          color={isActive ? '#ffffff' : isHovered ? '#2073c2ff' : '#6b7280'} 
                          style={styles.navIcon}
                        />
                        <span style={styles.navLabel}>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Doctor Profile */}
         
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
}