import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SnackBarCustom from '../SnackBarCustom'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

class Signup extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    messageSnackBar: '',
    openSnackBar: false,
  }


  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <h4 className='mv3'>
          Sign Up
        </h4>
        <div className='flex flex-column'>

            <input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type='text'
              placeholder='Your name'
            />

          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            placeholder='Your email address'
          />


          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flex mt3'>
          <Button variant='raised' onClick={() => this._confirm()}>
            Ok
          </Button>

        </div>
        <SnackBarCustom
          openSnackBar={this.state.openSnackBar}
          messageSnackBar={this.state.messageSnackBar}/>
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
        let messageSnackBar = e.graphQLErrors[0].message
        this.setState({
          messageSnackBar: messageSnackBar,
          openSnackBar: true,
        })
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
        id
      }
    }
  }
`


export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),

)(Signup)
