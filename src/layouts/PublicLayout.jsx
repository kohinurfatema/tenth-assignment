// src/layouts/HomeLayout.jsx
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // <-- Import the new Footer

const PublicLayout = () => {
    return (
        // Use a flex column layout to push the footer to the bottom
        <div className="min-h-screen flex flex-col">
            
            {/* Navbar (Stays on top) */}
            <Navbar /> 
            
            {/* Main Content (Takes up all available space) */}
            <main className="container mx-auto p-4 md:p-8 flex-grow"> 
                <Outlet />
            </main>

            {/* Footer (Sticks to the bottom) */}
            <Footer /> {/* <-- Add the Footer component here */}
        </div>
    );
};

export default PublicLayout;