const User = require("../models/userAuth");
const { setUser } = require('../services/auth');

async function handleUserSignup(req, res) {
    const { firstName, lastName, email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if(checkUser) return res.send("User already exists.");

    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    })
    const token = setUser(user);

    res.cookie("uid", token);

    return res.redirect('/userInfo');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if(!user) {
        return res.render('login', { error : "Invalid Username or Password." });
    }

    const token = setUser(user);

    res.cookie("uid", token);

    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}