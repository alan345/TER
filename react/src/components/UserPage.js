import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import ImageTemplate from '../components/ImageTemplate'


class UserPage extends React.Component {
  render() {
    if (this.props.userQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { getUser } = this.props.userQuery
    console.log(this.props.userQuery)
    console.log(getUser)
    // console.log(this.props.match.params.id)

    // let action = this._renderAction(user)
    return (
      <React.Fragment>
      alan
        <h1 className="f3 black-80 fw4 lh-solid">{getUser.email}</h1>
        <p className="black-80 fw3">alan{getUser.name}</p>


      </React.Fragment>
    )
  }

  // _renderAction = ({ id }) => {
  //
  //     return (
  //       <React.Fragment>
  //         <a
  //           className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
  //           onClick={() => this.publishDraft(id)}
  //         >
  //           Publish
  //         </a>{' '}
  //         <a
  //           className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
  //           onClick={() => this.deleteUser(id)}
  //         >
  //           Delete
  //         </a>
  //
  //
  //
  //     <a
  //       className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
  //       onClick={() => this.deleteUser(id)}
  //     >
  //       Delete
  //     </a>
  //     </React.Fragment>
  //   )
  //
  // }

  deleteUser = async id => {
    await this.props.deleteUser({
      variables: { id },
    })
    this.props.history.replace('/')
  }

}

const POST_QUERY = gql`
  query UserQuery($id: ID!) {
    getUser(id: $id) {
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
  graphql(DELETE_MUTATION, {
    name: 'deleteUser',
  }),
  withRouter,
)(UserPage)
