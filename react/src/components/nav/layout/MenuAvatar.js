import React, {Component} from 'react'
import {withRouter} from 'react-router'
import Button from '@material-ui/core/Button'
import ImageTemplate from '../ImageTemplate'
import MenuItem from '@material-ui/core/MenuItem'
import {AUTH_TOKEN} from '../../../constants/constants'
import {Manager, Target, Popper} from 'react-popper'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import MenuList from '@material-ui/core/MenuList'

class MenuAvatar extends Component {
  state = {
    anchorEl: null
  };
  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  };

  handleClose = (page) => {
    if (page === 'profile') {
      this.props.history.push('/user/' + this.props.user.id)
    }
    if (page === 'logout') {
      localStorage.removeItem(AUTH_TOKEN)
      this.props.history.replace(`/login`)
    }

    this.setState({open: false})
  };

  render() {
    const {open} = this.state
    return (<div>
      <Manager>
        <Target>
          <div ref={node => {
              this.target1 = node
            }}>
            <Button aria-owns={open
                ? 'menu-list-grow'
                : null} aria-haspopup='true' onClick={this.handleToggle}>
              <ImageTemplate format={'avatar'} nameFile={this.props.nameFile}/>
            </Button>
          </div>
        </Target>
        <Popper placement='bottom-start' eventsEnabled={open}>
          <ClickAwayListener onClickAway={this.handleClose}>
            <Grow in={open} id='menu-list-grow' style={{
                transformOrigin: '0 0 0'
              }}>
              <Paper>
                <MenuList role='menu'>

                  <MenuItem onClick={() => this.handleClose('profile')}>Profile</MenuItem>
                  <MenuItem onClick={() => this.handleClose('logout')}>Logout</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    </div>
  )
  }
}

export default withRouter(MenuAvatar)
