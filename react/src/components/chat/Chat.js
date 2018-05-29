import React from 'react'
import ImageTemplate from '../nav/ImageTemplate'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Tooltip from '@material-ui/core/Tooltip'

var parse = require('date-fns/parse')
var format = require('date-fns/format')

export default class Chat extends React.Component {

  render() {
    console.log(this.props.chat)
    return (
      <div>
        <Card>
          <CardHeader
            avatar={
              <div>
                {this.props.chat.author && (
                  <Tooltip title={this.props.chat.author.name}>
                    <div>
                      <ImageTemplate format={'avatar'} nameFile={this.props.chat.author.nameFile}/>
                    </div>
                  </Tooltip>
                )}
              </div>
            }
            title={<b>{this.props.chat.message}</b>}
            subheader={format(parse(this.props.chat.createdAt), 'MM/DD/YYYY hh:mma')}
          />
        </Card>
      </div>
    )
  }
}
