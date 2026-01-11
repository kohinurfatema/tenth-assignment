// src/components/Navbar.jsx
  import { Link, NavLink, useNavigate } from 'react-router';
  import { useAuth } from '../context/AuthContext';
  import { useTheme } from '../context/ThemeContext';
  import toast from 'react-hot-toast';
  import { FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';

  const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const linkClass = ({ isActive }) =>
      isActive
        ? "text-success font-bold border-b-2 border-success bg-success/10 rounded-t-lg"
        : "hover:text-success hover:bg-success/5 transition-colors duration-200";

    const publicLinks = (
      <>
        <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
        <li><NavLink to="/challenges" className={linkClass}>Challenges</NavLink></li>
        <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
      </>
    );

    const authLinks = (
      <>
        <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
        <li><NavLink to="/challenges" className={linkClass}>Challenges</NavLink></li>
        <li><NavLink to="/my-activities" className={linkClass}>My Activities</NavLink></li>
        <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
        <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
      </>
    );

    const handleLogout = async () => {
      try {
        await logout();
        toast.success("Successfully logged out.", { duration: 1500 });
        navigate('/');
      } catch (error) {
        console.error("Logout Error:", error);
        toast.error("Failed to log out.");
      }
    };

    const themeToggle = (
      <button
        onClick={toggleTheme}
        className="btn btn-ghost btn-circle"
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? (
          <FaMoon className="w-5 h-5" />
        ) : (
          <FaSun className="w-5 h-5 text-yellow-400" />
        )}
      </button>
    );

    const authContent = currentUser ? (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
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
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/my-activities">My Activities</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    ) : (
      <div className="flex gap-2">
        <Link to="/login" className="btn btn-ghost">Login</Link>
        <Link to="/register" className="btn btn-primary">Register</Link>
      </div>
    );

    return (
      <div className="navbar bg-base-100 shadow-xl sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="
2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {currentUser ? (
                <>
                  <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
                  <li><NavLink to="/challenges" className={linkClass}>Challenges</NavLink></li>
                  <li><NavLink to="/my-activities" className={linkClass}>My Activities</NavLink></li>
                  <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
                  <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
                  <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/" className={linkClass} end>Home</NavLink></li>
                  <li><NavLink to="/challenges" className={linkClass}>Challenges</NavLink></li>
                  <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
                </>
              )}
              <div className="divider my-0"></div>
              {currentUser ? (
                <>
                  <li><Link to="/profile">Profile</Link></li>
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
          <Link to="/" className="btn btn-ghost text-xl font-bold text-success gap-2 items-center">
            <span role="img" aria-label="EcoTrack logo" className="text-2xl">🌱</span>
            <span>EcoTrack</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {currentUser ? authLinks : publicLinks}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {themeToggle}
          {authContent}
        </div>
      </div>
    );
  };

  export default Navbar;
