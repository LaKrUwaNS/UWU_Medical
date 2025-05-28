
import './SideBar.css';
import React,{useState} from 'react';
import Images from '../assets/Image';

const NavBar = () => {

  const [isCollapsed,setIsCollapsed] = useState(false);

  const toggleSidebar =() => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`Sidebar ${isCollapsed ? 'colapsed':''}`}>
      <div className='header'>
        
          <img className='logo'src={Images.Logo} alt="logo" />
    
        {!isCollapsed && (
          <div className='name'>
            <span className='medical-center'>Medical Center</span>
          </div>
        )}

        </div>

      <div className='menu-section'>
        {!isCollapsed && 
          <div className='menu-title'>
            Main Menu
            </div>
        }

              <div className='menu-item'>
                <img className='icon'src={Images.Dashbord} alt="dashbord" />
                {!isCollapsed && 
                    <span className='text'>Dashbord</span>
                  }
              </div>

              <div className='menu-item'>
                <img className='icon'src={Images.Sd} alt="student-data" />
                {!isCollapsed && 
                    <span className='text'>Student Data</span>
                  }
              </div>
                <div className='menu-item'>
                  <img className='icon'src={Images.Request} alt="request" />
                  {!isCollapsed && 
                      <span className='text'>Medical Requests</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Images.Reminder} alt="reminder" />
                  {!isCollapsed && 
                      <span className='text'>Reminders</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Images.Updates} alt="updates" />
                  {!isCollapsed && 
                      <span className='text'>Updates</span>
                    }
                </div>
                {!isCollapsed && 
                    <div className='menu-title'>
                        Second Menu
                    </div>
                }

                <div className='menu-item'>
                  <img className='icon'src={Images.Medicine} alt="Medicine Data" />
                  {!isCollapsed && 
                      <span className='text'>Medicine Data</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Images.Staff} alt="Staff" />
                  {!isCollapsed && 
                      <span className='text'>Staff</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Images.Reports} alt="Reports" />
                  {!isCollapsed && 
                      <span className='text'>Reports</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Images.Setting} alt="Settings" />
                  {!isCollapsed && 
                      <span className='text'>Settings</span>
                    }
                </div>

      </div>

      <div className='bottom-section'>
        
        <button className='toggle-btn' onClick={toggleSidebar}>
          <img className='toggle-icon'src={Images.Toggle} alt="toggle" />
        </button>
      </div>
      

      </div>



      

    
  )
}

export default NavBar
