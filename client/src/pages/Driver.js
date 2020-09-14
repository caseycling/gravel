import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TripContainer from '../components/TripContainer';
import LocationInput from '../components/LocationInput';

// Can change to stateful component if need be
// Can access state with this.props.state
// Can handle input change with this.props.handleInputChange
class Driver extends Component {
  componentDidMount() {
    this.props.getRiders();
  }

  render() {
    return (
      <div className='app-render'>
        <div className='driver-background'>
          <div className='container'>
            <h1 className='page-title'>Rides Requested</h1>
            <form>
              <div className='row'>
                <div className='col-md-6'>
                  <LocationInput
                    name='startLocation'
                    value={this.props.state.startLocation}
                    onChange={this.props.handleInputChange}
                    placeholder='Enter the departure city or use current location'
                    useCurrentLocation={this.props.useCurrentLocation}
                  />
                </div>
                <div className='col-md-6'>
                  <LocationInput
                    name='endLocation'
                    value={this.props.state.endLocation}
                    onChange={this.props.handleInputChange}
                    placeholder='Enter the destination (optional)'
                    useCurrentLocation={this.props.useCurrentLocation}
                  />
                </div>
              </div>

              <p
                className='switch-page float-left'
                style={{ color: 'white', fontSize: '20px' }}
              >
                Looking for <Link to='/rider'>rides offered</Link> instead?
              </p>

              <button
                className='btn btn-primary float-right'
                type='submit'
                name='action'
                onClick={this.props.getRiders}
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <TripContainer
          page={'Driver'}
          loggedIn={this.props.state.loggedIn}
          results={this.props.state.results}
          showModal={this.props.showModal}
        />
      </div>
    );
  }
}

export default Driver;
