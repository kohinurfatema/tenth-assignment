import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight, FaUsers, FaClock, FaLeaf, FaCalendarAlt, FaShare, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedChallenges, setRelatedChallenges] = useState([]);

  // Category-based images for gallery
  const getCategoryImages = (cat) => {
    const map = {
      'Waste Reduction': ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800', 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800', 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800'],
      'Green Living': ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800', 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800'],
      'Water Conservation': ['https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800', 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800'],
      'Sustainable Transport': ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800', 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800'],
      'Energy Conservation': ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800'],
    };
    return map[cat] || ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'];
  };

  // Use challenge's actual image as first + category images
  const challengeImages = challenge
    ? [challenge.imageUrl || challenge.imageURL || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800', ...getCategoryImages(challenge.category)]
    : ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800', 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800', 'https://images.unsplash.com/photo-1518173946687-a4c036bc7d5b?w=800', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'];

  const reviews = [
    { id: 1, user: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/100?img=1', rating: 5, date: '2024-01-15', comment: 'This challenge changed my daily habits!' },
    { id: 2, user: 'Michael Chen', avatar: 'https://i.pravatar.cc/100?img=2', rating: 4, date: '2024-01-10', comment: 'Great challenge with achievable goals.' },
    { id: 3, user: 'Emma Wilson', avatar: 'https://i.pravatar.cc/100?img=3', rating: 5, date: '2024-01-05', comment: 'Loved the daily tips.' }
  ];

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(apiUrl + "/api/challenges/" + id);
        if (response.ok) {
          const data = await response.json();
          setChallenge(data);
        } else {
          setChallenge({ _id: id, title: "Zero Waste Week Challenge", description: "Join eco-warriors.", longDescription: "The Zero Waste Week Challenge helps you transition to sustainable living.", category: "Waste Reduction", difficulty: "Intermediate", duration: "7 days", participants: 1247, target: "Reduce waste by 50%", impactMetric: "500 kg CO2 saved", startDate: "2024-02-01", endDate: "2024-02-07", points: 150 });
        }
      } catch (error) {
        setChallenge({ _id: id, title: "Zero Waste Week Challenge", description: "Join eco-warriors.", longDescription: "A 7-day challenge.", category: "Waste Reduction", difficulty: "Intermediate", duration: "7 days", participants: 1247, target: "Reduce waste by 50%", impactMetric: "500 kg CO2 saved", startDate: "2024-02-01", endDate: "2024-02-07", points: 150 });
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedChallenges = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(apiUrl + "/api/challenges?limit=4");
        if (response.ok) {
          const data = await response.json();
          setRelatedChallenges(data.filter(c => c._id !== id).slice(0, 4));
        }
      } catch (error) {
        setRelatedChallenges([
          { _id: "1", title: "Plastic-Free Month", category: "Waste Reduction", participants: 892, image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400" },
          { _id: "2", title: "Energy Saver", category: "Energy", participants: 654, image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400" },
          { _id: "3", title: "Plant-Based Week", category: "Food", participants: 1102, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
          { _id: "4", title: "Bike to Work", category: "Transport", participants: 445, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" }
        ]);
      }
    };
    fetchChallenge();
    fetchRelatedChallenges();
  }, [id]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % challengeImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + challengeImages.length) % challengeImages.length);
  const handleJoinChallenge = async () => {
    if (!user) { toast.error("Please login to join"); return; }
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(apiUrl + "/api/challenges/join/" + challenge._id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid || user.email })
      });
      if (res.ok) {
        toast.success("Successfully joined!");
        setChallenge(prev => ({ ...prev, participants: (prev.participants || 0) + 1 }));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to join");
      }
    } catch (err) {
      toast.error("Error joining challenge");
    }
  };
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); toast.success("Copied!"); };
  const toggleWishlist = () => { setIsWishlisted(!isWishlisted); toast.success(isWishlisted ? "Removed" : "Added"); };
  const renderStars = (r) => [...Array(5)].map((_, i) => i < r ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-400" />);

  if (loading) return <div className="container mx-auto px-4 py-8"><div className="skeleton h-96 w-full rounded-xl mb-4"></div><div className="skeleton h-8 w-3/4"></div></div>;
  if (!challenge) return <div className="container mx-auto px-4 py-8 text-center"><h2 className="text-2xl font-bold mb-4">Not found</h2><Link to="/challenges" className="btn btn-primary">Back</Link></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="breadcrumbs text-sm mb-6"><ul><li><Link to="/">Home</Link></li><li><Link to="/challenges">Challenges</Link></li><li className="text-primary">{challenge.title}</li></ul></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden bg-base-200"><img src={challengeImages[currentImageIndex]} alt={challenge.title} className="w-full h-full object-cover" /></div>
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80"><FaChevronLeft /></button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80"><FaChevronRight /></button>
            <div className="flex gap-2 mt-4 justify-center">{challengeImages.map((img, i) => <button key={i} onClick={() => setCurrentImageIndex(i)} className={"w-16 h-16 rounded-lg overflow-hidden border-2 " + (currentImageIndex === i ? "border-primary" : "border-transparent opacity-60")}><img src={img} alt="" className="w-full h-full object-cover" /></button>)}</div>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="badge badge-primary mb-2">{challenge.category}</div><h1 className="text-3xl font-bold">{challenge.title}</h1></div><div className="flex gap-2"><button onClick={handleShare} className="btn btn-ghost btn-circle"><FaShare /></button><button onClick={toggleWishlist} className="btn btn-ghost btn-circle">{isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}</button></div></div>
          <div><h2 className="text-xl font-semibold mb-3">About</h2><p className="text-base-content/80">{challenge.longDescription || challenge.description}</p></div>
          <div className="bg-base-200 rounded-xl p-6"><h2 className="text-xl font-semibold mb-4">Details</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><div className="flex items-center gap-3"><div className="bg-primary/20 p-3 rounded-lg"><FaClock className="text-primary text-xl" /></div><div><p className="text-sm text-base-content/60">Duration</p><p className="font-semibold">{challenge.duration}</p></div></div><div className="flex items-center gap-3"><div className="bg-secondary/20 p-3 rounded-lg"><FaUsers className="text-secondary text-xl" /></div><div><p className="text-sm text-base-content/60">Participants</p><p className="font-semibold">{challenge.participants?.toLocaleString()}</p></div></div><div className="flex items-center gap-3"><div className="bg-accent/20 p-3 rounded-lg"><FaLeaf className="text-accent text-xl" /></div><div><p className="text-sm text-base-content/60">Impact</p><p className="font-semibold">{challenge.impactMetric}</p></div></div><div className="flex items-center gap-3"><div className="bg-info/20 p-3 rounded-lg"><FaCalendarAlt className="text-info text-xl" /></div><div><p className="text-sm text-base-content/60">Start</p><p className="font-semibold">{new Date(challenge.startDate).toLocaleDateString()}</p></div></div><div className="flex items-center gap-3"><div className="bg-warning/20 p-3 rounded-lg"><FaCalendarAlt className="text-warning text-xl" /></div><div><p className="text-sm text-base-content/60">End</p><p className="font-semibold">{new Date(challenge.endDate).toLocaleDateString()}</p></div></div><div className="flex items-center gap-3"><div className="bg-success/20 p-3 rounded-lg"><FaStar className="text-success text-xl" /></div><div><p className="text-sm text-base-content/60">Points</p><p className="font-semibold">{challenge.points} pts</p></div></div></div></div>
          <div><div className="flex items-center justify-between mb-4"><h2 className="text-xl font-semibold">Reviews</h2><div className="flex items-center gap-2">{renderStars(4)}<span className="text-base-content/60">(4.7)</span></div></div><div className="space-y-4">{reviews.map(r => <div key={r.id} className="bg-base-200 rounded-xl p-4"><div className="flex items-start gap-4"><img src={r.avatar} alt="" className="w-12 h-12 rounded-full" /><div className="flex-1"><div className="flex justify-between mb-1"><h4 className="font-semibold">{r.user}</h4><span className="text-sm text-base-content/60">{r.date}</span></div><div className="flex mb-2">{renderStars(r.rating)}</div><p className="text-base-content/80">{r.comment}</p></div></div></div>)}</div></div>
        </div>
        <div className="lg:col-span-1"><div className="sticky top-24"><div className="card bg-base-200 shadow-xl"><div className="card-body"><div className="flex items-center justify-between mb-4"><span className="text-3xl font-bold text-primary">{challenge.points} pts</span><div className="badge badge-secondary">{challenge.difficulty}</div></div><div className="space-y-3 mb-6"><div className="flex justify-between"><span className="text-base-content/60">Target</span><span className="font-medium">{challenge.target}</span></div><div className="flex justify-between"><span className="text-base-content/60">Category</span><span className="font-medium">{challenge.category}</span></div><div className="flex justify-between"><span className="text-base-content/60">Duration</span><span className="font-medium">{challenge.duration}</span></div></div><div className="flex items-center gap-2 mb-4 text-sm text-base-content/60"><FaUsers /><span>{challenge.participants?.toLocaleString()} joined</span></div><button onClick={handleJoinChallenge} className="btn btn-primary btn-lg w-full">Join Challenge</button><p className="text-center text-sm text-base-content/60 mt-2">Free to join!</p></div></div></div></div>
      </div>
      <div className="mt-12"><h2 className="text-2xl font-bold mb-6">Related Challenges</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{relatedChallenges.map(rel => <Link key={rel._id} to={"/challenges/" + rel._id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow"><figure className="aspect-video"><img src={rel.imageUrl || rel.imageURL || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"} alt="" className="w-full h-full object-cover" /></figure><div className="card-body p-4"><div className="badge badge-primary badge-sm mb-1">{rel.category}</div><h3 className="font-semibold line-clamp-2">{rel.title}</h3><div className="flex items-center gap-1 text-sm text-base-content/60"><FaUsers /><span>{rel.participants}</span></div></div></Link>)}</div></div>
    </div>
  );
};

export default ChallengeDetailPage;
