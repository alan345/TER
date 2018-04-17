import React, { Component } from 'react'
import { withRouter } from 'react-router'
import CarsPageList from './CarsPageList'



class CarsPage extends Component {
  // state = {
  //   carsQueryConnection:''
  // }


  render() {
    console.log(this.carsQueryConnection)
    return (
      <div>
        <CarsPageList/>
      </div>
    )
  }
}

export default withRouter(CarsPage)
