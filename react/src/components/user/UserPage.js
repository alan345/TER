import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import Post from '../../components/post/Post'
import NotAuth from '../nav/error/NotAuth'
import { AUTH_TOKEN } from '../../constants/constants'
import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import NotFound from '../nav/error/NotFound'
import Tooltip from '@material-ui/core/Tooltip'
import UploadFile from '../nav/UploadFile'
import { withApollo } from 'react-apollo'
import Loading from '../nav/error/Loading'
import UserPageForm from './UserPageForm'

class UserPage extends React.Component {
  state = {
    open: false,
    isEditMode: false,
  }

  isUserMyself = () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    return userToken.id === this.props.userQuery.user.id
  }

  updateUserData(user) {
    this.props.userQuery.user = user
    this.forceUpdate()
  }

  render() {
    if (this.props.userQuery.error) {
      return (
        <NotAuth/>
      )
    }

    const { user } = this.props.userQuery
    if(!user) {
      return (
        <NotFound/>
      )
    }

    if (this.props.userQuery.loading) {
      return (<Loading />)
    }

    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
            <div className='flex justify-between items-center'>
              <h1 className='f3 black-80 fw4 lh-solid'>
                { this.props.userQuery.user.name}{' '}
                <Icon onClick={ () => this.setState({ isEditMode:!this.state.isEditMode })}>border_color</Icon>
              </h1>
              {this.isUserMyself() && (
                <Tooltip title='Change your password'>
                <Icon onClick={() => this.props.history.push('/updatePassword')}>security</Icon>
                </Tooltip>
              )}
            </div>

            {this.state.isEditMode && (
              <UserPageForm
                updateUserData={this.updateUserData.bind(this)}
                user={this.props.userQuery.user}
              />
            )}

            {!this.state.isEditMode && (
            <div>
              <p className='black-80 fw3'>Role: {this.props.userQuery.user.role}</p>
              <UploadFile
                isEditMode={false}
                nameFile={this.props.userQuery.user.nameFile}
                />
            </div>
            )}
              <div>
              {this.state.isEditMode && (
              <div>
                <Button onClick={() => this.updateUser(this.props.userQuery.user.id)}>
                  Save
                </Button>
                {' '}
                {!this.isUserMyself() && (
                  <Button onClick={() => this.deleteUser(this.state.user.id)}>
                    Delete
                  </Button>
                )}
                </div>
              )}
            </div>
            {authToken && (
              <div className='f6 ba ph3 pv2 mb2 black'>
                <h1>Posts from {this.props.userQuery.user.name}</h1>
                {this.props.userQuery.user.posts &&
                  this.props.userQuery.user.posts.map(post => (
                    <Post
                      key={post.id}
                      post={post}
                    />
                  ))}
              </div>
            )}
            {this.props.children}
          </Paper>
        </div>
      </React.Fragment>
    )
  }

  updateUser = async id => {
    const { name, email, role, nameFile } = this.props.userQuery.user
    await this.props.updateUser({
      variables: {
        where: {id: id},
        data: {name: name, email: email, role: role, nameFile: nameFile },
      }
    })
    this.setState({isEditMode: false})
  }

  deleteUser = async id => {
    await this.props.deleteUser({
      variables: { id },
    })
    this.props.client.resetStore().then( () => {
      this.props.history.push('/users')
    })
  }
}

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      name
      email
      role
      nameFile
    }
  }
`

const USER_QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      role
      name
      nameFile
      posts {
        id
        title
        text
        nameFile
      }
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(USER_QUERY, {
    name: 'userQuery',
    options: props => ({
      variables: {
          where: {
            id: props.match.params.id,
          }
        },
    }),
  }),
  graphql(UPDATE_USER_MUTATION, {
    name: 'updateUser',
  }),
  graphql(DELETE_MUTATION, {
    name: 'deleteUser',
  }),
  withRouter,
  withApollo
)(UserPage)
