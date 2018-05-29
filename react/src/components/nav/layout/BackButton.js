import React, {Component} from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

class BackButton extends Component {
    render() {

    return (
      <div>

        {this.props.history.location.pathname !== '/' ? (
          <Button onClick={this.props.history.goBack}>
            <Icon>arrow_back</Icon>
          </Button>
        ) : (
          <Button onClick={() => { this.props.toggleDrawerFunction(true) }}>
            <Icon>menu</Icon>
          </Button>
        )}
      </div>
    )
  }
}

export default withRouter(BackButton)
