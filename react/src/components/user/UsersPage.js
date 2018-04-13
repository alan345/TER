import React from 'react'
// import Post from '../components/Post'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import Paper from 'material-ui/Paper'

class UsersPage extends React.Component {
  render() {
    if (this.props.usersQuery.error) {
      return (<div>Not authentificated</div>)
    }

    if (this.props.usersQuery.loading) {
      return (<div className='flex w-100 h-100 items-center justify-center pt7'>
        <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
      </div>)
    }

    return (
    <React.Fragment>
      <div className='paperOut'>
        <Paper className='paperIn'>
            <div className='flex justify-between items-center'>
              <h1>Users</h1>
            </div>
            {
              this.props.usersQuery.users && this.props.usersQuery.users.map((user, i) => (<div key={i}>
                <Link to={'user/' + user.id}>
                  <h3>
                    {user.name}
                  </h3>
                </Link>
                Email: {user.email}
                <br/>
                Role: {user.role}
              </div>))
            }
            {this.props.children}
        </Paper>
      </div>
    </React.Fragment>)
  }
}

const DRAFTS_QUERY = gql `
  query UsersQuery {
    users {
      id
      role
      email
      name
    }
  }
`

export default graphql(DRAFTS_QUERY, {
  name: 'usersQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only'
  }
})(UsersPage)
