import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import List from 'material-ui/List'
import Icon from 'material-ui/Icon'
import { AUTH_TOKEN } from '../../constants/constants'




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
        <List>

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

            {!authToken && (
            <Link to='/login' className='link'>
            <ListItem button>
              <ListItemIcon>
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary='Login' />
            </ListItem>
            </Link>
          )}

            {authToken && (
              <ListItem button onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.replace(`/`)
              }}>
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText primary='logout' />
              </ListItem>
            )}

          </div>
        </List>
      </div>
  )
  }
}

export default withRouter(ListSideBar)
