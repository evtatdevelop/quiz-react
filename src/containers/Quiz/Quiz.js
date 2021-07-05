import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

import classes from './Quiz.module.scss';

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: 'What\'s Up?',
        correctAnswer: 2,
        answers: [
          {text: 'Answer 1', id: 1},
          {text: 'Answer 2', id: 2},
          {text: 'Answer 3', id: 3},
          {text: 'Answer 4', id: 4},          
        ]
      },
    ],
  }

  answerHandler = idAnswer => {
    console.log(idAnswer);
  }

  render() {
    return (
      <div className = {classes.Quiz}>
        <h1>Quiz</h1>
        <div className = {classes.QuizWrapper}>
          <ActiveQuiz 
            question = {this.state.quiz[0]}
            onAnswerClick = {this.answerHandler}  
          />
        </div>
          
      </div>
    )
  }
}

export default Quiz;