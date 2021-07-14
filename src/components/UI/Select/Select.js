import React from 'react';

import classes from './Select.module.scss';

const Select = props => {
  const {label, value, onChange, options} = props;
  const htmlFor = `${label}-${Math.random()}`;
  
  return( 
    <div className = {classes.Select}>
      <label htmlFor = {htmlFor}>{label}</label>

      <select
        id = {htmlFor}
        value = {value}
        onChange = {onChange}
      >
        { options.map((option, index) => {
          const {value, text} = option;
          return(
            <option 
              key = {value + index}
              value = {value}
            >
              {text}
            </option>
          )
        }) }
      </select>
    </div>
  )
}

export default Select;