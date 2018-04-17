import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../SnackBarCustom'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'


class Signup extends Component {
  state = {
    email: '',
    password: '',
    name: '',
  }


  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <h4 className='mv3'>
          Sign Up
        </h4>
        <div className='flex flex-column'>

            <TextField
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type='text'
              label='Your name'
            />

          <TextField
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            label='Your email address'
          />


          <TextField
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type='password'
            label='Choose a safe password'
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
    const { name, email, password } = this.state
      await this.props.signupMutation({
        variables: {
          name,
          email,
          password,
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
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
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
