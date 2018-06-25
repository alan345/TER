import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Paper from '@material-ui/core/Paper'
import {Link} from 'react-router-dom'

class NotAuth extends Component {
  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          Not authentificated!
          <br/>
          <br/>
          <Link to='/login'>Login</Link>
        </Paper>
      </div>
    )
  }
}

export default withRouter(NotAuth)
