import React from 'react';

import AnswerItem from './AnswerItem/AnswerItem';

import classes from './AnswersList.module.scss';


const AnswersList = props => {
  const {answers, onAnswerClick, answerState} = props;

  return (
    <ul className = {classes.AnswersList}>
      { answers.map((answer, index) => {
        return (
          <AnswerItem 
            key = {index} 
            answer = {answer}
            onAnswerClick = {onAnswerClick}
            answerState = {answerState ? answerState[answer.id] : null}
          />
        )
      }) }
    </ul>
  )
}

export default AnswersList;