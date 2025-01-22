import React, { useState, useEffect } from "react";
import { useParams ,Link } from "react-router-dom";
import './ModalStyles.css';

import {
  MapPin,
  Sun,
  Sunset,
  Moon,
  Clock,
  Star,
  Calendar,
  Heart,
  X,
  BookKey,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
} from "lucide-react";
import { DestinationsData } from "../utils/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

const getTimeIcon = (time) => {
  switch (time.toLowerCase()) {
    case "morning":
      return <Sun className="text-yellow-500 w-6 h-6" />;
    case "afternoon":
      return <Sunset className="text-orange-500 w-6 h-6" />;
    case "evening":
      return <Moon className="text-purple-700 w-6 h-6 " />;
    case "meal":
      return <UtensilsCrossed className="text-indigo-500 w-6 h-6" />;
    case "note":
        return <BookKey className="text-white w-6 h-6" />;
    default:
      return <Clock className="text-gray-500 w-6 h-6" />;
  }
};

// Main Component
export default function AboutDestination() {
  const { id } = useParams();
  const destination = DestinationsData.find((dest) => dest.id === parseInt(id));
  const [showItinerary, setShowItinerary] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!destination) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 text-xl">Destination not found!</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={destination.img}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold font-Volkhov mb-4">{destination.title}</h1>
            {/* <p className="text-xl opacity-90">{destination.subTitle}</p> */}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto  relative z-10 px-4">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-gray-600">4.5 (1200 Reviews)</span>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? "bg-red-50 text-red-500"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              <Heart fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
            {/* Main Content */}

            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  About the Destination
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {destination.subTitle}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-3">
                  {["Natural Beauty", "Adventure and Activities", " Historical and Cultural Heritage ","Spiritual Serenity","Handicrafts and Souvenirs","Nature Reserves"].map((category) => (
                    <span
                      key={category}
                      className="bg-blue-50 text-black shadow-md  px-4 py-2 rounded-xl  text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl shadow-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Price Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Starting from</span>
                    <span className="text-2xl  font-poppins font-bold  bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-clip-border text-transparent">
                    ₹{destination.cost}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-gray-900">
                      {destination.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setShowItinerary(true)}
                  className="w-full bg-black text-white px-6 py-4 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                >
                  View Itinerary
                </button>
                <Link  to="/IForm">
              
                <button className="w-full bg-gray-50 shadow-2xl  text-lg border-[2px] border-purple-500  bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-clip-border text-transparent px-6 py-4 rounded-xl font-bold hover:bg-orange-200 transition-colors">
                  Book Now
                </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden">
            <iframe
              src={destination.mapsIframe}
              className="w-full h-[300px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Itinerary Modal */}
      {showItinerary && (
        <ItineraryModal
          data={destination}
          onClose={() => setShowItinerary(false)}
        />
      )}
    </div>
  );
}
const ItineraryModal = ({ data, onClose }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 0);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-orange-100 via-rose-100 to-purple-100">
          <div className="flex justify-between items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Your Curated Adventure
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {data.itineraryData.length} days of exclusive experiences
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/50 transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-600 hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/50 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-rose-500 h-full transition-all"
              style={{
                width: `${
                  ((selectedDay + 1) / data.itineraryData.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div
          className={`sticky top-0 z-10 bg-white transition-shadow ${
            isScrolled ? "shadow-md" : ""
          }`}
        >
          <div className="flex overflow-x-auto scrollbar-hide p-3 gap-2">
            {data.itineraryData.map((day, index) => (
              <Button
                key={day.day}
                variant={selectedDay === index ? "default" : "outline"}
                onClick={() => setSelectedDay(index)}
                className={`flex-none px-4 py-2 text-sm sm:text-base rounded-xl transition-all ${
                  selectedDay === index
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                    : ""
                }`}
              >
                <Calendar
                  className={`w-4 h-4 mr-2 ${
                    selectedDay === index
                      ? "text-white"
                      : "text-orange-500"
                  }`}
                />
                Day {day.day}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]"
          onScroll={handleScroll}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2
           gap-4">
            {data.itineraryData[selectedDay]?.activities.map(
              (activity, index) => (
                <Card
                  key={index}
                  className="transition-all hover:scale-105 border-none shadow-2xl"
                >
                  <CardContent>
                    <div className="flex items-start gap-3 p-3">
                      <div className="p-2 bg-gray-900 shadow rounded-full">
                        {getTimeIcon(activity.time)}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          {activity.time}
                        </h4>
                        <br />
                        <p className="bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent text-[20px] font-semibold font-Volkhov">
                          {activity.title}
                        </p>
                        <h3 className="mt-3 text-gray-800 font-poppins">
                          {activity.description}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};





