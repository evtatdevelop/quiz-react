import axios from 'axios';
import { 
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from './actionTypes';

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKtNy_fllfq0yQ6NM7VY2fLiGYrbsVSxU';
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKtNy_fllfq0yQ6NM7VY2fLiGYrbsVSxU';
    }
    const response = await axios.post(url, authData);
    const {expiresIn, idToken, localId} = response.data;

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', idToken);
    localStorage.setItem('userId', localId);

    dispatch(authSuccess(idToken))
    dispatch(autoLogout(expiresIn))
  }
}

function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

function autoLogout(time) {
  return dispatch => {
    setTimeout(() => dispatch(logout()), time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if ( !token ) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))    
      }
    }
  }
}