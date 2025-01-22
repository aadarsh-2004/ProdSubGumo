import React from "react";
import {
  Compass,
  Mountain,
  Utensils,
  Book,
  Camera,
  Heart,
  Leaf,
  Map,
  Sunrise,
} from "lucide-react";

const ServicesCard = ({ icon, title, subTitle, gradient, iconBg }) => (
  <div className="group relative font-poppins p-8 rounded-3xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 transition-all duration-500 hover:shadow-xl">
    {/* Animated background blur effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-blue-50/50 group-hover:to-purple-50/50 rounded-3xl transition-all duration-500" />

    {/* Content */}
    <div className="relative space-y-6">
      {/* Icon container with gradient background */}
      <div
        className={`w-16 h-16 rounded-2xl ${gradient} p-0.5 transform group-hover:scale-110 transition-transform duration-500`}
      >
        <div
          className={`w-full h-full rounded-2xl ${iconBg} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
          {subTitle}
        </p>
      </div>
    </div>
  </div>
);

export default function Services() {
  const services = [
    {
      icon: (
        <Mountain className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
      ),
      title: "Hidden Gems",
      subTitle:
        "Uncover breathtaking secret locations and pristine destinations off the tourist radar.",
      gradient: "bg-gradient-to-br from-blue-400 to-purple-400",
      iconBg: "bg-white",
    },
    {
      icon: (
        <Utensils className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700" />
      ),
      title: "Cultural Experiences",
      subTitle:
        "Dive deep into authentic local traditions, cuisines, and way of life.",
      gradient: "bg-gradient-to-br from-emerald-400 to-teal-400",
      iconBg: "bg-white",
    },
    {
      icon: <Map className="w-8 h-8 text-rose-600 group-hover:text-rose-700" />,
      title: "Expert Guidance",
      subTitle:
        "Navigate with confidence using our detailed local insights and expert recommendations.",
      gradient: "bg-gradient-to-br from-rose-400 to-pink-400",
      iconBg: "bg-white",
    },
    {
      icon: (
        <Sunrise className="w-8 h-8 text-amber-600 group-hover:text-amber-700" />
      ),
      title: "Wellness Retreats",
      subTitle:
        "Restore your spirit in carefully selected peaceful sanctuaries around the world.",
      gradient: "bg-gradient-to-br from-amber-400 to-orange-400",
      iconBg: "bg-white",
    },
  ];

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
        <div className="inline-block">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
            OUR SERVICES
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Experience the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Unexplored
          </span>
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From hidden paradises to authentic cultural immersions, embark on
          journeys that create lasting memories and transformative experiences.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServicesCard key={index} {...service} />
        ))}
      </div>

      {/* Bottom Decoration */}
      <div className="mt-20 flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
      </div>
    </div>
  );
}
