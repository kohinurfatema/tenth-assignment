// src/routes/router.jsx

import { createBrowserRouter } from "react-router";
// Import the two different layouts
import PublicLayout from "../layouts/PublicLayout"; // Your renamed HomeLayout
import DashboardLayout from "../layouts/DashboardLayout"; // The new protected layout

// Import pages for public access
import HomePage from '../pages/HomePage';
import ChallengesPage from '../pages/ChallengesPage';
// You will create these pages next
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage'; 

// Import pages for protected dashboard
import ActivitiesPage from '../pages/ActivitiesPage';
import ProfilePage from '../pages/ProfilePage'; // <-- Create this file

const router = createBrowserRouter([
    // --- 1. PUBLIC LAYOUT (for marketing pages) ---
    {
        element: <PublicLayout />, 
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "challenges",
                element: <ChallengesPage />,
            },
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

    // --- 2. DASHBOARD LAYOUT (protected pages) ---
    {
        // We can add a parent path, e.g., "/dashboard", but we'll use root for now
        // NOTE: Later, this route object will include an authentication check.
        element: <DashboardLayout />, 
        children: [
            {
                path: "activities", // Full path: /activities
                element: <ActivitiesPage />,
            },
            {
                path: "profile", // Full path: /profile
                element: <ProfilePage />, // Create this new file
            },
        ],
    },
    
    // You should also add a 404 Not Found route here eventually
]);

export default router;