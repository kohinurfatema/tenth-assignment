import { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaTrash, FaUserShield, FaUser, FaSort, FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ITEMS_PER_PAGE = 10;

const ManageUsersPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortField, setSortField] = useState('displayName');
  const [sortDir, setSortDir] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ show: false, user: null });
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + '/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } else {
        setUsers([
          { _id: '1', email: 'demo@ecotrack.com', displayName: 'Demo User', role: 'user', createdAt: '2024-01-01' },
          { _id: '2', email: 'admin@ecotrack.com', displayName: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
          { _id: '3', email: 'john@example.com', displayName: 'John Doe', role: 'user', createdAt: '2024-02-15' },
          { _id: '4', email: 'jane@example.com', displayName: 'Jane Smith', role: 'user', createdAt: '2024-03-20' },
        ]);
      }
    } catch {
      setUsers([
        { _id: '1', email: 'demo@ecotrack.com', displayName: 'Demo User', role: 'user', createdAt: '2024-01-01' },
        { _id: '2', email: 'admin@ecotrack.com', displayName: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const user = users.find(u => u._id === userId);
      const res = await fetch(apiUrl + '/api/users/' + user.email, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error();
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      toast.success('User role updated!');
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.user) return;
    setDeleteLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(apiUrl + '/api/users/' + deleteModal.user._id, {
        method: 'DELETE',
        headers: {
          'x-user-role': user?.role || 'admin',
          'x-user-email': user?.email || '',
        },
      });
      if (!res.ok) throw new Error();
      setUsers(prev => prev.filter(u => u._id !== deleteModal.user._id));
      toast.success('User deleted successfully.');
      setDeleteModal({ show: false, user: null });
    } catch {
      toast.error('Failed to delete user.');
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

  const processedUsers = useMemo(() => {
    let result = users.filter(u => {
      const matchSearch =
        u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRole = filterRole === 'all' || u.role === filterRole;
      return matchSearch && matchRole;
    });

    result.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      if (sortField === 'createdAt') {
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
  }, [users, searchTerm, filterRole, sortField, sortDir]);

  const totalPages = Math.ceil(processedUsers.length / ITEMS_PER_PAGE);
  const paginated = processedUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => { setCurrentPage(1); }, [searchTerm, filterRole, sortField, sortDir]);

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
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-base-content/60 mt-1">View and manage all registered users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{users.length}</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-title">Admins</div>
          <div className="stat-value text-secondary">{users.filter(u => u.role === 'admin').length}</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow">
          <div className="stat-title">Regular Users</div>
          <div className="stat-value text-accent">{users.filter(u => u.role === 'user').length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered w-full sm:w-40"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admins</option>
          <option value="manager">Managers</option>
          <option value="user">Users</option>
        </select>
      </div>

      {/* Results info */}
      <p className="text-sm text-base-content/60">
        Showing {paginated.length} of {processedUsers.length} users
        {totalPages > 1 && <span> — Page {currentPage} of {totalPages}</span>}
      </p>

      {/* Table */}
      <div className="card bg-base-100 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <button onClick={() => handleSort('displayName')} className="flex items-center hover:text-primary">
                    User <SortIcon field="displayName" />
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort('email')} className="flex items-center hover:text-primary">
                    Email <SortIcon field="email" />
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort('role')} className="flex items-center hover:text-primary">
                    Role <SortIcon field="role" />
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort('createdAt')} className="flex items-center hover:text-primary">
                    Joined <SortIcon field="createdAt" />
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((u) => (
                <tr key={u._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-10">
                          <span>{u.displayName?.charAt(0) || 'U'}</span>
                        </div>
                      </div>
                      <span className="font-medium">{u.displayName || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="text-base-content/70">{u.email}</td>
                  <td>
                    <span className={'badge ' + (u.role === 'admin' ? 'badge-primary' : u.role === 'manager' ? 'badge-secondary' : 'badge-ghost')}>
                      {u.role === 'admin' ? <FaUserShield className="mr-1" /> : <FaUser className="mr-1" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="text-base-content/70">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <select
                        className="select select-bordered select-sm"
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => setDeleteModal({ show: true, user: u })}
                        title="Delete user"
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
          <div className="p-8 text-center text-base-content/60">
            No users found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
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
              className={'btn btn-sm ' + (currentPage === i + 1 ? 'btn-primary' : '')}
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

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error">Delete User</h3>
            <p className="py-4">
              Are you sure you want to permanently delete{' '}
              <span className="font-semibold">{deleteModal.user?.displayName || deleteModal.user?.email}</span>?
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setDeleteModal({ show: false, user: null })}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
              >
                {deleteLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Delete'}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !deleteLoading && setDeleteModal({ show: false, user: null })}></div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersPage;
