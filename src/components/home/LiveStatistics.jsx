import { useEffect, useState } from 'react';
import { fetchJson } from '../../data/apiClient';

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
      <div className="stats stats-vertical lg:stats-horizontal w-full shadow-xl border-2 border-base-300 animate-pulse min-h-[160px]" />
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
    <div className="my-10">
      <h2 className="section-title text-center">Community Impact</h2>
      <div className="stats stats-vertical lg:stats-horizontal w-full shadow-xl border-2 border-base-300">
        {stats.map((stat) => (
          <div key={stat.metric} className="stat p-6">
            <div className="stat-figure text-secondary text-3xl">
              {stat.icon}
            </div>
            <div className="stat-title">{stat.metric}</div>
            <div className="stat-value">
              {Number(stat.value).toLocaleString()}
              <span className="text-xl ml-1">{stat.unit}</span>
            </div>
            <div className="stat-desc">Tracking global community progress</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStatistics;