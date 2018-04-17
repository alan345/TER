import React from 'react'
import Car from './Car'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import Icon from 'material-ui/Icon'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import NotAuth from '../nav/NotAuth'

class CarsPage extends React.Component {
  state = {
    query: '',
  }



  render() {
    const {carsQueryConnection} = this.props
    if (carsQueryConnection.error) {
      return (
        <NotAuth/>
      )
    }

    if (!carsQueryConnection.carsConnection) {
      return null
    }
    const {edges, aggregate} = this.props.carsQueryConnection.carsConnection
    const {orderBy} = this.props.carsQueryConnection.variables

    if (carsQueryConnection.loading) {
      return (<div className='flex w-100 h-100 items-center justify-center pt7'>
        <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
      </div>)
    }

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
            <div className='flex justify-between items-center'>
              <h1>Cars ({edges.length}/{aggregate.count})</h1>
              <div>
                <input type='text' autoFocus='autoFocus' onFocus={function(e) {
                    var val = e.target.value
                    e.target.value = ''
                    e.target.value = val
                  }} className='w-100 pa2 mv2 br2 b--black-20 bw1' onChange={e => {
                    this.setState({query: e.target.value})
                    carsQueryConnection.refetch({
                      where: {
                        name_contains: e.target.value
                      }
                    })
                  }} placeholder='Search' value={this.state.query}/>
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
                    ? (<Icon>keyboard_arrow_down</Icon>)
                    : (<Icon>keyboard_arrow_up</Icon>)
                }
              </div>
              <Button onClick={() => this.props.history.push('/car/create')} variant='raised' color='primary'>
                + Create Car
              </Button>

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
              <Icon onClick={() => this.loadMore()}>add</Icon>
            )}

            {this.props.children}
          </Paper>
      </div>
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
            return previousResult
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

export default graphql(DRAFTS_QUERY, {
  name: 'carsQueryConnection',
  options: {
    fetchPolicy: 'network-only',
    variables: {
      orderBy: 'createdAt_ASC'
    }

  }
})(CarsPage)
