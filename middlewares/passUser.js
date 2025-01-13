// This middleware will decode the JWT and attach the user data to res.locals.userName
const jwt = require('jsonwebtoken');

// Middleware to decode JWT
const passUser = (req, res, next) => {
    const token = req.cookies.uid;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.userName = decoded.firstName; // Attach user data to locals
        } catch (err) {
            console.error('Invalid or expired token:', err);
            res.locals.userName = null;
        }
    } else {
        res.locals.userName = null;
    }
    next();
};

module.exports = passUser;