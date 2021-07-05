import React from 'react';
import AnswersList from '../AnswersList/AnswersList';

import classes from './ActiveQuiz.module.scss';

const ActiveQuiz = props => {
  return (
    <div className = {classes.ActiveQuiz}>
      <p className = {classes.Question}>
        <span>
          <strong>2.</strong>&nbsp;
          What's Up?
        </span>
        <small>2 of 12</small>
      </p>
      <AnswersList answers = {props.answers}/>
    </div>
  )
}

export default ActiveQuiz;