
import './SideBar.css';
import React,{useState} from 'react';
import Image from '../assets/Image';

const NavBar = () => {

  const [isCollapsed,setIsCollapsed] = useState(false);

  const toggleSidebar =() => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`Sidebar ${isCollapsed ? 'colapsed':''}`}>
      <div className='header'>
        <div className='logo'>
          <img className='logo'src={Image.Logo} alt="logo" />
        </div>
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
                <img className='icon'src={Image.Dashbord} alt="dashbord" />
                {!isCollapsed && 
                    <span className='text'>Dashbord</span>
                  }
              </div>

              <div className='menu-item'>
                <img className='icon'src={Image.Sd} alt="student-data" />
                {!isCollapsed && 
                    <span className='text'>Student Data</span>
                  }
              </div>
                <div className='menu-item'>
                  <img className='icon'src={Image.Request} alt="request" />
                  {!isCollapsed && 
                      <span className='text'>Medical Requests</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Image.Reminder} alt="reminder" />
                  {!isCollapsed && 
                      <span className='text'>Reminders</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Image.Updates} alt="updates" />
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
                  <img className='icon'src={Image.Medicine} alt="Medicine Data" />
                  {!isCollapsed && 
                      <span className='text'>Medicine Data</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Image.Staff} alt="Staff" />
                  {!isCollapsed && 
                      <span className='text'>Staff</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Image. Reports} alt="Reports" />
                  {!isCollapsed && 
                      <span className='text'>Reports</span>
                    }
                </div>
                <div className='menu-item'>
                  <img className='icon'src={Image.Setting} alt="Settings" />
                  {!isCollapsed && 
                      <span className='text'>Settings</span>
                    }
                </div>

      </div>

      <div className='bottom-section'>
        
        <button className='toggle-btn' onClick={toggleSidebar}>
          <img className='toggle-icon'src={Image.Toggle} alt="toggle" />
        </button>
      </div>
      

      </div>



      

    
  )
}

export default NavBar
