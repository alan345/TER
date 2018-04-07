import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {AUTH_TOKEN} from '../../constants/constants'
import {NavLink, Link} from 'react-router-dom'
import TopHello from './TopHello'
import ListSideBar from './ListSideBar'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';

class SideBar extends Component {


  state = {
    isSideBarOpen: false,
  };

  toggleDrawer = (isSideBarOpen) => () => {
    this.setState({
      isSideBarOpen: isSideBarOpen,
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ isSideBarOpen: nextProps.isSideBarOpen })
  }


  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div>

      <Drawer open={this.state.isSideBarOpen} onClose={this.toggleDrawer(false)}>
        <div tabIndex={0} role="button" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
          <ListSideBar/>
        </div>
      </Drawer>

    </div>
  )
  }
}

export default withRouter(SideBar)
