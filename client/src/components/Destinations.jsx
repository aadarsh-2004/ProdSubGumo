import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, CalendarDays, DollarSign } from 'lucide-react';
import Destination1 from '../assets/Destination1.png';
import Destination2 from '../assets/Destination2.png';
import Destination3 from '../assets/Destination3.png';
import Destination4 from '../assets/Destination4.png';
import Destination5 from '../assets/Destination5.png';
import Destination6 from '../assets/Destination6.png';

// Helper function to calculate days remaining
function calculateDaysRemaining(startDateString) {
  if (!startDateString) return null;
  const today = new Date();
  const startDate = new Date(startDateString);

  // Set time to 00:00:00 to compare dates only
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);

  if (isNaN(startDate.getTime()) || startDate < today) {
    return null; // Invalid date or date in the past
  }

  const timeDiff = startDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysRemaining;
}

const Destinations = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = 'http://localhost:3001/api';

  // Fetch trips from the API on component mount
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/trips?limit=4`); 
        if (!response.ok) {
          throw new Error(`Failed to fetch trips: ${response.statusText}`);
        }
        const data = await response.json();
        setTrips(data || []); // Ensure trips is always an array
      } catch (err) {
        setError(err.message || 'Failed to load destinations.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Limit trips for the preview
  const featuredTrips = trips.slice(0, 4);

  return (
    <section id="destinations-preview" className="py-16 md:py-24 bg-gradient-to-b from-teal-50 via-cyan-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h3 className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2"> 
            Start Your Adventure
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Featured Destinations
          </h2>
        </div>

        {/* Loading and Error States */}
        {loading && <div className="text-center py-10 text-lg font-medium text-cyan-700">Loading destinations...</div>}
        {error && <div className="text-center py-10 text-red-600 bg-red-100 p-4 rounded-lg">Error: {error}</div>}

        {/* Destination Cards Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
              {featuredTrips.length > 0 ? (
                featuredTrips.map((trip) => {
                  // Calculate days remaining for badge
                  const daysLeft = calculateDaysRemaining(trip.start_date);
                  // Calculate savings for pricing display
                  const originalCost = parseFloat(trip.original_cost);
                  const finalCost = parseFloat(trip.cost);
                  let savings = null;
                  let percentage = null;
                  if (!isNaN(originalCost) && !isNaN(finalCost) && originalCost > finalCost) {
                    savings = originalCost - finalCost;
                    percentage = Math.round((savings / originalCost) * 100);
                  }

                  return (
                    <div key={trip.id} className="relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-cyan-200 hover:shadow-cyan-100/50">
                      {/* Image */}
                      <img 
                        src={trip.card_img || '/placeholder-image.png'}
                        alt={trip.title} 
                        className="w-full h-80 sm:h-96 object-cover" // Adjusted height slightly
                      />

                      {/* --- Badges Area (Top) --- */}
                      <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 z-10">
                        {/* Custom Badge */}
                        {trip.badge ? (
                          <span className="bg-cyan-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                            {trip.badge}
                          </span>
                        ) : null}
                        {/* Upcoming Tour Badge */}
                        {trip.is_upcoming ? (
                          <span className="bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                            Coming Soon
                          </span>
                        ) : null}
                        {/* Days Left Badge */}
                        {(daysLeft !== null && daysLeft >= 0 && !trip.is_upcoming) ? (
                          <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                            {daysLeft === 0 ? "Starts Today!" : `${daysLeft} Day${daysLeft > 1 ? 's' : ''} Left!`}
                          </span>
                        ) : null}
                        {/* Limited Seats Badge */}
                        {(trip.total_seats > 0 && trip.remaining_seats !== null && trip.remaining_seats <= 10 && trip.remaining_seats > 0) ? (
                          <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                            Only {trip.remaining_seats} Spot{trip.remaining_seats > 1 ? 's' : ''} Left!
                          </span>
                        ) : null}
                      </div>
                      
                      {/* --- Gradient Overlay --- */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                      
                      {/* --- Text Content (Bottom - Always Visible) --- */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white"> 
                        {/* Title & Subtitle */}
                        <h4 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 drop-shadow-md line-clamp-2">{trip.title}</h4>
                        <p className="text-sm text-gray-200 mb-3 drop-shadow-sm line-clamp-1">{trip.card_subtitle}</p>
                        
                        {/* Details Section (Duration, Pricing) */}
                        <div className="pt-3 border-t border-white/20">
                          <div className="flex justify-between items-end mb-3">
                            {/* Duration */}
                            <div className="flex items-center gap-1.5 text-sm opacity-90">
                              <CalendarDays className="w-4 h-4 text-amber-300 flex-shrink-0" strokeWidth={2} />
                              <span className="truncate">{trip.duration}</span>
                            </div>

                            {/* Pricing Block */}
                            <div className="text-right flex-shrink-0 pl-2">
                              {originalCost > 0 && originalCost > finalCost && (
                                <div className="text-xs text-gray-300 line-through">
                                  ₹{originalCost.toLocaleString()}
                                </div>
                              )}
                              <div className="text-xl font-bold text-amber-300">
                                ₹{finalCost ? finalCost.toLocaleString() : 'N/A'}
                              </div>
                              {savings !== null && percentage !== null && (
                                <div className="text-xs font-medium text-green-400 mt-0.5">
                                  Save ₹{savings.toLocaleString()} ({percentage}%)
                                </div>
                              )}
                            </div>
                          </div>

                          {/* View Details Button */}
                          <NavLink 
                            to={trip.is_upcoming ? "#" : `/destination/${trip.id}`} // Disable link for upcoming
                            className={`mt-2 inline-block w-full px-4 py-2 bg-amber-400 text-black text-sm font-semibold rounded-full hover:bg-amber-300 transition-colors text-center ${trip.is_upcoming ? 'opacity-70 cursor-not-allowed' : ''}`}
                            onClick={(e) => trip.is_upcoming && e.preventDefault()} // Prevent navigation for upcoming
                          >
                            {trip.is_upcoming ? 'Details Coming Soon' : 'View Details'}
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center col-span-full py-10 text-gray-500 text-lg">No featured destinations available right now.</p>
              )}
            </div>

            {/* --- View All Button --- */} 
            {trips.length > 4 && ( // Show button only if there are more trips than shown
              <div className="text-center mt-12 md:mt-16">
                <NavLink 
                  to="/destinations"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 transition-colors duration-200"
                >
                  View All Destinations
                </NavLink>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Destinations;
