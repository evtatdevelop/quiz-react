import axios from '../../axios/axios-quiz';

import { 
  ADD_QUESTION,
  RESET_CREATE_QUIZ
} from './actionTypes';

export function addQuestion(item) {
  return {
      type: ADD_QUESTION,
      item
  }
}

export function createQuiz() {
  return async (dispatch, getState) => {
    await axios.post('/quizes.json', getState().create.quiz);
    dispatch(resetCreateQuiz())
  }  
}

function resetCreateQuiz() {
  return {
    type: RESET_CREATE_QUIZ
  }
}