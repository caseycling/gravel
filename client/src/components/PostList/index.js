import React from 'react';

import { Container, Row, Col } from '../Grid';

// Exporting both PostList and PostListItem from this file

// PostList renders a bootstrap list item
export function PostList({ children }) {
  return <ul className='list-group'>{children}</ul>;
}

// PostListItem renders a bootstrap list item containing data from the driver or Rider post DB call
export function PostListItem({
  title,
  start_location,
  end_location,
  leaving_date,
  flexible_date,
  cost,
  seats_available,
  smoking,
  luggage,
  comments,
}) {
  return (
    <li className='list-group-item'>
      <Container>
        <Row>
          <Col size='xs-4 sm-2'></Col>
          <Col size='xs-8 sm-9'>
            <h3>{title}</h3>
            <p>Start Location: {start_location}</p>
            <p>End Location: {end_location}</p>
            <p>leaving date: {leaving_date}</p>
            <p>Flexible date: {flexible_date}</p>
            <p>cost: {cost}</p>
            <p>Seats available: {seats_available}</p>
            <p>Smoking: {smoking}</p>
            <p>Luggage: {luggage}</p>
            <p>Comments: {comments}</p>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
