import React from 'react';

import classes from './AnswerItem.module.scss';

const AnswerItem = props => {
  const {text, id} = props.answer;
  return (
    <li className = {classes.AnswerItem}>
      <button onClick={() => props.onAnswerClick(id)} >{text}</button>
      
    </li>
  )
}

export default AnswerItem;