import React from 'react';
import { User, Globe2, Heart } from 'lucide-react';
import profile from '../assets/profile.jpg'
const AboutUs = () => {
  const teamMembers = [
    {
      name: "Mr. Ravi ",
      role: "Trip Planner & Organizer",
      bio: "8+ years exploring hidden gems across India"
    },

  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">


      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Sabgumo was born out of a passion for travel and a desire to share the beauty of our world with others. Our team of travel enthusiasts has explored every corner of the globe, and we're excited to share our knowledge and expertise with you. We believe that travel has the power to transform lives, and we're committed to helping you experience the world in a way that's authentic, immersive, and unforgettable.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Globe2 className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Sabgumo, our mission is to inspire and enable travelers to explore the world with confidence and curiosity. We're dedicated to providing personalized travel experiences that cater to your unique interests, preferences, and budget.
            </p>
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-10">
            <User className="w-8 h-8 text-green-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Meet the Founder</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img src={profile} className="w-20 h-20 rounded-full shadow-md" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{member.name}</h3>
                <p className="text-blue-600 text-center mb-3">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
