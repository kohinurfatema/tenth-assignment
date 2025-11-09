// src/components/home/HeroBanner.jsx
import { Link } from 'react-router';

const HeroBanner = () => {
  return (
    <div 
        // 🚨 IMPORTANT CHANGE: Using min-h-[70vh] for 70% viewport height
        className="hero min-h-[70vh] rounded-box shadow-xl" 
        style={{backgroundImage: 'url(https://picsum.photos/id/1015/1000/400)'}} 
    >
      <div className="hero-overlay bg-opacity-60 rounded-box"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-6xl font-bold">
            Featured Challenge: 30-Day Plastic Fast
          </h1>
          <p className="mb-5 text-lg">
            Join thousands in our current featured challenge to significantly reduce your plastic waste footprint.
          </p>
          <Link to="/challenges/30-day-plastic-fast" className="btn btn-success btn-lg">
            View Challenge
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;