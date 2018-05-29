import React, {Component} from 'react'
import {withRouter} from 'react-router'
import ChatsPageList from './ChatsPageList'
import CreateChat from './CreateChat'
import Paper from '@material-ui/core/Paper'
import NotAuth from '../nav/error/NotAuth'
import { AUTH_TOKEN } from '../../constants/constants'

class ChatsPage extends Component {
  state = {
    orderBy: 'createdAt_ASC'
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if(!authToken) {
      return (<NotAuth/>)
    }
    return (
    <React.Fragment>
      <div className='paperOut'>
        <Paper className='paperIn'>
          <h1>Chat</h1>
          <ChatsPageList
            orderBy={this.state.orderBy}
          />
          <CreateChat/>
        </Paper>
      </div>
    </React.Fragment>
  )}
}

export default withRouter(ChatsPage)
