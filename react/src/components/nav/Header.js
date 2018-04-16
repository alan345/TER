import React, { Component } from 'react'
import { withRouter } from 'react-router'
import TopHello  from './TopHello'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import BackButton from './BackButton'
import Icon from 'material-ui/Icon'

class Header extends Component {

  render() {
    return (
      <div>

      <div className='flexGrow'>

            <AppBar position='static'>
              <Toolbar>
                <BackButton toggleDrawerFunction={() => { this.props.toggleDrawerFunction(true) }}/>
                <Button onClick={()=> {this.props.history.replace('/')}}>
                  <Icon>home</Icon>
                </Button>
                <TopHello/>

              </Toolbar>
            </AppBar>
          </div>
      </div>
    )
  }
}

export default withRouter(Header)
