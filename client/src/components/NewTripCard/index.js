import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Blank card used to add a new trip
function NewTripCard(props) {
  return (
    <div className='col-md-6'>
      <div className='card post-item'>
        <h5 className='card-header'>
          <strong>
            Point A <i class='fas fa-arrow-right'></i> Point B
          </strong>
        </h5>
        <div className='card-body' style={{ visibility: 'visible' }}>
          <Link to={props.to}>
            <i class='fas fa-plus-circle'></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewTripCard;
