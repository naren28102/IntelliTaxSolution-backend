require('dotenv').config(); // Load environment variables
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Create a transporter object using SMTP transport for Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like hotmail, yahoo, etc.
  auth: {
    user: "intellitaxsolutions.kad@gmail.com", // use the environment variable for email
    pass: process.env.PASSWORD_EMAIL  // use the environment variable for password
  }
});

// Post route to send email and save contact data to MongoDB
router.post('/post', async (req, res) => {
  const { name, email, phone, company, service, message, preferredDate, preferredTime } = req.body;

  console.log(req.body); // Log the incoming data for debugging

  // Validate required fields
  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Name, contact number, and email are required.' });
  }

  // Define the email content
  const mailOptions = {
    from: email, // sender's email
    to: 'intellitaxsolutions.kad@gmail.com', // replace with the email where you want to send the contact details
    subject: 'New Contact Form Submission',
    html: `
      <h3>Contact Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact Number:</strong> ${phone}</p>
      <p><strong>Date:</strong> ${company}</p>
      <p><strong>Time:</strong> ${service}</p>
      <p><strong>Time:</strong> ${message}</p>
      <p><strong>Time:</strong> ${preferredDate}</p>
      <p><strong>Time:</strong> ${preferredTime}</p>
    `
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    // Save contact data to MongoDB
    const newContact = await Contact.create({
      name,
      email,
      phone,
      company,
      service,
      message,
      preferredDate,
      preferredTime
    });
    console.log('Contact data saved to MongoDB:', newContact);

    // Respond with the new contact data
    res.status(201).json({ contact: newContact, message: 'Email sent and data saved successfully!' });
  } catch (error) {
    console.error('Error:', error);
    // Respond with a 500 error if something went wrong
    res.status(500).json({ error: 'Failed to send email or save contact data.' });
  }
});

// Post route to get contacts (for authorized users)
router.post('/consults', async (req, res) => {
  const { authToken } = req.body;
  
  // Check for authorization token
  if (authToken !== process.env.AUTH_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Fetch contacts from MongoDB
  try {
    const contacts = await Contact.find();
    res.status(200).json({ contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
