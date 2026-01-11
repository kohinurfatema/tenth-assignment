import { useEffect, useState } from 'react';
import { FaArrowUp, FaLightbulb, FaUser, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
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
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={tip._id}
            className="group relative bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-base-200 dark:to-base-300 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100 dark:border-base-content/10 overflow-hidden"
          >
            {/* Decorative gradient border on left */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-teal-500 to-cyan-500 rounded-l-xl"></div>

            {/* Tip number badge */}
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transform group-hover:scale-110 transition-transform">
              #{index + 1}
            </div>

            <div className="pl-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg shadow-md">
                  <FaLightbulb className="text-white text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-base-content group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-base-content/70 mt-1 line-clamp-2">{tip.preview}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-emerald-100 dark:border-base-content/10">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-full w-7 h-7">
                      <span className="text-xs"><FaUser /></span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{tip.authorName}</span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 font-medium">
                    <FaArrowUp className="text-xs" />
                    {tip.upvotes}
                  </span>
                  <span className="flex items-center gap-1 text-base-content/50">
                    <FaCalendarAlt className="text-xs" />
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
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg">
          <FaLightbulb className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-base-content">Latest Community Tips</h2>
          <p className="text-sm text-base-content/60">Eco-friendly ideas from our community</p>
        </div>
      </div>
      {renderContent()}
      <div className="text-center mt-6">
        <button className="btn btn-outline border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white gap-2 group">
          View All Tips
          <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default RecentTips;
