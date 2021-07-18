import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, getAnswer, retryQuiz } from '../../store/actions/quiz';

import classes from './Quiz.module.scss';

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  // isQuizFinished = () => {
  //   return this.props.activeQuestion + 1 === this.props.quiz.length;
  // }

  answerHandler = idAnswer => {
    
    const {answerState, activeQuestion, quiz, result} = this.props;
    if (answerState) return;
    this.props.getAnswer(idAnswer, activeQuestion, quiz, result)
    
    // const isCorrectAnswer = quiz[activeQuestion].correctAnswer === idAnswer;
    // const idActiveQuestion = quiz[activeQuestion].id;

    // if (isCorrectAnswer) {
    //   result[idActiveQuestion] = 'success';
    //   this.setState({
    //     answerState: {[idAnswer]: 'success'},
    //     result,
    //   }); 
    // } else {
    //   result[idActiveQuestion] = 'fail';
    //   this.setState({
    //     answerState: {[idAnswer]: 'fail'},
    //     result,
    //   });
    // }

    // const timeout = window.setTimeout( () => {
    //   if (this.isQuizFinished()) {
    //     this.setState({isFinished: true});
        
    //   } else {
    //     this.setState({
    //       activeQuestion: activeQuestion + 1,
    //       answerState: null,
    //     });
    //   }
    //   window.clearTimeout(timeout);
    // }, 1000);  


  }

  retryHandler = () => {
    // this.setState({
    //   result: {},
    //   isFinished: false,
    //   activeQuestion: 0,
    //   answerState: null,
    // })
    this.props.retryQuiz()
  }


  render() {
    const {quiz, activeQuestion, answerState, result, isFinished, loading} = this.props;

    const content = isFinished 
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
            loading || quiz.length === 0
              ? <Loader/>
              : content
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {result, isFinished, activeQuestion, answerState, quiz, loading} = state.quiz
  return {
    result,
    isFinished,
    activeQuestion,
    answerState,
    quiz,
    loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    getAnswer: (idAnswer, activeQuestion, quiz, result) => dispatch(getAnswer(idAnswer, activeQuestion, quiz, result)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);