import { useEffect, useState } from 'react';
import { fetchJson } from '../../data/apiClient';
import { FaGlobeAmericas, FaChartLine, FaLeaf, FaUsers, FaRecycle, FaTint, FaCalendarAlt, FaCloud } from 'react-icons/fa';

const iconMap = {
  'Community Events': { icon: FaCalendarAlt, color: 'from-purple-400 to-indigo-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  'Plastic Reduced': { icon: FaRecycle, color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  'Total CO2 Saved': { icon: FaCloud, color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  'Active Users': { icon: FaUsers, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  'Water Saved': { icon: FaTint, color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
};

const defaultIcon = { icon: FaChartLine, color: 'from-gray-400 to-gray-500', bg: 'bg-gray-50 dark:bg-gray-900/20' };

const LiveStatistics = () => {
  const [stats, setStats] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchJson('/api/stats/live');
        setStats(data);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: 'Unable to load live statistics.' });
      }
    };
    loadStats();
  }, []);

  if (status.loading) {
    return (
      <div className="my-10">
        <div className="h-8 w-48 bg-base-300 rounded-lg mx-auto mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="h-40 bg-base-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (status.error || !stats.length) {
    return (
      <div className="alert alert-warning">
        <span>{status.error || 'Live statistics will appear here soon.'}</span>
      </div>
    );
  }

  return (
    <div className="my-10 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-success/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full mb-4">
          <FaGlobeAmericas className="text-success" />
          <span className="text-sm font-semibold text-success">Real-time Stats</span>
        </div>
        <h2 className="text-4xl font-bold text-base-content mb-2">Community Impact</h2>
        <p className="text-base-content/60">Together we are making a difference</p>
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const iconInfo = iconMap[stat.metric] || defaultIcon;
          const IconComponent = iconInfo.icon;
          return (
            <div
              key={stat.metric}
              className={"group relative overflow-hidden rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 dark:border-base-content/10 " + iconInfo.bg}
            >
              {/* Background gradient decoration */}
              <div className={"absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br " + iconInfo.color + " rounded-full opacity-20 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500"}></div>

              {/* Icon */}
              <div className={"relative w-14 h-14 rounded-xl bg-gradient-to-br " + iconInfo.color + " flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"}>
                <IconComponent className="text-white text-2xl" />
              </div>

              {/* Content */}
              <div className="relative">
                <p className="text-sm font-medium text-base-content/60 mb-1">{stat.metric}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-base-content">{Number(stat.value).toLocaleString()}</span>
                  {stat.unit && <span className="text-lg font-medium text-base-content/60">{stat.unit}</span>}
                </div>
                <p className="text-xs text-base-content/50 mt-2">Tracking global progress</p>
              </div>

              {/* Animated border on hover */}
              <div className={"absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r " + iconInfo.color + " transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"}></div>
            </div>
          );
        })}
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-8 gap-2">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-success/60 animate-pulse" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 rounded-full bg-success/30 animate-pulse" style={{animationDelay: '0.4s'}}></div>
        <span className="text-xs text-base-content/50 ml-2">Live data updating</span>
      </div>
    </div>
  );
};

export default LiveStatistics;
