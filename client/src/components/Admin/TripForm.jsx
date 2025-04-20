import React, { useState, useEffect } from 'react';

function TripForm({ onSubmit, initialData = {}, isEditing = false }) {
  // Initialize state with initialData or defaults
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    distance: initialData.distance || '',
    card_img: initialData.card_img || '', // URL or path
    info_img: initialData.info_img || '', // URL or path
    title: initialData.title || '',
    card_subtitle: initialData.card_subtitle || '',
    subtitle: initialData.subtitle || '',
    original_cost: initialData.original_cost || '',
    cost: initialData.cost || '',
    duration: initialData.duration || '',
    is_upcoming: initialData.is_upcoming !== undefined ? initialData.is_upcoming : false,
    description: initialData.description || '',
    maps_iframe: initialData.maps_iframe || '',
    itinerary_data: initialData.itinerary_data && initialData.itinerary_data.length > 0 
                      ? initialData.itinerary_data 
                      : [{ day: 1, title: '', activities: [{ time: '', title: '', description: '' }] }],
    rating: initialData.rating || '', 
    reviews_count: initialData.reviews_count || '', 
    categories: Array.isArray(initialData.categories) ? initialData.categories.join(', ') : '', 
    features: initialData.features ? JSON.stringify(initialData.features, null, 2) : '', 
    gallery_images: Array.isArray(initialData.gallery_images) ? initialData.gallery_images.join(', ') : '',
    start_date: initialData.start_date || '', 
    total_seats: initialData.total_seats || '',
    booked_seats: initialData.booked_seats || '0', 
    badge: initialData.badge || '',
  });

  // Effect to populate form when initialData changes (for editing)
  useEffect(() => {
    if (isEditing && initialData.id) { // Check if editing and initialData is loaded
      setFormData({
        name: initialData.name || '',
        distance: initialData.distance || '',
        card_img: initialData.card_img || '', 
        info_img: initialData.info_img || '', 
        title: initialData.title || '',
        card_subtitle: initialData.card_subtitle || '',
        subtitle: initialData.subtitle || '',
        original_cost: initialData.original_cost || '',
        cost: initialData.cost || '',
        duration: initialData.duration || '',
        is_upcoming: initialData.is_upcoming !== undefined ? !!initialData.is_upcoming : false,
        description: initialData.description || '',
        maps_iframe: initialData.maps_iframe || '',
        itinerary_data: initialData.itinerary_data && initialData.itinerary_data.length > 0 
                          ? initialData.itinerary_data 
                          : [{ day: 1, title: '', activities: [{ time: '', title: '', description: '' }] }],
        rating: initialData.rating || '',
        reviews_count: initialData.reviews_count || '',
        categories: Array.isArray(initialData.categories) ? initialData.categories.join(', ') : '', 
        features: initialData.features ? JSON.stringify(initialData.features, null, 2) : '', 
        gallery_images: Array.isArray(initialData.gallery_images) ? initialData.gallery_images.join(', ') : '',
        start_date: initialData.start_date || '', 
        total_seats: initialData.total_seats || '',
        booked_seats: initialData.booked_seats || '0', 
        badge: initialData.badge || '',
      });
    }
    // If adding (not editing), ensure default state is set (already handled by useState)
  }, [initialData, isEditing]);

  // Handler for simple input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // --- Itinerary Handlers --- 

  const handleItineraryChange = (dayIndex, field, value) => {
    const newItinerary = [...formData.itinerary_data];
    newItinerary[dayIndex] = { ...newItinerary[dayIndex], [field]: value };
    setFormData(prev => ({ ...prev, itinerary_data: newItinerary }));
  };

  const handleActivityChange = (dayIndex, activityIndex, field, value) => {
    const newItinerary = [...formData.itinerary_data];
    newItinerary[dayIndex].activities[activityIndex] = {
      ...newItinerary[dayIndex].activities[activityIndex],
      [field]: value,
    };
    setFormData(prev => ({ ...prev, itinerary_data: newItinerary }));
  };

  const addActivity = (dayIndex) => {
    const newItinerary = [...formData.itinerary_data];
    newItinerary[dayIndex].activities.push({ time: '', title: '', description: '' });
    setFormData(prev => ({ ...prev, itinerary_data: newItinerary }));
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const newItinerary = [...formData.itinerary_data];
    if (newItinerary[dayIndex].activities.length > 1) { // Keep at least one activity
        newItinerary[dayIndex].activities.splice(activityIndex, 1);
        setFormData(prev => ({ ...prev, itinerary_data: newItinerary }));
    }
  };

  const addDay = () => {
    const newDayNumber = formData.itinerary_data.length + 1;
    setFormData(prev => ({
      ...prev,
      itinerary_data: [...prev.itinerary_data, { day: newDayNumber, title: '', activities: [{ time: '', title: '', description: '' }] }],
    }));
  };

  const removeDay = (dayIndex) => {
    if (formData.itinerary_data.length > 1) { // Keep at least one day
        const newItinerary = [...formData.itinerary_data];
        newItinerary.splice(dayIndex, 1);
        // Re-number subsequent days if needed (optional, but good practice)
        for(let i = dayIndex; i < newItinerary.length; i++) {
            newItinerary[i].day = i + 1;
        }
        setFormData(prev => ({ ...prev, itinerary_data: newItinerary }));
    }
  };

  // --- Form Submission --- 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation example
    if (!formData.name || !formData.title) {
      alert('Trip Name and Title are required.');
      return;
    }
    // Convert is_upcoming to boolean or integer if needed by backend
    let processedCategories = [];
    if (formData.categories && typeof formData.categories === 'string') {
        processedCategories = formData.categories.split(',').map(s => s.trim()).filter(Boolean);
    }

    let processedGalleryImages = [];
    if (formData.gallery_images && typeof formData.gallery_images === 'string') {
        processedGalleryImages = formData.gallery_images.split(',').map(s => s.trim()).filter(Boolean);
    }

    let processedFeatures = [];
    if (formData.features && typeof formData.features === 'string') {
        try {
            processedFeatures = JSON.parse(formData.features);
            if (!Array.isArray(processedFeatures)) {
                console.warn("Parsed features is not an array, defaulting to empty.");
                processedFeatures = []; // Ensure it's an array
            }
        } catch (error) {
            alert('Error parsing Features JSON. Please check the format. Features will be saved as empty.');
            console.error("Error parsing features JSON:", error);
            // Decide how to handle: submit empty, or prevent submission?
            // For now, let's submit empty if parsing fails after alerting.
            processedFeatures = [];
        }
    }

    // Convert costs and counts to numbers
    const numRating = parseFloat(formData.rating) || null; // Use null if invalid
    const numReviewsCount = parseInt(formData.reviews_count, 10) || 0;
    const numCost = parseFloat(formData.cost) || null;
    const numOriginalCost = parseFloat(formData.original_cost) || null;
    const numTotalSeats = parseInt(formData.total_seats, 10) || 0;
    const numBookedSeats = parseInt(formData.booked_seats, 10) || 0;

    // Prepare data for submission
    const dataToSubmit = {
      ...formData, // Include other fields like name, title, description etc.
      rating: numRating,
      reviews_count: numReviewsCount,
      cost: numCost,
      original_cost: numOriginalCost,
      categories: processedCategories, // Use processed array
      features: processedFeatures, // Use processed array
      gallery_images: processedGalleryImages, // Use processed array
      is_upcoming: !!formData.is_upcoming, // Ensure boolean
      start_date: formData.start_date, // Send as 'YYYY-MM-DD' string
      total_seats: numTotalSeats,
      booked_seats: numBookedSeats,
      badge: formData.badge.trim(),
    };
    // console.log("Submitting data:", dataToSubmit); // For debugging
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">
      {/* Basic Trip Details */} 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Trip Name*</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Display Title*</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
         <div>
          <label htmlFor="card_subtitle" className="block text-sm font-medium text-gray-700">Card Subtitle</label>
          <input type="text" id="card_subtitle" name="card_subtitle" value={formData.card_subtitle} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
         <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Main Subtitle</label>
          <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distance</label>
          <input type="text" id="distance" name="distance" value={formData.distance} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
          <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor="original_cost" className="block text-sm font-medium text-gray-700">Original Cost</label>
          <input type="text" id="original_cost" name="original_cost" value={formData.original_cost} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
         <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Discounted Cost</label>
          <input type="text" id="cost" name="cost" value={formData.cost} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
         <div>
          <label htmlFor="card_img" className="block text-sm font-medium text-gray-700">Card Image URL</label>
          <input type="text" id="card_img" name="card_img" value={formData.card_img} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
         <div>
          <label htmlFor="info_img" className="block text-sm font-medium text-gray-700">Info Image URL</label>
          <input type="url" id="info_img" name="info_img" value={formData.info_img} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="maps_iframe" className="block text-sm font-medium text-gray-700">Google Maps IFrame Embed Code</label>
          <textarea id="maps_iframe" name="maps_iframe" rows="3" value={formData.maps_iframe} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
         <div className="flex items-center">
          <input type="checkbox" id="is_upcoming" name="is_upcoming" checked={formData.is_upcoming} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
          <label htmlFor="is_upcoming" className="ml-2 block text-sm text-gray-900">Is Upcoming Trip?</label>
        </div>
        
        {/* Rating and Reviews Count */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (e.g., 4.7)</label>
          <input type="number" step="0.1" id="rating" name="rating" value={formData.rating} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor="reviews_count" className="block text-sm font-medium text-gray-700">Reviews Count (e.g., 150)</label>
          <input type="number" id="reviews_count" name="reviews_count" value={formData.reviews_count} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        {/* Start Date */}
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        {/* Seats Info */}
        <div>
          <label htmlFor="total_seats" className="block text-sm font-medium text-gray-700">Total Seats</label>
          <input type="number" id="total_seats" name="total_seats" value={formData.total_seats} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor="booked_seats" className="block text-sm font-medium text-gray-700">Booked Seats</label>
          <input type="number" id="booked_seats" name="booked_seats" value={formData.booked_seats} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        {/* Badge */}
        <div>
          <label htmlFor="badge" className="block text-sm font-medium text-gray-700">Badge Text (e.g., New, Popular)</label>
          <input type="text" id="badge" name="badge" value={formData.badge} onChange={handleChange} placeholder="Optional tag for the card" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        {/* Categories (Comma-separated) */}
        <div className="md:col-span-2">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categories (comma-separated)</label>
          <textarea id="categories" name="categories" rows="2" value={formData.categories} onChange={handleChange} placeholder="e.g., Nature, Adventure, Relaxation" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        
        {/* Features (JSON Array) */}
        <div className="md:col-span-2">
          <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features (JSON Array)</label>
          <textarea id="features" name="features" rows="5" value={formData.features} onChange={handleChange} placeholder='e.g., [{"icon": "Trees", "text": "Lush Forests"}, {"icon": "Sparkles", "text": "Scenic Views"}]' className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono text-sm"></textarea>
          <p className="mt-1 text-xs text-gray-500">Enter as a valid JSON array of objects, each with 'icon' (string name) and 'text' (string).</p>
        </div>
        
        {/* Gallery Images (Comma-separated URLs) */}
        <div className="md:col-span-2">
          <label htmlFor="gallery_images" className="block text-sm font-medium text-gray-700">Gallery Image URLs (comma-separated)</label>
          <textarea id="gallery_images" name="gallery_images" rows="3" value={formData.gallery_images} onChange={handleChange} placeholder="e.g., /images/gallery1.jpg, /images/gallery2.jpg" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
      </div>

      {/* Itinerary Section */} 
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Itinerary</h3>
        {formData.itinerary_data.map((day, dayIndex) => (
          <div key={dayIndex} className="border p-4 rounded-md mb-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
                 <h4 className="font-semibold text-md">Day {day.day}</h4>
                 <button 
                    type="button"
                    onClick={() => removeDay(dayIndex)}
                    className="text-red-600 hover:text-red-800 text-sm font-semibold"
                    disabled={formData.itinerary_data.length <= 1}
                 >
                    Remove Day
                </button>
            </div>
            
            <input 
              type="text" 
              placeholder="Day Title (e.g., Arrival in Srinagar)" 
              value={day.title}
              onChange={(e) => handleItineraryChange(dayIndex, 'title', e.target.value)}
              className="mb-3 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />

            <h5 className="text-sm font-medium text-gray-600 mb-2">Activities</h5>
            {day.activities.map((activity, activityIndex) => (
              <div key={activityIndex} className="border p-3 rounded mb-2 bg-white relative">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input 
                      type="text" 
                      placeholder="Time (e.g., Morning)"
                      value={activity.time}
                      onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'time', e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm"
                    />
                    <input 
                      type="text" 
                      placeholder="Activity Title" 
                      value={activity.title}
                      onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'title', e.target.value)}
                       className="block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm"
                    />
                 </div>
                  <textarea 
                      placeholder="Activity Description" 
                      value={activity.description}
                      onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'description', e.target.value)}
                      rows="2"
                      className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm"
                    />
                 <button 
                    type="button"
                    onClick={() => removeActivity(dayIndex, activityIndex)}
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs p-1"
                    disabled={day.activities.length <= 1}
                    title="Remove Activity"
                 >
                   &times; {/* Multiplication sign as 'X' */}
                 </button>
              </div>
            ))}
            <button 
                type="button"
                onClick={() => addActivity(dayIndex)} 
                className="mt-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-1 px-3 rounded"
            >
                Add Activity
            </button>
          </div>
        ))}
        <button 
            type="button"
            onClick={addDay} 
            className="mt-4 bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 px-4 rounded"
        >
            Add Day to Itinerary
        </button>
      </div>

      {/* Submit Button */}
      <div className="border-t pt-6 mt-6">
        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditing ? 'Update Trip' : 'Add Trip'}
        </button>
      </div>
    </form>
  );
}

export default TripForm;
