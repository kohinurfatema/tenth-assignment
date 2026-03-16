import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { FaSearch, FaClock, FaUser, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { API_BASE_URL } from '../data/apiClient';

const CATEGORIES = ['All', 'Lifestyle', 'Tips & Tricks', 'News', 'Community', 'Science'];
const ITEMS_PER_PAGE = 6;

const fallbackPosts = [
  {
    _id: '1',
    title: '10 Simple Ways to Reduce Your Carbon Footprint Today',
    excerpt: 'Small everyday changes can lead to massive environmental impact. From switching to LED bulbs to choosing plant-based meals twice a week, discover practical actions you can start right now.',
    category: 'Lifestyle',
    author: 'Sarah Johnson',
    authorAvatar: 'https://i.pravatar.cc/100?img=1',
    date: '2025-11-10',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
    slug: 'reduce-carbon-footprint',
  },
  {
    _id: '2',
    title: 'The Complete Guide to Zero-Waste Grocery Shopping',
    excerpt: 'Learn how to shop smarter, bring the right containers, find bulk stores near you, and cut your household plastic waste by up to 90% with these proven strategies.',
    category: 'Tips & Tricks',
    author: 'Michael Chen',
    authorAvatar: 'https://i.pravatar.cc/100?img=2',
    date: '2025-11-08',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600',
    slug: 'zero-waste-grocery-shopping',
  },
  {
    _id: '3',
    title: 'How Our Community Saved 15,000 kg of CO2 This Month',
    excerpt: 'EcoTrack members across 42 active challenges hit an incredible milestone. We break down which challenges had the biggest impact and what it means for the planet.',
    category: 'Community',
    author: 'Emma Wilson',
    authorAvatar: 'https://i.pravatar.cc/100?img=3',
    date: '2025-11-05',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    slug: 'community-co2-milestone',
  },
  {
    _id: '4',
    title: 'Why Composting at Home Is Easier Than You Think',
    excerpt: 'Fear of smell, pests, and complexity stops most people. We bust the myths and walk you through a foolproof setup that takes less than 15 minutes.',
    category: 'Tips & Tricks',
    author: 'David Park',
    authorAvatar: 'https://i.pravatar.cc/100?img=4',
    date: '2025-11-03',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1588964895597-cfbcd9f8e849?w=600',
    slug: 'home-composting-guide',
  },
  {
    _id: '5',
    title: 'New Research: Urban Green Spaces Cut City Temperatures by 4°C',
    excerpt: 'A landmark study across 12 cities confirms that tree canopy and green rooftops are among the most cost-effective strategies for battling the urban heat island effect.',
    category: 'Science',
    author: 'Dr. Anika Rao',
    authorAvatar: 'https://i.pravatar.cc/100?img=5',
    date: '2025-10-30',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600',
    slug: 'urban-green-spaces-research',
  },
  {
    _id: '6',
    title: 'Sustainable Travel: How to Explore the World Responsibly',
    excerpt: 'Travel does not have to mean a large carbon footprint. From choosing trains over planes to supporting local economies, this guide covers the conscious explorer.',
    category: 'Lifestyle',
    author: 'Lucia Fernandez',
    authorAvatar: 'https://i.pravatar.cc/100?img=6',
    date: '2025-10-27',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600',
    slug: 'sustainable-travel-guide',
  },
  {
    _id: '7',
    title: 'The Rise of Community Solar: Is It Right for Your Neighborhood?',
    excerpt: 'You do not need rooftop panels to go solar. Community solar programs let renters and homeowners subscribe to a share of a local solar farm and cut electricity bills.',
    category: 'News',
    author: 'James Okonkwo',
    authorAvatar: 'https://i.pravatar.cc/100?img=7',
    date: '2025-10-24',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600',
    slug: 'community-solar-programs',
  },
  {
    _id: '8',
    title: "Plant-Based Eating: A Beginner's 30-Day Starter Plan",
    excerpt: 'Going plant-based does not mean giving up delicious food. Our 30-day plan eases you in with familiar favourites reimagined, plus a complete shopping list for every week.',
    category: 'Lifestyle',
    author: 'Priya Sharma',
    authorAvatar: 'https://i.pravatar.cc/100?img=8',
    date: '2025-10-20',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    slug: 'plant-based-30-day-plan',
  },
];

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_BASE_URL + '/api/blogs');
        if (res.ok) {
          const data = await res.json();
          setPosts(Array.isArray(data) && data.length ? data : fallbackPosts);
        } else {
          setPosts(fallbackPosts);
        }
      } catch {
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, searchTerm, activeCategory]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSkeletons = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card bg-base-200 shadow-lg">
          <div className="skeleton h-48 w-full rounded-t-2xl"></div>
          <div className="card-body gap-3">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-6 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">EcoTrack Blog</h1>
        <p className="text-base-content/70 text-lg">
          Stories, guides, and insights to help you live more sustainably every day.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search articles..."
            className="input input-bordered w-full pl-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={
              'btn btn-sm rounded-full ' +
              (activeCategory === cat ? 'btn-success' : 'btn-ghost border border-base-300')
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-base-content/60 text-sm text-center">
          {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Posts grid */}
      {loading ? (
        renderSkeletons()
      ) : paginated.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-base-content/60 text-lg">No articles match your search.</p>
          <button
            className="btn btn-ghost mt-4"
            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow group">
              <figure className="overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </figure>
              <div className="card-body p-5 flex flex-col">
                <div className="badge badge-success badge-sm mb-1">{post.category}</div>
                <h2 className="font-bold text-lg leading-snug line-clamp-2 mb-2">{post.title}</h2>
                <p className="text-base-content/70 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="mt-auto flex items-center justify-between text-xs text-base-content/60">
                  <span className="flex items-center gap-1">
                    <FaUser className="text-[10px]" />{post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-[10px]" />{post.readTime}
                  </span>
                </div>
                <Link
                  to={'/blog/' + (post.slug || post._id)}
                  className="btn btn-outline btn-success btn-sm mt-4 gap-1 group/btn"
                >
                  Read More <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-circle btn-sm"
          >
            <FaChevronLeft />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={'btn btn-sm ' + (currentPage === i + 1 ? 'btn-success' : '')}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-circle btn-sm"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
