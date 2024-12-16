const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Import Sequelize User model

const authenticate = require('../middleware/authenticate'); // Adjust the path as needed
const email= "samri.br@yahoo.com"; 
const password = 'abd';

// Example: User login route
router.get('/login', (req, res) => {
    console.log('user route are working');
    console.log(req);
    let msg = req.body;
    if(msg.email==email && msg.password == password)
    {
        res.send('User verified');
    }
    else{
        res.send('incorrect user name or password')
    }
});



// Route to get the current authenticated user
router.get('/current', authenticate, async (req, res) => {
  res.json({ user: req.user }); // Respond with the authenticated user's info
});


// Example: User signup route
router.post('/signup%0A', async (req, res) => { // Add `async` to the function
    const { firstName, lastName, email, password } = req.body; // Include missing fields like `firstName` and `lastName`
console.log('post route is working');
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store the hashed password in the database
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Save the hashed password
        });

        // Respond with the new user's information (excluding the password)
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
        });
    } catch (error) {
        // Handle errors (e.g., database issues)
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the router
module.exports = router;

