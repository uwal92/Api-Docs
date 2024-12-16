const jwt = require('jsonwebtoken'); // Import the JWT library

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']; // Get token from headers
    if (!token) return res.status(401).json({ message: 'Authentication required' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; // Attach the decoded user info to the request
        next(); // Proceed to the next middleware or route
    } catch (err) {
        next(); //res.status(403).json({ message: 'Forbidden' }); // Invalid token
    }
};

module.exports = authenticate; // Export the middleware
