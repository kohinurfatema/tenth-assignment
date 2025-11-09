// src/components/home/ActiveChallengesGrid.jsx
import { activeChallenges } from '../../data/mockData';
import { Link } from 'react-router';

const ActiveChallengesGrid = () => {
  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-8">Active Challenges</h2>
      <p className="text-lg text-gray-600 mb-6">Join a challenge and start tracking your impact today!</p>
      
      {/* Tailwind Grid for 4-6 Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeChallenges.map((challenge) => (
          // DaisyUI Card Component
          <div key={challenge.id} className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <figure>
                {/* Placeholder Image */}
                <img src={challenge.imageURL} alt={challenge.title} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <span className="badge badge-success badge-outline">{challenge.category}</span>
              <h3 className="card-title text-xl mt-2">{challenge.title}</h3>
              
              <div className="text-sm text-gray-500 mt-2">
                <p className="font-semibold">{challenge.metric}</p>
              </div>
              
              <div className="card-actions justify-end mt-4">
                <Link 
                  to={`/challenges/${challenge.slug}`} 
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Optional CTA to view all challenges */}
      <div className="text-center mt-10">
        <Link to="/challenges" className="btn btn-outline btn-success">
          Browse All Challenges
        </Link>
      </div>

    </div>
  );
};

export default ActiveChallengesGrid;