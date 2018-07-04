import React, { Component } from 'react'
import { withRouter } from 'react-router'
import TopHello  from './TopHello'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import BackButton from './BackButton'
import Icon from '@material-ui/core/Icon'

class Header extends Component {
  render() {
    return (
      <div className='flexGrow'>
        <AppBar position='static'>
          <Toolbar>
            <BackButton />
            <div className='flex'></div>
            <Button onClick={()=> {this.props.history.push('/')}} >
              <Icon>home</Icon>
            </Button>
            <div className='flex'></div>
            <TopHello/>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(Header)
