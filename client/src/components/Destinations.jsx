import info1 from "../assets/info1.png";
import info2 from "../assets/info2.png";
import info3 from "../assets/info3.png";
import { useState } from "react";
import { DestinationsData } from "../utils/constants";
import { NavLink } from "react-router-dom";

export default function Destinations() {
  const packages = ["The Group Tour", "Upcoming Tours"];
  const [active, setActive] = useState(1);

  // Filter destinations based on active tab
  const filteredDestinations = DestinationsData.filter((dest) =>
    active === 1 ? !dest.isUpcoming : dest.isUpcoming
  );

  return (
    <section id="destination" className="py-12 px-4 bg-gray-50">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-Volkhov font-bold bg-gradient-to-r from-purple-600 to-orange-400 bg-clip-text text-transparent">
          Recommended Destinations
        </h2>
      </div>

      {/* Package Type Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg shadow-sm bg-white p-1">
          {packages.map((pkg, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                active === index + 1
                  ? "bg-orange-400 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActive(index + 1)}
            >
              {pkg}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredDestinations.map((destination) => (
          <NavLink
            key={destination.id}
            to={destination.isUpcoming ? "#" : `/destination/${destination.id}`}
            className={`transform transition-all duration-300 hover:-translate-y-2 ${
              destination.isUpcoming ? "cursor-default" : ""
            }`}
            onClick={(e) => destination.isUpcoming && e.preventDefault()}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl">
              {/* Image Container */}
              <div className="relative">
                <img
                  src={destination.Cardimg}
                  alt={destination.title}
                  className="w-full h-48 object-cover"
                />
                {destination.isUpcoming && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Coming Soon
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {destination.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {destination.CardsubTitle}
                </p>

                {/* Info Icons and Price - Only shown for non-upcoming tours */}
                {!destination.isUpcoming && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-2">
                        <img
                          src={info1}
                          alt="info1"
                          className="w-8 h-8 bg-gray-700    p-1 rounded-full"
                        />
                        <img
                          src={info2}
                          alt="info2"
                          className="w-8 h-8 bg-gray-700 p-1 rounded-full"
                        />
                        <img
                          src={info3}
                          alt="info3"
                          className="w-8 h-8 bg-gray-700 p-1 rounded-full"
                        />
                      </div>
                      <div className="text-right">
                        <div className="flex flex-col items-end">
                          <div className="text-sm text-gray-500 line-through decoration-red-500 decoration-2">
                            ₹{destination.originalCost}/-
                          </div>
                          <div className="flex items-center">
                            <h4 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-clip-border text-transparent">
                              ₹{destination.cost}
                            </h4>
                            <span className="ml-2 text-xs font-medium bg-green-100 text-green-600 px-2 py-1 rounded">
                              Save ₹
                              {parseInt(destination.originalCost) -
                                parseInt(destination.cost)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
                      <span>{destination.duration}</span>
                      <span>1000 Kms</span>
                    </div>

                    {destination.isGroupTour && (
                      <div className="mt-4 bg-purple-100 text-purple-600 px-3 py-2 rounded-lg text-sm font-medium text-center">
                        Group Tour Package
                      </div>
                    )}
                  </>
                )}

                {/* Coming Soon Content */}
                {destination.isUpcoming && (
                  <div className="mt-4 text-center">
                    <div className="bg-orange-100 text-orange-600 px-4 py-3 rounded-lg">
                      <p className="font-medium mb-2">Stay Tuned!</p>
                      <p className="text-sm">
                        Package details will be revealed soon
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}
