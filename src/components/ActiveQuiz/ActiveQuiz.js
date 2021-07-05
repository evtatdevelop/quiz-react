import React from 'react';
import AnswersList from '../AnswersList/AnswersList';

import classes from './ActiveQuiz.module.scss';

const ActiveQuiz = props => {
  const {question, answers} = props.question;
  
  return (
    <div className = {classes.ActiveQuiz}>
      <p className = {classes.Question}>
        <span>
          <strong>2.</strong>&nbsp;
          {question}
        </span>
        <small>2 of 12</small>
      </p>
      <AnswersList 
        answers = {answers}
        onAnswerClick = {props.onAnswerClick}
      />
    </div>
  )
}

export default ActiveQuiz;