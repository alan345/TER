import React, {Component} from 'react'
import ListSideBar from './ListSideBar'
import Drawer from 'material-ui/Drawer'

class SideBar extends Component {


  state = {
    isSideBarOpen: false,
  };

  toggleDrawer = (isSideBarOpen) => () => {
    this.setState({
      isSideBarOpen: isSideBarOpen,
    })
  };

  toggleDrawerFunction(isSideBarOpen) {
    this.setState({
      isSideBarOpen: isSideBarOpen,
    })
  }



  componentWillReceiveProps(nextProps) {
    this.setState({ isSideBarOpen: nextProps.isSideBarOpen })
  }


  render() {
    return (
      <div>

      <Drawer
        open={this.state.isSideBarOpen} onClose={this.toggleDrawer(false)}>
        <div tabIndex={0} role='button' onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
          <ListSideBar/>
        </div>
      </Drawer>

    </div>
  )
  }
}

export default SideBar
