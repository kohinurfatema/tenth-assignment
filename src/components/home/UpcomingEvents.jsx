// src/components/home/UpcomingEvents.jsx
import { upcomingEvents } from '../../data/mockData';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'; // Requires react-icons

const UpcomingEvents = () => {
  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      
      {/* Container for the event list */}
      <ul className="space-y-4">
        {upcomingEvents.map((event) => (
          <li key={event.id} className="card bg-blue-100 shadow-lg p-4 transition-shadow duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            
            {/* Event Details */}
            <div className="text-sm space-y-1">
                {/* Date */}
                <div className="flex items-center text-info">
                    <FaCalendarAlt className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>
                      {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
                      — {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                {/* Location */}
                <div className="flex items-start text-neutral">
                    <FaMapMarkerAlt className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                    <span>{event.location}</span>
                </div>
                
                {/* Short Description */}
                <p className="text-sm text-gray-500 pt-2 line-clamp-2">{event.description}</p>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="text-center mt-6">
        <button className="btn btn-sm btn-outline btn-warning">View Calendar</button>
      </div>
    </div>
  );
};

export default UpcomingEvents;