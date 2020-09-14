import React from 'react';
import { Link } from 'react-router-dom';

// Can change to stateful component if need be
function RequestRideButton(props) {
  return (
    <Link
      to={props.loggedIn === true ? '/rider-post' : '/signin'}
      className='btn btn-primary'
    >
      Request a ride!
    </Link>
  );
}

export default RequestRideButton;
