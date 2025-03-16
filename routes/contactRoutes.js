const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


router.post('/post', async (req, res) => {
    const { clientName, contactNumber, email, date, time } = req.body;
    try {
        const newContact = await Contact.create({
            clientName,
            contactNumber,
            email,
            date,
            time
        });
        console.log(newContact);
        res.status(201).json({ contact: newContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/consults', async (req, res) => {
    const { authToken } = req.body;
    if (authToken !== process.env.AUTH_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const contacts = await Contact.find();
        res.status(200).json({ contacts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;