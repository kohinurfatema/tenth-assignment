// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router';

// We'll use a mock state for demonstration
const MOCK_IS_LOGGED_IN = true; 
const MOCK_USER_NAME = "EcoWarrior";

const Navbar = () => {
  // Navigation links array for easy maintenance
  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/challenges">Challenges</NavLink></li>
      <li><NavLink to="/activities">My Activities</NavLink></li>
    </>
  );

  const authContent = MOCK_IS_LOGGED_IN ? (
    // State: Logged In (User Dropdown)
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <div className="avatar placeholder">
          {/* DaisyUI Placeholder for Avatar */}
          <div className="bg-neutral text-neutral-content rounded-full w-10">
            <span className="text-sm">{MOCK_USER_NAME[0]}</span>
          </div>
        </div>
        <span className="hidden md:block ml-2">{MOCK_USER_NAME}</span>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/activities">My Activities</Link></li>
        <li><a onClick={() => console.log('Logging out...')}>Logout</a></li>
      </ul>
    </div>
  ) : (
    // State: Not Logged In (Login/Register Buttons)
    <div className="flex gap-2">
      <Link to="/login" className="btn btn-ghost">Login</Link>
      <Link to="/register" className="btn btn-primary">Register</Link>
    </div>
  );


  return (
    // DaisyUI: navbar and shadow classes
    <div className="navbar bg-base-100 shadow-xl sticky top-0 z-50">
      
      {/* 1. Mobile Menu (Hamburger) - Visible only on small screens */}
      <div className="navbar-start">
        <div className="dropdown">
          {/* Hamburger Icon */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          {/* Mobile Menu Content */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navLinks}
            <div className="divider my-0"></div> {/* Separator */}
            {MOCK_IS_LOGGED_IN ? (
              <>
                <li><Link to="/profile">Profile</Link></li>
                <li><a onClick={() => console.log('Logging out...')}>Logout</a></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
        
        {/* Logo and App Name */}
        <Link to="/" className="btn btn-ghost text-xl font-bold text-success">
          🌱 EcoTrack
        </Link>
      </div>

      {/* 2. Desktop Navigation Links - Hidden on small screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      {/* 3. Right Side (Auth Actions) */}
      <div className="navbar-end">
        {authContent}
      </div>
    </div>
  );
};

export default Navbar;