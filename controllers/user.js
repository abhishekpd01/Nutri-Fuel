const { v4 : uuidv4 } = require('uuid');
const User = require("../models/user");
const { setUser } = require('../services/auth');

async function handleUserSignup(req, res) {
    const { firstName, lastName, email, password } = req.body;

    await User.create({
        firstName,
        lastName,
        email,
        password
    })

    return res.redirect('/login');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if(!user) {
        return res.render('login', { error : "Invalid Username or Password." });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);

    res.cookie("uid", sessionId);

    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}