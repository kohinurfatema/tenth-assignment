// src/components/home/LiveStatistics.jsx
import { liveStatistics } from '../../data/mockData'; // <-- Import the mock data

const LiveStatistics = () => {
  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Community Impact</h2>
      
      {/* DaisyUI Stats Component */}
      <div className="stats stats-vertical lg:stats-horizontal w-full shadow-xl border-2 border-base-300">
        
        {liveStatistics.map((stat) => (
          <div key={stat.id} className="stat p-6">
            <div className="stat-figure text-secondary text-3xl">
              {stat.icon}
            </div>
            <div className="stat-title">{stat.metric}</div>
            <div className="stat-value">
              {/* Formats the number with commas */}
              {stat.value.toLocaleString()}
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