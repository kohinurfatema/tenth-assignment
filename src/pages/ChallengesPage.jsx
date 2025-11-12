import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchJson } from '../data/apiClient';

const categories = [
  'Waste Reduction',
  'Green Living',
  'Water Conservation',
  'Sustainable Transport',
  'Energy Conservation',
];

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

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
        const query = params.toString() ? `?${params.toString()}` : '';
        const data = await fetchJson(`/api/challenges${query}`);
        setChallenges(data);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: 'Unable to load challenges.' });
      }
    };
    loadChallenges();
  }, [categoryFilter, debouncedSearch]);

  const renderCards = () => {
    if (status.loading) {
      return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="card bg-base-200 animate-pulse h-80" />
          ))}
        </div>
      );
    }

    if (status.error) {
      return <div className="alert alert-error">{status.error}</div>;
    }

    if (!challenges.length) {
      return <p className="text-center text-gray-500">No challenges found.</p>;
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <div key={challenge._id} className="card-elevated">
            <figure>
              <img src={challenge.imageUrl || challenge.imageURL} alt={challenge.title} />
            </figure>
            <div className="card-content">
              <span className="badge badge-outline badge-success w-fit">{challenge.category}</span>
              <h3 className="text-xl font-semibold">{challenge.title}</h3>
              <p className="section-text mb-0 line-clamp-3">{challenge.description}</p>
              <div className="card-meta space-y-1">
                <p><span className="font-semibold">Duration:</span> {challenge.duration} days</p>
                <p><span className="font-semibold">Participants:</span> {challenge.participants}</p>
                <p><span className="font-semibold">Impact:</span> {challenge.impactMetric}</p>
              </div>
              <div className="mt-auto pt-3 flex justify-between gap-2 flex-wrap">
                <Link to={`/challenges/${challenge.slug}`} className="btn btn-sm btn-outline flex-1 min-w-[120px]">
                  View Details
                </Link>
                <Link to={`/challenges/join/${challenge.slug || challenge._id}`} className="btn btn-sm btn-primary flex-1 min-w-[120px]">
                  Join
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="section-title">Explore Challenges</h1>
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label className="label">
            <span className="label-text">Search challenges</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="label">
            <span className="label-text">Filter by category</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {renderCards()}
    </div>
  );
};

export default ChallengesPage;