import React from 'react';
import ErrorList from '../components/ErrorList';

function AlertContainer(props) {
  const errors = props.errors;

  return (
    <div className='alert alert-danger' role='alert'>
      <ErrorList errors={errors} />
    </div>
  );
}

export default AlertContainer;
