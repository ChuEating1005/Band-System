import { Link } from "react-router-dom";
import { useState, useEffect  } from 'react'
import { NavLink } from 'react-router-dom'
import logo from './img/Band_System.png';
import './navbar.css'

const Navbar = ({user, role}) => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
    }
    let profile = "/Profile";
    if (role === "band"){
      profile = "/BandProfile"
    }
    
      
    return (
      <nav className="navbar">
      <div className="container">
        <div className="logo">
          <NavLink to="/home"><img src={logo} className="d-inline"/></NavLink>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/home"><i class="fas fa-home"></i>&nbsp;&nbsp;Home</NavLink>
            </li>
            <li>
              
              <NavLink to="/searchmusician">
                <i class="fas fa-search"></i>&nbsp;&nbsp;Find Members</NavLink>
            </li>
            <li>
              
              <NavLink to="/About"><i class="fas fa-guitar"></i>&nbsp;&nbsp;About</NavLink>
            </li>
                  { !user ||user.user=="null" ? (
                    <>
                      <li>
                        <NavLink to="/login"><i class="fas fa-user"></i>&nbsp;&nbsp;Login As User</NavLink>
                      </li>
                      <li>
                        <NavLink to="/BandLogin"><i class="fas fa-users"></i>&nbsp;&nbsp;Login As Band</NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink to={profile}><i class="fas fa-id-card"></i>&nbsp;&nbsp;{user}</NavLink>
                      </li>
                      <li>
                        <NavLink to="/logout"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Logout</NavLink>
                      </li>
                    </>
                  )}
          </ul>
        </div>
      </div>
    </nav>
      
    );
  }
   
export default Navbar;





