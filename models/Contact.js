const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact; 
