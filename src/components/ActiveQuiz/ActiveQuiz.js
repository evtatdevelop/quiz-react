import React from 'react';
import AnswersList from '../AnswersList/AnswersList';

import classes from './ActiveQuiz.module.scss';

const ActiveQuiz = props => {
  const {currentQuestion, onAnswerClick, quizLength, activeQuestion, answerState} = props;
  const {question, answers} = currentQuestion;
  
  return (
    <div className = {classes.ActiveQuiz}>
      <p className = {classes.Question}>
        <span>
          <strong>{activeQuestion}.</strong>&nbsp;
          {question}
        </span>
        <small>{activeQuestion} of {quizLength}</small>
      </p>
      <AnswersList 
        answers = {answers}
        onAnswerClick = {onAnswerClick}
        answerState = {answerState}
      />
    </div>
  )
}

export default ActiveQuiz;