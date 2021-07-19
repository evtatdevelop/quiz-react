import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {createControl, validate, validateForm} from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import { addQuestion, createQuiz } from '../../store/actions/create'

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
class QuizCreator extends Component {

  state = {
    isFormValid: false,
    correctAnswer: 1,
    formControls: createFormControls(),
  }

  changeHandler(value, controlName) {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls, 
      isFormValid: validateForm(formControls)
    });
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

  selectChangeHandler = event => {
    this.setState({
      correctAnswer: +event.target.value
    })
  }


 addQuestionHandler = () => {
  const {formControls: {question, option1, option2, option3, option4}, correctAnswer, } = this.state;
  const questionItem = {
    id: this.props.quiz.length + 1,
    question: question.value,
    correctAnswer: correctAnswer,
    answers: [
      {text: option1.value, id: option1.id},
      {text: option2.value, id: option2.id},
      {text: option3.value, id: option3.id},
      {text: option4.value, id: option4.id},          
    ]
  }
  this.props.addQuestion(questionItem);

  this.setState({
    isFormValid: false,
    correctAnswer: 1,
    formControls: createFormControls()
  });
 }

  createQuizHandler = () => {
    
    this.setState({
      isFormValid: false,
      correctAnswer: 1,
      formControls: createFormControls()
    });

    this.props.createQuiz();
  }

  submitHandler = event => event.preventDefault()

  render() {

    const select =  
      <Select
        label = 'Correct answer'
        value = {this.state.correctAnswer}
        onChange = {this.selectChangeHandler}
        options = {
          [
            {value: '1', text: 'Opt1'},
            {value: '2', text: 'Opt2'},
            {value: '3', text: 'Opt3'},
            {value: '4', text: 'Opt4'},
          ]
        }
      />

    return (
      <div className = {classes.QuizCreator}>
        <div>
          <h1>Quiz creating</h1>

          <form onSubmit = {this.submitHandler}>
            
            { this.renderInputControls() }          

            { select }

            <Button
              type = 'primary'
              onClick = {this.addQuestionHandler}
              disabled = {!this.state.isFormValid}
            >
              Add question
            </Button>

            <Button
              type = 'success'
              onClick = {this.createQuizHandler}
              disabled = {this.props.quiz.length === 0}
            >
              Create quiz
            </Button>
          </form>
        </div>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (item) => dispatch(addQuestion(item)),
    createQuiz: () => dispatch(createQuiz())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)