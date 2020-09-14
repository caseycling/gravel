const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../../models/user');

passport.serializeUser((user, done) => {
  console.log('=== serialize ... called ===');
  console.log(user); // the whole raw user object!

  done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
  console.log('Deserialize ... called');
  console.log('PASSPORT INDEX.JS');
  console.log('=====================================');
  console.log(id);

  User.findOne({ _id: id }, { username: 'local.username' }, (err, user) => {
    console.log('======= FIND ONE IN DESERIALIZER======');
    console.log(user);
    console.log('=====================================');
    done(null, user);
  });
});

// ==== Register Strategies ====
passport.use(LocalStrategy);

module.exports = passport;
