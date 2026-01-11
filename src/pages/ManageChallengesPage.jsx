import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteModal, setDeleteModal] = useState({ show: false, challenge: null });

  const categories = ['Waste Reduction', 'Green Living', 'Water Conservation', 'Sustainable Transport', 'Energy Conservation'];

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + '/api/challenges');
      if (response.ok) {
        const data = await response.json();
        setChallenges(data);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast.error('Failed to load challenges');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.challenge) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + '/api/challenges/' + deleteModal.challenge._id, {
        method: 'DELETE'
      });

      if (response.ok) {
        setChallenges(challenges.filter(c => c._id !== deleteModal.challenge._id));
        toast.success('Challenge deleted successfully!');
      } else {
        toast.error('Failed to delete challenge');
      }
    } catch (error) {
      toast.error('Error deleting challenge');
    } finally {
      setDeleteModal({ show: false, challenge: null });
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || challenge.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-10 w-64"></div>
        <div className="skeleton h-12 w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-64 w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Challenges</h1>
          <p className="text-base-content/60 mt-1">Create, edit, and manage eco challenges</p>
        </div>
        <Link to="/dashboard/add-challenge" className="btn btn-primary gap-2">
          <FaPlus /> Add Challenge
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat bg-base-100 rounded-lg shadow p-4">
          <div className="stat-title text-xs">Total</div>
          <div className="stat-value text-2xl text-primary">{challenges.length}</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow p-4">
          <div className="stat-title text-xs">Active</div>
          <div className="stat-value text-2xl text-success">{challenges.filter(c => new Date(c.endDate) > new Date()).length}</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow p-4">
          <div className="stat-title text-xs">Participants</div>
          <div className="stat-value text-2xl text-secondary">{challenges.reduce((sum, c) => sum + (c.participants || 0), 0)}</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow p-4">
          <div className="stat-title text-xs">Categories</div>
          <div className="stat-value text-2xl text-accent">{new Set(challenges.map(c => c.category)).size}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search challenges..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered w-full sm:w-48"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div key={challenge._id} className="card bg-base-100 shadow-lg">
            <figure className="h-40">
              <img
                src={challenge.imageUrl || challenge.imageURL || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400'}
                alt={challenge.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <div className="badge badge-primary badge-sm">{challenge.category}</div>
              <h3 className="card-title text-lg line-clamp-1">{challenge.title}</h3>
              <p className="text-sm text-base-content/60 line-clamp-2">{challenge.description}</p>

              <div className="flex justify-between text-sm text-base-content/60 mt-2">
                <span>{challenge.participants || 0} participants</span>
                <span>{challenge.duration} days</span>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link to={"/challenges/" + (challenge.slug || challenge._id)} className="btn btn-ghost btn-sm">
                  <FaEye />
                </Link>
                <Link to={"/dashboard/add-challenge?edit=" + challenge._id} className="btn btn-ghost btn-sm">
                  <FaEdit />
                </Link>
                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => setDeleteModal({ show: true, challenge })}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/60">No challenges found</p>
          <Link to="/dashboard/add-challenge" className="btn btn-primary mt-4">
            Create First Challenge
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Challenge</h3>
            <p className="py-4">
              Are you sure you want to delete "{deleteModal.challenge?.title}"? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setDeleteModal({ show: false, challenge: null })}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteModal({ show: false, challenge: null })}></div>
        </div>
      )}
    </div>
  );
};

export default ManageChallengesPage;
