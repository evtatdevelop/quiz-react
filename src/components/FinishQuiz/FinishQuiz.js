import React from 'react';

import classes from './FinishQuiz.module.scss';

const FinishQuiz = props => {
  const {result, quiz} = props;
  let numCorrectAnswers = Object.values(result).filter(item => item === 'success').length;
  return (
    <div className = {classes.FinishQuiz}>
      <ul>
        {quiz.map((quizItem, index) => {
            const iconClass = [
              'fa',
              result[quizItem.id] === 'success' 
                ?  'fa-check'
                : 'fa-times',
              classes[result[quizItem.id]]  
            ];
          return (
            <li key = {index}>
              <strong>{index + 1}.</strong>&nbsp;
              {quizItem.question}
              <i className = {iconClass.join(' ')}/>
            </li>
          )
        } )}
      </ul>
      <p>Correct {numCorrectAnswers} of {quiz.length}</p>

      <div>
        <button onClick = {props.retryHandler}>Retry</button>
      </div>
    </div>
  )
}

export default FinishQuiz;