import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronRight, FaClock, FaUsers } from 'react-icons/fa';
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
          const day = eventDate.getDate();
          const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
          return (
            <li 
              key={event._id} 
              className="group relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-base-200 dark:to-base-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100 dark:border-base-content/10 overflow-hidden"
            >
              <div className="flex">
                {/* Date Badge */}
                <div className="flex-shrink-0 w-20 bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white p-3">
                  <span className="text-3xl font-bold">{day}</span>
                  <span className="text-sm uppercase tracking-wide">{month}</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-bold text-base-content group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <FaClock className="text-xs" />
                      {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="flex items-center gap-1 text-base-content/70">
                      <FaMapMarkerAlt className="text-xs text-red-400" />
                      {event.location}
                    </span>
                  </div>

                  <p className="text-sm text-base-content/60 mt-2 line-clamp-2">{event.description}</p>
                </div>

                {/* Hover Arrow */}
                <div className="hidden md:flex items-center pr-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="my-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
          <FaCalendarAlt className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-base-content">Upcoming Events</h2>
          <p className="text-sm text-base-content/60">Join our eco-friendly community events</p>
        </div>
      </div>
      {renderContent()}
      <div className="text-center mt-6">
        <button className="btn btn-outline border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:border-blue-500 hover:text-white gap-2 group">
          View Calendar
          <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
