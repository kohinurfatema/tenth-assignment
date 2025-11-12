import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchJson } from '../../data/apiClient';

const ActiveChallengesGrid = () => {
  const [challenges, setChallenges] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await fetchJson('/api/challenges/active');
        setChallenges(data);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: 'Unable to load active challenges.' });
      }
    };
    loadChallenges();
  }, []);

  const renderContent = () => {
    if (status.loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="card bg-base-200 animate-pulse h-72" />
          ))}
        </div>
      );
    }

    if (status.error || !challenges.length) {
      return (
        <div className="alert alert-warning">
          <span>{status.error || 'Challenges will be available soon.'}</span>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.slug} className="card-elevated hover:-translate-y-1 transition-transform duration-300">
            <figure>
              <img src={challenge.imageUrl || challenge.imageURL} alt={challenge.title} />
            </figure>
            <div className="card-content">
              <span className="badge badge-success badge-outline w-fit">{challenge.category}</span>
              <h3 className="text-xl font-semibold">{challenge.title}</h3>
              <p className="section-text mb-0 line-clamp-3">{challenge.description}</p>
              <div className="text-xs text-gray-500 space-y-1">
                <p><span className="font-semibold">Duration:</span> {challenge.duration} days</p>
                <p><span className="font-semibold">Participants:</span> {challenge.participants}</p>
              </div>
              <div className="mt-auto pt-3 flex justify-end">
                <Link to={`/challenges/${challenge.slug}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="my-10">
      <h2 className="section-title text-center">Active Challenges</h2>
      <p className="section-text text-center max-w-2xl mx-auto">Join a challenge and start tracking your impact today!</p>
      {renderContent()}
      <div className="text-center mt-10">
        <Link to="/challenges" className="btn btn-outline btn-success">
          Browse All Challenges
        </Link>
      </div>
    </div>
  );
};

export default ActiveChallengesGrid;