import React from 'react';

import { Camera, Coffee, Hotel, Plane, Umbrella, Utensils, Bus, Moon } from 'lucide-react';

const GoaItinerary = () => {
  const DestinationsData = {
    id: 4,
    name: "Goa",
    title: "Goa Paradise Journey",
    dateRange: "4 Days of Sun, Sand & Culture",
    locations: "North Goa - Old Goa - South Goa",
    days: [
      {
        dayNumber: 1,
        date: "Day 1",
        title: "Arrival and North Goa Beaches",
        activities: [
          {
            icon: <Plane className="w-5 h-5 text-blue-400" />,
            title: "Arrival in Goa",
            description: "Check into your hotel",
            type: "transport",
            time: "Morning"
          },
          {
            icon: <Umbrella className="w-5 h-5 text-yellow-400" />,
            title: "Calangute Beach",
            description: "Queen of Beaches - Perfect for sunbathing and water sports",
            type: "attraction",
            time: "Afternoon"
          },
          {
            icon: <Umbrella className="w-5 h-5 text-yellow-400" />,
            title: "Baga Beach",
            description: "Vibrant nightlife and beach shacks",
            type: "attraction",
            time: "Afternoon"
          },
          {
            icon: <Moon className="w-5 h-5 text-purple-400" />,
            title: "Local Markets & Dinner",
            description: "Shop for souvenirs and enjoy Goan cuisine at beachside shacks",
            type: "leisure",
            time: "Evening"
          }
        ]
      },
      {
        dayNumber: 2,
        date: "Day 2",
        title: "Historical and Cultural Exploration",
        activities: [
          {
            icon: <Camera className="w-5 h-5 text-green-400" />,
            title: "Basilica of Bom Jesus",
            description: "UNESCO World Heritage site with St. Francis Xavier's remains",
            type: "attraction",
            time: "Morning"
          },
          {
            icon: <Camera className="w-5 h-5 text-green-400" />,
            title: "Se Cathedral",
            description: "Portuguese-Manueline architecture marvel",
            type: "attraction",
            time: "Morning"
          },
          {
            icon: <Bus className="w-5 h-5 text-indigo-400" />,
            title: "Fontainhas Walking Tour",
            description: "Explore the colorful Latin Quarter",
            type: "activity",
            time: "Afternoon"
          },
          {
            icon: <Coffee className="w-5 h-5 text-orange-400" />,
            title: "Mandovi River Cruise",
            description: "Scenic cruise with traditional music and dance",
            type: "leisure",
            time: "Evening"
          }
        ]
      },
      {
        dayNumber: 3,
        date: "Day 3",
        title: "South Goa Beaches",
        activities: [
          {
            icon: <Umbrella className="w-5 h-5 text-yellow-400" />,
            title: "Colva Beach",
            description: "White sands and serene environment",
            type: "attraction",
            time: "Morning"
          },
          {
            icon: <Umbrella className="w-5 h-5 text-yellow-400" />,
            title: "Benaulim Beach",
            description: "Relaxation at less crowded beach",
            type: "attraction",
            time: "Morning"
          },
          {
            icon: <Umbrella className="w-5 h-5 text-yellow-400" />,
            title: "Palolem Beach",
            description: "Crescent-shaped beach perfect for swimming",
            type: "attraction",
            time: "Afternoon"
          },
          {
            icon: <Utensils className="w-5 h-5 text-red-400" />,
            title: "Seafood Dinner",
            description: "Fresh seafood and local delicacies",
            type: "food",
            time: "Evening"
          }
        ]
      },
      {
        dayNumber: 4,
        date: "Day 4",
        title: "Adventure and Departure",
        activities: [
          {
            icon: <Camera className="w-5 h-5 text-green-400" />,
            title: "Water Sports at Dona Paula",
            description: "Jet skiing, parasailing, and windsurfing",
            type: "activity",
            time: "Morning"
          },
          {
            icon: <Camera className="w-5 h-5 text-green-400" />,
            title: "Dudhsagar Waterfalls",
            description: "Four-tiered waterfall with breathtaking views",
            type: "attraction",
            time: "Afternoon"
          },
          {
            icon: <Plane className="w-5 h-5 text-blue-400" />,
            title: "Departure",
            description: "Check-out and departure",
            type: "transport",
            time: "Evening"
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{DestinationsData.title}</h1>
        <p className="text-xl text-gray-600">{DestinationsData.dateRange}</p>
        <p className="text-lg text-gray-500">{DestinationsData.locations}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DestinationsData.days.map((day) => (
          <div 
            key={day.dayNumber} 
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {day.date}: {day.title}
              </h2>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {day.activities.map((activity, index) => (
                <div key={index} className="mb-6 relative pl-8 last:mb-0">
                  <div className="absolute left-0 top-1">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{activity.time}</p>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoaItinerary;