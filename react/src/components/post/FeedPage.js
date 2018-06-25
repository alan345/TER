import React from 'react'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import Loading from '../nav/error/Loading'

class FeedPage extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }

  render() {
    if (this.props.feedQuery.loading) {
      return (<Loading />)
    }

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
        <h1>Feed</h1>
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
        </Paper>
        </div>
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
