import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaEye, FaSort, FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../data/apiClient';

const ITEMS_PER_PAGE = 10;
const CATEGORIES = ['Waste Reduction', 'Green Living', 'Water Conservation', 'Sustainable Transport', 'Energy Conservation'];

const ManageChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortField, setSortField] = useState('title');
  const [sortDir, setSortDir] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ show: false, challenge: null });
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/api/challenges');
      if (response.ok) {
        const data = await response.json();
        setChallenges(Array.isArray(data) ? data : []);
      } else {
        setChallenges([]);
        toast.error('Failed to load challenges');
      }
    } catch {
      setChallenges([]);
      toast.error('Failed to load challenges');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.challenge) return;
    setDeleteLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/api/challenges/' + deleteModal.challenge._id, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error();
      setChallenges(prev => prev.filter(c => c._id !== deleteModal.challenge._id));
      toast.success('Challenge deleted successfully!');
      setDeleteModal({ show: false, challenge: null });
    } catch {
      toast.error('Failed to delete challenge.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <FaSort className="opacity-30 ml-1" />;
    return sortDir === 'asc' ? <FaSortUp className="ml-1 text-primary" /> : <FaSortDown className="ml-1 text-primary" />;
  };

  const processed = useMemo(() => {
    let result = challenges.filter(c => {
      const matchSearch =
        c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = filterCategory === 'all' || c.category === filterCategory;
      return matchSearch && matchCat;
    });

    result.sort((a, b) => {
      let aVal = a[sortField] ?? '';
      let bVal = b[sortField] ?? '';
      if (sortField === 'participants' || sortField === 'duration') {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else if (sortField === 'createdAt' || sortField === 'endDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [challenges, searchTerm, filterCategory, sortField, sortDir]);

  const totalPages = Math.ceil(processed.length / ITEMS_PER_PAGE);
  const paginated = processed.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, filterCategory, sortField, sortDir]);

  const isActive = (c) => c.endDate && new Date(c.endDate) > new Date();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-10 w-64"></div>
        <div className="skeleton h-12 w-full"></div>
        <div className="skeleton h-96 w-full"></div>
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
          <div className="stat-value text-2xl text-success">{challenges.filter(isActive).length}</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow p-4">
          <div className="stat-title text-xs">Participants</div>
          <div className="stat-value text-2xl text-secondary">{challenges.reduce((s, c) => s + (c.participants || 0), 0)}</div>
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
          className="select select-bordered w-full sm:w-52"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Results info */}
      <p className="text-sm text-base-content/60">
        Showing {paginated.length} of {processed.length} challenges
        {totalPages > 1 && <span> — Page {currentPage} of {totalPages}</span>}
      </p>

      {/* Table */}
      <div className="card bg-base-100 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>
                  <button onClick={() => handleSort('title')} className="flex items-center hover:text-primary">
                    Title <SortIcon field="title" />
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort('category')} className="flex items-center hover:text-primary">
                    Category <SortIcon field="category" />
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort('participants')} className="flex items-center hover:text-primary">
                    Participants <SortIcon field="participants" />
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort('duration')} className="flex items-center hover:text-primary">
                    Duration <SortIcon field="duration" />
                  </button>
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr key={c._id} className="hover">
                  <td>
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-base-200">
                      <img
                        src={c.imageUrl || c.imageURL || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100'}
                        alt={c.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td>
                    <p className="font-semibold line-clamp-1 max-w-[200px]">{c.title}</p>
                    <p className="text-xs text-base-content/60 line-clamp-1 max-w-[200px]">{c.description}</p>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-sm">{c.category}</span>
                  </td>
                  <td>{(c.participants || 0).toLocaleString()}</td>
                  <td>{c.duration} days</td>
                  <td>
                    <span className={'badge badge-sm ' + (isActive(c) ? 'badge-success' : 'badge-ghost')}>
                      {isActive(c) ? 'Active' : 'Ended'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Link
                        to={'/challenges/' + (c.slug || c._id)}
                        className="btn btn-ghost btn-xs"
                        title="View"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={'/dashboard/add-challenge?edit=' + c._id}
                        className="btn btn-ghost btn-xs"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="btn btn-ghost btn-xs text-error"
                        onClick={() => setDeleteModal({ show: true, challenge: c })}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginated.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/60">No challenges found.</p>
            <Link to="/dashboard/add-challenge" className="btn btn-primary mt-4">
              Create First Challenge
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage === 1}
            className="btn btn-circle btn-sm"
          >
            <FaChevronLeft />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={'btn btn-sm ' + (currentPage === i + 1 ? 'btn-primary' : '')}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-circle btn-sm"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error">Delete Challenge</h3>
            <p className="py-4">
              Are you sure you want to delete{' '}
              <span className="font-semibold">"{deleteModal.challenge?.title}"</span>?
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setDeleteModal({ show: false, challenge: null })}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Delete'}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !deleteLoading && setDeleteModal({ show: false, challenge: null })}></div>
        </div>
      )}
    </div>
  );
};

export default ManageChallengesPage;
