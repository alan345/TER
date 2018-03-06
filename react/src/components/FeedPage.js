import React from 'react'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
// import FileSaver from 'file-saver';
import axios from 'axios'
// var fileDownload = require('react-file-download');

class FeedPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }
  downloadCSV() {
    // this.props.history.push('http://localhost:8000/')
     window.location = 'http://localhost:8000/'

    // return ({fetch}) => ({
    //     payload: {
    //         promise: fetch('http://localhost:8000', {
    //             credentials: 'same-origin',
    //             method: 'get',
    //             headers: {'Content-Type': 'application/json'},
    //         }).then(function(response) {
    //             // return response;
    //             console.log(response.blob())
    //         })
    //     }
    // });



    fetch('http://localhost:8000', {
      method: 'GET',

    })
    .then((response) => {
      // console.log(response)
      // fileDownload(response.data, 'filename.jpg')
    })

  //   axios.get('http://localhost:8000', {
  //     responseType: 'blob', // important
  // })
  //      .then((response) => {
  //        console.log(response)
  //        // res.type('image/jpg');
  //
  //           // fileDownload(response.data, 'report.jpg');
  //      });


  }

  render() {
    if (this.props.feedQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <React.Fragment>
        <h1>Feed</h1>
        <button onClick={() => this.downloadCSV()}>downloadCSV</button>
        {this.props.feedQuery.feed &&
          this.props.feedQuery.feed.map(post => (
            <Post
              key={post.id}
              post={post}
              refresh={() => this.props.feedQuery.refetch()}
              isDraft={!post.isPublished}
            />
          ))}
        {this.props.children}
      </React.Fragment>
    )
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
      nameFile
    }
  }
`

export default graphql(FEED_QUERY, {
  name: 'feedQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(FeedPage)
