import React from 'react'
import Avatar from '@material-ui/core/Avatar'

export default class ImageTemplate extends React.Component {
  render() {
    var urlFile = 'http://localhost:8000/public/no-files.png'
    if(this.props.format === 'avatar') {
      urlFile = 'http://localhost:8000/public/avatar.jpg'
    }
    if(this.props.nameFile) {
      urlFile = 'http://localhost:8000/' + this.props.nameFile
    }
    return (
      <div>
        {this.props.format === 'avatar' ? (
          <div>
            <Avatar src={urlFile}/>
          </div>
        ) : (
          <div className='crop'>
            {this.props.nameFile && (
              <img src={urlFile} alt='img' />
            )}
          </div>
        )}
      </div>
    )
  }
}
