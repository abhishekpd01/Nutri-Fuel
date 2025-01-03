// jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const restrictToLoggedInOnly = require("./middlewares/auth");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
try {
    const connectionString = process.env.URI;
    
    mongoose.connect(connectionString + "userAuthentication");
    console.log("MongoDB Connection established");
} catch (error) {
    console.log("Error connecting to MongoDB");
}

// Middleware
app.use(express.static("public"));
app.set('views', './views');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
