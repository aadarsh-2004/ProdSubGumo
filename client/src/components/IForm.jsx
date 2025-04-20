import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Send, User, Mail, Phone, MapPin, Users, MessageSquare, Loader2 } from 'lucide-react';
import { IoLogoWhatsapp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; // Import for navigation

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const IForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    guests: '',
    travelDates: '',
    message: '',
  });

  const [trips, setTrips] = useState([]); // State for storing fetched trips
  const [fetchError, setFetchError] = useState(null); // State for fetch errors
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [loading, setLoading] = useState(false); // Loading state for submission
  const navigate = useNavigate(); // For navigation

  // Fetch trips for the destination dropdown
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setFetchError(null); // Reset error before fetching
        const response = await axios.get(`${API_BASE_URL}/trips`);
        // Ensure response.data is an array before setting state
        if (Array.isArray(response.data)) {
          setTrips(response.data);
        } else {
          console.warn('API response for trips is not an array:', response.data);
          setTrips([]); // Default to empty array if data is not an array
          setFetchError('Received unexpected data format for destinations.');
        }
      } catch (error) { 
        console.error('Error fetching trips for form:', error);
        setFetchError('Could not load destinations. Please try refreshing.');
        setTrips([]); // Ensure trips is empty on error
      }
    };
    fetchTrips();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state ON BUTTON

    try {
      // Send form data to the backend
      const response = await axios.post(`${API_BASE_URL}/send-email`, formData);

      setLoading(false); // Hide loading state
      setShowPopup(true); // Show success popup

      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: '',
        guests: '',
        travelDates: '',
        message: '',
      });

      // Close popup and redirect after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
        navigate('/'); // Redirect to /home
      }, 2000);
    } catch (error) {
      setLoading(false); // Hide loading state
      console.error('Error sending email:', error);
      alert('Failed to send inquiry. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppChat = () => {
    const message = `Hi, I’d like to inquire about a trip. `;
    const whatsappLink = `https://wa.me/8239498447?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    // Use a gradient background similar to other sections
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Plan Your Next Adventure</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below or chat with us on WhatsApp to plan your dream trip!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10"> 
          {/* WhatsApp Button - Styled consistently */}
          <div className="mb-8 flex justify-center border-b pb-8 border-gray-200">
            <button
              onClick={handleWhatsAppChat}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-green-500 hover:bg-green-600 transition-all duration-200 space-x-2 shadow-sm hover:shadow-md"
            >
              <IoLogoWhatsapp className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8"> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1"> 
                  <User className="w-4 h-4 mr-2 inline-block relative -top-px" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 shadow-sm"
                  placeholder="Aadarsh Soni"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  <Mail className="w-4 h-4 mr-2 inline-block relative -top-px" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 shadow-sm"
                  placeholder="aadarsh@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  <Phone className="w-4 h-4 mr-2 inline-block relative -top-px" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 shadow-sm"
                  placeholder="+91 7877XXXX01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  <MapPin className="w-4 h-4 mr-2 inline-block relative -top-px" />
                  Preferred Destination
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 bg-white shadow-sm"
                  required
                >
                  <option value="" disabled>Select Destination</option>
                  {fetchError && <option value="" disabled>Error loading destinations</option>} 
                  {!fetchError && trips.length === 0 && !Array.isArray(trips) && <option value="" disabled>Loading destinations...</option>}
                  {/* Only map if trips is actually an array */} 
                  {Array.isArray(trips) && trips.map((trip) => (
                    <option key={trip.id} value={trip.title}> 
                      {trip.title} {/* Assuming trip object has id and title */} 
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  <Users className="w-4 h-4 mr-2 inline-block relative -top-px" />
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 shadow-sm"
                  placeholder="2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                  <Calendar className="w-4 h-4 mr-2 inline-block relative -top-px" />
                  Preferred Travel Dates
                </label>
                <input
                  type="date"
                  name="travelDates"
                  value={formData.travelDates}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                <MessageSquare className="w-4 h-4 mr-2 inline-block relative -top-px" />
                Your Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 shadow-sm"
                placeholder="Any specific requests or questions? (Optional)"
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-10 py-3 text-base font-semibold rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <><Loader2 className="animate-spin h-5 w-5 mr-3" /> Sending...</>
                ) : (
                  <><Send className="w-5 h-5 mr-2 -ml-1" /> Send Inquiry</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Loading Popup */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 text-center shadow-xl">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Sending Inquiry...</h2>
            <p className="text-gray-500">Please wait while we process your request.</p>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 text-center shadow-xl">
            <h2 className="text-xl font-bold text-green-600 mb-4">Inquiry Sent Successfully!</h2>
            <p className="text-gray-700">Thank you for reaching out. Redirecting you to the home page...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IForm;
