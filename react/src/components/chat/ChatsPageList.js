import React from 'react'
import Chat from './Chat'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Icon from '@material-ui/core/Icon'
import NotAuth from '../nav/NotAuth'

class ChatsPageList extends React.Component {
  state = {
    chats : []
  }
  componentDidMount(data) {

    // this.props.chatsQueryConnection.refetch()
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    if(nextProps) {
      console.log(nextProps.chatSubscription.chat.node)
      this.setState({
        chats: [...this.state.chats, nextProps.chatSubscription.chat.node]
      })
    }
  }

  render() {


    // if (this.props.chatsQueryConnection.error) {
    //   return (<NotAuth/>)
    // }

    // if (this.props.chatSubscription.loading) {
    //   return (<div className='flex w-100 h-100 items-center justify-center pt7'>
    //     <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
    //   </div>)
    // }
    // const {edges, aggregate} = this.props.chatsQueryConnection.chatsConnection


    if(!this.props.query && !this.props.showWhenQueryEmpty) {
      return null
    }

    console.log(this.state.chats)
    return (
      <React.Fragment>


          
          {this.state.chats && this.state.chats.map(chat => (
            <Chat key={chat.id} chat={chat}/>
          ))}


    </React.Fragment>
  )
  }

  loadMore() {
    const {chatsQueryConnection} = this.props
    if (!chatsQueryConnection.chatsConnection.pageInfo.hasNextPage) {
      return
    }
    chatsQueryConnection.fetchMore({
      variables: {
        after: chatsQueryConnection.chatsConnection.pageInfo.endCursor
      },

      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return {
          chatsConnection: {
            __typename: 'ChatConnection',
            aggregate: fetchMoreResult.chatsConnection.aggregate,
            pageInfo: fetchMoreResult.chatsConnection.pageInfo,
            edges: [
              ...previousResult.chatsConnection.edges,
              ...fetchMoreResult.chatsConnection.edges
            ]
          }
        }
      }
    })
  }

}

const DRAFTS_QUERY = gql `
  query ChatsQueryConnection($after: String, $orderBy: ChatOrderByInput, $where: ChatWhereInput, $skip: Int) {
    chatsConnection(after: $after, orderBy: $orderBy, where: $where, first: 5, skip: $skip) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          message
        }
      }
      aggregate {
        count
      }
    }
  }
`

const CHAT_SUBSCRIPTION = gql `
subscription {
  chat(where:{mutation_in: CREATED}) {
    node {
      id
      message
    }
  }
}
`



export default compose(
  graphql(CHAT_SUBSCRIPTION, {
    name: 'chatSubscription',
    fetchPolicy: 'network-only',
    options: props => ({
      variables: {
        orderBy: props.orderBy,
        // where: {
        //   message_contains: props.query
        // }
      }
    })
  })
)(ChatsPageList)
