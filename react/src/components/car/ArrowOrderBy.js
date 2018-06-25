import React from 'react'
import Icon from '@material-ui/core/Icon'

export default class ArrowOrderBy extends React.Component {
  render() {
    const orderBy = () => {
      if(this.props.orderBy === 'name_ASC') {
        this.props.onOrderBy('name_DESC')
      } else {
        this.props.onOrderBy('name_ASC')
      }
    }
    return (
      <div onClick={orderBy}>
        {
          this.props.orderBy === 'name_ASC'
            ? (<Icon>arrow_downward</Icon>)
            : (<Icon>arrow_upward</Icon>)
        }
      </div>
    )
  }
}
