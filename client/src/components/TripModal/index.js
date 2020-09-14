import React from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import LeafletContainer from '../LeafletContainer';
import { Link } from 'react-router-dom';

function TripModal(props) {
  return (
    <Modal
      id='modal'
      show={props.show}
      onHide={props.onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <strong>
            {props.trip.start_location} <i class='fas fa-arrow-right'></i>{' '}
            {props.trip.end_location}
          </strong>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='row'>
          <div className='col-md-3'>
            <p>
              <strong rong>
                {moment(props.trip.leaving_date).format('MMMM Do, YYYY')}
              </strong>
            </p>
            <p>
              {props.trip.flexible_date ? (
                <span className='badge badge-pill badge-success'>Flexible</span>
              ) : (
                <span className='badge badge-pill badge-danger'>
                  Not Flexible
                </span>
              )}
            </p>
            <p>
              <strong>
                {props.modalPath === '/driver'
                  ? 'Price Offered: '
                  : 'Price Requested: '}
              </strong>
              ${props.trip.cost}
            </p>
            <p>
              <strong>
                {props.modalPath === '/driver'
                  ? 'Seats Requested: '
                  : 'Seats Available: '}
              </strong>
              {props.trip.seats_available}
            </p>
            <p>
              {props.trip.smoking ? (
                <span className='badge badge-pill badge-success'>Smoking</span>
              ) : (
                <span className='badge badge-pill badge-danger'>
                  No Smoking
                </span>
              )}
              {props.trip.luggage ? (
                <span className='badge badge-pill badge-success'>
                  {props.modalPath === '/driver' ? 'Luggage' : 'Luggage Space'}
                </span>
              ) : (
                <span className='badge badge-pill badge-danger'>
                  {props.modalPath === '/driver'
                    ? 'No Luggage'
                    : 'No Luggage Space'}
                </span>
              )}
            </p>

            <p>{props.trip.comment}</p>
          </div>

          <div className='col-md-9'>
            <LeafletContainer
              markerPositionStart={props.modalStartCoords}
              markerPositionEnd={props.modalEndCoords}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {/* TODO: Give confirmation, update seats_available, close modal after connect */}
        {/* TODO: Close modal when routed to /signin */}
        {props.loggedIn ? (
          <button
            className='btn btn-success'
            onClick={() =>
              props.modalPath === '/driver'
                ? props.connectWithRider(props.trip._id)
                : props.connectWithDriver(props.trip._id)
            }
          >
            Connect
          </button>
        ) : (
          <Link to='/signin' className='btn btn-success'>
            Connect
          </Link>
        )}

        <button className='btn btn-danger' onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default TripModal;
