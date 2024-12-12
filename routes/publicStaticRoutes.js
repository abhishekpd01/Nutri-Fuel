const express = require("express");
const path = require("path");
const router = express.Router();
exports.router = router;

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/About", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/about.html"));
});

router.get("/Contact", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/contact.html"));
});

router.get("/Session", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/session.html"));
});

module.exports = router;