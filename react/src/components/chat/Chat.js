import React from 'react'
import ImageTemplate from '../nav/ImageTemplate'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

var parse = require('date-fns/parse')
var format = require('date-fns/format')

export default class Chat extends React.Component {

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            avatar={
              <ImageTemplate format={'avatar'} nameFile={this.props.chat.author.nameFile}/>
            }
            title={<b>{this.props.chat.message}</b>}
            subheader={format(parse(this.props.chat.createdAt), 'MM/DD/YYYY hh:mma')}
          />
        </Card>
      </div>
    )
  }
}
