const express = require('express');
const db = require('../database'); // Import the database connection

const router = express.Router();

// Helper function for safe JSON parsing
const safeJsonParse = (str, defaultValue = []) => {
  if (!str) return defaultValue;
  try {
    // Ensure we don't double-parse if it's already an object/array (e.g., from req.body)
    return typeof str === 'string' ? JSON.parse(str) : str;
  } catch (e) {
    console.error("Failed to parse JSON string:", str, e);
    return defaultValue;
  }
};

// Helper function for safe JSON stringifying
const safeJsonStringify = (obj, defaultValue = '[]') => {
  if (obj === undefined || obj === null) return defaultValue;
  try {
    // Ensure we don't double-stringify if it's already a string
    return typeof obj === 'string' ? obj : JSON.stringify(obj);
  } catch (e) {
    console.error("Failed to stringify object:", obj, e);
    return defaultValue;
  }
};

// --- Trip CRUD Operations --- 

// GET /api/trips - Get all trips
router.get('/', (req, res) => {
  // Select new fields and calculate remaining seats
  const sql = `
    SELECT *, 
           (total_seats - booked_seats) AS remaining_seats 
    FROM trips 
    ORDER BY id DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching trips:', err.message);
      return res.status(500).json({ message: 'Error fetching trips' });
    }
    // Parse JSON string fields back to objects/arrays
    const trips = rows.map(trip => ({
      ...trip,
      itinerary_data: safeJsonParse(trip.itinerary_data, []),
      categories: safeJsonParse(trip.categories, []),
      features: safeJsonParse(trip.features, []),
      gallery_images: safeJsonParse(trip.gallery_images, [])
    }));
    res.status(200).json(trips);
  });
});

// GET /api/trips/:id - Get a single trip by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Select new fields and calculate remaining seats for a single trip
  const sql = `
    SELECT *, 
           (total_seats - booked_seats) AS remaining_seats 
    FROM trips 
    WHERE id = ?`;
  const params = [id];
  db.get(sql, params, (err, row) => {
    if (err) {
      console.error(`Error fetching trip ${id}:`, err.message);
      return res.status(500).json({ message: 'Error fetching trip' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    // Parse itinerary_data and other JSON fields
    const trip = {
        ...row,
        itinerary_data: safeJsonParse(row.itinerary_data, []),
        categories: safeJsonParse(row.categories, []),
        features: safeJsonParse(row.features, []),
        gallery_images: safeJsonParse(row.gallery_images, [])
    };
    res.status(200).json(trip);
  });
});

// POST /api/trips - Create a new trip
router.post('/', (req, res) => {
  // Extract data from request body - ensure all required fields are present
  const {
    name, distance, card_img, info_img, title, card_subtitle,
    subtitle, original_cost, cost, duration, is_upcoming,
    description, maps_iframe, itinerary_data,
    // New fields
    rating, reviews_count, categories, features, gallery_images,
    start_date, total_seats, booked_seats, badge
  } = req.body;

  // Basic validation (add more as needed)
  if (!name || !title || !itinerary_data) {
    return res.status(400).json({ message: 'Missing required trip fields (name, title, itinerary_data)' });
  }

  const sql = `INSERT INTO trips (
                 name, distance, card_img, info_img, title, card_subtitle, subtitle,
                 original_cost, cost, duration, is_upcoming, description,
                 rating, reviews_count, categories, features, gallery_images,
                 maps_iframe, itinerary_data,
                 start_date, total_seats, booked_seats, badge
               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  // Stringify JSON fields for storage
  const itineraryJson = safeJsonStringify(itinerary_data, '[]');
  const categoriesJson = safeJsonStringify(categories, '[]');
  const featuresJson = safeJsonStringify(features, '[]');
  const galleryImagesJson = safeJsonStringify(gallery_images, '[]');

  const params = [
    name, distance, card_img, info_img, title, card_subtitle,
    subtitle, original_cost, cost, duration, is_upcoming ? 1 : 0, // Convert boolean to integer
    description,
    rating, reviews_count, categoriesJson, featuresJson, galleryImagesJson,
    maps_iframe, itineraryJson,
    start_date, total_seats, booked_seats, badge
  ];

  db.run(sql, params, function(err) { // Use function() to get access to this.lastID
    if (err) {
      console.error('Error creating trip:', err.message);
      return res.status(500).json({ message: 'Error creating trip' });
    }
    console.log(`New trip created with ID: ${this.lastID}`);
    res.status(201).json({ message: 'Trip created successfully', id: this.lastID });
  });
});

// PUT /api/trips/:id - Update an existing trip
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    name, distance, card_img, info_img, title, card_subtitle,
    subtitle, original_cost, cost, duration, is_upcoming,
    description, maps_iframe, itinerary_data,
    // New fields
    rating, reviews_count, categories, features, gallery_images,
    start_date, total_seats, booked_seats, badge
  } = req.body;

  // Basic validation
  if (!name || !title || !itinerary_data) {
    return res.status(400).json({ message: 'Missing required trip fields (name, title, itinerary_data)' });
  }

  const sql = `UPDATE trips SET
                 name = ?,
                 distance = ?,
                 card_img = ?,
                 info_img = ?,
                 title = ?,
                 card_subtitle = ?,
                 subtitle = ?,
                 original_cost = ?,
                 cost = ?,
                 duration = ?,
                 is_upcoming = ?,
                 description = ?,
                 rating = ?,
                 reviews_count = ?,
                 categories = ?,
                 features = ?,
                 gallery_images = ?,
                 maps_iframe = ?,
                 itinerary_data = ?,
                 start_date = ?,
                 total_seats = ?,
                 booked_seats = ?,
                 badge = ?
               WHERE id = ?`;

  const itineraryJson = safeJsonStringify(itinerary_data, '[]');
  const categoriesJson = safeJsonStringify(categories, '[]');
  const featuresJson = safeJsonStringify(features, '[]');
  const galleryImagesJson = safeJsonStringify(gallery_images, '[]');

  const params = [
    name, distance, card_img, info_img, title, card_subtitle,
    subtitle, original_cost, cost, duration, is_upcoming ? 1 : 0,
    description,
    rating, reviews_count, categoriesJson, featuresJson, galleryImagesJson,
    maps_iframe, itineraryJson,
    start_date, total_seats, booked_seats, badge,
    id // For the WHERE clause
  ];

  db.run(sql, params, function(err) {
    if (err) {
      console.error(`Error updating trip ${id}:`, err.message);
      return res.status(500).json({ message: 'Error updating trip' });
    }
    if (this.changes === 0) {
         return res.status(404).json({ message: 'Trip not found for update' });
    }
    console.log(`Trip ${id} updated successfully.`);
    res.status(200).json({ message: 'Trip updated successfully' });
  });
});

// DELETE /api/trips/:id - Delete a trip
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM trips WHERE id = ?', [id], function(err) {
    if (err) {
      console.error(`Error deleting trip ${id}:`, err.message);
      return res.status(500).json({ message: 'Error deleting trip' });
    }
    if (this.changes === 0) {
        return res.status(404).json({ message: 'Trip not found for deletion' });
    }
    console.log(`Trip ${id} deleted successfully.`);
    res.status(200).json({ message: 'Trip deleted successfully' });
  });
});

module.exports = router;
