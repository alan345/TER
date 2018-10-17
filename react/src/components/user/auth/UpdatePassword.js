import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import NotAuth from '../../nav/error/NotAuth'
import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import Icon from '@material-ui/core/Icon'
import LinearProgress from '@material-ui/core/LinearProgress'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

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

  showPassword(fieldNum) {
    if(fieldNum === 0) this.setState({showPassword0: !this.state.showPassword0})
    if(fieldNum === 1) this.setState({showPassword1: !this.state.showPassword1})
    if(fieldNum === 2) this.setState({showPassword2: !this.state.showPassword2})
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
                   <FormControl className={'wrapperAnimate ' + (this.state.activeStep === 0 ? 'focusField' : 'notFocusField')}>
                     <InputLabel htmlFor='oldPassword'>Your actual password</InputLabel>
            <Input
              id='oldPassword'
              value={this.state.oldPassword}
              onChange={e => this.setState({ oldPassword: e.target.value })}
              type={this.state.showPassword0 ? 'text' : 'password'}
              inputRef={node => this.input0 = node}
              className={'wrapperAnimate ' + (this.state.activeStep === 0 ? 'focusField' : 'notFocusField')}
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
              startAdornment={
                <InputAdornment position='start'>
                  {this.state.activeStep === 0 && (
                    <IconButton onClick={()=>this.showPassword(0)}>
                      <Icon>{this.state.showPassword0 ? 'visibility_off' : 'visibility'}</Icon>
                    </IconButton>
                  )}
                </InputAdornment>
              }
            />
            </FormControl>
            <br/><br/>
            {this.state.activeStep >= 1 && (
              <FormControl className={'wrapperAnimate ' + (this.state.activeStep === 1 ? 'focusField' : 'notFocusField')}>
                <InputLabel htmlFor='newPassword'>Choose a safe password</InputLabel>
            <Input
              id='newPassword'
              value={this.state.newPassword}
              onChange={e => this.setState({ newPassword: e.target.value })}
              type={this.state.showPassword1 ? 'text' : 'password'}
              inputRef={node => this.input1 = node}
              onKeyPress={this.handleKey}
              startAdornment={
                <InputAdornment position='start'>
                  {this.state.activeStep === 1 && (
                    <IconButton onClick={()=>this.showPassword(1)}>
                      <Icon>{this.state.showPassword0 ? 'visibility_off' : 'visibility'}</Icon>
                    </IconButton>
                  )}
                </InputAdornment>
              }
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
              <FormControl className={'wrapperAnimate ' + (this.state.activeStep === 2 ? 'focusField' : 'notFocusField')}>
                <InputLabel htmlFor='newPassword2'>Choose a safe password</InputLabel>
            <Input
              id='newPassword2'
              value={this.state.newPassword2}
              onChange={e => this.setState({ newPassword2: e.target.value })}
              type={this.state.showPassword2 ? 'text' : 'password'}
              label='Retype your safe password'
              inputRef={node => this.input2 = node}
              onKeyPress={this.handleKey}
              startAdornment={
                <InputAdornment position='start'>
                  {this.state.activeStep === 2 && (
                    <IconButton onClick={()=>this.showPassword(2)}>
                      <Icon>{this.state.showPassword0 ? 'visibility_off' : 'visibility'}</Icon>
                    </IconButton>
                  )}
                </InputAdornment>
              }
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
          </FormControl>
            )}

          </div>
          <div>
            <Button variant='contained' onClick={() => this._confirm()}>
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
    .then(() => {
      messageSnackBar = `Your password has been changed successfully!`
      this.setState({
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
        activeStep: 0
      })
    })
    .catch((e) => {
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
