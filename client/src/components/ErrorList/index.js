import React from 'react';
import './style.css';

function ErrorList(props) {
  const errors = props.errors;
  const listItems = errors.map((error) => <h4>{error}</h4>);
  return <div>{listItems}</div>;
}

export default ErrorList;
