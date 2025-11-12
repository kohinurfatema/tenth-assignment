import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchJson } from '../../data/apiClient';

const HeroBanner = () => {
  const [featured, setFeatured] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchJson('/api/featured-challenges');
        setFeatured(data);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: 'Unable to load featured challenges.' });
      }
    };
    loadFeatured();
  }, []);

  useEffect(() => {
    if (!featured.length) return;
    const handle = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(handle);
  }, [featured]);

  const goToSlide = (direction) => {
    if (!featured.length) return;
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % featured.length;
      }
      return (prev - 1 + featured.length) % featured.length;
    });
  };

  if (status.loading) {
    return (
      <div className="hero min-h-[70vh] rounded-box shadow-xl bg-base-200 animate-pulse" />
    );
  }

  if (status.error || !featured.length) {
    return (
      <div className="hero min-h-[70vh] rounded-box shadow-xl bg-error/10 text-error flex items-center justify-center">
        <p className="text-lg">{status.error || 'No featured challenges available yet.'}</p>
      </div>
    );
  }

  const active = featured[currentIndex];

  return (
    <div className="relative rounded-box shadow-xl overflow-hidden min-h-[70vh]">
      <img
        src={active.imageURL}
        alt={active.title}
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-neutral-content h-full px-6 py-10">
        <p className="uppercase tracking-widest text-success font-semibold">Featured Challenge</p>
        <h1 className="text-4xl md:text-6xl font-bold mt-4">{active.title}</h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl">
          {active.summary}
        </p>
        <Link
          to={`/challenges/${active.ctaSlug}`}
          className="btn btn-success btn-lg mt-6"
        >
          View Challenge
        </Link>
      </div>

      <button
        type="button"
        className="btn btn-circle btn-sm md:btn-md absolute left-4 top-1/2 -translate-y-1/2 z-10"
        onClick={() => goToSlide('prev')}
        aria-label="Previous challenge"
      >
        ❮
      </button>
      <button
        type="button"
        className="btn btn-circle btn-sm md:btn-md absolute right-4 top-1/2 -translate-y-1/2 z-10"
        onClick={() => goToSlide('next')}
        aria-label="Next challenge"
      >
        ❯
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {featured.map((item, idx) => (
          <button
            key={item.slug}
            type="button"
            className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-success' : 'w-3 bg-white/50'}`}
            aria-label={`View ${item.title}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;