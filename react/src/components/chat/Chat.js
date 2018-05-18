import React from 'react'
import ImageTemplate from '../nav/ImageTemplate'
var parse = require('date-fns/parse')
var format = require('date-fns/format')

export default class Chat extends React.Component {
  render() {
    return (
      <div className='containerFlex'>
        <div >
          <ImageTemplate format={'avatar'} nameFile={this.props.chat.author.nameFile}/>
        </div>
        <div>
          <span>{format(parse(this.props.chat.createdAt), 'MM/DD/YYYY hh:mma')}</span>
          <h2 className='f3 black-80 fw4 lh-solid'>{this.props.chat.message}</h2>
        </div>
      </div>
    )
  }
}
