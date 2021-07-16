import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

import classes from './QuizList.module.scss';

class QuizList extends Component {

  renderQuizList = () => {
    return this.props.quizes.map(
      quiz => (
        <li key = {quiz.id}> 
          <NavLink to = {`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      )
    )
  }

  async componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className = {classes.QuizList}>
        <div>
          <h1>Quiz list</h1>
          {
            this.props.loading // && this.props.quizes.length !== 0
              ? <Loader/> 
              : <ul>
                  { this.renderQuizList() }
                </ul>
          }
          
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)