import { Link } from "react-router-dom";
const Navbar = ({user}) => {
    return (
      <nav className="navbar">
        <h1>樂團系統</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/about">About</Link>
          
          <div className="dropdown">
            { !user ||user.user=="null" ? (
              <><button className="dropbtn">Login</button><div className="dropdown-content">
                  <Link to="/login">As User</Link>
                  <Link to="/login">As Band</Link>
                </div></>
            ) : (
              <><button className="dropbtn">{user.user}</button><div className="dropdown-content">
                  <Link to="/Profile">Profile</Link>
                  <Link to="/logout">Logout</Link>
                </div></>
            )}
          </div> 
          <Link to="/create">Make Band</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar;