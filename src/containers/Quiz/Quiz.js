import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

import classes from './Quiz.module.scss';

class Quiz extends Component {
  state = {
    quiz: [],
  }
  render() {
    return (
      <div className = {classes.Quiz}>
        <h1>Quiz</h1>
        <div className = {classes.QuizWrapper}>
          <ActiveQuiz/>
        </div>
          
      </div>
    )
  }
}

export default Quiz;