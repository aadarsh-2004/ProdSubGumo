const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initDb(); // Initialize tables after connection
  }
});

const saltRounds = 10; // For bcrypt password hashing

// Function to initialize database tables and seed initial admin
function initDb() {
  db.serialize(() => {
    // Create Admins table
    db.run(`CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creating admins table:', err.message);
      } else {
        console.log('Admins table checked/created.');
        // Seed initial admin user if table is newly created or empty
        seedInitialAdmin();
      }
    });

    // Create Inquiries table
    db.run(`CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      destination TEXT,
      guests INTEGER,
      travelDates TEXT,
      message TEXT,
      received_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating inquiries table:', err.message);
      } else {
        console.log('Inquiries table checked/created.');
      }
    });

    // Create Trips table based on constants.js structure
    db.run(`CREATE TABLE IF NOT EXISTS trips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      distance TEXT,
      card_img TEXT,            -- Renamed from Cardimg
      info_img TEXT,            -- Renamed from img
      title TEXT NOT NULL,
      card_subtitle TEXT,       -- Renamed from CardsubTitle
      subtitle TEXT,            -- Renamed from subTitle
      original_cost TEXT,       -- Storing as TEXT for simplicity
      cost TEXT,                -- Storing as TEXT for simplicity
      duration TEXT,
      is_upcoming INTEGER,      -- 0 for false, 1 for true
      description TEXT,
      rating REAL,
      reviews_count INTEGER,
      categories TEXT,        -- Store JSON string or comma-separated
      features TEXT,          -- Store JSON string 
      gallery_images TEXT,    -- Store JSON string or comma-separated URLs
      start_date TEXT,        -- Date trip starts (e.g., 'YYYY-MM-DD')
      total_seats INTEGER,    -- Total available seats
      booked_seats INTEGER DEFAULT 0, -- Seats already booked
      badge TEXT,             -- Badge text (e.g., 'New', 'Popular')
      maps_iframe TEXT,         -- Renamed from mapsIframe
      itinerary_data TEXT       -- Store JSON string here
    )`, (err) => {
      if (err) {
        console.error('Error creating trips table:', err.message);
      } else {
        console.log('Trips table checked/created.');
      }
    });
  });
}

// Function to seed the initial admin user
function seedInitialAdmin() {
  const initialUsername = 'admin';
  const initialPassword = 'password'; // Store this securely or use environment variables

  db.get('SELECT * FROM admins WHERE username = ?', [initialUsername], (err, row) => {
    if (err) {
      console.error('Error checking for initial admin:', err.message);
      return;
    }
    if (!row) {
      // Admin does not exist, create one
      bcrypt.hash(initialPassword, saltRounds, (hashErr, hash) => {
        if (hashErr) {
          console.error('Error hashing initial password:', hashErr);
          return;
        }
        db.run('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [initialUsername, hash], (insertErr) => {
          if (insertErr) {
            console.error('Error inserting initial admin:', insertErr.message);
          } else {
            console.log(`Initial admin user '${initialUsername}' created.`);
          }
        });
      });
    } else {
      // console.log(`Admin user '${initialUsername}' already exists.`);
    }
  });
}

module.exports = db; // Export the database connection instance
