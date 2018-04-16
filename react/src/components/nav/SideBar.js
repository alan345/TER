import React, {Component} from 'react'
import ListSideBar from './ListSideBar'
import Drawer from 'material-ui/Drawer'

class SideBar extends Component {


  state = {
    isSideBarOpen: false,
    variant: 'permanent'
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

  componentDidMount() {
    let variant = this.props.isMobile() ? 'persistent' : 'permanent'
    this.setState({
      variant: variant
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({ isSideBarOpen: nextProps.isSideBarOpen })
  }



  render() {

    return (
      <div>
        <Drawer
          variant={this.state.variant}
          open={this.state.isSideBarOpen} onClose={this.toggleDrawer(false)}>
          <div tabIndex={0} role='button' onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
            <ListSideBar isMobile={this.props.isMobile}/>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default SideBar
