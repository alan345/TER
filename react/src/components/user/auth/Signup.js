import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Password from './Password'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import LinearProgress from '@material-ui/core/LinearProgress'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { withApollo } from 'react-apollo'

var validator = require('email-validator')


class Signup extends Component {
  state = {
    email: '',
    emailValidation: true,
    inputValidation2: true,
    password: '',
    name: '',
    nameFile: '',
    activeStep: 0,
    maxStep: 3,
    // isPasswordLongEnough: true,
    // hasLowerCase: true,
    // isPasswordActiveStep: false,
    // passwordMinimumLength: 10
  }
  onChange2(e){

    this.setState({
      password: e.target.value,
      // hasLowerCase: this.hasLowerCase(e.target.value),
      // isPasswordLongEnough: this.isPasswordLongEnough(e.target.value)
    })
    // if(this.state.hasLowerCase && this.state.isPasswordLongEnough) {
    //   this.setState({inputValidation2: true})
    // } else {
    //   this.setState({inputValidation2: false})
    // }
  }

  // hasLowerCase(str) {
  //    if(str.toUpperCase() !== str) {
  //      return true
  //    }
  //    return false
  // }

  // isPasswordLongEnough(password) {
  //   if(password.length > this.state.passwordMinimumLength) {
  //     this.setState({isPasswordLongEnough: true})
  //     return true
  //   }
  //   this.setState({isPasswordLongEnough: false})
  //   return false
  // }
  onChange1(e){
    this.setState({ email: e.target.value })
    if (this.validateEmail(e.target.value )) {
      this.setState({emailValidation: true})
    } else {
      this.setState({emailValidation: false})
    }
  }
  validateEmail(email) {
      return validator.validate(email)
      // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // return re.test(String(email).toLowerCase())
  }
  calculateBuffer() {
    let data = ''
    if(this.state.activeStep === 0) {
      data = this.state.name
    }
    if(this.state.activeStep === 1) {
      data = this.state.email
    }
    if(this.state.activeStep === 2) {
      data = this.state.password
    }
    let maxValue = data.length/10 > 1 ? 1 : data.length/10
    return (this.state.activeStep + maxValue) * 100 / this.state.maxStep
  }
  handleNext = () => {
    if(this.state.name) {
      if(this.state.activeStep === 0 ) {
        this.setState({
          activeStep: this.state.activeStep + 1,
        }, () => {
           this.input1.focus()
        })
      }
      if(this.state.activeStep === 1 ) {
        if(this.state.emailValidation ) {
          this.setState({
            activeStep: this.state.activeStep + 1,
          }, () => {
            // this.input2.focus()
            this.setState({isPasswordActiveStep:true})
          })
        }
      }
      if(this.state.activeStep === 2 ) {
        this.setState({
          activeStep: this.state.activeStep + 1,
        }, () => {
          this._confirm()
        })
      }
    }
  };

  handleKey = (data) => {
    if(data.charCode === 13) { //keyPress enter
      this.handleNext()
    }
  }


  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <h4 className='mv3'>
          Sign Up
        </h4>
        <div className='flex flex-column'>

        <LinearProgress variant='buffer'
          value={this.state.activeStep * 100 / this.state.maxStep }
          valueBuffer={this.calculateBuffer()}
             />
          <br/>
            <div className='tac'>
              <FormControl className={'wrapperAnimate ' + (this.state.activeStep === 0 ? 'focusField' : 'notFocusField')}>
                <InputLabel htmlFor='name'>Your name</InputLabel>
                <Input
                  id='name'
                  value={this.state.name}
                  inputRef={node => this.input0 = node}
                  onChange={e => this.setState({ name: e.target.value })}
                  type='text'
                  onKeyPress={this.handleKey}
                  endAdornment={
                    <InputAdornment position='end'>
                      {this.state.activeStep === 0 && (
                        <Button onClick={this.handleNext} variant='fab' color='primary' mini>
                          <Icon>navigate_next</Icon>
                        </Button>
                      )}
                    </InputAdornment>
                  }
                />
            </FormControl>
            <br/><br/>
            {this.state.activeStep >= 1 && (
              <FormControl className={'wrapperAnimate ' + (this.state.activeStep === 1 ? 'focusField' : 'notFocusField')}>
                <InputLabel htmlFor='email'>Your email address</InputLabel>
              <Input
                id='email'
                value={this.state.email}
                error={!this.state.emailValidation}
                onChange={this.onChange1.bind(this)}
                type='text'
                inputRef={node => this.input1 = node}
                onKeyPress={this.handleKey}
                endAdornment={
                  <InputAdornment position='end'>
                    {this.state.activeStep === 1 && (
                      <Button onClick={this.handleNext} variant='fab' color='primary' mini>
                        <Icon>navigate_next</Icon>
                      </Button>
                    )}
                  </InputAdornment>
                }
                />
              </FormControl>
            )}
            <br/><br/>
            {this.state.activeStep >= 2 && (
              <Password
                handleNext={this.handleNext.bind(this)}
                activeStep={this.state.isPasswordActiveStep}
                onChange2={this.onChange2.bind(this)}/>
            )}
          </div>
        </div>


        <SnackBarCustom ref={instance => { this.child = instance }}/>
      </Paper>
      </div>
    )
  }

  _confirm = async () => {
    const { name, email, password, nameFile } = this.state
      await this.props.signupMutation({
        variables: {
          name,
          email,
          password,
          nameFile,
        },
      })
      .then((result) => {
        const { token, user } = result.data.signup
        this._saveUserData(token, user)

      })
      .catch((e) => {
        this.child._openSnackBar(e.graphQLErrors[0].message)
      })

  }

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token)
    localStorage.setItem('userToken', JSON.stringify(user))
    this.props.client.resetStore().then(data=> {
      this.props.history.push(`/`)
    })
  }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!, $nameFile: String!) {
    signup(email: $email, password: $password, name: $name, nameFile:$nameFile) {
      token
      user {
        name
        emailvalidated
        id
      }
    }
  }
`


export default compose(
  withApollo,
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),

)(Signup)
