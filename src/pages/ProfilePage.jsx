import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In production, this would update the user profile via API
      if (updateUserProfile) {
        await updateUserProfile({ displayName: formData.displayName });
      }
      toast.success('Profile updated successfully\!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-base-content/60 mt-1">Manage your account information</p>
      </div>

      {/* Profile Picture Section */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-24">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" />
                ) : (
                  <span className="text-3xl">{user?.displayName?.[0] || user?.email?.[0] || "U"}</span>
                )}
              </div>
            </div>
            <div>
              <button className="btn btn-outline btn-sm gap-2">
                <FaCamera /> Change Photo
              </button>
              <p className="text-sm text-base-content/60 mt-2">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2"><FaUser /> Display Name</span>
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2"><FaEnvelope /> Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="your@email.com"
                disabled
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">Email cannot be changed</span>
              </label>
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2"><FaPhone /> Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2"><FaMapMarkerAlt /> Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="textarea textarea-bordered h-24"
              placeholder="Tell us about yourself and your eco journey..."
            />
          </div>

          {/* Submit Button */}
          <div className="card-actions justify-end mt-6">
            <button type="submit" className="btn btn-primary gap-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : <FaSave />}
              Save Changes
            </button>
          </div>
        </div>
      </form>

      {/* Account Stats */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Account Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Member Since</div>
              <div className="stat-value text-lg">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}</div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Last Login</div>
              <div className="stat-value text-lg">{user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : "N/A"}</div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Account Type</div>
              <div className="stat-value text-lg">{user?.email?.includes("admin") ? "Admin" : "User"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
