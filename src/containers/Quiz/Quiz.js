import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

import classes from './Quiz.module.scss';

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

 componentWillUnmount() {
   this.props.retryQuiz()
 }


  render() {
    const {quiz, activeQuestion, answerState, result, isFinished, loading} = this.props;

    const content = isFinished 
      ? <FinishQuiz
         result = {result}
         quiz = {quiz}
         retryHandler = {this.props.retryQuiz}
      />
      : <ActiveQuiz 
            currentQuestion = {quiz[activeQuestion]}
            onAnswerClick = {this.props.quizAnswerClick}  
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
    quizAnswerClick: idAnswer => dispatch(quizAnswerClick(idAnswer)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);