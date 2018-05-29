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
import FeedPage from './components/post/FeedPage'
import DraftsPage from './components/post/DraftsPage'
import CarsPage from './components/car/CarsPage'
import ChatsPage from './components/chat/ChatsPage'
import CreateCar from './components/car/CreateCar'
import CreatePage from './components/post/CreatePage'
import DetailPage from './components/post/DetailPage'
import DetailCar from './components/car/DetailCar'
import UsersPage from './components/user/UsersPage'
import UserPage from './components/user/UserPage'
import Api from './components/api/Api'
import ForgetPassword from './components/user/auth/ForgetPassword'
import Login from './components/user/auth/Login'
import Signup from './components/user/auth/Signup'
import ResetPassword from './components/user/auth/ResetPassword'
import UpdatePassword from './components/user/auth/UpdatePassword'
import ValidateEmail from './components/user/auth/ValidateEmail'

import 'tachyons'
import './index.css'
import EmailValidated from './components/nav/EmailValidated'
import Header from './components/nav/layout/Header'
import NotFound from './components/nav/error/NotFound'
import SideBar from './components/nav/layout/SideBar'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/',
  options: {
    reconnect: true
  }
})
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
// const httpLink = new HttpLink({ uri: 'https://eu1.prisma.sh/alan-223747/demo/dev' })
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


const link = split(
  // split based on operation type
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

const isMobile = ()=> window.innerWidth<600 ? true : false


ReactDOM.render(

  <ApolloProvider client={client}>
    <Router>
      <React.Fragment>
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
        <SideBar isMobile={isMobile} ref={instance => { this.child = instance }}/>
        <div className='desktopMargin'>
          <Header isMobile={isMobile} toggleDrawerFunction={() => { this.child.toggleDrawerFunction(true) }}/>
          <EmailValidated/>
          <div>
            <Switch>
              <Route exact path='/' component={FeedPage} />
              <Route path='/car/create' component={CreateCar} />
              <Route path='/car/:id' component={DetailCar} />
              <Route path='/drafts' component={DraftsPage} />
              <Route path='/cars' component={CarsPage} />
              <Route path='/chats' component={ChatsPage} />
              <Route path='/users' component={UsersPage} />
              <Route path='/api' component={Api} />
              <Route path='/user/:id' component={UserPage} />
              <Route path='/create' component={CreatePage} />
              <Route path='/post/:id' component={DetailPage} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/forgetPassword' component={ForgetPassword} />
              <Route path='/resetPassword' component={ResetPassword} />
              <Route path='/updatePassword' component={UpdatePassword} />
              <Route path='/validateEmail' component={ValidateEmail} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
