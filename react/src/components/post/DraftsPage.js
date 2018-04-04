import React from 'react'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import DownloadCSV from './DownloadCSV'
import { AUTH_TOKEN } from '../../constants/constants'
import { Link } from 'react-router-dom'

class DraftsPage extends React.Component {
  componentWillReceiveProps(nextProps) {
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
        <div className="flex justify-between items-center">
          <h1>Drafts</h1>
        </div>

        {authToken && (
          <Link
            to="/create"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            + Create Draft
          </Link>
        ) }
        <DownloadCSV/>
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
