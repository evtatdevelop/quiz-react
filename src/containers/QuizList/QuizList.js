import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import classes from './QuizList.module.scss';

export default class QuizList extends Component {

  state = {
    quizes: []
  }

  renderQuizList = () => {
    return this.state.quizes.map(
      quiz => (
        <li key = {quiz.id}> 
          <NavLink to = {`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      )
    )
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://react-tests-48ee5-default-rtdb.firebaseio.com/quizes.json');
      // console.log(response.data);
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test #${index + 1}`
        })
      });
      this.setState({quizes});
    } catch(error) {
      console.error(error);
    } 
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