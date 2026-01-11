import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchJson } from '../../data/apiClient';
import { FaLeaf, FaArrowRight, FaSeedling, FaWater, FaWind } from 'react-icons/fa';

const HeroBanner = () => {
  const [featured, setFeatured] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState({ loading: true, error: '' });
  const [isAnimating, setIsAnimating] = useState(false);

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
    const handle = setInterval(() => changeSlide('next'), 6000);
    return () => clearInterval(handle);
  }, [featured]);

  const changeSlide = (direction) => {
    if (!featured.length || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => direction === 'next' ? (prev + 1) % featured.length : (prev - 1 + featured.length) % featured.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  if (status.loading) {
    return (
      <div className="hero min-h-[70vh] rounded-box shadow-xl bg-base-200">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-success"></span>
          <p className="text-base-content/60 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (status.error || !featured.length) {
    return (
      <div className="hero min-h-[70vh] rounded-box shadow-xl bg-error/10 text-error flex items-center justify-center">
        <p className="text-lg">{status.error || 'No featured challenges.'}</p>
      </div>
    );
  }

  const active = featured[currentIndex];
  const imgCls = 'w-full h-full object-cover transition-all duration-700 ease-in-out hero-img-zoom scale-105';
  const contentCls = 'relative z-10 flex flex-col items-center justify-center text-center text-neutral-content h-full px-6 py-10 min-h-[70vh] transition-opacity duration-300 ' + (isAnimating ? 'opacity-0' : 'opacity-100');

  return (
    <div className="relative rounded-box shadow-xl overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 overflow-hidden">
        <img src={active.imageURL} alt={active.title} className={imgCls} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Falling Leaves */}
        <FaLeaf className="absolute text-success/40 text-2xl animate-leaf-1" style={{top: '-5%', left: '10%'}} />
        <FaLeaf className="absolute text-success/30 text-xl animate-leaf-2" style={{top: '-5%', left: '30%'}} />
        <FaLeaf className="absolute text-success/35 text-3xl animate-leaf-3" style={{top: '-5%', left: '70%'}} />
        <FaSeedling className="absolute text-success/25 text-2xl animate-leaf-1" style={{top: '-5%', left: '50%'}} />
        <FaWater className="absolute text-blue-400/30 text-xl animate-leaf-2" style={{top: '-5%', left: '85%'}} />
        <FaWind className="absolute text-white/20 text-2xl animate-leaf-3" style={{top: '-5%', left: '5%'}} />

        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-success/50 rounded-full animate-float-slow blur-sm"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-success/60 rounded-full animate-float-medium blur-sm"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-success/40 rounded-full animate-float-fast blur-sm"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-float-slow blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-success/50 rounded-full animate-float-medium blur-sm"></div>

        {/* Twinkling Stars */}
        <div className="absolute w-2 h-2 bg-yellow-400/60 rounded-full animate-twinkle" style={{top: '20%', left: '15%'}}></div>
        <div className="absolute w-2 h-2 bg-yellow-400/50 rounded-full animate-twinkle-delayed" style={{top: '40%', right: '25%'}}></div>
        <div className="absolute w-2 h-2 bg-white/60 rounded-full animate-twinkle" style={{top: '60%', left: '80%'}}></div>
        <div className="absolute w-3 h-3 bg-yellow-300/40 rounded-full animate-twinkle-delayed" style={{top: '30%', left: '60%'}}></div>
      </div>
      <div className={contentCls}>
        <div className="flex items-center gap-2 bg-success/20 backdrop-blur-sm px-4 py-2 rounded-full border border-success/30">
          <FaLeaf className="text-success animate-bounce-slow" />
          <p className="uppercase tracking-widest text-success font-semibold text-sm">Featured Challenge</p>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mt-6 text-white drop-shadow-2xl">{active.title}</h1>
        <div className="w-40 h-1.5 bg-gradient-to-r from-transparent via-success to-transparent mt-4 rounded-full"></div>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/90">{active.summary}</p>
        <Link to={"/challenges/" + active.ctaSlug} className="btn btn-success btn-lg mt-8 gap-2 group hover:scale-105 hover:shadow-xl hover:shadow-success/50 transition-all duration-300">
          View Challenge <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300 animate-bounce-x" />
        </Link>
        <div className="flex gap-4 mt-8">
          <button className="btn btn-outline btn-success btn-md hover:btn-success"><span className="font-bold text-lg">500+</span><span className="text-xs ml-1 opacity-80">Participants</span></button>
          <button className="btn btn-outline btn-success btn-md hover:btn-success"><span className="font-bold text-lg">30</span><span className="text-xs ml-1 opacity-80">Days</span></button>
        </div>
      </div>
      <button type="button" className="btn btn-circle btn-sm md:btn-md absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300" onClick={() => changeSlide('prev')}>❮</button>
      <button type="button" className="btn btn-circle btn-sm md:btn-md absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300" onClick={() => changeSlide('next')}>❯</button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {featured.map((item, idx) => (
          <button key={item.slug || idx} type="button" className={'h-2 rounded-full transition-all duration-500 hover:bg-success ' + (idx === currentIndex ? 'w-10 bg-success shadow-lg shadow-success/50' : 'w-3 bg-white/50 hover:w-5')} onClick={() => { if (idx !== currentIndex) { setIsAnimating(true); setTimeout(() => { setCurrentIndex(idx); setTimeout(() => setIsAnimating(false), 50); }, 300); }}} />
        ))}
      </div>
      {/* Wave Animation */}
      <svg className="absolute bottom-0 left-0 right-0 text-base-100" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z" fill="currentColor"></path>
      </svg>
    </div>
  );
};

export default HeroBanner;
