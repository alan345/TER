import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../../nav/SnackBarCustom'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import NotAuth from '../../nav/NotAuth'

// const queryString = require('query-string')

class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
  }

  componentDidMount() {

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

          <TextField
            value={this.state.oldPassword}
            onChange={e => this.setState({ oldPassword: e.target.value })}
            type='password'
            label='Your actual password'
          />
          <TextField
            value={this.state.newPassword}
            onChange={e => this.setState({ newPassword: e.target.value })}
            type='password'
            label='Choose a safe password'
          />
          <TextField
            value={this.state.newPassword2}
            onChange={e => this.setState({ newPassword2: e.target.value })}
            type='password'
            label='Retype your safe password'
          />

        </div>
        <div className='flex mt3'>
          <Button variant='raised' onClick={() => this._confirm()}>
            Ok
          </Button>

        </div>
        <SnackBarCustom ref={instance => { this.child = instance }}/>
      </Paper>
      </div>
    )
  }

  _confirm = async () => {
    if(!this.state.newPassword || !this.state.newPassword2 || !this.state.oldPassword) {
      this.child._openSnackBar('Password cannot be null')
      return
    }
    if(this.state.newPassword !== this.state.newPassword2) {
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
      })

    })
    .catch((e) => {
      // console.log(e)
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
