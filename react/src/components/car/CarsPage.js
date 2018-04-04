import React from 'react'
import Car from './Car'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link} from 'react-router-dom'


class CarsPage extends React.Component {
  state = {
    query: '',
    pagination: {
      skip: 0,
      first: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.location.key !== nextProps.location.key) {
    //   this.props.carsQueryConnection.refetch({
    //     first: 1,
    //     skip: 2
    //   })
    // }
  }

  componentDidMount() {

    // this.props.carsQueryConnection.refetch(this.state.pagination)
  }



  render() {
    if(!this.props.carsQueryConnection.carsConnection) {
      return null
    }
    console.log(this.props.carsQueryConnection.carsConnection.pageInfo)
    if (this.props.carsQueryConnection.error) {
      return (
        <div>Not authentificated</div>
      )
    }

    if (this.props.carsQueryConnection.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <React.Fragment>
        <div className="flex justify-between items-center">
          <h1>Cars</h1>
          <div>
          <input
            type="text"
            autoFocus
            onFocus={function(e) {
              var val = e.target.value;
              e.target.value = '';
              e.target.value = val;
            }}
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => {
              this.setState({ query: e.target.value })
              this.props.carsQueryConnection.refetch({
                where: {
                  name_contains: e.target.value
                }
              })
            }}
            placeholder="Search"
            value={this.state.query}
          />
          </div>

          <div onClick={()=> {
            this.props.carsQueryConnection.refetch({
              orderBy: this.props.carsQueryConnection.variables.orderBy === 'name_ASC' ? 'name_DESC' : 'name_ASC'
            })
          }}>
          {this.props.carsQueryConnection.variables.orderBy === 'name_ASC' ? (
            <i className="fa fa-arrow-down"></i>
          ) : (
            <i className="fa fa-arrow-up"></i>
          )}
          </div>

          <Link
            to="car/create"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            + Create Car
          </Link>
        </div>
        {this.props.carsQueryConnection.carsConnection.edges &&
          this.props.carsQueryConnection.carsConnection.edges.map(car => (
            <Car
              key={car.node.id}
              car={car.node}
              refresh={() => this.props.carsQueryConnection.refetch()}
              isCar={!car.node.isPublished}
            />
          ))}
        {this.props.children}
      </React.Fragment>
    )
  }
}

const DRAFTS_QUERY = gql`
  query CarsQueryConnection($orderBy: CarOrderByInput, $where: CarWhereInput, $first: Int, $skip: Int) {
    carsConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
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

    }
  }
`


export default graphql(DRAFTS_QUERY, {
  name: 'carsQueryConnection', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',

  },
})(CarsPage)
