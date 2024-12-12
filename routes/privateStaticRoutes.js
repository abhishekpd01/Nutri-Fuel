const express = require("express");
const router = express.Router();
exports.router = router;

router.get("/userInfo", (req, res) => {
    res.render('userInfo');
})

router.get("/result", (req, res) => {
    res.render('result');
})

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