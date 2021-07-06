import React from 'react';

import classes from './FinishQuiz.module.scss';

const FinishQuiz = props => {
  return (
    <div className = {classes.FinishQuiz}>
      <ul>
        <li>
          <strong>1. </strong>
          What's Up?
          <i className = {'fa fa-times ' + classes.fail}/>
        </li>
        <li>
          <strong>2. </strong>
          It's small world?
          <i className = {'fa fa-check ' + classes.success}/>
        </li>
      </ul>
      <p>Correct 5 of 10</p>

      <div>
        <button>Renew</button>
      </div>
    </div>
  )
}

export default FinishQuiz;