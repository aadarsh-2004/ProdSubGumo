const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors())

app.post('/send-email', async (req, res) => {
  const { name, email, phone, destination, guests, travelDates, message } = req.body;

  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
      auth: {
        user: 'sabgumo01@gmail.com', // Replace with your email
        pass: 'ukysfisvumbemtem', // Replace with your email password or app password
      },
    });

    // Email details
    const mailOptions = {
      from: email, // Customer's email
      to: 'sabgumo01@gmail.com', // Your fixed email
      subject: 'New Trip Inquiry',
      text: `
        New Inquiry Received:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Destination: ${destination}
        Guests: ${guests}
        Travel Dates: ${travelDates}
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
