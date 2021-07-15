import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz';
// import axios from 'axios';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

import classes from './Quiz.module.scss';

class Quiz extends Component {
  state = {
    result: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' / 'fail' }
    quiz: [],
    loading: true
  }

  async componentDidMount() {
    // console.log('Quiz ID: ', this.props.match.params.id);
    try {
      // const response = await axios.get(`https://react-tests-48ee5-default-rtdb.firebaseio.com/quizes/${this.props.match.params.id}.json`);
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
      const quiz = response.data;
      this.setState({
        quiz,
        loading: false
      });
    } catch(error) {
      console.error(error);
    } 
  }

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  answerHandler = idAnswer => {
    const {answerState, activeQuestion, quiz} = this.state;

    // if (answerState && answerState[Object.keys(answerState)[0]] === 'success') return;
    if (answerState) return;
    
    const isCorrectAnswer = quiz[activeQuestion].correctAnswer === idAnswer;
    const idActiveQuestion = quiz[activeQuestion].id;
    const result = this.state.result;

    if (isCorrectAnswer) {
      result[idActiveQuestion] = 'success';
      this.setState({
        answerState: {[idAnswer]: 'success'},
        result,
      }); 
    
    } else {
      result[idActiveQuestion] = 'fail';
      this.setState({
        answerState: {[idAnswer]: 'fail'},
        result,
      });    
    }

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
  }

  retryHandler = () => {
    this.setState({
      result: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    })
  }


  render() {
    const {quiz, activeQuestion, answerState, result} = this.state;

    const content = this.state.isFinished 
      ? <FinishQuiz
         result = {result}
         quiz = {quiz}
         retryHandler = {this.retryHandler}
      />
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
          {
            this.state.loading
              ? <Loader/>
              : content
          }
        </div>
          
      </div>
    )
  }
}

export default Quiz;