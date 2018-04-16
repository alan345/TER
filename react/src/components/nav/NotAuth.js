import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper'


class NotAuth extends Component {

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          Not authentificated
        </Paper>
      </div>
    )
  }
}

export default withRouter(NotAuth)
