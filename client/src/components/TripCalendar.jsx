import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { NavLink } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './TripCalendar.css'; // Import custom styles
import { CalendarDays, MapPin } from 'lucide-react'; // Import icons

// Helper to format date to YYYY-MM-DD for comparison
const formatDate = (date) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const TripCalendar = () => { 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [allTrips, setAllTrips] = useState([]);
    const [tripsForSelectedDate, setTripsForSelectedDate] = useState([]);
    const [tripDates, setTripDates] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = 'http://localhost:3001/api';

    // --- Fetching Logic (identical to previous) ---
    useEffect(() => {
      const fetchAllTrips = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`${API_URL}/trips`);
          if (!response.ok) {
            throw new Error('Failed to fetch trips');
          }
          const data = await response.json();
          setAllTrips(data || []);

          const datesWithTrips = new Set();
          (data || []).forEach(trip => {
            if (trip.start_date) { datesWithTrips.add(trip.start_date); }
          });
          setTripDates(datesWithTrips);

        } catch (err) {
          console.error("Fetch trips error:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAllTrips();
    }, []);

    // --- Filtering Logic (identical to previous) ---
    useEffect(() => {
      const formattedDate = formatDate(selectedDate);
      if (formattedDate && allTrips.length > 0) {
        const filtered = allTrips.filter(trip => trip.start_date === formattedDate);
        setTripsForSelectedDate(filtered);
      } else {
        setTripsForSelectedDate([]);
      }
    }, [selectedDate, allTrips]);

    // --- Tile Highlighting Logic (identical to previous) ---
    const tileClassName = ({ date, view }) => {
      if (view === 'month') {
        const formattedDate = formatDate(date);
        if (tripDates.has(formattedDate)) {
          return 'highlight-trip-date';
        }
      }
      return null;
    };

    return (
        <section id="trip-calendar" className="py-16 md:py-24 bg-gradient-to-b from-sky-50 via-cyan-50 to-teal-50"> 
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> 
                {/* Heading Section - Updated Style */}
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <h3 className="text-sm font-semibold text-cyan-600 uppercase tracking-wider mb-2">
                        Plan Your Adventure
                    </h3>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        Trip Departure Calendar
                    </h2>
                </div>

                {/* Calendar & Trip List Layout */} 
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
                    {/* Calendar Container - Enhanced Styling */}
                    <div className="w-full lg:w-7/12 bg-white p-4 sm:p-6 rounded-2xl shadow-xl flex-shrink-0 border border-gray-100"> 
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            tileClassName={tileClassName}
                            className="react-calendar-custom w-full border-0" 
                        />
                    </div>

                    {/* Trip List Container - Enhanced Styling */}
                    <div className="w-full lg:w-5/12 mt-6 lg:mt-0 bg-white/70 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100"> 
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 border-b pb-3 border-gray-200">
                            Departures on <span className='text-cyan-700'>{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </h3>
                        {loading && <div className="text-center py-4 text-gray-500">Loading trips...</div>}
                        {error && <div className="text-center py-4 text-red-500">Error: {error}</div>}
                        {!loading && !error && (
                            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"> 
                                {tripsForSelectedDate.length > 0 ? (
                                    <ul className="space-y-4">
                                        {tripsForSelectedDate.map(trip => (
                                            <li key={trip.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-cyan-200 hover:shadow-md transition-all duration-200">
                                                <NavLink
                                                    to={`/destination/${trip.id}`}
                                                    className="block group"
                                                >
                                                    <h4 className="font-semibold text-gray-800 group-hover:text-cyan-700 transition-colors duration-200 mb-1 truncate">
                                                        {trip.title || 'Unnamed Trip'}
                                                    </h4>
                                                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                                                        <span className="flex items-center">
                                                            <CalendarDays className="w-3.5 h-3.5 mr-1 text-gray-400" />
                                                            {trip.duration || 'N/A'}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
                                                            {trip.name || 'N/A'} {/* Assuming location is available */} 
                                                        </span>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center py-4 text-gray-500 italic">
                                        No trips found starting on this date.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TripCalendar; 
