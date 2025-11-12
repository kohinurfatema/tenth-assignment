// src/pages/ChallengesPage.jsx

import React, { useEffect, useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'; // We will use axios for cleaner API calls

const ChallengesPage = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = 'http://localhost:5000/api'; // 🚨 IMPORTANT: Match your server port!

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                // Fetch data from the public GET /api/challenges endpoint
                const response = await axios.get(`${API_BASE_URL}/challenges`);
                
                // Assuming your server returns data in the response.data directly (array)
                setChallenges(response.data);
                
            } catch (error) {
                console.error("Error fetching challenges:", error);
                toast.error("Failed to load challenges from the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <span className="loading loading-dots loading-lg text-primary"></span>
                <p className="ml-4 text-xl">Loading Challenges...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Toaster position="top-center" />
            
            <header className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                    Discover Eco-Challenges 🌎
                </h1>
                <p className="text-lg text-gray-500 mt-3 max-w-2xl mx-auto">
                    Join impactful challenges across Waste Reduction, Energy Conservation, and Green Living.
                </p>
            </header>

            {challenges.length === 0 ? (
                <div className="text-center py-20 bg-base-200 rounded-lg">
                    <p className="text-xl text-gray-600">No challenges are currently available. Check back soon!</p>
                </div>
            ) : (
                // Responsive Grid Layout
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {challenges.map((challenge) => (
                        <ChallengeCard key={challenge._id} challenge={challenge} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChallengesPage;