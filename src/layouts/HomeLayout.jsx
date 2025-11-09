// src/layouts/HomeLayout.jsx
import React from 'react';
import { Outlet } from 'react-router'; // <-- Needed to render nested routes
import Navbar from '../components/Navbar'; // <-- Import the new Navbar

const HomeLayout = () => {
    return (
        <div className="min-h-screen bg-base-200">
            {/* The Navbar stays at the top of every page */}
            <Navbar /> 
            
            {/* The main content area where child routes will render */}
            <main className="container mx-auto p-4 md:p-8">
                <Outlet /> {/* <-- THIS IS WHERE YOUR PAGE CONTENT GOES */}
            </main>

            {/* You can add a Footer component here later */}
        </div>
    );
};

export default HomeLayout;