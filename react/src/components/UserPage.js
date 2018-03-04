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

    const { user } = this.props.userQuery
    console.log(user)
    console.log(this.props.match.params.id)

    // let action = this._renderAction(user)

    return (
      <React.Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">{user.email}</h1>
        <p className="black-80 fw3">alan{user.name}</p>


        <ImageTemplate
          nameFile={user.nameFile}
        />


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
    user(id: $id) {
      id
      title
      text
      isPublished
      nameFile
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
