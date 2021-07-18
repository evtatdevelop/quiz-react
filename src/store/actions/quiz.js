import axios from '../../axios/axios-quiz';
import { 
  FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  GET_ANSWER, NEXT_QUSTION, IS_FINISHED, RETRY_QUIZ
} from './actionTypes';

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test #${index + 1}`
        })
      });

      dispatch(fetchQuizesSuccess(quizes))

    } catch(error) {
      dispatch(fetchQuizesError(error))
    } 
  }
}


export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;
      
      dispatch(fetchQuizSuccess(quiz))

    } catch(error) {
      dispatch(fetchQuizesError(error))
    }
  }
}

export function getAnswer(idAnswer, activeQuestion, quiz, result) {
  return dispatch => {

    const isCorrectAnswer = quiz[activeQuestion].correctAnswer === idAnswer;
    const idActiveQuestion = quiz[activeQuestion].id;

    if (isCorrectAnswer) {
      result[idActiveQuestion] = 'success';
      dispatch(setAnswer({[idAnswer]: 'success'}, result)) 
    } else {
      result[idActiveQuestion] = 'fail';
      dispatch(setAnswer({[idAnswer]: 'fail'}, result)) 
    }

    const timeout = window.setTimeout( () => {
      if (activeQuestion + 1 === quiz.length) {
        dispatch(isFinished())      
      } else {
        dispatch(nextQuestion())
      }
      window.clearTimeout(timeout);
    }, 1000);
  }
}

export function retryQuiz() {
  return dispatch => {
    dispatch({
      type: RETRY_QUIZ,
    })
  }
}


function setAnswer(answerState, result) {
    return {
    type: GET_ANSWER,
    answerState,
    result
  }
}
function nextQuestion() {
  return {
    type: NEXT_QUSTION,
  }
}
function isFinished() {
  return {
    type: IS_FINISHED,
  }
}




function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  }
}

function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}