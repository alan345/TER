import React, {Component} from 'react'
import ListSideBar from './ListSideBar'
import Drawer from '@material-ui/core/Drawer'
import {SideBarContext} from './SideBarContext'

class SideBar extends Component {
  render() {
    return (
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
    )
  }
}

export default SideBar
