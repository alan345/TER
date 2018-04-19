import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper'
import {Link} from 'react-router-dom'

class NotFound extends Component {

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          ERREUR 404 !!
          <br/>
          <br/>
          <Link to='/'>Home</Link>
        </Paper>
      </div>
    )
  }
}

export default withRouter(NotFound)
