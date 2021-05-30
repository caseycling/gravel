// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
  console.log('loading dev environments');
  require('dotenv').config();
}
require('dotenv').config();

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./models');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbConnection = require('./server/db'); // loads our connection to the mongo database
const passport = require('./server/passport');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.APP_SECRET || 'this is the default passphrase',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false,
  })
);

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  console.log('YOU ARE IN THE PRODUCTION ENV');
  app.use('/static', express.static(path.join(__dirname, '../build/static')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/'));
  });
}

/* Express app ROUTING */
app.use('/auth', require('./server/auth'));

// ====== Error handler ====
app.use(function (err, req, res, next) {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});

// Establish mongo connection
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/gravel';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Define API routes here
require('./routes/driverAPI')(app);
require('./routes/riderAPI')(app);
require('./routes/opencageAPI')(app);

app.post('/auth/signup', function (req, res) {
  console.log('posting signup');
  db.User.create(req.body)
    .then(function (user) {
      console.log('***SERVER.JS*****\n======USER NAME=======');
      console.log(user);
      res.send(user);
    })
    .catch(function (err) {
      console.log('error' + err);
    });
});

// Getting All signed up user information
app.get('/api/user', function (req, res) {
  db.User.find({}).then(function (dbUser) {
    res.json(dbUser);
  });
});

// Getting specific user information (dashboard)
app.get('/api/user/:username', function (req, res) {
  db.User.find({ 'local.username': req.params.username })
    .then(function (dbUser) {
      res.json(dbUser);
      console.log(dbUser);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Get Dashboard information
app.get('/api/user/:driver_id', function (req, res) {
  db.Driver.find({ driver_id: req.params._id })
    .then(function (dbUser) {
      res.json(dbUser);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get('/api/user/:rider_id', function (req, res) {
  db.Rider.find({ rider_id: req.params._id })
    .then(function (dbUser) {
      res.json(dbUser);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
