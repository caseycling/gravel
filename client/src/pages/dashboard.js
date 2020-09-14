import React from 'react';
import { Redirect } from 'react-router-dom';
import PostContainer from '../components/PostContainer';
import API from '../utils/API';
import axios from 'axios';

// Can change to stateful component if need be
class Dashboard extends React.Component {
  // State is holding values for when the user is editing a trip
  state = {
    modifyTripId: '',
    start_location: '',
    end_location: '',
    leaving_date: '',
    flexible_date: '',
    cost: '',
    seats_available: '',
    smoking: '',
    luggage: '',
    comment: '',
  };

  // Handle input change
  handleInputChange = (event) => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Toggle which trip to enable modification
  toggleModify = (trip) => {
    this.setState({
      modifyTripId: trip._id,
      start_location: trip.start_location,
      end_location: trip.end_location,
      leaving_date: trip.leaving_date,
      flexible_date: trip.flexible_date,
      cost: trip.cost,
      seats_available: trip.seats_available,
      smoking: trip.smoking,
      luggage: trip.luggage,
      comment: trip.comment,
    });
  };

  // Updates the trip with the givin id in the given database (db) using values from state
  updateTrip = (db, id) => {
    // If the trip is from the drivers db
    if (db === 'drivers') {
      axios
        .post(`/api/drivers/update/${id}`, {
          start_location: this.state.start_location,
          end_location: this.state.end_location,
          leaving_date: this.state.leaving_date,
          flexible_date: this.state.flexible_date,
          cost: this.state.cost,
          seats_available: this.state.seats_available,
          smoking: this.state.smoking,
          luggage: this.state.luggage,
          comment: this.state.comment,
        })
        .then((results) => {
          this.props.getDriverPost();
          this.props.getRiderPost();
          this.setState({
            modifyTripId: '',
            start_location: '',
            end_location: '',
            leaving_date: '',
            flexible_date: '',
            cost: '',
            seats_available: '',
            smoking: '',
            luggage: '',
            comment: '',
          });
          console.log(results);
        })
        .catch((err) => console.log(err));
    } else {
      // If the trip is from the riders db
      axios
        .post(`/api/riders/update/${id}`, {
          start_location: this.state.start_location,
          end_location: this.state.end_location,
          leaving_date: this.state.leaving_date,
          flexible_date: this.state.flexible_date,
          cost: this.state.cost,
          seats_available: this.state.seats_available,
          smoking: this.state.smoking,
          luggage: this.state.luggage,
          comment: this.state.comment,
        })
        .then((results) => {
          this.props.getDriverPost();
          this.props.getRiderPost();
          this.setState({
            modifyTripId: '',
            start_location: '',
            end_location: '',
            leaving_date: '',
            flexible_date: '',
            cost: '',
            seats_available: '',
            smoking: '',
            luggage: '',
            comment: '',
          });
          console.log(results);
        })
        .catch((err) => console.log(err));
    }
  };

  // Removes a trip from database
  deleteTrip = (db, id) => {
    // If the trip is from the drivers db
    if (db === 'drivers') {
      API.deleteDriver(id)
        .then((results) => {
          this.props.getDriverPost();
          this.props.getRiderPost();
          console.log(results);
        })
        .catch((err) => console.log(err));
    } else {
      // If the trip is from the riders db
      API.deleteRider(id)
        .then((results) => {
          this.props.getDriverPost();
          this.props.getRiderPost();
          console.log(results);
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    const { getDriverPost, id, getRiderPost } = this.props;
    getDriverPost(id);
    getRiderPost(id);
  }

  render() {
    // console.log(props);
    return !this.props.loggedIn ? (
      <Redirect to={'/signin'} />
    ) : (
      <div class='app-render'>
        {/* TODO: Send TripContainer the data from Riders table */}
        <PostContainer
          page={'Dashboard'}
          loggedIn={this.props.state.loggedIn}
          results={this.props.state.results}
          db='drivers'
          deleteTrip={this.deleteTrip}
          handleInputChange={this.handleInputChange}
          toggleModify={this.toggleModify}
          updateTrip={this.updateTrip}
          getConnectionRide={this.getConnectionRide}
          state={this.state}
        />
        <PostContainer
          page={'Dashboard'}
          loggedIn={this.props.state.loggedIn}
          results={this.props.state.riderPost}
          db='riders'
          deleteTrip={this.deleteTrip}
          handleInputChange={this.handleInputChange}
          toggleModify={this.toggleModify}
          updateTrip={this.updateTrip}
          getConnectionRide={this.getConnectionRide}
          state={this.state}
        />
      </div>
    );
  }
}

export default Dashboard;
