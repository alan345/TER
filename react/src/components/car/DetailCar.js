import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import NotFound from '../nav/error/NotFound'
import { withApollo } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Loading from '../nav/error/Loading'

class DetailPage extends React.Component {
  render() {
    if (this.props.me.loading) {
      return (<Loading endpoint={process.env.REACT_APP_GRAPHQL_ENDPOINT}/>)
    }
    if (this.props.carQuery.loading) {
      return (<Loading endpoint={process.env.REACT_APP_GRAPHQL_ENDPOINT}/>)
    }

    const { car } = this.props.carQuery
    if(!car) {
      return (<NotFound/>)
    }
    let action = this._renderAction(car)

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
        <h1 className='f3 black-80 fw4 lh-solid'>
          {car.name}
        </h1>
        <p className='black-80 fw3'>{car.text}</p>
        {action}
        </Paper>
        </div>
      </React.Fragment>
    )
  }

  _renderAction({ id }) {
    return (
      <Button
        disabled={this.props.me.me.role !== 'ADMIN'}
        onClick={() => this.deleteCar(id)}>
          {this.props.me.me.role !== 'ADMIN' ? (
            <p>Must be an admin to delete</p>
          ) : (
            <div>
              <Icon>arrow_back</Icon>{' '}Delete
            </div>
          )}
      </Button>
    )
  }

  deleteCar = async id => {
    await this.props.deleteCar({
      variables: { where: {
        id: id
      } },
    })
    this.props.client.resetStore().then(() => {
      this.props.history.push('/cars')
    })
  }
}

const POST_QUERY = gql`
  query CarQuery($where: CarWhereUniqueInput!) {
    car(where: $where) {
      id
      name
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteCar($where: CarWhereUniqueInput!) {
    deleteCar(where: $where) {
      id
    }
  }
`

const USER_QUERY = gql`
  query Me {
    me {
      id
      role
    }
  }
`

export default compose(
  graphql(POST_QUERY, {
    name: 'carQuery',
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        where: {
          id: props.match.params.id,
        }
      },
    }),
  }),
  graphql(DELETE_MUTATION, {name: 'deleteCar'}),
  graphql(USER_QUERY, {name: 'me'}),
  withRouter,
  withApollo
)(DetailPage)
