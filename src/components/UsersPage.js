import React from 'react'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class UsersPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.usersQuery.refetch()
    }
  }

  render() {
    if (this.props.usersQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <React.Fragment>
        <div className="flex justify-between items-center">
          <h1>Users</h1>
        </div>
        {this.props.usersQuery.users &&
          this.props.usersQuery.users.map(user => (
            <div>alan</div>
          ))}
        {this.props.children}
      </React.Fragment>
    )
  }
}

const DRAFTS_QUERY = gql`
  query UsersQuery {
    users {
      id
      role
      email
      name
    }
  }
`


// id: ID!
// createdAt: DateTime!
// role: Role!
// updatedAt: DateTime!
// email: String!
// password: String!
// name: String!

export default graphql(DRAFTS_QUERY, {
  name: 'usersQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(UsersPage)
