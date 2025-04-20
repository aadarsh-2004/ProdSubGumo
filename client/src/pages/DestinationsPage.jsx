import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, CalendarDays } from 'lucide-react';
import '../components/TripCalendar.css'; // Assuming calendar CSS might be relevant for date calculations/display, adjust if not needed

// Helper function to calculate days remaining (Keep if needed for badges, otherwise remove)
function calculateDaysRemaining(startDateString) {
  if (!startDateString) return null;
  const today = new Date();
  const startDate = new Date(startDateString);
  // Set time to 00:00:00 to compare dates only
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);

  if (isNaN(startDate.getTime())) { // Check if date is valid
      return null; // Invalid date
  }

  // Optional: Decide if past dates should show something specific or null
  // if (startDate < today) {
  //   return 'Started'; // Or null, or negative number
  // }

  const timeDiff = startDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysRemaining;
}

const DestinationsPage = () => {
  const packages = ["Recommended", "Upcoming Tours"];
  const [active, setActive] = useState(0);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = 'http://localhost:3001/api'; // Ensure this points to your backend

  // Fetch trips from the API
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/trips`); 
        if (!response.ok) {
          throw new Error(`Failed to fetch trips: ${response.statusText}`);
        }
        const data = await response.json();
        setTrips(data || []); // Ensure trips is always an array
      } catch (err) {
        console.error("Fetch trips error:", err);
        setError(err.message || 'Failed to load destinations.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Filter trips based on active tab
  const filteredTrips = trips.filter((trip) => {
    // Example filtering logic - adjust based on your data
    if (active === 0) { // Recommended
       return !trip.is_upcoming; // Or based on rating, popularity etc.
    } else { // Upcoming Tours
       return trip.is_upcoming;
    }
  });

  return (
    // Changed from <section> to <div> for a page context
    // Added padding top for navbar space, adjust as needed
    <div className="py-24 md:py-36 pb-16 md:pb-24 bg-gradient-to-b from-teal-50 via-cyan-50 to-sky-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section - Adjusted for Page Context */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3">
            Explore Destinations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your next adventure. Browse our curated trips and discover amazing places.
          </p>
        </div>

        {/* Package Type Selector */}
        <div className="flex justify-center mb-10 md:mb-12">
          <div className="inline-flex rounded-lg shadow-sm bg-white p-1">
            {packages.map((pkg, index) => (
              <button
                key={index}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${ 
                  active === index
                    ? "bg-cyan-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActive(index)}
              >
                {pkg}
              </button>
            ))}
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && <div className="text-center py-10 text-lg font-medium text-cyan-700">Loading destinations...</div>}
        {error && <div className="text-center py-10 text-red-600 bg-red-100 p-4 rounded-lg">Error: {error}</div>}

        {/* Destination Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => {
                // --- Calculations for badges/pricing (same as component) ---
                const daysLeft = calculateDaysRemaining(trip.start_date);
                const originalCost = parseFloat(trip.original_cost);
                const finalCost = parseFloat(trip.cost);
                let savings = null;
                let percentage = null;
                if (!isNaN(originalCost) && !isNaN(finalCost) && originalCost > finalCost) {
                  savings = originalCost - finalCost;
                  percentage = Math.round((savings / originalCost) * 100);
                }

                return (
                  // --- Card JSX (copied from Destinations.jsx) --- 
                  <div key={trip.id} className="relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-cyan-200 hover:shadow-cyan-100/50 bg-white">
                    {/* Image */}
                    <img 
                      src={trip.card_img || '/placeholder-image.png'}
                      alt={trip.title} 
                      className="w-full h-64 object-cover" // Slightly reduced height for more cards potentially
                    />

                    {/* Badges Area */}
                    <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5 z-10">
                      {trip.badge ? (
                        <span className="bg-cyan-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm">{trip.badge}</span>
                      ) : null}
                      {trip.is_upcoming ? (
                        <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm">Coming Soon</span>
                      ) : null}
                      {(daysLeft !== null && daysLeft >= 0 && !trip.is_upcoming) ? (
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm">{daysLeft === 0 ? "Starts Today!" : `${daysLeft} Day${daysLeft > 1 ? 's' : ''} Left!`}</span>
                      ) : null}
                      {(trip.total_seats > 0 && trip.remaining_seats !== null && trip.remaining_seats <= 10 && trip.remaining_seats > 0) ? (
                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm">Only {trip.remaining_seats} Spot{trip.remaining_seats > 1 ? 's' : ''} Left!</span>
                      ) : null}
                    </div>
                    
                    {/* Gradient Overlay - Removed for page view to make text clearer on white bg */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div> */}
                    
                    {/* Text Content - Adjusted for white background */}
                    <div className="p-4">
                      <h4 className="text-lg font-bold mb-1 text-gray-900 line-clamp-2">{trip.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-1">{trip.card_subtitle}</p>
                      
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-end mb-3">
                          <div className="flex items-center gap-1.5 text-sm text-gray-700">
                            <CalendarDays className="w-4 h-4 text-cyan-600 flex-shrink-0" strokeWidth={2} />
                            <span className="truncate">{trip.duration}</span>
                          </div>
                          <div className="text-right flex-shrink-0 pl-2">
                            {originalCost > 0 && originalCost > finalCost && (
                              <div className="text-xs text-gray-500 line-through">₹{originalCost.toLocaleString()}</div>
                            )}
                            <div className="text-lg font-bold text-cyan-700">₹{finalCost ? finalCost.toLocaleString() : 'N/A'}</div>
                            {savings !== null && percentage !== null && (
                              <div className="text-xs font-medium text-green-600 mt-0.5">Save ₹{savings.toLocaleString()} ({percentage}%)</div>
                            )}
                          </div>
                        </div>
                        <NavLink 
                          to={trip.is_upcoming ? "#" : `/destination/${trip.id}`}
                          className={`mt-2 block w-full px-4 py-2 bg-amber-400 text-black text-sm font-semibold rounded-full hover:bg-amber-300 transition-colors text-center ${trip.is_upcoming ? 'opacity-70 cursor-not-allowed' : ''}`}
                          onClick={(e) => trip.is_upcoming && e.preventDefault()}
                        >
                          {trip.is_upcoming ? 'Details Coming Soon' : 'View Details'}
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  // --- End Card JSX ---
                );
              })
            ) : (
              <p className="text-center col-span-full py-10 text-gray-500 text-lg">No destinations found matching your criteria.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;
