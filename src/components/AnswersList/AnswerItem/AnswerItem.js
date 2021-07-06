import React from 'react';

import classes from './AnswerItem.module.scss';

const AnswerItem = props => {
  const {answer, answerState} = props;
  const {text, id} = answer;
  const itemClasses = [classes.AnswerItem];

  if (answerState) {
    itemClasses.push(classes[answerState]);
  }

  return (
    <li className = {itemClasses.join(' ')}>
      <button onClick={() => props.onAnswerClick(id)} >{text}</button>
      
    </li>
  )
}

export default AnswerItem;