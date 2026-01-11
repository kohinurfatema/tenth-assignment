import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router';
import { fetchJson } from '../data/apiClient';
import { FaSearch, FaFilter, FaSort, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = [
  'Waste Reduction',
  'Green Living',
  'Water Conservation',
  'Sustainable Transport',
  'Energy Conservation',
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title_asc', label: 'Title (A-Z)' },
  { value: 'title_desc', label: 'Title (Z-A)' },
  { value: 'participants_high', label: 'Most Participants' },
  { value: 'participants_low', label: 'Least Participants' },
];

const ITEMS_PER_PAGE = 8;

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(handle);
  }, [searchTerm]);

  useEffect(() => {
    const loadChallenges = async () => {
      setStatus({ loading: true, error: '' });
      try {
        const params = new URLSearchParams();
        if (categoryFilter) params.set('category', categoryFilter);
        if (debouncedSearch) params.set('q', debouncedSearch);
        const query = params.toString() ? '?' + params.toString() : '';
        const data = await fetchJson('/api/challenges' + query);
        setChallenges(Array.isArray(data) ? data : []);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: 'Unable to load challenges.' });
      }
    };
    loadChallenges();
  }, [categoryFilter, debouncedSearch]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, debouncedSearch, sortBy]);

  // Sort and paginate challenges
  const sortedAndPaginatedChallenges = useMemo(() => {
    let sorted = [...challenges];
    
    switch (sortBy) {
      case "oldest":
        sorted.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "title_asc":
        sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "title_desc":
        sorted.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
        break;
      case "participants_high":
        sorted.sort((a, b) => (b.participants || 0) - (a.participants || 0));
        break;
      case "participants_low":
        sorted.sort((a, b) => (a.participants || 0) - (b.participants || 0));
        break;
      default:
        break;
    }
    
    return sorted;
  }, [challenges, sortBy]);

  const totalPages = Math.ceil(sortedAndPaginatedChallenges.length / ITEMS_PER_PAGE);
  const paginatedChallenges = sortedAndPaginatedChallenges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSkeletons = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(8)].map((_, idx) => (
        <div key={idx} className="card bg-base-200 shadow-lg">
          <div className="skeleton h-48 w-full"></div>
          <div className="card-body">
            <div className="skeleton h-4 w-20 mb-2"></div>
            <div className="skeleton h-6 w-full mb-2"></div>
            <div className="skeleton h-4 w-full mb-1"></div>
            <div className="skeleton h-4 w-3/4 mb-4"></div>
            <div className="skeleton h-10 w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-circle btn-sm"
        >
          <FaChevronLeft />
        </button>
        
        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="btn btn-sm">1</button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        
        {pages.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={"btn btn-sm " + (currentPage === page ? "btn-primary" : "")}
          >
            {page}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button onClick={() => handlePageChange(totalPages)} className="btn btn-sm">{totalPages}</button>
          </>
        )}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-circle btn-sm"
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  const renderCards = () => {
    if (status.loading) return renderSkeletons();
    if (status.error) return <div className="alert alert-error">{status.error}</div>;
    if (!paginatedChallenges.length) return <p className="text-center text-gray-500 py-12">No challenges found.</p>;

    return (
      <>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedChallenges.map((challenge) => (
            <div key={challenge._id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow h-full">
              <figure className="aspect-video">
                <img src={challenge.imageUrl || challenge.imageURL || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"} alt={challenge.title} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body p-4 flex flex-col">
                <div className="badge badge-primary badge-sm mb-2">{challenge.category}</div>
                <h3 className="font-semibold line-clamp-2 mb-2">{challenge.title}</h3>
                <p className="text-sm text-base-content/70 line-clamp-2 mb-3">{challenge.description}</p>
                <div className="text-xs text-base-content/60 space-y-1 mb-3">
                  <p><span className="font-medium">Duration:</span> {challenge.duration} days</p>
                  <p><span className="font-medium">Participants:</span> {challenge.participants}</p>
                </div>
                <div className="mt-auto flex gap-2">
                  <Link to={"/challenges/" + (challenge.slug || challenge._id)} className="btn btn-sm btn-outline flex-1">Details</Link>
                  <Link to={"/challenges/join/" + (challenge.slug || challenge._id)} className="btn btn-sm btn-primary flex-1">Join</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {renderPagination()}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Explore Challenges</h1>
        <p className="text-base-content/60">Discover eco-friendly challenges and make a positive impact</p>
      </div>
      
      {/* Filters Row */}
      <div className="bg-base-200 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="label"><span className="label-text flex items-center gap-2"><FaSearch /> Search</span></label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div>
            <label className="label"><span className="label-text flex items-center gap-2"><FaFilter /> Category</span></label>
            <select
              className="select select-bordered w-full"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Sort */}
          <div>
            <label className="label"><span className="label-text flex items-center gap-2"><FaSort /> Sort By</span></label>
            <select
              className="select select-bordered w-full"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-base-content/60">
          {status.loading ? "Loading..." : "Showing " + paginatedChallenges.length + " of " + sortedAndPaginatedChallenges.length + " challenges"}
        </p>
        {totalPages > 1 && <p className="text-base-content/60">Page {currentPage} of {totalPages}</p>}
      </div>
      
      {renderCards()}
    </div>
  );
};

export default ChallengesPage;
