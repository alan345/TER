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
import CreateCar from './components/car/CreateCar'
import CreatePage from './components/post/CreatePage'
import DetailPage from './components/post/DetailPage'
import DetailCar from './components/car/DetailCar'
import UsersPage from './components/user/UsersPage'
import UserPage from './components/user/UserPage'
import ForgetPassword from './components/user/auth/ForgetPassword'
import Login from './components/user/auth/Login'
import Signup from './components/user/auth/Signup'
import ResetPassword from './components/user/auth/ResetPassword'
import 'tachyons'
import './index.css'
import Header from './components/nav/Header'
import NotFound from './components/nav/NotFound'
import SideBar from './components/nav/SideBar'
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

const isMobile = ()=> window.innerWidth<600 ? true : false


ReactDOM.render(

  <ApolloProvider client={client}>
    <Router>
      <React.Fragment>
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
        <SideBar isMobile={isMobile} ref={instance => { this.child = instance }}/>
        <div className='desktopMargin'>
          <Header isMobile={isMobile} toggleDrawerFunction={() => { this.child.toggleDrawerFunction(true) }}/>

          <div>
            <Switch>
              <Route exact path='/' component={FeedPage} />
              <Route path='/car/create' component={CreateCar} />
              <Route path='/car/:id' component={DetailCar} />
              <Route path='/drafts' component={DraftsPage} />
              <Route path='/cars' component={CarsPage} />
              <Route path='/users' component={UsersPage} />
              <Route path='/user/:id' component={UserPage} />
              <Route path='/create' component={CreatePage} />
              <Route path='/post/:id' component={DetailPage} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/forgetPassword' component={ForgetPassword} />
              <Route path='/resetPassword' component={ResetPassword} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
