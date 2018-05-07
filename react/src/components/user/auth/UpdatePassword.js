import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import NotAuth from '../../nav/NotAuth'
import { InputAdornment } from 'material-ui/Input'
import Icon from 'material-ui/Icon'
import { LinearProgress } from 'material-ui/Progress'


// const queryString = require('query-string')

class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
    activeStep: 0,
    maxStep: 3,
  }
  calculateBuffer() {
    let data = ''
    if(this.state.activeStep === 0) {
      data = this.state.oldPassword
    }
    if(this.state.activeStep === 1) {
      data = this.state.newPassword
    }
    if(this.state.activeStep === 2) {
      data = this.state.newPassword2
    }
    let maxValue = data.length/10 > 1 ? 1 : data.length/10
    return (this.state.activeStep + maxValue) * 100 / this.state.maxStep
  }

  handleNext = () => {
    console.log(this.state.activeStep)
    if(this.state.oldPassword) {
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

  render() {

    const authToken = localStorage.getItem(AUTH_TOKEN)
    if(!authToken) {
      return (
        <NotAuth/>
      )
    }

    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <h4 className='mv3'>
          Change Password
        </h4>
        <div className='flex flex-column'>

          <LinearProgress variant='buffer'
            value={this.state.activeStep * 100 / this.state.maxStep }
            valueBuffer={this.calculateBuffer()}
               />

               <br/>
                 <div className='tac'>
            <TextField
              value={this.state.oldPassword}
              onChange={e => this.setState({ oldPassword: e.target.value })}
              type='password'
              label='Your actual password'
              inputRef={node => this.input0 = node}
              className={'wrapperAnimate ' + (this.state.activeStep === 0 ? 'focusField' : 'notFocusField')}
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
              value={this.state.newPassword}
              onChange={e => this.setState({ newPassword: e.target.value })}
              type='password'
              label='Choose a safe password'
              inputRef={node => this.input1 = node}
              onKeyPress={this.handleKey}
              className={'wrapperAnimate ' + (this.state.activeStep === 1 ? 'focusField' : 'notFocusField')}
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
              value={this.state.newPassword2}
              onChange={e => this.setState({ newPassword2: e.target.value })}
              type='password'
              label='Retype your safe password'
              inputRef={node => this.input2 = node}
              className={'wrapperAnimate ' + (this.state.activeStep === 2 ? 'focusField' : 'notFocusField')}
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
          <div className='flex mt3'>
            <Button variant='raised' onClick={() => this._confirm()}>
              Ok
            </Button>

          </div>
        </div>
        <SnackBarCustom ref={instance => { this.child = instance }}/>
      </Paper>
      </div>
    )
  }

  _confirm = async () => {
    if(!this.state.newPassword || !this.state.newPassword2 || !this.state.oldPassword) {
      this.setState({activeStep:0})
      this.child._openSnackBar('Password cannot be null')
      return
    }
    if(this.state.newPassword !== this.state.newPassword2) {
      this.setState({activeStep:1})
      this.child._openSnackBar('Error: Passwords are differents')
      return
    }
    let messageSnackBar
    const { oldPassword, newPassword } = this.state
    await this.props.updatePasswordMutation({
      variables: {
        oldPassword,
        newPassword
      },
    })
    .then((result) => {
      messageSnackBar = `Your password has been changed successfully!`
      this.setState({
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
        activeStep: 0
      })

    })
    .catch((e) => {
      // console.log(e)
      this.setState({activeStep:0})
      messageSnackBar = e.graphQLErrors[0].message
    })
    this.child._openSnackBar(messageSnackBar)
  }

  _saveUserData = (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token)
    localStorage.setItem('userToken', JSON.stringify(user))
  }
}



const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePasswordMutation($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`

export default compose(
  graphql(UPDATE_PASSWORD_MUTATION, { name: 'updatePasswordMutation' }),
)(ChangePassword)
