import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaCamera, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Compress an image File to a small base64 data URL (max 150px, jpeg 80%)
const compressImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const MAX = 150;
        const ratio = Math.min(MAX / img.width, MAX / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

const ProfilePage = () => {
  const { user, updateUserProfile, changePassword } = useAuth();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL || null);
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwLoading, setPwLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePwChange = (e) => setPwForm({ ...pwForm, [e.target.name]: e.target.value });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5 MB.');
      return;
    }
    try {
      const compressed = await compressImage(file);
      setPhotoPreview(compressed);
      setPhotoFile(compressed);
    } catch {
      toast.error('Failed to process image. Please try another file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.displayName.trim()) {
      toast.error('Display name is required.');
      return;
    }
    setLoading(true);
    try {
      const updates = { displayName: formData.displayName };
      if (photoFile) updates.photoURL = photoFile;
      await updateUserProfile(updates);
      toast.success('Profile updated successfully!');
      setPhotoFile(null);
    } catch {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) {
      toast.error('New passwords do not match.');
      return;
    }
    if (pwForm.newPw.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/.test(pwForm.newPw);
    if (!strong) {
      toast.error('Password must include uppercase, lowercase, and a special character.');
      return;
    }
    setPwLoading(true);
    try {
      await changePassword(pwForm.current, pwForm.newPw);
      toast.success('Password updated successfully!');
      setPwForm({ current: '', newPw: '', confirm: '' });
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        toast.error('Current password is incorrect.');
      } else {
        toast.error('Failed to update password. Please try again.');
      }
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-base-content/60 mt-1">Manage your account information</p>
      </div>

      {/* Profile Picture */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-2 overflow-hidden bg-primary">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-content text-3xl font-bold">
                    {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="btn btn-outline btn-sm gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaCamera /> Choose Photo
              </button>
              {photoFile && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => { setPhotoFile(null); setPhotoPreview(user?.photoURL || null); }}
                >
                  Remove
                </button>
              )}
              <p className="text-xs text-base-content/60">JPG or PNG. Max 5 MB. Will be resized to 150×150.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label htmlFor="displayName" className="label">
                <span className="label-text flex items-center gap-2"><FaUser /> Display Name *</span>
              </label>
              <input
                id="displayName"
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text flex items-center gap-2"><FaEnvelope /> Email</span>
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                className="input input-bordered opacity-60"
                disabled
              />
              <label className="label">
                <span className="label-text-alt text-base-content/50">Email cannot be changed</span>
              </label>
            </div>

            <div className="form-control">
              <label htmlFor="phone" className="label">
                <span className="label-text flex items-center gap-2"><FaPhone /> Phone</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className="form-control">
              <label htmlFor="location" className="label">
                <span className="label-text flex items-center gap-2"><FaMapMarkerAlt /> Location</span>
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="form-control mt-4">
            <label htmlFor="bio" className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="textarea textarea-bordered h-24"
              placeholder="Tell us about yourself and your eco journey..."
            />
          </div>

          <div className="card-actions justify-end mt-6">
            <button type="submit" className="btn btn-primary gap-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : <FaSave />}
              Save Changes
            </button>
          </div>
        </div>
      </form>

      {/* Change Password */}
      <form onSubmit={handlePasswordChange} className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-1 flex items-center gap-2">
            <FaLock className="text-warning" /> Change Password
          </h2>
          <p className="text-base-content/60 text-sm mb-4">Leave blank if you do not want to change your password.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-control">
              <label htmlFor="current" className="label">
                <span className="label-text">Current Password *</span>
              </label>
              <div className="relative">
                <input
                  id="current"
                  type={showCurrent ? 'text' : 'password'}
                  name="current"
                  value={pwForm.current}
                  onChange={handlePwChange}
                  className="input input-bordered w-full pr-10"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="newPw" className="label">
                <span className="label-text">New Password *</span>
              </label>
              <div className="relative">
                <input
                  id="newPw"
                  type={showNew ? 'text' : 'password'}
                  name="newPw"
                  value={pwForm.newPw}
                  onChange={handlePwChange}
                  className="input input-bordered w-full pr-10"
                  placeholder="••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/50">Min 6 chars, upper + lower + special</span>
              </label>
            </div>

            <div className="form-control">
              <label htmlFor="confirm" className="label">
                <span className="label-text">Confirm New Password *</span>
              </label>
              <input
                id="confirm"
                type="password"
                name="confirm"
                value={pwForm.confirm}
                onChange={handlePwChange}
                className={
                  'input input-bordered ' +
                  (pwForm.confirm && pwForm.newPw !== pwForm.confirm ? 'input-error' : '')
                }
                placeholder="••••••"
                required
              />
              {pwForm.confirm && pwForm.newPw !== pwForm.confirm && (
                <label className="label">
                  <span className="label-text-alt text-error">Passwords do not match</span>
                </label>
              )}
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <button
              type="submit"
              className="btn btn-warning gap-2"
              disabled={pwLoading || !pwForm.current || !pwForm.newPw || !pwForm.confirm}
            >
              {pwLoading ? <span className="loading loading-spinner"></span> : <FaLock />}
              Update Password
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
              <div className="stat-value text-lg">
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : 'N/A'}
              </div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Last Login</div>
              <div className="stat-value text-lg">
                {user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                  : 'N/A'}
              </div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Account Type</div>
              <div className="stat-value text-lg capitalize">
                {user?.email?.includes('admin')
                  ? 'Admin'
                  : user?.email?.includes('manager')
                  ? 'Manager'
                  : 'User'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
