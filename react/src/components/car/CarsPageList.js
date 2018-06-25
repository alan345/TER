import React from 'react'
import Car from './Car'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Icon from '@material-ui/core/Icon'
import NotAuth from '../nav/error/NotAuth'
import Loading from '../nav/error/Loading'

class CarsPageList extends React.Component {
  render() {
    if (this.props.carsQueryConnection.error) {
      return (<NotAuth/>)
    }

    if (this.props.carsQueryConnection.loading) {
      return (<Loading />)
    }

    const {edges, aggregate} = this.props.carsQueryConnection.carsConnection

    if(!this.props.query && !this.props.showWhenQueryEmpty) {
      return null
    }

    return (
      <React.Fragment>
        {this.props.showTitle && (
          <h1>Cars ({edges.length}/{aggregate.count})</h1>
        )}
        {edges && edges.map(car => (<Car key={car.node.id} elemClicked={this.props.elemClicked} car={car.node}/>))}

        {(edges.length !== aggregate.count && this.props.showMore) && (
          <div onClick={() => this.loadMore()} className='cursor'>
            <Icon>add</Icon>
            Load More
          </div>
          )}
        {this.props.children}
      </React.Fragment>
    )
  }

  loadMore() {
    const {carsQueryConnection} = this.props
    if (!carsQueryConnection.carsConnection.pageInfo.hasNextPage) {
      return
    }
    carsQueryConnection.fetchMore({
      variables: {
        after: carsQueryConnection.carsConnection.pageInfo.endCursor
      },

      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return {
          carsConnection: {
            __typename: 'CarConnection',
            aggregate: fetchMoreResult.carsConnection.aggregate,
            pageInfo: fetchMoreResult.carsConnection.pageInfo,
            edges: [
              ...previousResult.carsConnection.edges,
              ...fetchMoreResult.carsConnection.edges
            ]
          }
        }
      }
    })
  }
}

const DRAFTS_QUERY = gql `
  query CarsQueryConnection($after: String, $orderBy: CarOrderByInput, $where: CarWhereInput, $skip: Int) {
    carsConnection(after: $after, orderBy: $orderBy, where: $where, first: 5, skip: $skip) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
        }
      }
      aggregate {
        count
      }
    }
  }
`

export default compose(
  graphql(DRAFTS_QUERY, {
    name: 'carsQueryConnection',
    fetchPolicy: 'network-only',
    options: props => ({
      variables: {
        orderBy: props.orderBy,
        where: {
          name_contains: props.query
        }
      }
    })
  })
)(CarsPageList)
