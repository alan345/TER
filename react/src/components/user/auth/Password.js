import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

export default class Password extends Component {
  state = {
    inputValidation2: true,
    isPasswordLongEnough: true,
    hasLowerCase: true,
    hasUpperCase: true,
    hasNumber: true,
    hasSpecialChar: true,
    password: '',
    passwordMinimumLength: 10
  }
  UNSAFE_componentWillReceiveProps() {
    this.input2.focus()
  }
  onChange2(e){
    let inputValidation2 = false
    if(
      this.isPasswordLongEnough(e.target.value) &&
      this.hasLowerCase(e.target.value) &&
      this.hasUpperCase(e.target.value) &&
      this.hasNumber(e.target.value) &&
      this.hasSpecialChar(e.target.value)
    ) {
      inputValidation2 = true
    }

    this.setState({
      password: e.target.value,
      inputValidation2:inputValidation2,
      hasNumber: this.hasNumber(e.target.value),
      hasSpecialChar: this.hasSpecialChar(e.target.value),
      hasUpperCase: this.hasUpperCase(e.target.value),
      hasLowerCase: this.hasLowerCase(e.target.value),
      isPasswordLongEnough: this.isPasswordLongEnough(e.target.value)
    }, () => {
      this.props.onChange2(this.state)
    })
  }

  hasLowerCase(str) {
     return str.toUpperCase() !== str
  }
  hasUpperCase(str) {
     return str.toLowerCase() !== str
  }
  hasNumber(string) {
    return /\d/.test(string)
  }

  hasSpecialChar(str) {
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/
    if(format.test(str)){
      return true
    } else {
      return false
    }
  }

  isPasswordLongEnough(password) {
    if(password.length > this.state.passwordMinimumLength) {
      this.setState({isPasswordLongEnough: true})
      return true
    }
    this.setState({isPasswordLongEnough: false})
    return false
  }

  handleNext = () => {
    this.props.handleNext()
  };

  handleKey = (data) => {
    if(data.charCode === 13) { //keyPress enter
      this.handleNext()
    }
  }

  render() {
    return (

      <FormControl className={'wrapperAnimate ' + (this.props.activeStep ? 'focusField' : 'notFocusField')}>
        <InputLabel htmlFor='password'>Choose a safe password</InputLabel>
        <Input
          id='password'
          value={this.props.password}
          error={!this.state.inputValidation2}
          onChange={this.onChange2.bind(this)}
          type='password'
          inputRef={node => this.input2 = node}
          onKeyPress={this.handleKey}
          endAdornment={
            <InputAdornment position='end'>
              {this.props.activeStep && (
                <Button onClick={this.handleNext} variant='fab' color='primary' mini>
                  <Icon>done</Icon>
                </Button>
              )}
            </InputAdornment>
          }
        />
      {!this.state.isPasswordLongEnough && (
        <FormHelperText>At least {this.state.passwordMinimumLength} characters long.</FormHelperText>
      )}
      {!this.state.hasLowerCase && (
        <FormHelperText>At least a lower case letter.</FormHelperText>
      )}
      {!this.state.hasUpperCase && (
        <FormHelperText>At least an upper case letter.</FormHelperText>
      )}
      {!this.state.hasNumber && (
        <FormHelperText>At least an number.</FormHelperText>
      )}
      {!this.state.hasSpecialChar && (
        <FormHelperText>At least a spceial character.</FormHelperText>
      )}
      </FormControl>

    )
  }
}
