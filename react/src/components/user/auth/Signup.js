import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import LinearProgress from '@material-ui/core/LinearProgress'
var validator = require('email-validator')


class Signup extends Component {
  state = {
    email: '',
    emailValidation: true,
    password: '',
    name: '',
    nameFile: '',
    activeStep: 0,
    maxStep: 3,
  }
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
            this.input2.focus()
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
              <Input
                value={this.state.name}
                inputRef={node => this.input0 = node}
                onChange={e => this.setState({ name: e.target.value })}
                type='text'
                className={'wrapperAnimate ' + (this.state.activeStep === 0 ? 'focusField' : 'notFocusField')}
                label='Your name'
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
            <br/><br/>
            {this.state.activeStep >= 1 && (
              <Input
                value={this.state.email}
                error={!this.state.emailValidation}
                onChange={this.onChange1.bind(this)}
                label='Your email address'
                type='text'
                inputRef={node => this.input1 = node}
                onKeyPress={this.handleKey}
                className={'wrapperAnimate ' + (this.state.activeStep === 1 ? 'focusField' : 'notFocusField')}
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
            )}
            <br/><br/>
            {this.state.activeStep >= 2 && (
            <Input
              value={this.state.password}
              label='Choose a safe password'
              onChange={e => this.setState({ password: e.target.value })}
              className={'wrapperAnimate ' + (this.state.activeStep === 2 ? 'focusField' : 'notFocusField')}
              type='password'
              inputRef={node => this.input2 = node}
              onKeyPress={this.handleKey}
              endAdornment={
                <InputAdornment position='end'>
                  {this.state.activeStep === 2 && (
                    <Button onClick={this.handleNext} variant='fab' color='primary' mini>
                      <Icon>done</Icon>
                    </Button>
                  )}
                </InputAdornment>
              }
            />
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
        this.props.history.push(`/`)
      })
      .catch((e) => {
        this.child._openSnackBar(e.graphQLErrors[0].message)
      })

  }

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token)
    localStorage.setItem('userToken', JSON.stringify(user))
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
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),

)(Signup)
