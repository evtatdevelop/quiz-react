import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

import classes from './Quiz.module.scss';

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: 'Question 2',
        answers: [
          {text: 'Answer 1'},
          {text: 'Answer 2'},
          {text: 'Answer 3'},
          {text: 'Answer 4'},          
        ]
      },
    ],
  }
  render() {
    return (
      <div className = {classes.Quiz}>
        <h1>Quiz</h1>
        <div className = {classes.QuizWrapper}>
          <ActiveQuiz answers = {this.state.quiz[0].answers}/>
        </div>
          
      </div>
    )
  }
}

export default Quiz;