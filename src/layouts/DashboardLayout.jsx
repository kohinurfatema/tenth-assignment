// src/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Placeholder for a Dashboard Sidebar
const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-base-300 p-4 min-h-full">
      <h3 className="text-xl font-bold mb-4">Dashboard Menu</h3>
      <ul className="menu">
        <li><a>My Activities</a></li>
        <li><a>Profile Settings</a></li>
        <li><a>History</a></li>
      </ul>
    </aside>
  );
};

const DashboardLayout = () => {
    // NOTE: This layout is typically wrapped in an <AuthGuard> or similar component
    // that redirects unauthenticated users to the login page.

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header (can be the same Navbar or a simplified one) */}
            <Navbar /> 
            
            <div className="flex flex-grow">
                {/* Dashboard Sidebar */}
                <DashboardSidebar /> 
                
                {/* Main Dashboard Content */}
                <main className="flex-grow p-4 md:p-8 bg-base-100">
                    <Outlet /> {/* Renders Dashboard pages (My Activities, Profile) */}
                </main>
            </div>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default DashboardLayout;