import React from 'react';
import { Link } from 'react-router-dom';

function OfferRideButton(props) {
  return (
    <Link
      to={props.loggedIn === true ? '/driver-post' : '/signin'}
      className='btn btn-primary'
    >
      Offer a ride!
    </Link>
  );
}

export default OfferRideButton;
