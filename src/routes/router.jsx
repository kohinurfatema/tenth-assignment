// src/routes/router.jsx

import { createBrowserRouter } from "react-router";

// --- Layout Imports ---
import PublicLayout from "../layouts/PublicLayout"; 
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// --- Public Page Imports ---
import HomePage from '../pages/HomePage';
import ChallengesPage from '../pages/ChallengesPage';
import ChallengeDetailPage from '../pages/ChallengeDetailPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage'; 

// --- Authentication Page Imports ---
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

// --- Dashboard/Protected Page Imports ---
import ActivitiesPage from '../pages/ActivitiesPage';
import ActivityDetailPage from '../pages/ActivityDetailPage';
import AddChallengePage from '../pages/AddChallengePage';
import JoinChallengePage from '../pages/JoinChallengePage';


const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "challenges", element: <ChallengesPage /> },
            { path: "challenges/:id", element: <ChallengeDetailPage /> },
            {
                path: "challenges/add",
                element: (
                    <ProtectedRoute>
                        <AddChallengePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "challenges/join/:id",
                element: (
                    <ProtectedRoute>
                        <JoinChallengePage />
                    </ProtectedRoute>
                ),
            },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "forgot-password", element: <ForgotPasswordPage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
        ],
    },
    {
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: "my-activities", element: <ActivitiesPage /> },
            { path: "my-activities/:id", element: <ActivityDetailPage /> },
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