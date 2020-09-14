import React from 'react';
import moment from 'moment-timezone';
// import moment from "moment";
// import timezone from "moment-timezone"
import './style.css';

// Can change to stateful component if need be
function TripItem(props) {
  return (
    <div className='col-md-6'>
      <div
        className='card trip-item'
        onClick={() => props.showModal(props.trip)}
      >
        <h5 className='card-header'>
          <strong>
            {props.trip.start_location} <i class='fas fa-arrow-right'></i>{' '}
            {props.trip.end_location}
          </strong>
        </h5>
        <div className='card-body'>
          <p className='card-title'>
            <strong>
              {moment(props.trip.leaving_date)
                .add(1, 'day')
                .format('MMMM DD, YYYY')}
            </strong>
            {/* <strong>{moment.tz(props.trip.leaving_date, "MM Do YYYY", "America/Seattle")}</strong> */}
            {/* <strong>{props.trip.leaving_date}</strong> */}
          </p>
          <p className='card-text'>
            {props.trip.flexible_date ? (
              <span className='badge badge-pill badge-success'>
                Date Flexible
              </span>
            ) : (
              <span className='badge badge-pill badge-danger'>
                Date Not Flexible
              </span>
            )}
          </p>
          <p className='card-text'>
            <strong>
              {props.page === 'Driver'
                ? 'Price Offered: '
                : 'Price Requested: '}
            </strong>
            ${props.trip.cost}
          </p>
          <p className='card-text'>
            <strong>
              {props.page === 'Driver'
                ? 'Seats Requested: '
                : 'Seats Available: '}
            </strong>
            {props.trip.seats_available}
          </p>
          <p className='card-text'>
            {props.trip.smoking ? (
              <span className='badge badge-pill badge-success'>Smoking</span>
            ) : (
              <span className='badge badge-pill badge-danger'>No Smoking</span>
            )}
            {props.trip.luggage ? (
              <span className='badge badge-pill badge-success'>
                {props.page === 'Driver' ? 'Luggage' : 'Luggage Space'}
              </span>
            ) : (
              <span className='badge badge-pill badge-danger'>
                {props.page === 'Driver' ? 'No Luggage' : 'No Luggage Space'}
              </span>
            )}
          </p>
          <p className='card-text'>
            {props.trip.comment ? props.trip.comment : 'No comment'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TripItem;
