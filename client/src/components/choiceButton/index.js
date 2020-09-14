import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Destructuring the type, className, children and onClick props, applying them to the button element
function ChoiceButton({
  type = 'default',
  className,
  children,
  onClick,
  text,
  iconClass,
  link,
  route,
}) {
  return (
    <Link
      to={route}
      className={['btn btn-lg', `btn-${type}`, className].join(' ')}
    >
      {children}
      {text}
      {iconClass}
      {link}
    </Link>
  );
}

export default ChoiceButton;
