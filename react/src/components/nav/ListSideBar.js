import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import List from 'material-ui/List'
import Icon from 'material-ui/Icon'

  const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Icon>arrow_back</Icon>
      </ListItemIcon>
    </ListItem>

  <Link to='/' className='link'>
    <ListItem button>
      <ListItemIcon>
        <Icon>view_quilt</Icon>
      </ListItemIcon>
      <ListItemText primary='Blog' />
    </ListItem>
    </Link>
    <Link to='/drafts' className='link'>
      <ListItem button>
        <ListItemIcon>
          <Icon>mode_edit</Icon>
        </ListItemIcon>
        <ListItemText primary='Drafts' />
      </ListItem>
    </Link>
    <Link to='/cars' className='link'>
    <ListItem button>
      <ListItemIcon>
        <Icon>directions_car</Icon>
      </ListItemIcon>
      <ListItemText primary='Cars' />
    </ListItem>
    </Link>
    <Link to='/users' className='link'>
    <ListItem button>
      <ListItemIcon>
        <Icon>group</Icon>
      </ListItemIcon>
      <ListItemText primary='Users' />
    </ListItem>
    </Link>
  </div>
)


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
    return (
      <div>
        <List>{mailFolderListItems}</List>
      </div>
  )
  }
}

export default withRouter(ListSideBar)
