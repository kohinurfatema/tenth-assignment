// src/pages/HomePage.jsx
import HeroBanner from '../components/home/HeroBanner';
import LiveStatistics from '../components/home/LiveStatistics';
import ActiveChallengesGrid from '../components/home/ActiveChallengesGrid';
import RecentTips from '../components/home/RecentTips';
import UpcomingEvents from '../components/home/UpcomingEvents';
import WhyGoGreen from '../components/home/WhyGoGreen';
import HowItWorks from '../components/home/HowItWorks';

export default function HomePage() {
  return (
    <div className="space-y-16 h-full">
      
      {/* Dynamic Sections (Pulled from DB) */}
      <HeroBanner />
      <LiveStatistics />
      
      <div className="grid gap-16 lg:grid-cols-3">
        {/* Active Challenges will span the full width */}
        <div className="lg:col-span-3">
          <ActiveChallengesGrid />
        </div>
        
        {/* Tips and Events side-by-side */}
        <div className="lg:col-span-2">
          <RecentTips />
        </div>
        <div className="lg:col-span-1">
          <UpcomingEvents />
        </div>
      </div>

      {/* Static Sections */}
      <div className="grid gap-16 lg:grid-cols-2">
          <WhyGoGreen />
          <HowItWorks />
      </div>

    </div>
  );
}