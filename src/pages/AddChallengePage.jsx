import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { apiRequest } from '../data/apiClient';

const categories = [
  'Waste Reduction',
  'Green Living',
  'Water Conservation',
  'Sustainable Transport',
  'Energy Conservation',
];

const initialFormState = {
  title: '',
  category: '',
  description: '',
  duration: '',
  target: '',
  impactMetric: '',
  participants: '0',
  createdBy: '',
  startDate: '',
  endDate: '',
  imageUrl: '',
  metricDisplay: '',
};

const AddChallengePage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    if (!formData.duration || Number(formData.duration) <= 0) newErrors.duration = 'Duration must be greater than 0.';
    if (!formData.target.trim()) newErrors.target = 'Target is required.';
    if (!formData.impactMetric.trim()) newErrors.impactMetric = 'Impact metric is required.';
    if (!formData.createdBy.trim()) newErrors.createdBy = 'Created by is required.';
    if (!formData.startDate) newErrors.startDate = 'Start date is required.';
    if (!formData.endDate) newErrors.endDate = 'End date is required.';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required.';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        duration: Number(formData.duration),
        participants: Number(formData.participants || 0),
      };
      const data = await apiRequest('/api/challenges', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      toast.success('Challenge created successfully!');
      setFormData(initialFormState);
      navigate(`/challenges/${data.slug || data._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to create challenge.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10">
      <Toaster position="top-center" />
      <h1 className="section-title mb-8">Add New Challenge</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="label"><span className="label-text">Title*</span></label>
            <input
              type="text"
              name="title"
              className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-error text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">Category*</span></label>
            <select
              name="category"
              className={`select select-bordered w-full ${errors.category ? 'select-error' : ''}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="text-error text-sm mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">Duration (days)*</span></label>
            <input
              type="number"
              name="duration"
              min="1"
              className={`input input-bordered w-full ${errors.duration ? 'input-error' : ''}`}
              value={formData.duration}
              onChange={handleChange}
            />
            {errors.duration && <p className="text-error text-sm mt-1">{errors.duration}</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">Impact Metric*</span></label>
            <input
              type="text"
              name="impactMetric"
              className={`input input-bordered w-full ${errors.impactMetric ? 'input-error' : ''}`}
              value={formData.impactMetric}
              onChange={handleChange}
            />
            {errors.impactMetric && <p className="text-error text-sm mt-1">{errors.impactMetric}</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">Target*</span></label>
            <input
              type="text"
              name="target"
              className={`input input-bordered w-full ${errors.target ? 'input-error' : ''}`}
              value={formData.target}
              onChange={handleChange}
            />
            {errors.target && <p className="text-error text-sm mt-1">{errors.target}</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">Created By*</span></label>
            <input
              type="email"
              name="createdBy"
              className={`input input-bordered w-full ${errors.createdBy ? 'input-error' : ''}`}
              value={formData.createdBy}
              onChange={handleChange}
            />
            {errors.createdBy && <p className="text-error text-sm mt-1">{errors.createdBy}</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">Start Date*</span></label>
            <input
              type="date"
              name="startDate"
              className={`input input-bordered w-full ${errors.startDate ? 'input-error' : ''}`}
              value={formData.startDate}
              onChange={handleChange}
            />
            {errors.startDate && <p className="text-error text-sm mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">End Date*</span></label>
            <input
              type="date"
              name="endDate"
              className={`input input-bordered w-full ${errors.endDate ? 'input-error' : ''}`}
              value={formData.endDate}
              onChange={handleChange}
            />
            {errors.endDate && <p className="text-error text-sm mt-1">{errors.endDate}</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">Participants (optional)</span></label>
            <input
              type="number"
              name="participants"
              min="0"
              className="input input-bordered w-full"
              value={formData.participants}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label"><span className="label-text">Metric Display (optional)</span></label>
            <input
              type="text"
              name="metricDisplay"
              className="input input-bordered w-full"
              value={formData.metricDisplay}
              onChange={handleChange}
              placeholder="e.g., 50 users · 200kg saved"
            />
          </div>
          <div className="md:col-span-2">
            <label className="label"><span className="label-text">Image URL*</span></label>
            <input
              type="url"
              name="imageUrl"
              className={`input input-bordered w-full ${errors.imageUrl ? 'input-error' : ''}`}
              value={formData.imageUrl}
              onChange={handleChange}
            />
            {errors.imageUrl && <p className="text-error text-sm mt-1">{errors.imageUrl}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="label"><span className="label-text">Description*</span></label>
            <textarea
              name="description"
              rows="4"
              className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? <span className="loading loading-spinner" /> : 'Create Challenge'}
        </button>
      </form>
    </div>
  );
};

export default AddChallengePage;