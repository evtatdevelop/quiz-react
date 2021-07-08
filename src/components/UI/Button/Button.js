import React from 'react';

import classes from './Button.module.scss';

const Button = props => {
  const{onClick, disabled, type} = props;
  const btnClass = [
    classes.Button,
    classes[type],
  ].join(' ');

  return (
    <button
      className = {btnClass} 
      onClick = {onClick}
      disabled = {disabled}
    >
      {props.children}
    </button>
  )
}

export default Button;

