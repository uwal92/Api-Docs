const express = require('express');
const router = express.Router();
const { Spot } = require('../models'); // Include the Spot model
const authenticate = require('../middleware/authenticate'); // Authentication middleware

// Endpoint to add a new Spot
router.get('/',  async (req, res) => {
    console.log('spot route is working');

    const [address, city, state, country, lat, lng, name, description, price] = ['us', 'None', 'None', 'None', 'None', 'None', 'None', 'None', 'None'];
console.log(address);

    // Check for missing fields
    const missingFields = {};
    if (!address) missingFields.address = 'Address is required';
    if (!city) missingFields.city = 'City is required';
    if (!state) missingFields.state = 'State is required';
    if (!country) missingFields.country = 'Country is required';
    if (!lat) missingFields.lat = 'Latitude is required';
    if (!lng) missingFields.lng = 'Longitude is required';
    if (!name) missingFields.name = 'Name is required';
    if (!description) missingFields.description = 'Description is required';
    if (!price) missingFields.price = 'Price is required';

    // If any fields are missing, send a validation error
    if (Object.keys(missingFields).length > 0) {
        return res.status(400).json({
            message: 'Validation error',
            errors: missingFields,
        });
    }

    try {
        const newSpot = {
            ownerId: 123, // User ID from the authentication middleware
            address: '123 Main St',    // Example address
            city: 'Springfield',       // Example city
            state: 'IL',               // Example state
            country: 'USA',            // Example country
            lat: 39.7817,              // Example latitude
            lng: -89.6501,             // Example longitude
            name: 'Springfield House', // Example spot name
            description: 'A cozy house in Springfield.', // Example description
            price: 100                 // Example price
        };

        // Send back the created Spot as the response
        return res.status(200).json(newSpot);
    } catch (err) {
        console.error('Failed to create spot:', err);
        return res.status(500).json({ message: 'An error occurred while creating the spot' });
    }
});

// Export the routes
module.exports = router;