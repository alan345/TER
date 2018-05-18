import React from 'react'
import Chat from './Chat'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import NotAuth from '../nav/NotAuth'



class ChatsPageList extends React.Component {

  componentDidMount() {
    this.props.chatsQueryConnection.subscribeToMore({
      document: CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('componentDidMountSub')
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
      }
    })
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }
  render() {

    if (this.props.chatsQueryConnection.error) {
      return (<NotAuth/>)
    }

    if (this.props.chatsQueryConnection.loading) {
      return (<div className='flex w-100 h-100 items-center justify-center pt7'>
        <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
      </div>)
    }


    if(!this.props.query && !this.props.showWhenQueryEmpty) {
      return null
    }
    const {edges} = this.props.chatsQueryConnection.chatsConnection

    return (
      <React.Fragment>

        <div style={{  height:'170px', overflow: 'scroll' }} className='listChats' >

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
