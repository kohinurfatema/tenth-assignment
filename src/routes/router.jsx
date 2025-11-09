// src/routes/router.jsx
import { createBrowserRouter } from "react-router"; // Use DOM version for browser apps
import HomeLayout from "../layouts/HomeLayout";
import HomePage from '../pages/HomePage'; // <-- Create this file
import ChallengesPage from '../pages/ChallengesPage'; // <-- Create this file
import ActivitiesPage from '../pages/ActivitiesPage'; // <-- Create this file


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, // This is the persistent frame (with the Navbar)
    children: [
        // These elements render inside HomeLayout's <Outlet />
        {
            path: "/",
            element: <HomePage />, // Default content for the root path
        },
        {
            path: "challenges",
            element: <ChallengesPage />,
        },
        {
            path: "activities",
            element: <ActivitiesPage />,
        },
    ],
  },
]);

export default router;