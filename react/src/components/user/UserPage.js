import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import Post from '../../components/post/Post'
import NotAuth from '../nav/NotAuth'
import { AUTH_TOKEN } from '../../constants/constants'
import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/Menu'
import NotFound from '../nav/NotFound'
import Tooltip from '@material-ui/core/Tooltip'
import UploadFile from '../nav/UploadFile'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'


class UserPage extends React.Component {
  state = {
    isEditMode: false,
    user: {
      id: '',
      name: '',
      email: '',
      role: '',
      nameFile: '',
    }
  }
  isUserMyself = () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    return userToken.id === this.state.user.id
  }
  componentWillMount() {
    this.setState({ user: this.props.userQuery.user })
  }

  componentWillReceiveProps(newProps){
    const { user } = newProps.userQuery
    if(!newProps.userQuery.loading){
      this.setState({ user: user })
    }
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

    const authToken = localStorage.getItem(AUTH_TOKEN)

    if (this.props.userQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    let action = this._renderAction(this.state.user)
    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
            <div className='flex justify-between items-center'>
              <h1 className='f3 black-80 fw4 lh-solid'>
                {this.state.user.name}{' '}
                <Icon onClick={e => this.setState({ isEditMode:!this.state.isEditMode })}>border_color</Icon>
              </h1>
              {this.isUserMyself() && (
                <Tooltip title='Change your password'>
                <Icon onClick={() => this.props.history.push('/updatePassword')}>security</Icon>
                </Tooltip>
              )}
            </div>

            {this.state.isEditMode && (
              <input
              autoFocus
              className='w-100 pa2 mv2 br2 b--black-20 bw1'
              onChange={e => this.setState({ user:{ ...this.state.user, name: e.target.value} })}
              placeholder='name'
              type='text'
              value={this.state.user.name}
              />
            )}

            <p className='black-80 fw3'>Email: {this.state.user.email}</p>
            {!this.state.isEditMode && (
              <p className='black-80 fw3'>Role: {this.state.user.role}</p>
            )}
            {this.state.isEditMode && (
              <FormControl>
                <InputLabel htmlFor='role'>Age</InputLabel>
                <Select
                  value={this.state.user.role}
                  onChange={e => this.setState({ user:{ ...this.state.user, role: e.target.value} })}
                  inputProps={{
                    name: 'role',
                    id: 'role',
                  }}
                  >
                  <MenuItem value='CUSTOMER'>CUSTOMER</MenuItem>
                  <MenuItem value='ADMIN'>ADMIN</MenuItem>
                </Select>
              </FormControl>
            )}
            <UploadFile
              isEditMode={this.state.isEditMode}
              nameFile={this.state.user.nameFile}
              onSelectFile={nameFile =>  this.setState({ user:{ ...this.state.user, nameFile: nameFile} })}
              />
            <br/>
            <br/>
            {action}
            <br/>
            <br/>
            <br/>
            <br/>
            {authToken && (
              <div className='f6 ba ph3 pv2 mb2 black'>
                <h1>Posts from {this.state.user.name}</h1>
                {this.state.user.posts &&
                  this.state.user.posts.map(post => (
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

  _renderAction = ({ id }) => {
      return (
        <React.Fragment>
        {this.state.isEditMode && (
        <div>
          <a
            className='f6 dim br1 ba ph3 pv2 mb2 dib black pointer'
            onClick={() => this.updateUser(id)}
          >
            Save
          </a>{' '}
          <a
            className='f6 dim br1 ba ph3 pv2 mb2 dib black pointer'
            onClick={() => this.deleteUser(id)}
          >
            Delete
          </a>
          </div>
        )}
      </React.Fragment>
    )
  }

  updateUser = async id => {
    const { name, email, role, nameFile } = this.state.user
    await this.props.updateUser({
      variables: {
        where: {id: id},
        data: {name: name, email: email, role: role, nameFile: nameFile },
      }
    })
    // await this.props.updateUser({
    //   variables: { id, name, email, role },
    // })
    this.setState({isEditMode: false})
    // this.props.history.replace('/users')
  }



  deleteUser = async id => {
    await this.props.deleteUser({
      variables: { id },
    })
    this.props.history.replace('/users')
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
)(UserPage)
