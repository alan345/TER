import React, {Component} from 'react'
import {withRouter} from 'react-router'
import Button from '@material-ui/core/Button'
import ImageTemplate from '../ImageTemplate'
import MenuItem from '@material-ui/core/MenuItem'
import {AUTH_TOKEN} from '../../../constants/constants'
import Menu from '@material-ui/core/Menu'

class MenuAvatar extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = (page) => {
    this.setState({ anchorEl: null })
    if (page === 'profile') {
      this.props.history.push('/user/' + this.props.user.id)
    }
    if (page === 'logout') {
      localStorage.removeItem(AUTH_TOKEN)
      this.props.history.replace(`/login`)
    }
    this.setState({open: false})
  }

  render() {
    const { anchorEl } = this.state
       return (
         <div>
           <Button
             aria-owns={anchorEl ? 'simple-menu' : null}
             aria-haspopup="true"
             onClick={this.handleClick}>
             <ImageTemplate format={'avatar'} nameFile={this.props.nameFile} />
           </Button>
           <Menu
             id="simple-menu"
             anchorEl={anchorEl}
             open={Boolean(anchorEl)}
             onClose={this.handleClose}
           >
            <MenuItem onClick={() => this.handleClose('profile')}>Profile</MenuItem>
            <MenuItem onClick={() => this.handleClose('logout')}>Logout</MenuItem>
           </Menu>
         </div>
       )
    }
}

export default withRouter(MenuAvatar)
