import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import { InputAdornment } from 'material-ui/Input'
import Icon from 'material-ui/Icon'
import { LinearProgress } from 'material-ui/Progress'


class Signup extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    nameFile: '',
    activeStep: 0,
    maxStep: 3,
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
      this.setState({
        activeStep: this.state.activeStep + 1,
      }, function () {
        if(this.state.activeStep === 1 ) { this.input1.focus() }
        if(this.state.activeStep === 2 ) { this.input2.focus() }
      })
      if(this.state.activeStep === 2) {
        this._confirm()
      }
    }
  };

  handleKey = (data) => {
    if(data.charCode === 13) { //keyPress enter
      this.handleNext()
    }
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    })
  };

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
              <TextField
                value={this.state.name}
                inputRef={node => this.input0 = node}
                onChange={e => this.setState({ name: e.target.value })}
                type='text'
                className={'wrapperAnimate ' + (this.state.activeStep === 0 ? 'focusField' : 'notFocusField')}
                label='Your name'
                onKeyPress={this.handleKey}
                InputProps={{
                  endAdornment: (
                  <InputAdornment position='end'>
                    {this.state.activeStep === 0 && (
                      <Button onClick={this.handleNext} variant='fab' color='primary' mini>
                        <Icon>navigate_next</Icon>
                      </Button>
                    )}
                  </InputAdornment>
                )}}
              />
            <br/><br/>
            {this.state.activeStep >= 1 && (
              <TextField
                inputRef={node => this.input1 = node}
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                type='text'
                onKeyPress={this.handleKey}
                className={'wrapperAnimate ' + (this.state.activeStep === 1 ? 'focusField' : 'notFocusField')}
                label='Your email address'
                InputProps={{
                  endAdornment: (
                  <InputAdornment position='end'>
                    {this.state.activeStep === 1 && (
                      <Button onClick={this.handleNext} variant='fab' color='primary' mini>
                        <Icon>navigate_next</Icon>
                      </Button>
                    )}
                  </InputAdornment>
                )}}
                />

            )}
            <br/><br/>
            {this.state.activeStep >= 2 && (
            <TextField
              value={this.state.password}
              inputRef={node => this.input2 = node}
              onChange={e => this.setState({ password: e.target.value })}
              className={'wrapperAnimate ' + (this.state.activeStep === 2 ? 'focusField' : 'notFocusField')}
              type='password'
              label='Choose a safe password'
              onKeyPress={this.handleKey}
              InputProps={{
                endAdornment: (
                <InputAdornment position='end'>
                  {this.state.activeStep === 2 && (
                    <Button onClick={this.handleNext} variant='fab' color='primary' mini>
                      <Icon>done</Icon>
                    </Button>
                  )}
                </InputAdornment>
              )}}
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
