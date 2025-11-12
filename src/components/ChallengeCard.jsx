// src/components/ChallengeCard.jsx

import React from 'react';
import { Link } from 'react-router';
import { FaUserFriends, FaRegClock } from 'react-icons/fa'; // Icons for visual interest

const ChallengeCard = ({ challenge }) => {
    const { 
        _id, 
        title, 
        category, 
        description, 
        duration, 
        participants, 
        imageUrl 
    } = challenge;

    // Use the first sentence or a snippet of the description
    const shortDescription = description.split('.')[0] + (description.includes('.') ? '.' : '');

    return (
        <div className="card w-full bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition duration-300">
            {/* Image Section */}
            <figure className="h-48 overflow-hidden">
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    // Placeholder if no image URL is available
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                        
                    </div>
                )}
            </figure>

            {/* Card Body */}
            <div className="card-body p-5">
                <div className="badge badge-lg badge-secondary text-white font-semibold mb-2">
                    {category}
                </div>
                
                <h2 className="card-title text-2xl mb-2">
                    {title}
                </h2>
                
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {shortDescription || description}
                </p>

                {/* Metrics */}
                <div className="flex justify-between items-center text-sm font-medium border-t pt-3 mt-auto">
                    <div className="flex items-center text-primary">
                        <FaRegClock className="mr-1" />
                        <span>{duration || 30} Days</span>
                    </div>
                    <div className="flex items-center text-info">
                        <FaUserFriends className="mr-1" />
                        <span>{participants || 0} Participants</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="card-actions justify-end mt-4">
                    <Link to={`/challenges/${_id}`} className="btn btn-primary btn-sm">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChallengeCard;