const User = require('../../models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: 'username', // not necessary, DEFAULT
  },
  function (username, password, done) {
    console.log('=====================================');
    console.log('PASSPORT STRATEGY LOCAL');
    console.log(username);
    console.log(password);
    console.log(done);

    User.findOne({ 'local.username': username }, (err, userMatch) => {
      if (err) {
        console.log('=====================================');
        console.log('+++ Error ++');
        console.log(err);
        console.log('=====================================');

        return done(err);
      }
      if (!userMatch) {
        console.log('=====================================');
        console.log('NO USER MATCH (see localStrategy)');
        console.log(userMatch);
        console.log('=====================================');
        console.log('username:' + username);
        console.log('=====================================');
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!userMatch.checkPassword(password)) {
        console.log('=====================================');
        console.log('PASSWORD DIDNT MATCH (see localstrategy)');
        console.log('=====================================');
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, userMatch);
    });
  }
);

module.exports = strategy;
