import React from 'react'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import DownloadCSV from './DownloadCSV'


class DraftsPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.draftsQuery.refetch()
    }
  }


  render() {

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
  query DraftsQuery($skip : Int!) {
    drafts(skip: $skip) {
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
