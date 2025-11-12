// src/routes/router.jsx

import { createBrowserRouter } from "react-router";

// --- Layout Imports ---
import PublicLayout from "../layouts/PublicLayout"; 
import DashboardLayout from "../layouts/DashboardLayout";

// --- Auth Guard Import ---
import ProtectedRoute from './ProtectedRoute'; // <-- NEW

// --- Public Page Imports ---
import HomePage from '../pages/HomePage';
import ChallengesPage from '../pages/ChallengesPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage'; 
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// --- Placeholder Protected Page Imports ---
// (We will create these pages later)
const ChallengeDetailPage = () => <div className="p-8">Challenge Detail Page</div>
const AddChallengePage = () => <div className="p-8">Add New Challenge Page (Protected)</div>
const JoinChallengePage = () => <div className="p-8">Join Challenge Page (Protected)</div>
const ActivitiesPage = () => <div className="p-8">My Activities Dashboard</div>
const ProfilePage = () => <div className="p-8">User Profile Settings</div>


const router = createBrowserRouter([
    // --- 1. PUBLIC LAYOUT (Header/Footer for Marketing Pages) ---
    {
        element: <PublicLayout />, 
        children: [
            // PUBLIC ROUTES
            { path: "/", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "forgot-password", element: <div className="p-8 text-center text-xl">Password Recovery Flow Here</div> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },

            // PUBLIC CHALLENGE ROUTES (Browse & View Detail)
            { path: "challenges", element: <ChallengesPage /> },
            { path: "challenges/:id", element: <ChallengeDetailPage /> },
        ],
    },

    // --- 2. DASHBOARD LAYOUT (PROTECTED AREA with Sidebar/Dashboard Frame) ---
    {
        // Wrap the Dashboard Layout element in the ProtectedRoute component
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>, 
        children: [
            // PROTECTED CHALLENGE ROUTES (Management & Action)
            { path: "challenges/add", element: <AddChallengePage /> },
            { path: "challenges/join/:id", element: <JoinChallengePage /> },
            
            // PROTECTED USER ACTIVITY ROUTES (Dashboard)
            { path: "my-activities", element: <ActivitiesPage /> }, // Main dashboard
            { path: "my-activities/:id", element: <div className="p-8">Specific Activity Tracking</div> }, // Detail view
            
            // PROTECTED PROFILE ROUTE
            { path: "profile", element: <ProfilePage /> }, 
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