const session = require('express-session');

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
});

const passUserMiddleware = (req, res, next) => {
    res.locals.userName = req.session.user ? req.session.user : null;
    next();
};

module.exports = {
    sessionMiddleware,
    passUserMiddleware
};