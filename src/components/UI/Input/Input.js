import React from 'react';

import classes from './Input.module.scss';

const isInvalid = ({valid, touched, shouldValidate}) => {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const {
    type = 'text', 
    label,
    value,
    onChange,
    errorMsg = 'Invalid value',
    placeholder,
  } = props;
  const inputClass = [classes.Input]
  const htmlFor = `${type}-${Math.random()}`;

  if (isInvalid(props)) {
    inputClass.push(classes.invalid)
  }

  return (
    <div className = {inputClass.join(' ')}>
      <label htmlFor = {htmlFor}>{label}</label>
      <input 
        type = {type}
        id = {htmlFor}
        value = {value}
        placeholder = {placeholder}
        onChange = {onChange}
      />
      {isInvalid(props) ? <span>{errorMsg}</span> : null}
    </div>
  )
}

export default Input;