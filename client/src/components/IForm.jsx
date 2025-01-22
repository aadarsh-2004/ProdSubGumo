import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, Send, User, Mail, Phone, MapPin, Users, MessageSquare } from 'lucide-react';
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

  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading popup

    try {
      // Send form data to the backend
      const response = await axios.post(`${API_BASE_URL}/send-email`, formData);

      setLoading(false); // Hide loading popup
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
      setLoading(false); // Hide loading popup
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
    <div className="min-h-screen bg-[#ffeed8] py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black sm:text-4xl mb-4">Start Your Journey</h2>
          <p className="text-lg text-gray-700">
            Fill out the form below or chat with us on WhatsApp to plan your dream trip!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 flex justify-center">
            <button
              onClick={handleWhatsAppChat}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition duration-200 space-x-2"
            >
              <IoLogoWhatsapp className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  placeholder="Aadarsh Soni"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  placeholder="aadarsh@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  placeholder="+91 7877XXXX01"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Preferred Destination
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  required
                >
                  <option value="">Select Destination</option>
                  <option value="kashmir">Kashmir</option>
                  <option value="manali">Manali</option>
                  <option value="udaipur">Udaipur</option>
                  <option value="kerala">Kerala</option>
                  <option value="goa">Goa</option>
                  <option value="rishikesh">Rishikesh</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  placeholder="2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Preferred Travel Dates
                </label>
                <input
                  type="date"
                  name="travelDates"
                  value={formData.travelDates}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                placeholder="Tell us about your travel plans and preferences..."
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-black hover:bg-gray-900 transition duration-200 space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Inquiry</span>
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
