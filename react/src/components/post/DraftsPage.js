import React from 'react'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../../constants/constants'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Loading from '../nav/error/Loading'
import NotAuth from '../nav/error/NotAuth'

class DraftsPage extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.draftsQuery.refetch()
    }
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if (this.props.draftsQuery.error) {
      return (<NotAuth/>)
    }

    if (this.props.draftsQuery.loading) {
      return (<Loading />)
    }

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
        <div className='flex justify-between items-center'>
          <h1>Drafts</h1>
          {authToken && (
            <Button onClick={() => this.props.history.replace('/create')} variant='contained' color='primary'>
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
