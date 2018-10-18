import React from 'react'
import ReactDOM from 'react-dom'
import { AUTH_TOKEN } from './constants/constants'
import { ApolloLink } from 'apollo-client-preset'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'
import './index.css'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import App from './components/nav/layout/App'
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/',
  options: {
    reconnect: true
  }
})
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLinkWithAuthToken,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

// const isMobile = ()=> window.innerWidth<600 ? true : false

ReactDOM.render(
  <ApolloProvider client={client}>
    <div>
    <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
    <App />
    </div>
  </ApolloProvider>,
  document.getElementById('root'),
)
