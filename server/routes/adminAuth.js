const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database'); // Import the database connection

const router = express.Router();

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  db.get('SELECT * FROM admins WHERE username = ?', [username], (err, adminUser) => {
    if (err) {
      console.error('Database error during login:', err.message);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!adminUser) {
      // User not found
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    bcrypt.compare(password, adminUser.password_hash, (compareErr, isMatch) => {
      if (compareErr) {
        console.error('Error comparing password:', compareErr);
        return res.status(500).json({ message: 'Internal server error during auth' });
      }

      if (isMatch) {
        // Passwords match - Login successful
        // In a real app, generate a JWT token here and send it back
        console.log(`Admin user '${username}' logged in successfully.`);
        res.status(200).json({ message: 'Login successful' }); // Keep it simple for now
      } else {
        // Passwords don't match
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
});

module.exports = router;
