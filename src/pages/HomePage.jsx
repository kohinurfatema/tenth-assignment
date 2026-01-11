// src/pages/HomePage.jsx
import HeroBanner from '../components/home/HeroBanner';
import LiveStatistics from '../components/home/LiveStatistics';
import ActiveChallengesGrid from '../components/home/ActiveChallengesGrid';
import RecentTips from '../components/home/RecentTips';
import UpcomingEvents from '../components/home/UpcomingEvents';
import WhyGoGreen from '../components/home/WhyGoGreen';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import FAQ from '../components/home/FAQ';

export default function HomePage() {
  return (
    <div className="space-y-16 h-full">

      {/* 1. Hero Section - Featured Challenges Carousel */}
      <HeroBanner />

      {/* 2. Live Statistics - Community Impact */}
      <LiveStatistics />

      {/* 3. Active Challenges Grid */}
      <div className="grid gap-16 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <ActiveChallengesGrid />
        </div>

        {/* 4 & 5. Tips and Events side-by-side */}
        <div className="lg:col-span-2">
          <RecentTips />
        </div>
        <div className="lg:col-span-1">
          <UpcomingEvents />
        </div>
      </div>

      {/* 6. Testimonials - What Our Community Says */}
      <Testimonials />

      {/* 7 & 8. Why Go Green and How It Works */}
      <div className="space-y-10">
        <WhyGoGreen />
        <HowItWorks />
      </div>

      {/* 9. FAQ Section */}
      <FAQ />

      {/* 10. Newsletter Subscription */}
      <Newsletter />

    </div>
  );
}
