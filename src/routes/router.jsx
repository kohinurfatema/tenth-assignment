// src/routes/router.jsx

import { createBrowserRouter } from "react-router";

// --- Layout Imports ---
import PublicLayout from "../layouts/PublicLayout"; 
import DashboardLayout from "../layouts/DashboardLayout";

// --- Public Page Imports ---
import HomePage from '../pages/HomePage';
import ChallengesPage from '../pages/ChallengesPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage'; 

// --- Authentication Page Imports ---
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
// NOTE: You will need to create a ForgotPasswordPage component later
// For now, we use a placeholder element.

// --- Dashboard/Protected Page Imports ---
import ActivitiesPage from '../pages/ActivitiesPage';
import ProfilePage from '../pages/ProfilePage';


const router = createBrowserRouter([
    // --- 1. PUBLIC LAYOUT (Header/Footer for Marketing Pages) ---
    {
        element: <PublicLayout />, 
        children: [
            // Home Page (Root Path)
            {
                path: "/",
                element: <HomePage />,
            },
            // Main App Pages
            {
                path: "challenges",
                element: <ChallengesPage />,
            },
            // Authentication Pages
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "forgot-password",
                // Placeholder for the dedicated Forgot Password page
                element: <div className="p-8 text-center text-xl">Password Recovery Flow Here</div>,
            },
            // Footer Quick Links
            {
                path: "about",
                element: <AboutPage />,
            },
            {
                path: "contact",
                element: <ContactPage />,
            },
        ],
    },

    // --- 2. DASHBOARD LAYOUT (Protected Area with Sidebar) ---
    {
        // NOTE: Later, we will add logic here to redirect unauthenticated users to /login
        element: <DashboardLayout />, 
        children: [
            {
                path: "activities", // Full path: /activities
                element: <ActivitiesPage />,
            },
            {
                path: "profile", // Full path: /profile
                element: <ProfilePage />, 
            },
        ],
    },
    
    // --- 3. 404 Not Found Route ---
    {
        path: "*",
        element: <div className="min-h-screen flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="text-lg">Page Not Found</p>
                </div>,
    },
]);

export default router;