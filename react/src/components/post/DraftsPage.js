import React from 'react'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../../constants/constants'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'


class DraftsPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.location)
    if (this.props.location.key !== nextProps.location.key) {
      this.props.draftsQuery.refetch()
    }
  }


  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if (this.props.draftsQuery.error) {
      return (
        <div>Not authentificated</div>
      )
    }

    if (this.props.draftsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
        <div className='flex justify-between items-center'>
          <h1>Drafts</h1>


          {authToken && (
            <Button onClick={() => this.props.history.replace('/create')} variant='raised' color='primary'>
              + Create Draft
            </Button>
          ) }
        </div>
        {this.props.draftsQuery.drafts &&
          this.props.draftsQuery.drafts.map(draft => (
            <Post
              key={draft.id}
              post={draft}
              refresh={() => this.props.draftsQuery.refetch()}
              isDraft={!draft.isPublished}
            />
          ))}
        {this.props.children}
        </Paper>
      </div>
      </React.Fragment>
    )
  }
}

const DRAFTS_QUERY = gql`
  query DraftsQuery {
    drafts {
      id
      text
      title
      isPublished
      nameFile
    }
  }
`


export default graphql(DRAFTS_QUERY, {
  name: 'draftsQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
    variables: {
      skip: 3
    }

  },
})(DraftsPage)
