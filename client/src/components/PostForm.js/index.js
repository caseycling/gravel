import React from 'react';
import { Container, Row, Col } from '../Grid';
// import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.posts array
function PostForm(props) {
  return (
    <form className='post'>
      <div className='form-group'>
        <Row>
          <label htmlFor='startLocaton'>Start location:</label>
          <input
            value={props.start_location}
            onChange={props.handleInputChange}
            name='start_location'
            type='text'
            className='form-control'
            placeholder='Type where the trip is going to start'
            id='start_location'
          />

          <label htmlFor='End'>End location:</label>
          <input
            value={props.end_location}
            onChange={props.handleInputChange}
            name='end_location'
            type='text'
            className='form-control'
            placeholder='Type where the trip is going to end'
            id='end_location'
          />
          <label htmlFor='leaving_date'>Leaving date:</label>
          <input
            value={props.leaving_date}
            onChange={props.handleInputChange}
            name='leaving_date'
            type='text'
            className='form-control'
            placeholder='Type your prefer leaving date'
            id='end_location'
          />
          <label htmlFor='flexible_date'>Flexible_date:</label>
          <select
            value={props.flexible_date}
            onChange={props.handleInputChange}
            name='flexible_date'
            type='text'
            className='form-control'
            id='flexible_data'
          />
          <label htmlFor='cost'>cost:</label>
          <input
            value={props.cost}
            onChange={props.handleInputChange}
            name='cost'
            type='number'
            className='form-control'
            placeholder='Cost'
            id='cost'
          />
          <label htmlFor='seats_available'>Seats available:</label>
          <input
            value={props.seats_available}
            onChange={props.handleInputChange}
            name='seats_available'
            type='number'
            className='form-control'
            placeholder='How many seats available do you need or have available'
            id='seats_available'
          />
          <label htmlFor='smoking'>Smoking:</label>
          <input
            value={props.smoking}
            onChange={props.handleInputChange}
            name='smoking'
            type='boolean'
            className='form-control'
            placeholder='Do you smoke?'
            id='smoking'
          />
          <label htmlFor='luggage'>Luggage:</label>
          <input
            value={props.luggage}
            onChange={props.handleInputChange}
            name='luggage'
            type='number'
            className='form-control'
            placeholder=''
            id='luggage'
          />
          <label htmlFor='comments'>Comments:</label>
          <input
            value={props.comments}
            onChange={props.handleInputChange}
            name='comments'
            type='text'
            className='form-control'
            placeholder='Addiotional comments'
            id='comments'
          />
          <datalist id='posts'>
            {props.posts.map((post) => (
              <option value={post} key={post} />
            ))}
          </datalist>
          <button
            type='submit'
            onClick={props.handleFormSubmit}
            className='btn btn-success'
          >
            Post
          </button>
        </Row>
      </div>
    </form>
  );
}

export default PostForm;
