import React from 'react'

export default class Car extends React.Component {
  render() {
    let name = this.props.car.name

    return (
      <div className='no-underline ma1 cursor' onClick={()=>this.props.elemClicked(this.props.car)}>
        <h2 className='f3 black-80 fw4 lh-solid'>{name}</h2>
      </div>
    )
  }
}
