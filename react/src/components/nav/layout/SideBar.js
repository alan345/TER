import React, {Component} from 'react'
import ListSideBar from './ListSideBar'
import Drawer from '@material-ui/core/Drawer'
import {SideBarContext} from './SideBarContext'

class SideBar extends Component {
  // state = {
  //   isSideBarOpen: false,
  //   variant: 'permanent'
  // };
  //
  // toggleDrawer = (isSideBarOpen) => () => {
  //   this.setState({
  //     isSideBarOpen: isSideBarOpen,
  //   })
  // };

  // toggleDrawerFunction(isSideBarOpen) {
  //   this.setState({
  //     isSideBarOpen: isSideBarOpen,
  //   })
  // }

  // componentDidMount() {
  //   let variant = this.props.isMobile() ? 'persistent' : 'permanent'
  //   this.setState({
  //     variant: variant
  //   })
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ isSideBarOpen: nextProps.isSideBarOpen })
  }

  render() {
    return (
      <div>
        <SideBarContext.Consumer>
          {context => (
            <Drawer
              variant={context.state.variant}
              open={context.state.isSideBarOpen}
              onClose={context.toggleDrawer(false)}>
              <div
                tabIndex={0}
                role='button'
                onClick={context.toggleDrawer(false)}
                >
                <ListSideBar isMobile={context.state.isMobile}/>
              </div>
            </Drawer>
      )}
      </SideBarContext.Consumer>
      </div>
    )
  }
}

export default SideBar
