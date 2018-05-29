import React, {Component} from 'react'


class Loading extends Component {
    render() {
    return (
      <div className='flex w-100 h-100 items-center justify-center pt7'>
        <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
      </div>
    )
  }
}

export default Loading
