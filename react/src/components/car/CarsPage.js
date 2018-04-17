import React, { Component } from 'react'
import { withRouter } from 'react-router'
import CarsPageList from './CarsPageList'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

class CarsPage extends Component {
  // state = {
  //   carsQueryConnection:''
  // }


  render() {
    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
        <Button onClick={() => this.props.history.push('/car/create')} variant='raised' color='primary'>
          + Create Car
        </Button>
        <CarsPageList/>
        </Paper>
    </div>
  </React.Fragment>
    )
  }
}

export default withRouter(CarsPage)
