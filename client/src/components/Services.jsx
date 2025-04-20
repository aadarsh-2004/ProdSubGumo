import React from "react";
import {
  Utensils,
  BedDouble,
  Wifi,
  Car,
  MapPin,
  Sun,
  Compass,
  Mountain,
  Book,
  Camera,
  Heart,
  Leaf,
} from "lucide-react";

const ServicesCard = ({ icon, title, description, gradient, iconBg }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center text-center p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    {/* Icon */}
    {/* Reverted Icon Container: Using simpler background and letting icon color define the look */} 
    <div className="mb-5 inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100"> 
      {icon}
    </div>

    {/* Title */}
    <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">{title}</h4>

    {/* Description */}
    <p className="text-sm md:text-base text-gray-600 flex-grow">{description}</p>
  </div>
);

const services = [
  {
    icon: (
      <Utensils className="h-8 w-8 text-red-600" strokeWidth={1.5} />
    ),
    title: "Culinary Delights",
    description:
      "Indulge in the local flavors and aromas of our carefully selected restaurants and cafes.",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    iconBg: "bg-white",
  },
  {
    icon: (
      <BedDouble className="h-8 w-8 text-blue-600" strokeWidth={1.5} />
    ),
    title: "Cozy Accommodations",
    description:
      "Rest and recharge in our handpicked hotels, resorts, and vacation rentals.",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    iconBg: "bg-white",
  },
  {
    icon: (
      <Wifi className="h-8 w-8 text-teal-600" strokeWidth={1.5} />
    ),
    title: "Stay Connected",
    description:
      "Enjoy seamless internet connectivity throughout your journey.",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    iconBg: "bg-white",
  },
  {
    icon: (
      <Car className="h-8 w-8 text-purple-600" strokeWidth={1.5} />
    ),
    title: "Convenient Transportation",
    description:
      "Travel with ease using our reliable and efficient transportation services.",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    iconBg: "bg-white",
  },
  {
    icon: (
      <MapPin className="h-8 w-8 text-pink-600" strokeWidth={1.5} />
    ),
    title: "Expert Guidance",
    description:
      "Navigate with confidence using our detailed local insights and expert recommendations.",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    iconBg: "bg-white",
  },
  {
    icon: (
      <Sun className="h-8 w-8 text-amber-600" strokeWidth={1.5} />
    ),
    title: "Wellness Retreats",
    description:
      "Restore your spirit in carefully selected peaceful sanctuaries around the world.",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    iconBg: "bg-white",
  },
];

const Services = () => {
  return (
    <section id="services-redesign" className="py-16 md:py-24 bg-orange-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-2">
            Our Services
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Everything You Need for an Unforgettable Trip
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <ServicesCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
