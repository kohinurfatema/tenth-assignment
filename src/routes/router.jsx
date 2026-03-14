// src/routes/router.jsx

import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

// --- Layout Imports (always eager-loaded) ---
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// --- Lazy-loaded Public Pages ---
const HomePage = lazy(() => import("../pages/HomePage"));
const ChallengesPage = lazy(() => import("../pages/ChallengesPage"));
const ChallengeDetailPage = lazy(() => import("../pages/ChallengeDetailPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const PrivacyTermsPage = lazy(() => import("../pages/PrivacyTermsPage"));
const BlogPage = lazy(() => import("../pages/BlogPage"));

// --- Lazy-loaded Auth Pages ---
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));

// --- Lazy-loaded Dashboard/Protected Pages ---
const DashboardOverview = lazy(() => import("../pages/DashboardOverview"));
const ActivitiesPage = lazy(() => import("../pages/ActivitiesPage"));
const ActivityDetailPage = lazy(() => import("../pages/ActivityDetailPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const AddChallengePage = lazy(() => import("../pages/AddChallengePage"));
const JoinChallengePage = lazy(() => import("../pages/JoinChallengePage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const ManageUsersPage = lazy(() => import("../pages/ManageUsersPage"));
const ManageChallengesPage = lazy(() => import("../pages/ManageChallengesPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const PageLoader = () => (
    <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
    </div>
);

const Lazy = ({ children }) => (
    <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            { path: "/", element: <Lazy><HomePage /></Lazy> },
            { path: "challenges", element: <Lazy><ChallengesPage /></Lazy> },
            { path: "challenges/:id", element: <Lazy><ChallengeDetailPage /></Lazy> },
            {
                path: "challenges/add",
                element: (
                    <ProtectedRoute>
                        <Lazy><AddChallengePage /></Lazy>
                    </ProtectedRoute>
                ),
            },
            {
                path: "challenges/join/:id",
                element: (
                    <ProtectedRoute>
                        <Lazy><JoinChallengePage /></Lazy>
                    </ProtectedRoute>
                ),
            },
            { path: "login", element: <Lazy><LoginPage /></Lazy> },
            { path: "register", element: <Lazy><RegisterPage /></Lazy> },
            { path: "forgot-password", element: <Lazy><ForgotPasswordPage /></Lazy> },
            { path: "about", element: <Lazy><AboutPage /></Lazy> },
            { path: "contact", element: <Lazy><ContactPage /></Lazy> },
            { path: "privacy", element: <Lazy><PrivacyTermsPage /></Lazy> },
            { path: "terms", element: <Lazy><PrivacyTermsPage /></Lazy> },
            { path: "blog", element: <Lazy><BlogPage /></Lazy> },
            { path: "blog/:slug", element: <Lazy><BlogPage /></Lazy> },
        ],
    },
    {
        path: "dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Lazy><DashboardOverview /></Lazy> },
            { path: "my-activities", element: <Lazy><ActivitiesPage /></Lazy> },
            { path: "my-activities/:id", element: <Lazy><ActivityDetailPage /></Lazy> },
            { path: "profile", element: <Lazy><ProfilePage /></Lazy> },
            { path: "add-challenge", element: <Lazy><AddChallengePage /></Lazy> },
            { path: "users", element: <Lazy><ManageUsersPage /></Lazy> },
            { path: "challenges", element: <Lazy><ManageChallengesPage /></Lazy> },
            { path: "settings", element: <Lazy><SettingsPage /></Lazy> },
        ],
    },
    // Legacy routes redirect
    {
        path: "my-activities",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Lazy><ActivitiesPage /></Lazy> },
            { path: ":id", element: <Lazy><ActivityDetailPage /></Lazy> },
        ],
    },

    // --- 404 Not Found Route ---
    {
        path: "*",
        element: <Lazy><NotFoundPage /></Lazy>,
    },
]);

export default router;
