import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { fetchJson, apiRequest } from '../data/apiClient';
import { useAuth } from '../context/AuthContext';

const JoinChallengePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [challenge, setChallenge] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: '' });
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const data = await fetchJson(`/api/challenges/${id}`);
        setChallenge(data);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: 'Unable to load challenge.' });
      }
    };
    loadChallenge();
  }, [id]);

  const handleJoin = async () => {
    if (!currentUser) return;
    setJoining(true);
    try {
      await apiRequest(`/api/challenges/join/${challenge.slug || challenge._id}`, {
        method: 'POST',
        body: JSON.stringify({
          userId: currentUser.uid || currentUser.email,
          note: 'Joined via dashboard',
        }),
      });
      toast.success('Challenge joined! Track progress in My Activities.');
      navigate('/my-activities');
    } catch (error) {
      toast.error(error.message || 'Unable to join challenge.');
    } finally {
      setJoining(false);
    }
  };

  if (status.loading) {
    return <div className="min-h-[50vh] flex items-center justify-center"><span className="loading loading-spinner loading-lg text-success" /></div>;
  }

  if (status.error || !challenge) {
    return <p className="text-error">{status.error}</p>;
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      <div className="card bg-base-100 shadow-xl">
        <figure className="max-h-80">
          <img src={challenge.imageUrl || challenge.imageURL} alt={challenge.title} className="w-full object-cover" />
        </figure>
        <div className="card-body space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="badge badge-outline badge-success">{challenge.category}</span>
            <span className="badge badge-outline">Duration: {challenge.duration} days</span>
            <span className="badge badge-outline">Participants: {challenge.participants}</span>
          </div>
          <h1 className="text-3xl font-bold">{challenge.title}</h1>
          <p className="section-text">{challenge.description}</p>
          <div className="text-sm text-gray-500 grid md:grid-cols-2 gap-2">
            <p><span className="font-semibold">Target:</span> {challenge.target}</p>
            <p><span className="font-semibold">Impact Metric:</span> {challenge.impactMetric}</p>
            <p><span className="font-semibold">Start Date:</span> {new Date(challenge.startDate).toLocaleDateString()}</p>
            <p><span className="font-semibold">End Date:</span> {new Date(challenge.endDate).toLocaleDateString()}</p>
          </div>
          <div className="pt-4 flex gap-4">
            <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Back</button>
            <button type="button" className="btn btn-primary" onClick={handleJoin} disabled={joining}>
              {joining ? <span className="loading loading-spinner" /> : 'Join Challenge'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinChallengePage;