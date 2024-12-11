const express = require("express");
const path = require("path");
const router = express.Router();

// GET requests
router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get("/userInfo", (req, res) => {
    res.render('userInfo');
})

router.get("/result", (req, res) => {
    res.render('result');
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

router.get("/TrackWorkout", function(req, res) {
    res.render("trackWorkout", { submitted: false });
});

router.get("/TrackMeal", function(req, res) {
    res.render("trackMeal");
});

router.get("/water", function(req, res) {
    res.render("trackWater");
});

router.get("/recipes", function(req, res) {
    res.render("recipes", { submitted: false });
});

module.exports = router;