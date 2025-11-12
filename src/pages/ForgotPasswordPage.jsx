import { useState } from 'react';
import { Link } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      const message = error.code === 'auth/user-not-found'
        ? 'No account found with that email.'
        : 'Unable to send reset email. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-16 bg-base-200 min-h-[80vh]">
      <Toaster position="top-center" />
      <div className="card w-full max-w-lg shadow-2xl bg-base-100">
        <form onSubmit={handleReset} className="card-body space-y-4">
          <h2 className="text-3xl font-bold text-center">Reset Your Password</h2>
          <p className="text-sm text-center text-gray-500">
            Enter the email associated with your EcoTrack account and we&apos;ll send you a password reset link.
          </p>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              placeholder="user@ecotrack.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner" /> : 'Send Reset Email'}
          </button>
          <div className="text-center text-sm">
            <p>
              Remembered your password?{' '}
              <Link to="/login" className="link link-primary">Back to login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;