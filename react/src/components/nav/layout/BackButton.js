import React, {Component} from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import {SideBarContext} from './SideBarContext'

class BackButton extends Component {
  render() {
    return (
      <div>
        <SideBarContext.Consumer>
          {context => (
            <div>
            {this.props.history.location.pathname !== '/' ? (
              <Button onClick={this.props.history.goBack}>
                <Icon>arrow_back</Icon>
              </Button>
            ) : (
              <Button
                onClick={context.toggleDrawer(true)}>
                <Icon>menu</Icon>
              </Button>
            )}
          </div>
          )}
        </SideBarContext.Consumer>
      </div>
    )
  }
}

export default withRouter(BackButton)
