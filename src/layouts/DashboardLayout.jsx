// src/layouts/DashboardLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaTasks, FaUser, FaCog, FaSignOutAlt, FaChartBar, FaUsers, FaPlus, FaBars, FaTimes, FaLeaf } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Determine user role (default to 'user' if not specified)
  const userRole = user?.role || 'user';
  const isAdmin = userRole === 'admin' || user?.email?.includes('admin');
  const isManager = userRole === 'manager' || user?.email?.includes('manager');

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const userMenuItems = [
    { to: '/dashboard', icon: FaChartBar, label: 'Overview' },
    { to: '/dashboard/my-activities', icon: FaTasks, label: 'My Activities' },
    { to: '/dashboard/add-challenge', icon: FaPlus, label: 'Add Challenge' },
    { to: '/dashboard/profile', icon: FaUser, label: 'Profile' },
    { to: '/dashboard/settings', icon: FaCog, label: 'Settings' },
  ];

  const adminMenuItems = [
    { to: '/dashboard', icon: FaChartBar, label: 'Overview' },
    { to: '/dashboard/users', icon: FaUsers, label: 'Manage Users' },
    { to: '/dashboard/challenges', icon: FaTasks, label: 'Manage Challenges' },
    { to: '/dashboard/add-challenge', icon: FaPlus, label: 'Add Challenge' },
    { to: '/dashboard/profile', icon: FaUser, label: 'Profile' },
    { to: '/dashboard/settings', icon: FaCog, label: 'Settings' },
  ];

  const managerMenuItems = [
    { to: '/dashboard', icon: FaChartBar, label: 'Overview' },
    { to: '/dashboard/my-activities', icon: FaTasks, label: 'My Activities' },
    { to: '/dashboard/challenges', icon: FaTasks, label: 'Manage Challenges' },
    { to: '/dashboard/add-challenge', icon: FaPlus, label: 'Add Challenge' },
    { to: '/dashboard/profile', icon: FaUser, label: 'Profile' },
    { to: '/dashboard/settings', icon: FaCog, label: 'Settings' },
  ];

  const menuItems = isAdmin ? adminMenuItems : isManager ? managerMenuItems : userMenuItems;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Mobile Header */}
      <div className="lg:hidden bg-base-100 shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaLeaf className="text-primary text-2xl" />
          <span className="font-bold text-xl">EcoTrack</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-ghost btn-circle">
          {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={"fixed lg:static inset-y-0 left-0 z-50 w-64 bg-base-100 shadow-lg transform transition-transform duration-300 lg:transform-none " + (sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-2 p-6 border-b border-base-200">
            <FaLeaf className="text-primary text-3xl" />
            <span className="font-bold text-2xl">EcoTrack</span>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-base-200">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-12">
                  <span className="text-lg">{user?.displayName?.[0] || user?.email?.[0] || 'U'}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user?.displayName || 'User'}</p>
                <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                <span className={"badge badge-sm mt-1 " + (isAdmin ? 'badge-accent' : isManager ? 'badge-secondary' : 'badge-primary')}>{isAdmin ? 'Admin' : isManager ? 'Manager' : 'User'}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboard"}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors " +
                      (isActive ? "bg-primary text-primary-content" : "hover:bg-base-200")
                    }
                  >
                    <item.icon className="text-lg" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-200">
            <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors mb-2">
              <FaHome className="text-lg" />
              <span>Back to Home</span>
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error hover:text-error-content transition-colors w-full"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:ml-0">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
