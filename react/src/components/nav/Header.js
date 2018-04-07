import React, { Component } from 'react'
import { withRouter } from 'react-router'
import TopHello  from './TopHello'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import SideBar from './SideBar'
import Icon from 'material-ui/Icon'

class Header extends Component {

  // state = {
  //   isSideBarOpen: false,
  // };
//
// toggleDrawer = (isSideBarOpen) => () => {
//   this.setState({
//     isSideBarOpen: isSideBarOpen,
//   });
// };



  render() {
    return (
      <div>
      <SideBar ref={instance => { this.child = instance; }}/>
      <div className="flexGrow">

            <AppBar position="static">
              <Toolbar>
                {this.props.history.location.pathname !== '/' ? (
                  <Button onClick={this.props.history.goBack}>
                    <Icon>arrow_back</Icon>
                  </Button>
                ) : (
                  <Button onClick={() => { this.child.toggleDrawerFunction(true); }}>
                    <Icon>menu</Icon>
                  </Button>
                )}
                <Button onClick={()=> {this.props.history.replace('/')}}>
                  <Icon>home</Icon>
                </Button>
                <TopHello/>

              </Toolbar>
            </AppBar>
          </div>
      </div>
    )
  }
}

export default withRouter(Header)
