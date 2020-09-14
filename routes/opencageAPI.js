const opencage = require('opencage-api-client');

module.exports = (app) => {
  // Route for retrieving geographic information for coordinates
  app.get('/api/get-city/:coords', (req, res) => {
    opencage
      .geocode({ q: req.params.coords })
      .then((data) => res.json(data.results[0]))
      .catch((error) => res.json('error', error.message));
  });

  app.get('/api/get-coords/:city', (req, res) => {
    opencage
      .geocode({ q: req.params.city })
      .then((data) => res.json(data.results[0]))
      .catch((error) => res.json('error', error.message));
  });
};
