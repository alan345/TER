import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import NotAuth from '../nav/error/NotAuth'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withApollo } from 'react-apollo'
import UserPageForm from './UserPageForm'
import { AUTH_TOKEN } from '../../constants/constants'

class UserPageCreate extends React.Component {
  state = {
    user: {
      id: '',
      name: '',
      email: '',
      role: '',
      nameFile: '',
    }
  }

  updateUserData(user) {
    this.setState({user})
    // this.forceUpdate()
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    if(!authToken) {
      return (<NotAuth/>)
    }

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
            <div className='flex justify-between items-center'>
              <h1 className='f3 black-80 fw4 lh-solid'>
                { this.state.user.name}
              </h1>
            </div>

            <UserPageForm
              updateUserData={this.updateUserData.bind(this)}
              user={this.state.user}
            />

              <div>
                <Button onClick={() => this.createUser()} >
                  Save
                </Button>

                </div>

          </Paper>
        </div>
      </React.Fragment>
    )
  }

  createUser = () => {
    const { name, email, role, nameFile } = this.state.user
    this.props.createUser({
      variables: {
        data: {
          name: name,
          email: email,
          role: role,
          nameFile: nameFile,
          validateEmailToken: '',
          password: '',
          resetPasswordToken: '',
        },
      }
    })
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      role
      nameFile
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, {
    name: 'createUser',
  }),
  withRouter,
  withApollo
)(UserPageCreate)
