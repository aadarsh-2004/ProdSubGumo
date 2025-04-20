import React, { useState } from "react";
import {
  Sun,
  Sunset,
  Moon,
  Clock,
  UtensilsCrossed,
  BookKey,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"; // Use relative path for ui components if they are siblings

// Helper function to get time-based icon (assuming this stays relevant)
const getTimeIcon = (time) => {
  switch (time?.toLowerCase()) {
    case "morning":
      return <Sun className="text-yellow-500 w-5 h-5 mr-3 flex-shrink-0" />;
    case "afternoon":
      return <Sunset className="text-orange-500 w-5 h-5 mr-3 flex-shrink-0" />;
    case "evening":
      return <Moon className="text-purple-700 w-5 h-5 mr-3 flex-shrink-0" />;
    case "meal":
      return <UtensilsCrossed className="text-indigo-500 w-5 h-5 mr-3 flex-shrink-0" />;
    case "note":
        return <BookKey className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0" />;
    default:
      return <Clock className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0" />;
  }
};

export const ItineraryModal = ({ data, open, onOpenChange }) => {
  if (!data || !data.itineraryData) {
    return null; // Return null if no data
  }

  const defaultTabValue = data.itineraryData.length > 0 ? `day-0` : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold">
            Your Curated Adventure: {data.title}
          </DialogTitle>
          <DialogDescription>
            {data.itineraryData.length} days of exclusive experiences. Select a day to view details.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultTabValue} className="flex-grow overflow-hidden flex flex-col px-6 pb-6">
          <TabsList className="mb-4 shrink-0 grid w-full grid-cols-4 lg:grid-cols-7">
            {data.itineraryData.map((day, index) => (
              <TabsTrigger key={index} value={`day-${index}`}>
                Day {day.day}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-grow overflow-y-auto pr-2"> {/* Scrollable content area */}
            {data.itineraryData.map((day, index) => (
              <TabsContent key={index} value={`day-${index}`} className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Day {day.day}: {day.title}</CardTitle>
                    <CardDescription>{day.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {day.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex items-start p-3 bg-gray-50 rounded-lg shadow-sm">
                        {getTimeIcon(activity.time)}
                        <div className="flex-grow">
                          <p className="font-semibold">{activity.time}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}; 