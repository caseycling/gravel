import React from 'react';

const TextArea = (props) => {
  return (
    <div className='form-group'>
      <label htmlFor={props.name} className='form-label'>
        {props.title}
      </label>
      <input
        className='form-control'
        name={props.name}
        rows={props.rows}
        cols={props.cols}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextArea;
