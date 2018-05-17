import React from 'react'
import ImageTemplate from '../nav/ImageTemplate'

export default class Chat extends React.Component {
  render() {
    return (
      <div className='containerFlex'>
        <div >
          <ImageTemplate format={'avatar'} nameFile={this.props.chat.author.nameFile}/>
        </div>
        <div>
          <h2 className='f3 black-80 fw4 lh-solid'>{this.props.chat.message}</h2>
        </div>
      </div>
    )
  }
}
