import React from "react";
import {
  Sun,
  Sunset,
  Moon,
  Clock,
  UtensilsCrossed,
  BookKey,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Helper function to get time-based icon (same as before)
const getTimeIcon = (time) => {
  switch (time?.toLowerCase()) {
    case "morning":
      return <Sun className="w-5 h-5 text-yellow-600" />;
    case "afternoon":
      return <Sunset className="w-5 h-5 text-orange-600" />;
    case "evening":
      return <Moon className="w-5 h-5 text-indigo-600" />;
    case "meal":
      return <UtensilsCrossed className="w-5 h-5 text-red-600" />;
    case "note":
      return <BookKey className="w-5 h-5 text-gray-600" />;
    default:
      return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

export const ItineraryTimeline = ({ itineraryData }) => {
  if (!itineraryData || itineraryData.length === 0) {
    return <p className="text-gray-500 mt-4">No itinerary details available.</p>;
  }

  return (
    <div className="relative border-l-2 border-blue-200 pl-4 space-y-6 md:pl-8 md:space-y-8">
      {itineraryData.map((day, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-[25px] top-0 z-10 flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full ring-4 ring-white md:-left-[43px] md:w-6 md:h-6">
            <span className="text-xs font-bold text-white">{day.day}</span>
          </div>

          <Card className="shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <CardHeader className="pb-2 bg-gray-50/70 border-b border-gray-100 px-3 py-2 md:px-5 md:py-3">
              <CardTitle className="text-sm font-semibold md:text-lg">Day {day.day}: {day.title}</CardTitle>
              {day.description && (
                <CardDescription className="text-xs mt-1 md:text-sm">{day.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-3 px-3 py-3 md:px-5 md:py-4">
              {day.activities.map((activity, activityIndex) => (
                <div key={activityIndex} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-100 shadow-xs md:gap-3 md:p-2.5">
                  <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 md:w-8 md:h-8">
                     {getTimeIcon(activity.time)}
                  </div>
                  <p className="flex-grow font-medium text-xs text-gray-700 leading-tight md:text-sm md:leading-snug">
                     {activity.time && <span className="font-semibold text-gray-800">{activity.time}: </span>}
                     {activity.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}; 