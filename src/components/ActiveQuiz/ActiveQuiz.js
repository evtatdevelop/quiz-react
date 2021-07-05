import React from 'react';

import classes from './ActiveQuiz.module.scss';

const ActiveQuiz = props => (
  <div className = {classes.ActiveQuiz}>
    <p className = {classes.Question}>
      <span>
        <strong>2.</strong>&nbsp;
        What's Up?
      </span>
      <small>2 of 12</small>
    </p>

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
)

export default ActiveQuiz;