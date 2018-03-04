import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
// import ImageTemplate from '../components/ImageTemplate'


class UserPage extends React.Component {
  state = {
    user:{
      name: '',
      email: ''
    },
  }

  componentWillReceiveProps(newProps){
    const { singleUser } = newProps.userQuery
      if(!newProps.userQuery.loading){
          this.setState({ user: singleUser })
      }
  }

  render() {
    if (this.props.userQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    // const { singleUser } = this.props.userQuery
    // this.setState({ user: singleUser })



    let action = this._renderAction(this.state.user)
    return (
      <React.Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">{this.state.user.email}</h1>
        <p className="black-80 fw3">{this.state.user.name}</p>

        <input
          autoFocus
          className="w-100 pa2 mv2 br2 b--black-20 bw1"
          onChange={e => this.setState({ user:{ ...this.state.user, name: e.target.value} })}
          placeholder="name"
          type="text"
          value={this.state.user.name}
        />


        {action}
      </React.Fragment>
    )
  }

  _renderAction = ({ id }) => {
      return (
        <React.Fragment>
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.updateUser(id)}
          >
            Publish
          </a>{' '}
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.deleteUser(id)}
          >
            Delete
          </a>
      </React.Fragment>
    )
  }

  updateUser = async id => {
    const { name, email } = this.state.user
    await this.props.updateUser({
      variables: { id, name, email },
    })
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
  mutation UpdateUserMutation($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`

const POST_QUERY = gql`
  query UserQuery($id: ID!) {
    singleUser(id: $id) {
      id
      email
      name
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
  graphql(POST_QUERY, {
    name: 'userQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
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
