import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { fetchJson } from '../../data/apiClient';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchJson('/api/events/upcoming');
        setEvents(data);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: 'Unable to load upcoming events.' });
      }
    };
    loadEvents();
  }, []);

  const renderContent = () => {
    if (status.loading) {
      return (
        <ul className="space-y-4">
          {[...Array(4)].map((_, idx) => (
            <li key={idx} className="card bg-base-200 animate-pulse h-32" />
          ))}
        </ul>
      );
    }

    if (status.error || !events.length) {
      return (
        <div className="alert alert-info">
          <span>{status.error || 'No scheduled events right now. Check back soon!'}</span>
        </div>
      );
    }

    return (
      <ul className="space-y-4">
        {events.map((event) => {
          const eventDate = new Date(event.date);
          return (
            <li key={event._id} className="card-elevated bg-blue-50">
              <div className="card-content">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <div className="text-sm space-y-2">
                  <div className="flex items-center text-info">
                    <FaCalendarAlt className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>
                      {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} —{' '}
                      {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-start text-neutral">
                    <FaMapMarkerAlt className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <p className="section-text mb-0 line-clamp-3">{event.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="my-10">
      <h2 className="section-title">Upcoming Events</h2>
      {renderContent()}
      <div className="text-center mt-6">
        <button className="btn btn-sm btn-outline btn-warning">View Calendar</button>
      </div>
    </div>
  );
};

export default UpcomingEvents;