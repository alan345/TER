import React, {Component} from 'react'
import {withRouter} from 'react-router'
import ChatsPageList from './ChatsPageList'
import CreateChat from './CreateChat'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import Icon from '@material-ui/core/Icon'
import NotAuth from '../nav/NotAuth'
import { AUTH_TOKEN } from '../../constants/constants'

class ChatsPage extends Component {
  state = {
    query: '',
    orderBy: 'message_ASC'
  }

  elemClicked(elem) {
    this.props.history.push('/chat/' + elem.id)
  }

  render() {
    const clearQuery = () => {
      this.setState({
        query : ''
      })
    }
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
            showWhenQueryEmpty={true}
            query={this.state.query}
            showTitle={true}
            showMore={true}
            elemClicked={this.elemClicked.bind(this)}
            orderBy={this.state.orderBy}/>
          <CreateChat/>
        </Paper>
      </div>
    </React.Fragment>
  )
  }
}

export default withRouter(ChatsPage)
