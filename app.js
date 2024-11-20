// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const mongoose = require('mongoose');

const connectionString = process.env.URI;

mongoose.connect(connectionString + "userAuthentication");

// Initialize OpenAI API
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}));

// Initialize Express
const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Import Routes
const indexRoutes = require('./routes/staticRoutes');
const trackRoutes = require('./routes/track');
const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/user');
const restrictToLoggedInOnly = require("./middlewares/auth");

// Use Routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/track', restrictToLoggedInOnly, trackRoutes);
app.use('/recipes', restrictToLoggedInOnly, recipeRoutes);

// Server Listener
app.listen(3000, function() {
    console.log("The server is up and running on port 3000");
});
