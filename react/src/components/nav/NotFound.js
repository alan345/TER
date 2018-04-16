import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper'
import {Link} from 'react-router-dom'

class NotFound extends Component {

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          404 !!
          <br/>
          <br/>
          <Link to='/login'>Login</Link>
        </Paper>
      </div>
    )
  }
}

export default withRouter(NotFound)
