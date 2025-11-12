// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext'; // <-- Import useAuth
import toast from 'react-hot-toast'; // We'll need toast for the logout message
import { FaUserCircle } from 'react-icons/fa'; // For the user avatar placeholder

const Navbar = () => {
  const { currentUser, logout } = useAuth(); // Get user state and logout function
  const navigate = useNavigate();

  // Navigation links array for easy maintenance
  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/challenges">Challenges</NavLink></li>
      <li><NavLink to="/my-activities">My Activities</NavLink></li>
    </>
  );

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out.", { duration: 1500 });
      // Redirect to the homepage after logout
      navigate('/'); 
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to log out.");
    }
  };

  // --- Dynamic Content based on Authentication State ---
  const authContent = currentUser ? (
    // State: Logged In (User Dropdown)
    <div className="dropdown dropdown-end">
      {/* Button/Avatar Trigger */}
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <div className="avatar placeholder">
          {/* Use user photoURL or a simple icon/initials */}
          <div className="bg-neutral text-neutral-content rounded-full w-10">
            {/* Show user's first initial or an icon */}
            {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="User Avatar" />
            ) : (
                <span className="text-sm">
                   {currentUser.email ? currentUser.email[0].toUpperCase() : <FaUserCircle className="w-6 h-6" />}
                </span>
            )}
          </div>
        </div>
        <span className="hidden md:block ml-2 font-semibold">
          {currentUser.displayName || currentUser.email.split('@')[0]}
        </span>
      </div>

      {/* Dropdown Menu */}
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link to="/my-activities">My Activities</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
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
    <div className="navbar bg-base-100 shadow-xl sticky top-0 z-50">
      
      {/* 1. Mobile Menu (Hamburger) and Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          {/* Hamburger Icon */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          {/* Mobile Menu Content */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {/* Main Links */}
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/challenges">Challenges</NavLink></li>
            <li><NavLink to="/my-activities">My Activities</NavLink></li>
            
            <div className="divider my-0"></div> 
            
            {/* Auth Links (Mobile) */}
            {currentUser ? (
              <>
                <li><a onClick={handleLogout}>Logout</a></li>
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
        <Link to="/" className="btn btn-ghost text-xl font-bold text-success gap-2 items-center">
          <span role="img" aria-label="EcoTrack logo" className="text-2xl">🌱</span>
          <span>EcoTrack</span>
        </Link>
      </div>

      {/* 2. Desktop Navigation Links */}
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