// src/components/home/RecentTips.jsx
import { recentTips } from '../../data/mockData';
import { FaArrowUp } from 'react-icons/fa'; // Requires react-icons if not installed

const RecentTips = () => {
  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-6">Latest Community Tips</h2>
      
      <div className="space-y-4">
        {recentTips.map((tip) => (
          // Card for each tip
          <div key={tip.id} className="card bg-green-100 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="card-body p-4">
              <h3 className="card-title text-lg">{tip.title}</h3>
              
              <p className="text-sm text-gray-600 line-clamp-2">{tip.preview}</p>
              
              <div className="flex justify-between items-center text-xs mt-2">
                <p className="font-semibold text-primary">By: {tip.authorName}</p>
                <div className="flex items-center space-x-3">
                  {/* Upvotes */}
                  <div className="flex items-center">
                    <FaArrowUp className="w-3 h-3 text-success mr-1" />
                    <span>{tip.upvotes}</span>
                  </div>
                  {/* Date Preview */}
                  <span className="text-gray-400">
                    {tip.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <button className="btn btn-sm btn-outline btn-info">View All Tips</button>
      </div>
    </div>
  );
};

export default RecentTips;