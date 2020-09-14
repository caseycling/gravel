const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('../passport');

// Get user's basic info
router.get('/user', (req, res, next) => {
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
});

//Login route
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      alert(err);
      return next(err);
    }

    //Check if username exists in database
    if (!user) {
      return res.json({ message: 'Incorrect username or password' });
    }
    res.json({ user: user });
  })(req, res, next);
});

//Logout user
router.post('/logout', (req, res) => {
  if (req.session.passport) {
    req.session.destroy();
    res.clearCookie('connect.sid'); // clean up!
    return res.json({ msg: 'logging you out' });
  } else {
    return res.json({ msg: 'no user to log out!' });
  }
});

//Signup new user
router.post('/signup', (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  //Check is username already exists
  User.findOne({ 'local.username': username }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
    }

    //Create new user with the User model
    const newUser = new User({
      'local.firstName': firstName,
      'local.lastName': lastName,
      'local.email': email,
      'local.username': username,
      'local.password': password,
      'local.loggedIn': true,
    });

    //Save user
    newUser.save((err, savedUser) => {
      if (err) return res.json(err);
      return res.json(savedUser);
    });
  });
});

module.exports = router;
