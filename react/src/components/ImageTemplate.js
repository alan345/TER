import React from 'react'

export default class ImageTemplate extends React.Component {
  render() {

    return (
      <div className='crop'>
        {this.props.nameFile ? (
          <img src={'http://localhost:8000/' + this.props.nameFile} alt='img' />
        ) : (
          <img src={'http://localhost:8000/public/no-files.png'} alt='img' />
        )}
      </div>
    )
  }
}
