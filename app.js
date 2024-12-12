// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const restrictToLoggedInOnly = require("./middlewares/auth");

const connectionString = process.env.URI;

mongoose.connect(connectionString + "userAuthentication");

// Initialize Express
const app = express();

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
app.listen(3000, function() {
    console.log("The server is up and running on port 3000");
});
