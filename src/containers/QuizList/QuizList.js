import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import classes from './QuizList.module.scss';

export default class QuizList extends Component {

  renderQuizList = () => {
    return [1, 2, 3].map(
      (quizItem, index) => (
        <li key = {index}> 
          <NavLink to = {`/quiz/${quizItem}`}>Quiz {quizItem}</NavLink>
        </li>
      )
    )
  }

  render() {
    return (
      <div className = {classes.QuizList}>
        <div>
          <h1>Quiz list</h1>
          <ul>
            { this.renderQuizList() }
          </ul>
        </div>
      </div>
    )
  }
}