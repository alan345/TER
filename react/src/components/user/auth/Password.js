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
    // email: '',
    // emailValidation: true,
    inputValidation2: true,
    isPasswordLongEnough: true,
    hasLowerCase: true,
    password: '',
    // name: '',
    // nameFile: '',
    // activeStep: 0,
    // maxStep: 3,
    passwordMinimumLength: 10
  }
  componentWillReceiveProps(newProps) {
    this.input2.focus()
  }
  onChange2(e){
    this.props.onChange2(e)
    this.setState({
      hasLowerCase: this.hasLowerCase(e.target.value),
      isPasswordLongEnough: this.isPasswordLongEnough(e.target.value)
    })
    if(this.state.hasLowerCase && this.state.isPasswordLongEnough) {
      this.setState({inputValidation2: true})
    } else {
      this.setState({inputValidation2: false})
    }
  }

  hasLowerCase(str) {
     if(str.toUpperCase() !== str) {
       return true
     }
     return false
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
                <FormHelperText>At least a lower case.</FormHelperText>
              )}
          </FormControl>

    )
  }
}
