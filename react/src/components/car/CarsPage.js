import React from 'react'
import Car from './Car'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'



class CarsPage extends React.Component {
  state = {
    query: '',
  }


  render() {
    const {carsQueryConnection} = this.props
    if (carsQueryConnection.error) {
      return (
        <div>Not authentificated</div>
      )
    }

    if (!carsQueryConnection.carsConnection) {
      return null
    }
    const {edges, aggregate} = this.props.carsQueryConnection.carsConnection
    const {orderBy} = this.props.carsQueryConnection.variables


    if (carsQueryConnection.loading) {
      return (<div className="flex w-100 h-100 items-center justify-center pt7">
        <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
      </div>)
    }

    return (
      <React.Fragment>
      <div className="flex justify-between items-center">
        <h1>Cars ({edges.length}/{aggregate.count})</h1>
        <div>
          <input type="text" autoFocus="autoFocus" onFocus={function(e) {
              var val = e.target.value;
              e.target.value = '';
              e.target.value = val;
            }} className="w-100 pa2 mv2 br2 b--black-20 bw1" onChange={e => {
              this.setState({query: e.target.value})
              carsQueryConnection.refetch({
                where: {
                  name_contains: e.target.value
                }
              })
            }} placeholder="Search" value={this.state.query}/>
        </div>

        <div onClick={() => {
            carsQueryConnection.refetch({
              orderBy: orderBy === 'name_ASC'
                ? 'name_DESC'
                : 'name_ASC'
            })
          }}>
          {
            orderBy === 'name_ASC'
              ? (<i className="fa fa-arrow-down"></i>)
              : (<i className="fa fa-arrow-up"></i>)
          }
        </div>

        <Link to="car/create" className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black">
          + Create Car
        </Link>
      </div>
      {edges && edges.map(car =>
          (
            <Car
              key={car.node.id}
              car={car.node}
              refresh={() => carsQueryConnection.refetch()}
              isCar={!car.node.isPublished}/>
            ))
          }

      {(edges.length !== aggregate.count) && (
        <i className="fa fa-plus" onClick={() => this.loadMore()}></i>
      )}

      {this.props.children}
    </React.Fragment>)
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
            return previousResult;
          }
          return {
            carsConnection: {
              __typename: 'CarConnection',
              aggregate : fetchMoreResult.carsConnection.aggregate,
              pageInfo: fetchMoreResult.carsConnection.pageInfo,
              edges: [
                ...previousResult.carsConnection.edges,
                ...fetchMoreResult.carsConnection.edges
              ]
            }
          };
        }
      })
    }

}

const DRAFTS_QUERY = gql `
  query CarsQueryConnection($after: String, $orderBy: CarOrderByInput, $where: CarWhereInput, $skip: Int) {
    carsConnection(after: $after, orderBy: $orderBy, where: $where, first: 2, skip: $skip) {
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

export default graphql(DRAFTS_QUERY, {
  name: 'carsQueryConnection',
  options: {
    fetchPolicy: 'network-only',
    variables: {
      orderBy: 'createdAt_ASC'
    }

  }
})(CarsPage)
