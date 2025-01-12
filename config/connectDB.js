const mongoose = require('mongoose');

function connectToDB() {
    try {
        const connectionString = process.env.URI;
        
        mongoose.connect(connectionString + "userAuthentication");
        console.log("MongoDB Connection established");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

module.exports = connectToDB;