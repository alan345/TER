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
    //   this.props.carsQuery.refetch({
    //     first: 1,
    //     skip: 2
    //   })
    // }
  }

  componentDidMount() {
    // this.props.carsQuery.refetch(this.state.pagination)
  }



  render() {

    if (this.props.carsQuery.error) {
      return (
        <div>Not authentificated</div>
      )
    }

    if (this.props.carsQuery.loading) {
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
              this.props.carsQuery.refetch({
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
            this.props.carsQuery.refetch({
              first: 1,
              skip: 3,
              orderBy: this.props.carsQuery.variables.orderBy === 'name_ASC' ? 'name_DESC' : 'name_ASC'
            })
          }}>
          {this.props.carsQuery.variables.orderBy === 'name_ASC' ? (
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
        {this.props.carsQuery.cars &&
          this.props.carsQuery.cars.map(car => (
            <Car
              key={car.id}
              car={car}
              refresh={() => this.props.carsQuery.refetch()}
              isCar={!car.isPublished}
            />
          ))}
        {this.props.children}
      </React.Fragment>
    )
  }
}

const DRAFTS_QUERY = gql`
  query CarsQuery($orderBy: CarOrderByInput, $where: CarWhereInput, $first: Int, $skip: Int) {
    cars(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      id
      name
    }
  }
`


export default graphql(DRAFTS_QUERY, {
  name: 'carsQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',

  },
})(CarsPage)
