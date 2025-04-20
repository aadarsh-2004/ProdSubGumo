import React from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from '../../components/Admin/TripForm'; // Import the form component

function AddTripPage() {
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3001/api'; // Backend URL

  const handleAddTrip = async (tripData) => {
    console.log('Submitting new trip:', tripData);
    try {
      const response = await fetch(`${API_URL}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed later
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add trip');
      }

      console.log('Trip added successfully');
      alert('Trip added successfully!'); // Simple success feedback
      navigate('/admin'); // Navigate back to dashboard on success
    } catch (error) {
      console.error('Error adding trip:', error);
      alert(`Error: ${error.message}`); // Simple error feedback
    }
  };

  return (
    <div className="container mx-auto px-4 py-36">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add New Trip</h1>
           <button 
            onClick={() => navigate('/admin')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Dashboard
          </button>
      </div>
      <TripForm onSubmit={handleAddTrip} /> 
    </div>
  );
}

export default AddTripPage;
