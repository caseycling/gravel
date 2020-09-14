import React from 'react';
import TripItem from '../TripItem';

// Can change to stateful component if need be
function TripContainer(props) {
  return (
    <div className='container'>
      {/* Display each trip from results */}

      <div className='row'>
        {props.results.length > 0 ? (
          props.results.map((trip) => (
            <TripItem {...props} key={trip._id} trip={trip} />
          ))
        ) : (
          <div className='col-md-12'>
            {props.page === 'Driver'
              ? 'No riders found. Offer a ride up top!'
              : 'No drivers found. Request a ride up top!'}
          </div>
        )}
      </div>
    </div>
  );
}

export default TripContainer;
