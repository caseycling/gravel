import React from 'react';
import { Link } from 'react-router-dom';
import PostItem from '../PostItem';
import './style.css';
import NewTripCard from '../NewTripCard';

// Can change to stateful component if need be
function PostContainer(props) {
  return (
    <React.Fragment>
      <h1 class='section-header'>
        {props.db === 'drivers' ? 'Driver Posts' : 'Rider Posts'}
      </h1>
      <div className='container'>
        <div className='row'>
          {props.page === 'Dashboard'}
          {/* Display each trip from results */}
          {props.results.length > 0 ? (
            <React.Fragment>
              {props.results.map((trip) => (
                <PostItem {...props} key={trip._id} trip={trip} db={props.db} />
              ))}
              <NewTripCard
                to={props.db === 'drivers' ? '/driver-post' : '/rider-post'}
              />
            </React.Fragment>
          ) : (
            <NewTripCard
              to={props.db === 'drivers' ? '/driver-post' : '/rider-post'}
            />
            // <p className="col-md-12 no-trips-message">
            //     No trips yet, &nbsp;
            //     {props.db === "drivers"
            //         ? <Link to="/driver-post">post one as a driver</Link>
            //         : <Link to="/rider-post">post one as a rider</Link>}
            //     !
            // </p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default PostContainer;
