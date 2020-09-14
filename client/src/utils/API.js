import axios from 'axios';
// import App from "../App"

export default {
  //Login
  login: function (username, password) {
    return axios.post('/auth/login', {
      username: username,
      password: password,
    });
  },

  // Getting the list of rider requested trip
  getRider: function () {
    return axios.get('/api/riders');
  },
  // Getting the trip filter by start location
  getRiderStart: function (start_location) {
    return axios.get(`/api/riders/${start_location}`);
  },
  //Getting the trip filter by start and end location
  getRiderStartEnd: function (start_location, end_location) {
    return axios.get(`/api/riders/${start_location}/${end_location}`);
  },
  // Rider post a trip to rider database
  postRider: function (newRider) {
    return axios.post('/api/riders', newRider);
  },
  // Updating a trip posted by a rider in rider database
  updateRider: function (_id) {
    return axios.post(`/api/riders/update/${_id}`);
  },
  // Deleting a trip posted by a rider in rider database
  deleteRider: function (_id) {
    return axios.delete(`/api/riders/${_id}`);
  },

  // Routes for Rider pages
  // Getting all trips
  getDriver: function () {
    return axios.get('/api/drivers/');
  },
  getDriverPost: function (driver_id) {
    return axios.get(`/api/drivers_driverId/${driver_id}`);
  },

  getRiderPost: function (rider_id) {
    return axios.get(`/api/riders_riderId/${rider_id}`);
  },

  getUserInfo: function (_id) {
    return axios.get(`/api/users/${_id}`);
  },
  // getDriverPost: function () {
  //     return axios.get("/api/drivers_driverId/5d4100c0e83c0d234cff3652")
  // },

  // getRiderPost: function () {
  //     return axios.get("/api/riders_riderId/123")
  // },

  // trip filter by start location
  getDriverStart: function (start_location) {
    return axios.get(`/api/drivers/${start_location}`);
  },
  // trip filter by start and end location
  getDriverStartEnd: function (start_location, end_location) {
    return axios.get(`/api/drivers/${start_location}/${end_location}`);
  },
  // adding a trip
  postDriver: function (newDriver) {
    return axios.post('/api/drivers', newDriver);
  },
  // updating a trip
  updateDriver: function (_id) {
    return axios.get(`/api/drivers/update/${_id}`);
  },
  // deleting an existing trip
  deleteDriver: function (_id) {
    return axios.delete(`/api/drivers/${_id}`);
  },

  // OpenCage API
  // Get current city from current coordinates
  getCurrentCity: function (coords) {
    return axios.get(`/api/get-city/${coords}`);
  },

  getCityCoords: function (city) {
    return axios.get(`/api/get-coords/${city}`);
  },
};
