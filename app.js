// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const mongoose = require('mongoose');
const restrictToLoggedInOnly = require("./middlewares/auth");

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
const staticRoutes = require('./routes/staticRouter');
const userRoutes = require('./routes/user');

// Use Routes
app.use('/user', userRoutes);
app.use('/', staticRoutes);
app.use('/track', restrictToLoggedInOnly, staticRoutes);
app.use('/recipes', staticRoutes);

// Server Listener
app.listen(3000, function() {
    console.log("The server is up and running on port 3000");
});
