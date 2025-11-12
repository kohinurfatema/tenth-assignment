import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { fetchJson, apiRequest } from '../data/apiClient';

const ActivitiesPage = () => {
  const { currentUser } = useAuth();
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });
  const [formState, setFormState] = useState({});

  const userId = currentUser?.uid || currentUser?.email;

  useEffect(() => {
    if (!userId) return;
    const loadActivities = async () => {
      setStatus({ loading: true, error: '' });
      try {
        const data = await fetchJson(`/api/user-challenges?userId=${encodeURIComponent(userId)}&includeDetails=1`);
        setRecords(data);
        const initialForm = data.reduce((acc, item) => {
          acc[item._id] = {
            progress: item.progress ?? 0,
            note: '',
          };
          return acc;
        }, {});
        setFormState(initialForm);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: 'Unable to load your activities.' });
      }
    };
    loadActivities();
  }, [userId]);

  const handleFieldChange = (id, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleProgressUpdate = async (record) => {
    const values = formState[record._id] || {};
    const payload = {
      progress: Number(values.progress),
      note: values.note,
    };
    if (Number.isNaN(payload.progress) || payload.progress < 0 || payload.progress > 100) {
      toast.error('Progress must be between 0 and 100.');
      return;
    }

    try {
      await apiRequest(`/api/user-challenges/${record._id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      toast.success('Progress updated!');
      setRecords((prev) =>
        prev.map((item) =>
          item._id === record._id
            ? {
                ...item,
                progress: payload.progress,
                lastUpdated: new Date().toISOString(),
                status: payload.progress >= 100 ? 'Finished' : item.status,
              }
            : item
        )
      );
      handleFieldChange(record._id, 'note', '');
    } catch (error) {
      toast.error(error.message || 'Unable to update progress.');
    }
  };

  const renderCards = () => {
    if (status.loading) {
      return (
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="card bg-base-200 animate-pulse h-64" />
          ))}
        </div>
      );
    }

    if (status.error) {
      return <p className="text-error">{status.error}</p>;
    }

    if (!records.length) {
      return <p className="text-gray-500">Join a challenge to start tracking your progress.</p>;
    }

    return (
      <div className="grid md:grid-cols-2 gap-6">
        {records.map((record) => {
          const challenge = record.challenge || {};
          const values = formState[record._id] || {};
          return (
            <div key={record._id} className="card bg-base-100 shadow-xl">
              {challenge.imageUrl && (
                <figure className="h-44">
                  <img src={challenge.imageUrl || challenge.imageURL} alt={challenge.title} className="w-full h-full object-cover" />
                </figure>
              )}
              <div className="card-body space-y-4">
                <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500">
                  <span className="badge badge-outline">{record.status}</span>
                  <span>Joined: {new Date(record.joinDate).toLocaleDateString()}</span>
                  {record.lastUpdated && <span>Updated: {new Date(record.lastUpdated).toLocaleDateString()}</span>}
                </div>
                <h2 className="text-2xl font-bold">{challenge.title || 'Challenge'}</h2>
                <p className="section-text mb-0 line-clamp-3">{challenge.description}</p>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{record.progress || 0}%</span>
                  </div>
                  <progress className="progress progress-success w-full" value={record.progress || 0} max="100"></progress>
                </div>
                <div className="grid gap-3">
                  <label className="text-sm font-semibold">Update Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="input input-bordered"
                    value={values.progress ?? ''}
                    onChange={(event) => handleFieldChange(record._id, 'progress', event.target.value)}
                  />
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Optional note"
                    value={values.note ?? ''}
                    onChange={(event) => handleFieldChange(record._id, 'note', event.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleProgressUpdate(record)}
                  >
                    Update Progress
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      <h1 className="section-title">My Activities</h1>
      <p className="section-text">Track your joined challenges and keep your progress up to date.</p>
      {renderCards()}
    </div>
  );
};

export default ActivitiesPage;