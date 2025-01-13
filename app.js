// jshint esversion:6

require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/connectDB");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const restrictToLoggedInOnly = require("./middlewares/auth");
const passUser = require("./middlewares/passUser");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectToDB();

// Middleware
app.use(express.static("public"));
app.set('views', './views');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passUser);

// Import Routes
const pubicRoutes = require('./routes/publicStaticRoutes');
const privateRoutes = require('./routes/privateStaticRoutes');
const userRoutes = require('./routes/user');
const trackRoutes = require('./routes/track');
const recipeRoutes = require('./routes/recipes');

// Use Routes
app.use('/user', userRoutes);
app.use('/', pubicRoutes);
app.use('/', restrictToLoggedInOnly, privateRoutes);
app.use('/track', trackRoutes);
app.use('/recipes', recipeRoutes);

// Server Listener
app.listen(PORT, function() {
    console.log(`The server is up and running 🏃 on port ${PORT}`);
});
