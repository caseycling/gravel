import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  Redirect,
} from 'react-router-dom';
import Nav from './components/Nav';
import TripModal from './components/TripModal';
import axios from 'axios';
import API from './utils/API';
import Navbar from './components/Navbar';

// Pages
import Driver from './pages/Driver';
import DriverPost from './pages/DriverPost';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Rider from './pages/Rider';
import RiderPost from './pages/RiderPost';
import Signup from './pages/Signup';
import Dashboard from './pages/dashboard';

import './App.css';

class App extends Component {
  state = {
    loggedIn: false,
    redirectTo: null,
    user: null,
    id: null,
    modalShow: false,
    modalTrip: {},
    modalStartCoords: {},
    modalEndCoords: {},
    modalPath: '',
    startLocation: '',
    endLocation: '',
    currentCity: '',
    results: [],
    riderPost: [],
  };

  // Shows modal
  showModal = (trip) => {
    // Initialize coord variables
    let tripStartCoords;
    let tripEndCoords;

    // Get start city's coordinates
    API.getCityCoords(trip.start_location)
      .then((results) => {
        tripStartCoords = results.data.geometry;

        // Get end city's coordinates
        API.getCityCoords(trip.end_location)
          .then((results) => {
            tripEndCoords = results.data.geometry;

            // Show modal with the start and end coords
            this.setState({
              modalShow: true,
              modalTrip: trip,
              modalStartCoords: tripStartCoords,
              modalEndCoords: tripEndCoords,
              modalPath: window.location.pathname,
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  // Hides modal
  hideModal = () => this.setState({ modalShow: false });

  // Handle input change
  handleInputChange = (event) => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Get all riders for Driver component
  getRiders = (event) => {
    if (event !== undefined) {
      event.preventDefault();
    }

    if (this.state.startLocation === '') {
      API.getRider()
        .then((results) => this.setState({ results: results.data }))
        .catch((err) => console.log(err));
    } else {
      // this.state.startLocation !== ""
      if (this.state.endLocation === '') {
        API.getRiderStart(this.state.startLocation)
          .then((results) => {
            console.log(results);
            this.setState({ results: results.data });
          })
          .catch((err) => console.log(err));
      } else {
        // this.state.endLocation !== ""
        API.getRiderStartEnd(this.state.startLocation, this.state.endLocation)
          .then((results) => this.setState({ results: results.data }))
          .catch((err) => console.log(err));
      }
    }
  };

  // Get all drivers for Rider component
  getDrivers = (event) => {
    if (event !== undefined) {
      event.preventDefault();
    }

    if (this.state.startLocation === '') {
      API.getDriver()
        .then((results) => this.setState({ results: results.data }))
        .catch((err) => console.log(err));
    } else {
      // this.state.startLocation !== ""
      if (this.state.endLocation === '') {
        API.getDriverStart(this.state.startLocation)
          .then((results) => this.setState({ results: results.data }))
          .catch((err) => console.log(err));
      } else {
        // this.state.endLocation !== ""
        API.getDriverStartEnd(this.state.startLocation, this.state.endLocation)
          .then((results) => this.setState({ results: results.data }))
          .catch((err) => console.log(err));
      }
    }
  };

  getDriverPost = (event) => {
    // event.preventDefault();
    API.getDriverPost(this.state.id)
      .then((results) => {
        console.log(results);
        this.setState({ results: results.data });
      })
      .catch((err) => console.log(err));
  };

  getRiderPost = (event) => {
    // event.preventDefault();
    API.getRiderPost(this.state.id)
      .then((results) => {
        console.log(results);
        this.setState({ riderPost: results.data });
      })
      .catch((err) => console.log(err));
  };
  // getResults = driversOrRiders => {
  //   alert(`Getting ${driversOrRiders} going from ${this.state.startLocation} to ${this.state.endLocation === "" ? "anywhere" : this.state.endLocation}`);

  //   // TODO: Check if query matches API routes

  //   let query = `api/${driversOrRiders}/`;

  //   this.state.endLocation === ""
  //     ? query += `${this.state.startLocation.toLowerCase().replace(" ", "%20")}`
  //     : query += `${this.state.startLocation.toLowerCase().replace(" ", "%20")}/${this.state.endLocation.toLowerCase().replace(" ", "%20")}`

  //   alert(query);
  //   // Maybe in ./utils/API.js
  //   axios.get(query)
  //     .then(results => this.setState({ results: results }))
  //     .catch(err => console.log(err));
  // }

  // Takes in the location input name and sets that state to the currentCity state
  useCurrentLocation = (name) => {
    this.setState({ [name]: this.state.currentCity });
  };

  // Driver connects with rider, reduces rider seats_available
  // TODO: Redirect to proper page
  connectWithRider = (tripId) => {
    axios
      .post(`api/riders/${tripId}`, {
        driver_id: this.state.id,
      })
      .then((result) =>
        this.setState({ modalShow: false }, () => this.getRiders())
      )
      .catch((err) => console.log(err));
  };

  // Rider connects with Driver, reduces driver seats_available
  // TODO: Redirect to proper page, give option to reduce seats_available by more than 1
  connectWithDriver = (tripId) => {
    axios
      .post(`api/drivers/${tripId}`, {
        rider_id: this.state.id,
      })
      .then((result) =>
        this.setState({ modalShow: false }, () => this.getDrivers())
      )
      .catch((err) => console.log(err));
  };

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     loggedIn: false,
  //     user: null
  //   }
  //   this._logout = this._logout.bind(this)
  //   this._login = this._login.bind(this)

  // // }
  // componentDidMount() {

  // }
  componentDidMount() {
    // Get the current city from coordinates and save it as currentCity in state
    navigator.geolocation.getCurrentPosition((location) => {
      API.getCurrentCity(
        `${location.coords.latitude},${location.coords.longitude}`
      )
        .then((response) =>
          this.setState({
            currentCity:
              response.data.components.city ||
              response.data.components.locality,
          })
        )
        .catch((err) => console.log(err));
    });

    this.unlisten = this.props.history.listen((listen, action) => {
      // console.log(this.props.history.location);
    });
  }

  componentWillUnmount() {
    this.unlisten = null;
  }
  // componentDidUpdate(previousState){
  //   console.log(previousState)
  //   if(this.state.id){
  //   this.getDriverPost();

  //   }
  // }

  _logout = (event) => {
    event.preventDefault();
    console.log('logging out');
    axios.post('/auth/logout').then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        this.setState(
          {
            loggedIn: false,
            user: null,
            id: null,
            redirectTo: null,
          },
          () => {
            window.location.href = '/';
          }
        );
        console.log(this.state.loggedIn);
      }
    });
  };

  loginState = (user, id) =>
    this.setState({
      loggedIn: true,
      user: user,
      id: id,
      redirectTo: '/',
    });

  render() {
    return (
      <div>
        <Router>
          {this.state.redirectTo ? (
            <Redirect to={this.state.redirectTo} />
          ) : null}
          <Navbar
            path={this.props.history.location}
            loggedIn={this.state.loggedIn}
            user={this.state.user}
            loggedOut={this._logout}
          ></Navbar>
          {/* <div id="app-render">
        // Commented the line above and below out and moved the id to the div with all the Routes
        </div> */}
          {/* ***************************************** **/}

          {/* Modal Test */}
          {/* TODO: Delete button when everything is working */}
          {/* <button className="btn btn-light" onClick={this.showModal} >Modal</button> */}
          <TripModal
            id='modal'
            show={this.state.modalShow}
            onHide={this.hideModal}
            trip={this.state.modalTrip}
            modalStartCoords={this.state.modalStartCoords}
            modalEndCoords={this.state.modalEndCoords}
            connectWithRider={this.connectWithRider}
            connectWithDriver={this.connectWithDriver}
            loggedIn={this.state.loggedIn}
            modalPath={this.state.modalPath}
          />

          {/* React router. TODO: May need to place everything above into the respective page. */}
          <div>
            <Route
              exact
              path='/'
              render={(props) => (
                <Home
                  {...props}
                  state={this.state}
                  handleInputChange={this.handleInputChange}
                  useCurrentLocation={this.useCurrentLocation}
                />
              )}
            />
            <Route
              exact
              path='/home'
              render={(props) => (
                <Home
                  {...props}
                  state={this.state}
                  handleInputChange={this.handleInputChange}
                  useCurrentLocation={this.useCurrentLocation}
                />
              )}
            />
            <Route
              exact
              path='/driver'
              render={(props) => (
                <Driver
                  {...props}
                  state={this.state}
                  handleInputChange={this.handleInputChange}
                  getRiders={this.getRiders}
                  showModal={this.showModal}
                  useCurrentLocation={this.useCurrentLocation}
                />
              )}
            />
            <Route
              exact
              path='/driver-post'
              render={(props) => (
                <DriverPost
                  {...props}
                  state={this.state}
                  handleInputChange={this.handleInputChange}
                  onLogin={this.loginState}
                />
              )}
            />
            <Route
              exact
              path='/rider'
              render={(props) => (
                <Rider
                  {...props}
                  state={this.state}
                  handleInputChange={this.handleInputChange}
                  getDrivers={this.getDrivers}
                  showModal={this.showModal}
                  useCurrentLocation={this.useCurrentLocation}
                />
              )}
            />
            <Route
              exact
              path='/rider-post'
              render={(props) => (
                <RiderPost
                  {...props}
                  state={this.state}
                  handleInputChange={this.handleInputChange}
                  onLogin={this.loginState}
                />
              )}
            />
            <Route
              exact
              path='/signin'
              component={() => <Signin onLogin={this.loginState} />}
            />
            <Route
              exact
              path='/signup'
              component={() => <Signup onLogin={this.loginState} />}
            />
            <Route
              exact
              path='/dashboard'
              render={(props) => (
                <Dashboard
                  {...props}
                  id={this.state.id}
                  state={this.state}
                  handleInputChange={this.handleInputChange}
                  getDriverPost={this.getDriverPost}
                  getRiderPost={this.getRiderPost}
                  loggedIn={this.state.loggedIn}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
