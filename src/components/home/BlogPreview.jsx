import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaClock, FaUser, FaArrowRight } from 'react-icons/fa';

const fallbackPosts = [
  {
    _id: '1',
    title: '10 Simple Ways to Reduce Your Carbon Footprint Today',
    excerpt: 'Small everyday changes can lead to massive environmental impact. Discover practical actions you can start right now.',
    category: 'Lifestyle',
    author: 'Sarah Johnson',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
    slug: 'reduce-carbon-footprint',
  },
  {
    _id: '2',
    title: 'The Complete Guide to Zero-Waste Grocery Shopping',
    excerpt: 'Learn how to shop smarter and cut your household plastic waste by up to 90% with these proven strategies.',
    category: 'Tips & Tricks',
    author: 'Michael Chen',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600',
    slug: 'zero-waste-grocery-shopping',
  },
  {
    _id: '3',
    title: 'How Our Community Saved 15,000 kg of CO2 This Month',
    excerpt: 'EcoTrack members across 42 active challenges hit an incredible milestone. Here is what it means for the planet.',
    category: 'Community',
    author: 'Emma Wilson',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    slug: 'community-co2-milestone',
  },
];

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(apiUrl + '/api/blogs?limit=3');
        if (res.ok) {
          const data = await res.json();
          setPosts(Array.isArray(data) && data.length ? data.slice(0, 3) : fallbackPosts);
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

  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">From the Blog</h2>
          <p className="text-base-content/60 mt-1">Tips, stories, and insights from the EcoTrack community</p>
        </div>
        <Link to="/blog" className="btn btn-outline btn-success gap-2 hidden sm:flex">
          View All <FaArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card bg-base-200 shadow-lg">
              <div className="skeleton h-48 w-full rounded-t-2xl"></div>
              <div className="card-body gap-3">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-4 w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
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
                <h3 className="font-bold text-lg leading-snug line-clamp-2 mb-2">{post.title}</h3>
                <p className="text-base-content/70 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
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
                  className="btn btn-ghost btn-sm mt-3 justify-start gap-1 text-success group/btn pl-0"
                >
                  Read More <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8 sm:hidden">
        <Link to="/blog" className="btn btn-outline btn-success">View All Articles</Link>
      </div>
    </section>
  );
};

export default BlogPreview;
