import React from 'react'
import Chat from './Chat'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import NotAuth from '../nav/error/NotAuth'
import Loading from '../nav/error/Loading'

class ChatsPageList extends React.Component {
  componentDidMount() {
    this.props.chatsQueryConnection.subscribeToMore({
      document: CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev
        }
        return Object.assign({}, prev, {
          chatsConnection: {
            __typename: 'ChatConnection',
            edges: [
              ...prev.chatsConnection.edges,
              subscriptionData.data.chat
            ]
          }
        })
      },
    })
  }

  componentDidUpdate() {
    if(this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }
  }

  render() {
    if (this.props.chatsQueryConnection.error) {
      return (<NotAuth/>)
    }

    if (this.props.chatsQueryConnection.loading) {
      return (<Loading />)
    }

    const {edges} = this.props.chatsQueryConnection.chatsConnection

    return (
      <React.Fragment>
        <div style={{  height:'350px', overflow: 'scroll' }} className='listChats' >
          {edges && edges.map(chat => (
            <Chat key={chat.node.id} chat={chat.node}/>
          ))}
          <div ref={(el) => { this.messagesEnd = el }}></div>
        </div>
      </React.Fragment>
  )}
}

const CHATS_QUERY = gql `
  query ChatsQueryConnection($after: String, $orderBy: ChatOrderByInput, $where: ChatWhereInput, $skip: Int) {
    chatsConnection(after: $after, orderBy: $orderBy, where: $where, last: 5, skip: $skip) {
      edges {
        node {
          id
          message
          createdAt
          author {
            id
            name
            nameFile
          }
        }
      }
    }
  }
`

const CHAT_SUBSCRIPTION = gql `
  subscription {
    chat(where:{mutation_in: [CREATED]}) {
      node {
        id
        message
        createdAt
        author {
          id
          name
          nameFile
        }
      }
    }
  }
`

export default compose(
  graphql(CHATS_QUERY, {
    name: 'chatsQueryConnection',
    fetchPolicy: 'network-only',
    options: props => ({
      variables: {
        orderBy: props.orderBy,
      }
    })
  })
)(ChatsPageList)
