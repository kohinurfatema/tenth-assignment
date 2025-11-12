import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { fetchJson } from '../../data/apiClient';

const RecentTips = () => {
  const [tips, setTips] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    const loadTips = async () => {
      try {
        const data = await fetchJson('/api/tips/recent');
        setTips(data);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: 'Unable to load community tips.' });
      }
    };
    loadTips();
  }, []);

  const renderContent = () => {
    if (status.loading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="card bg-base-200 animate-pulse h-32" />
          ))}
        </div>
      );
    }

    if (status.error || !tips.length) {
      return (
        <div className="alert alert-info">
          <span>{status.error || 'Tips from the community will show up here soon.'}</span>
        </div>
      );
    }

    return (
      <div className="space-y-4 bg-green-100">
        {tips.map((tip) => (
          <div key={tip._id} className="card-elevated bg-green-100">
            <div className="card-content">
              <h3 className="text-lg font-semibold">{tip.title}</h3>
              <p className="section-text mb-0 line-clamp-3">{tip.preview}</p>
              <div className="flex justify-between items-center text-xs mt-2">
                <p className="font-semibold text-primary">By: {tip.authorName}</p>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <FaArrowUp className="w-3 h-3 text-success mr-1" />
                    {tip.upvotes}
                  </span>
                  <span className="text-gray-500">
                    {new Date(tip.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="my-10">
      <h2 className="section-title">Latest Community Tips</h2>
      {renderContent()}
      <div className="text-center mt-6">
        <button className="btn btn-sm btn-outline btn-info">View All Tips</button>
      </div>
    </div>
  );
};

export default RecentTips;