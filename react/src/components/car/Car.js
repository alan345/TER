import React from 'react'
import { Link } from 'react-router-dom'


export default class Car extends React.Component {
  render() {
    let name = this.props.car.name
    // if (this.props.isDraft) {
    //   name = `${name} (Draft)`
    // }

    return (
      <Link className="no-underline ma1" to={`/car/${this.props.car.id}`}>
        <h2 className="f3 black-80 fw4 lh-solid">{name}</h2>
      </Link>
    )
  }
}
