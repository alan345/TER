import React from 'react'


export default class Chat extends React.Component {
  render() {
    let message = this.props.chat.message
    return (
      <div className='no-underline ma1 cursor'>
        <h2 className='f3 black-80 fw4 lh-solid'>{message}</h2>
      </div>
    )
  }
}
