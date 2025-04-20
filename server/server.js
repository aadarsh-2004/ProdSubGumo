const express = require('express');
const cors = require('cors');
const db = require('./database'); // Import database connection & initialization
const adminAuthRoutes = require('./routes/adminAuth'); // Import admin routes
const tripRoutes = require('./routes/trips'); // Import trip routes
const nodemailer = require('nodemailer'); // For sending emails
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001; // Backend server port

// Middleware
app.use(cors()); // Allow requests from your React frontend (adjust origin in production)
app.use(express.json()); // Parse JSON request bodies

// Placeholder Route
app.get('/', (req, res) => {
  res.send('SubGumo Backend Server Running!');
});

// --- API Routes --- 
app.use('/api/admin', adminAuthRoutes); // Use admin auth routes
app.use('/api/trips', tripRoutes); // Use trip CRUD routes

// --- Inquiry Routes ---
// POST /api/send-email - Receive inquiry, save to DB, and send email
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, destination, guests, travelDates, message } = req.body;

  // Basic Validation (Add more specific validation as needed)
  if (!name || !email || !destination) {
      return res.status(400).json({ message: 'Missing required inquiry fields (name, email, destination).' });
  }

  // 1. Save inquiry to the database
  const sqlInsert = `INSERT INTO inquiries (name, email, phone, destination, guests, travelDates, message, received_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`;
  const paramsInsert = [name, email, phone, destination, guests, travelDates, message];
  
  // Use a Promise to handle the async nature of db.run callback
  const saveInquiryPromise = new Promise((resolve, reject) => {
    db.run(sqlInsert, paramsInsert, function(err) {
      if (err) {
        console.error('Database error saving inquiry:', err.message);
        reject(new Error('Failed to save inquiry to database.')); 
      } else {
         console.log(`Inquiry saved with ID: ${this.lastID}`);
         resolve(); // Resolve on successful save
      }
    });
  });

  try {
    await saveInquiryPromise; // Wait for DB operation to complete
  } catch (dbError) {
    // If DB save fails, immediately return an error to the client
    return res.status(500).json({ message: dbError.message });
  }

  // 2. Send email notification (only proceeds if DB save was successful)
  try {
    // Configure Nodemailer transporter using .env variables
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail', // Default to gmail
      auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS, // Your email password or app password from .env
      },
       tls: {
        rejectUnauthorized: false // May be needed for some environments/services like Gmail with less secure apps
      }
    });

    // Email details
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Use your email as sender, but show customer name
      replyTo: email, // Set reply-to to customer's email
      to: process.env.EMAIL_USER, // Send to your own email
      subject: `New Trip Inquiry: ${destination}`, // Include destination in subject
      text: `
        New Inquiry Received:

        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Destination: ${destination}
        Guests: ${guests || 'N/A'}
        Travel Dates: ${travelDates || 'N/A'}
        Message:
        ${message || 'No message provided.'}
      `,
       html: `
        <h3>New Trip Inquiry Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Number of Guests:</strong> ${guests || 'N/A'}</p>
        <p><strong>Preferred Travel Dates:</strong> ${travelDates || 'N/A'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message ? message.replace(/\n/g, '<br>') : 'No message provided.'}</p>
      ` // Basic HTML version
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully for inquiry.');
    // Since DB save succeeded and email send succeeded, return 200
    res.status(200).json({ message: 'Inquiry received and email sent successfully!' });

  } catch (emailError) {
    console.error('Error sending email notification:', emailError);
    // DB save worked, but email failed.
    // Inform client, but maybe not with a 500? A 207 Multi-Status might be technically correct.
    // Let's use a custom message with 200 for simplicity for now.
    res.status(200).json({ message: 'Inquiry saved successfully, but failed to send email notification. Please check server logs.' });
  }
});

// GET /api/inquiries - Fetch all inquiries for the admin panel
app.get('/api/inquiries', (req, res) => {
  // TODO: Add authentication/authorization check - only admins should access this

  const sqlSelect = "SELECT id, name, email, phone, destination, guests, travelDates, message, strftime('%Y-%m-%d %H:%M:%S', received_at) as received_at FROM inquiries ORDER BY received_at DESC"; // Get newest first, format date

  db.all(sqlSelect, [], (err, rows) => {
    if (err) {
      console.error('Error fetching inquiries:', err.message);
      return res.status(500).json({ message: 'Error fetching inquiries' });
    }
    res.status(200).json(rows); // Send the list of inquiries
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  // Database initialization is handled within database.js upon require/connect
});
