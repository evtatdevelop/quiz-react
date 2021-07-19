import { 
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  SET_ANSWER,
  NEXT_QUSTION,
  IS_FINISHED,
  RETRY_QUIZ
} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  result: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null, // { [id]: 'success' / 'fail' }
  quiz: [],
}

export default function quizReducer(state = initialState, action) {
  
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      }

    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes
      }

    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz
      }

    case SET_ANSWER:
      return {
        ...state,
        answerState: action.answerState,
        result: action.result,
      }

    case NEXT_QUSTION:
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
        answerState: null,
      }

    case IS_FINISHED:
      return {
        ...state,
        isFinished: true
      }

    case RETRY_QUIZ:
      return {
        ...state,
        result: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      }

    default: return state
  }  
}