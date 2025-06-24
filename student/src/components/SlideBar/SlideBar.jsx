import React,{useState} from 'react'
import './SlideBar.css'
import images from '../../assets/Image'

function SlideBar() {

    const [isCollapsed,setIsCollapsed] = useState(false);

    const toggleSidebar =() =>{
        setIsCollapsed(!isCollapsed);
    };

  return (
    <div className={`Sidebar ${isCollapsed ? 'colapsed' :''}`}>

        <div className="header">
            <img src={images.logo} alt="logo" />
        

        {!isCollapsed && (
            <div className="name">
                <span className='medical-center'>Medical Center</span>
            </div>
        )}

          </div>

        <div className="menu-section">
            {!isCollapsed &&
                <div className="menu-title">
                    Main Menu
                </div>
            }

                <div className="menu-item">
                    <img src={images.dashboard} alt="dashboard" />
                    {!isCollapsed &&
                        <span className='text'>Dashboard</span>
                        }
                </div>
                 
                <div className="menu-item">
                    <img src={images.studentData} alt="Student-data" />
                    {!isCollapsed &&
                        <span className='text'>Student Data</span>
                        }
                </div>
                <div className="menu-item">
                    <img src={images.medicalReq} alt="medicalreq" />
                    {!isCollapsed &&
                        <span className='text'>Medical Requests</span>
                        }
                </div>
                <div className="menu-item">
                    <img src={images.reminders} alt="Reminders" />
                    {!isCollapsed &&
                        <span className='text'>Reminders</span>
                        }
                </div>
                <div className="menu-item">
                    <img src={images.updates} alt="Updates" />
                    {!isCollapsed &&
                        <span className='text'>Updates</span>
                    }
                </div>
                {!isCollapsed && 
                    <div className='menu-title'>
                        Second Menu
                    </div>
                }

                <div className="menu-item">
                    <img src={images.medicineData} alt="Medicine Data" />
                    {!isCollapsed && 
                        <span className='text'>Medicine Data</span>
                    }
                </div>
                <div className="menu-item">
                    <img src={images.staff} alt="Staff" />
                    {!isCollapsed && 
                        <span className='text'>Staff</span>
                    }
                </div>
                <div className="menu-item">
                    <img src={images.reports} alt="Reports" />
                    {!isCollapsed && 
                        <span className='text'>Reports</span>
                    }
                </div>
                <div className="menu-item">
                    <img src={images.settings} alt="Settings" />
                    {!isCollapsed && 
                        <span className='text'>Settings</span>
                    }
                </div>

                
        </div>

        <div className="bottom-section">

            <button className='toggle-btn' onClick={toggleSidebar}>
                <img className='toggle-icon' src={images.toggle} alt="toggle" />
            </button>
        </div>
        
       
        
    </div>
  )
}

export default SlideBar