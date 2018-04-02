import React from 'react'
import ReactDOM from 'react-dom'
import { AUTH_TOKEN } from './constants/constants'
import { ApolloLink } from 'apollo-client-preset'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import FeedPage from './components/FeedPage'
import DraftsPage from './components/DraftsPage'
import CarsPage from './components/CarsPage'
import CreateCar from './components/CreateCar'
import UsersPage from './components/UsersPage'
import CreatePage from './components/CreatePage'
import DetailPage from './components/DetailPage'
import UserPage from './components/UserPage'
import Login from './components/Login'
import 'tachyons'
import './index.css'
import Header from './components/Header'
import 'font-awesome/css/font-awesome.min.css';
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

// const httpLink = new HttpLink({ uri: 'http://82.223.14.38:4000' })
// const httpLink = new HttpLink({ uri: 'http://159.65.108.215:4000/' })


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


const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>

    <Router>
      <React.Fragment>
      <Header />

        <div className="fl w-100 pl4 pr4">
          <Switch>
            <Route exact path="/" component={FeedPage} />
            <Route path="/car/create" component={CreateCar} />
            <Route path="/drafts" component={DraftsPage} />
            <Route path="/cars" component={CarsPage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/user/:id" component={UserPage} />
            <Route path="/create" component={CreatePage} />
            <Route path="/post/:id" component={DetailPage} />
            <Route exact path="/login" component={Login} />

          </Switch>
        </div>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
