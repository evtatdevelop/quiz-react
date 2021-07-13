import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
// import is from 'is_js';
import {createControl} from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import classes from './QuizCreator.module.scss';

/**
 * Generate new control in state
 * @param {element number} num 
 * @returns 
 */
function createOptionControl(num) {
  return createControl(
    {
      id: num,
      label: `Option ${num}`,
      errorMsg: 'This field must not be empty',
      placeholder: `Option ${num}`,
    },
    {required: true}
  )
}

/**
 * Create and reset restFormControls in state
 * @returns 
 */
function createFormControls() {
  return {
    question: createControl(
      {
        label: 'New question',
        errorMsg: 'This field must not be empty',
        placeholder: 'question',
      },
      {required: true}
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}
export default class QuizCreator extends Component {

  state = {
    quiz: [],
    formControls: createFormControls(),
  }

  changeHandler(value, controlName) {

  }

  renderInputControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const {label, errorMsg, valid, touched, value, placeholder, validation} = this.state.formControls[controlName];
      return (
        <Auxiliary key = {controlName + index}>
          <Input
            value = {value}
            type = 'text'
            label = {label} 
            placeholder = {placeholder} 
            errorMsg = {errorMsg} 
            valid = {valid} 
            touched = {touched} 
            shouldValidate = {!!validation}
            onChange = {event => this.changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </Auxiliary>  
      )
    })
  } 


 addQuestionHandler = () => {

 }

 createQuizHandler = () => {

 }

  submitHandler = event => event.preventDefault()

  render() {
    return (
      <div className = {classes.QuizCreator}>
        <div>
          <h1>Quiz creating</h1>

          <form onSubmit = {this.submitHandler}>
            
            { this.renderInputControls() }          

            <select></select>
            <Button
              type = 'primary'
              onClick = {this.addQuestionHandler}
            >
              Add question
            </Button>

            <Button
              type = 'success'
              onClick = {this.createQuizHandler}
            >
              Create quiz
            </Button>
          </form>
        </div>
        
      </div>
    )
  }
}