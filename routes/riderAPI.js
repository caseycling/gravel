const db = require('../models');

module.exports = (app) => {
  // Get all the trip
  app.get('/api/riders/', function (req, res) {
    db.Rider.find({ seats_available: { $gt: 0 } })
      .then(function (dbRider) {
        res.json(dbRider);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Getting all the trip posted by rider, filter by start_location
  app.get('/api/riders/:start_location', function (req, res) {
    db.Rider.find({
      start_location: req.params.start_location,
      seats_available: { $gt: 0 },
    })
      .then(function (dbRider) {
        res.json(dbRider);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get('/api/riders/:start_location/:end_location', function (req, res) {
    db.Rider.find({
      start_location: req.params.start_location,
      end_location: req.params.end_location,
      seats_available: { $gt: 0 },
    }).then(function (dbRider) {
      res.json(dbRider);
    });
  });

  app.get('/api/riders_riderId/:rider_id', function (req, res) {
    console.log(req.params);

    db.Rider.find({ rider_id: req.params.rider_id })

      .then(function (dbRider) {
        console.log(dbRider);
        res.json(dbRider);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Adding a trip
  app.post('/api/riders', function (req, res) {
    console.log('req.body: ', req.body);
    //req.body should be the information Driver entered when posting
    db.Rider.create(req.body)
      .then(function (dbRider) {
        console.log(dbRider);
      })
      .catch(function (err) {
        console.log('error: ', err);
      });
  });

  // Updating an existing trip
  app.post('/api/riders/update/:_id', function (req, res) {
    db.Rider.updateOne(
      { _id: req.params._id },

      // The field you want to update about
      {
        start_location: req.body.start_location,
        end_location: req.body.end_location,
        leaving_date: req.body.leaving_date,
        flexible_date: req.body.flexible_date,
        cost: req.body.cost,
        seats_available: req.body.seats_available,
        smoking: req.body.smoking,
        luggage: req.body.luggage,
        comment: req.body.comment,
      }
    )
      .then(function (dbRider) {
        res.json(dbRider);
      })
      .catch(function (err) {
        console.log('error: ', err);
      });
  });

  // updating the driver into a trip
  app.post('/api/riders/:_id', function (req, res) {
    db.Rider.updateOne(
      { _id: req.params._id },
      { driver_id: req.body.driver_id, seats_available: 0 }
    )
      .then(function (dbUser) {
        res.json(dbUser);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Deleting an existing trip
  app.delete('/api/riders/:_id', function (req, res) {
    db.Rider.deleteOne({ _id: req.params._id }).then(function (dbRider) {
      res.json(dbRider);
    });
  });
};
