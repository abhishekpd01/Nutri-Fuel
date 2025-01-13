const express = require("express");
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/logout', (req, res) => {
    res.clearCookie("uid");
    return res.redirect('/');
})

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/About", function(req, res) {
    res.render('about');
});

router.get("/Contact", function(req, res) {
    res.render('contact');
});

router.get("/Session", function(req, res) {
    res.render('session');
});

module.exports = router;