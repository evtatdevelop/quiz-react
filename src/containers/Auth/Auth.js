import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import { connect } from 'react-redux';
import{ auth } from '../../store/actions/auth';

import classes from './Auth.module.scss';

// function validateEmail(email) {
//   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }
class Auth extends Component {
  
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        placeholder: 'Your email',
        errorMsg: 'Invalid email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },

      password: {
        value: '',
        type: 'password',
        label: 'Password',
        placeholder: 'Your password',
        errorMsg: 'Invalid password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {
    const {email, password} = this.state.formControls;
    this.props.auth(email.value, password.value, true);

    // const authData = {
    //   email: email.value,
    //   password: password.value,
    //   returnSecureToken: true
    // }
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKtNy_fllfq0yQ6NM7VY2fLiGYrbsVSxU', authData);
    //   console.log(response.data);
    // } catch(error) {
    //   console.error(error);
    // }   
  }
  
  singupHandler = () => {
    const {email, password} = this.state.formControls;
    this.props.auth(email.value, password.value, false);

    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true
    // }
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKtNy_fllfq0yQ6NM7VY2fLiGYrbsVSxU', authData);
    //   console.log(response.data);
    // } catch(error) {
    //   console.error(error);
    // }   
  }

  submitHandler = event => {
    event.preventDefault()
  }

  validate = (value, validation) => {
     if (!validation) return true;
     
     let isValid = true;
     if (validation.required) {
       isValid = value.trim() !== '' && isValid;
     }
     if (validation.email) {
      // isValid = validateEmail(value) && isValid;
      isValid = is.email(value) && isValid;
     }
     if (validation.minLength) {
      isValid = value.trim().length >= 6 && isValid;
     }
     return isValid;
  }

  changeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validate(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    
    Object.values(formControls).forEach(item => {
      isFormValid = item.valid && isFormValid;
    })

    this.setState({formControls, isFormValid});
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const {value, type, label, placeholder, errorMsg, valid, touched, validation} = this.state.formControls[controlName];
      return (
        <Input
          key = {controlName + index}
          value = {value}
          type = {type}
          label = {label} 
          placeholder = {placeholder} 
          errorMsg = {errorMsg} 
          valid = {valid} 
          touched = {touched} 
          shouldValidate = {!!validation}
          onChange = {event => this.changeHandler(event, controlName)}
        />
      )
    })
  } 

  render() {
    return (
      <div className = {classes.Auth}>
        <div>
          <h1>Authorization</h1>
          <form 
            onSubmit = {this.submitHandler} 
            className = {classes.AuthForm}
          >

            { this.renderInputs() }

            <Button
              type = 'success'
              onClick = {this.loginHandler}
              disabled = {!this.state.isFormValid}
            >
              Sign in
            </Button>
            
            <Button
              type = 'primary'
              onClick = {this.singupHandler}
              disabled = {!this.state.isFormValid}
            >
              Sign up
            </Button>
          </form>
        </div>
        
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);