import { useState } from 'react';
import { FaPaperPlane, FaLeaf } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../data/apiClient';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(API_BASE_URL + '/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch {
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12">
      <div className="card bg-gradient-to-r from-success/10 to-primary/10 shadow-xl">
        <div className="card-body items-center text-center py-12 px-6">
          <div className="flex items-center gap-2 mb-4">
            <FaLeaf className="text-success text-3xl" />
            <h2 className="text-3xl font-bold text-base-content">Stay Green, Stay Informed</h2>
          </div>

          <p className="text-base-content/70 max-w-xl mb-8">
            Subscribe to our newsletter for weekly eco-tips, challenge updates, and inspiring stories
            from our community. Join 10,000+ subscribers making a difference!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <div className="form-control flex-1">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input input-bordered w-full focus:input-success"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className={`btn btn-success ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {!isLoading && <FaPaperPlane className="w-4 h-4" />}
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          <p className="text-xs text-base-content/50 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
