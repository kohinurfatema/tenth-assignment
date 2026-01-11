import { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaUserShield, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

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
        setUsers(data);
      } else {
        // Fallback mock data
        setUsers([
          { _id: '1', email: 'demo@ecotrack.com', displayName: 'Demo User', role: 'user', createdAt: '2024-01-01' },
          { _id: '2', email: 'admin@ecotrack.com', displayName: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
          { _id: '3', email: 'john@example.com', displayName: 'John Doe', role: 'user', createdAt: '2024-02-15' },
          { _id: '4', email: 'jane@example.com', displayName: 'Jane Smith', role: 'user', createdAt: '2024-03-20' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
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
      await fetch(apiUrl + '/api/users/' + user.email, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      toast.success('User role updated!');
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteUser = (userId) => {
    toast.error('User deletion is disabled in demo mode');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

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
            placeholder="Search users..."
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

      {/* Users Table */}
      <div className="card bg-base-100 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-10">
                          <span>{user.displayName?.charAt(0) || 'U'}</span>
                        </div>
                      </div>
                      <span className="font-medium">{user.displayName || 'Unknown'}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={"badge " + (user.role === 'admin' ? "badge-primary" : "badge-ghost")}>
                      {user.role === 'admin' ? <FaUserShield className="mr-1" /> : <FaUser className="mr-1" />}
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <select
                        className="select select-bordered select-sm"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => handleDeleteUser(user._id)}
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
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-base-content/60">
            No users found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsersPage;
