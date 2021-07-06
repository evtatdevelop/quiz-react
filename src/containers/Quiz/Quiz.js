import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz';

import classes from './Quiz.module.scss';

class Quiz extends Component {
  state = {
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' / 'fail' }
    quiz: [
      {
        id: 1,
        question: 'What\'s Up?!',
        correctAnswer: 2,
        answers: [
          {text: 'Answer 1', id: 1},
          {text: 'Answer 2', id: 2},
          {text: 'Answer 3', id: 3},
          {text: 'Answer 4', id: 4},          
        ]
      },
      {
        id: 2,
        question: 'It\'s a small world?',
        correctAnswer: 3,
        answers: [
          {text: 'Yes', id: 1},
          {text: 'No', id: 2},
          {text: 'I\'m not sure', id: 3},          
        ]
      },
    ],
  }

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  answerHandler = idAnswer => {
    const {answerState, activeQuestion, quiz} = this.state;

    if (answerState && answerState[Object.keys(answerState)[0]] === 'success') return;
    
    const isCorrectAnswer = quiz[activeQuestion].correctAnswer === idAnswer;

    if (isCorrectAnswer) {
      this.setState({answerState: {[idAnswer]: 'success'}});

      const timeout = window.setTimeout( () => {
        if (this.isQuizFinished()) {
          this.setState({isFinished: true});
          
        } else {
          this.setState({
            activeQuestion: activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);   
    
    } else {
      this.setState({answerState: {[idAnswer]: 'fail'}});    
    }
  }

  render() {
    const {quiz, activeQuestion, answerState} = this.state;

    const content = this.state.isFinished 
      ? <FinishQuiz/>
      : <ActiveQuiz 
            currentQuestion = {quiz[activeQuestion]}
            onAnswerClick = {this.answerHandler}  
            quizLength = {quiz.length}
            activeQuestion = {activeQuestion + 1}
            answerState = {answerState}
        />

    return (
      <div className = {classes.Quiz}>
        <h1>Quiz</h1>
        <div className = {classes.QuizWrapper}>
          {content}
        </div>
          
      </div>
    )
  }
}

export default Quiz;