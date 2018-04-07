import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {AUTH_TOKEN} from '../../constants/constants'
import {NavLink, Link} from 'react-router-dom'
import TopHello from './TopHello'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import List from 'material-ui/List';

  const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);


class ListSideBar extends Component {

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
        <List>{mailFolderListItems}</List>
      </div>
  )
  }
}

export default withRouter(ListSideBar)
