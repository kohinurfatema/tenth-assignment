

import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

// A simple loading placeholder while Firebase checks the user's status
const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-4 text-xl">Loading authentication...</p>
    </div>
);

const ProtectedRoute = ({ children }) => {
    // Check if the user is logged in
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    // 1. Show spinner while Firebase is checking auth status
    if (loading) {
        return <LoadingSpinner />;
    }

    // 2. If user is NOT logged in, redirect to login page
    if (!currentUser) {
        // Redirect them to the /login page, but save the current location 
        // in state so they can be redirected back after successful login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. If user IS logged in, render the child route content
    return children;
};

export default ProtectedRoute;