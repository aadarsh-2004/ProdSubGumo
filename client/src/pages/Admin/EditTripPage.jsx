import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TripForm from '../../components/Admin/TripForm';

function EditTripPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get trip ID from URL parameters
  const API_URL = 'http://localhost:3001/api';

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing trip data on component mount
  useEffect(() => {
    const fetchTripData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_URL}/trips/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                 throw new Error('Trip not found.');
            } else {
                throw new Error('Failed to fetch trip data');
            }
        }
        const data = await response.json();
        setInitialData(data); // Set fetched data for the form
      } catch (err) {
        console.error('Error fetching trip data:', err);
        setError(err.message || 'Could not load trip data for editing.');
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [id]); // Re-fetch if ID changes

  const handleUpdateTrip = async (tripData) => {
    console.log(`Updating trip ${id}:`, tripData);
    setError(''); // Clear previous errors
    try {
      const response = await fetch(`${API_URL}/trips/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update trip');
      }

      console.log('Trip updated successfully');
      alert('Trip updated successfully!');
      navigate('/admin'); // Navigate back to dashboard on success
    } catch (err) {
      console.error('Error updating trip:', err);
      setError(err.message); // Show update error
      alert(`Error: ${err.message}`); // Simple error feedback
    }
  };

  if (loading) return <p className="text-center py-10">Loading trip data...</p>;
  // Display specific error if trip not found or general fetch error
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>; 
  if (!initialData) return <p className="text-center py-10">Could not load trip data.</p>; // Fallback

  return (
    <div className="container mx-auto px-4 py-36">
       <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Trip (ID: {id})</h1>
           <button 
            onClick={() => navigate('/admin')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Dashboard
          </button>
      </div>
      {/* Pass fetched data and edit flag to the form */} 
      <TripForm onSubmit={handleUpdateTrip} initialData={initialData} isEditing={true} />
      {error && <p className="mt-4 text-red-500 text-center">Update failed: {error}</p>} 
    </div>
  );
}

export default EditTripPage;
