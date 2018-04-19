import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import Paper from 'material-ui/Paper'


class DetailPage extends React.Component {
  render() {
    if (this.props.carQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { car } = this.props.carQuery
    // console.log(car)
    let action = this._renderAction(car)

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
        <h1 className="f3 black-80 fw4 lh-solid">
          {car.name}

        </h1>
        <p className="black-80 fw3">{car.text}</p>
        {action}
        </Paper>
        </div>
      </React.Fragment>
    )
  }

  _renderAction = ({ id, isPublished }) => {
    return (
      <a
        className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
        onClick={() => this.deleteCar(id)}
      >
        Delete
      </a>
    )
  }

  deleteCar = async id => {
    await this.props.deleteCar({
      variables: { where: {
        id: id
      } },
    })
    this.props.history.replace('/cars')
  }

  publishDraft = async id => {
    await this.props.publishDraft({
      variables: { id },
    })
    this.props.history.replace('/')
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

export default compose(
  graphql(POST_QUERY, {
    name: 'carQuery',
    options: props => ({
      variables: {
        where: {
          id: props.match.params.id,
        }
      },
    }),
  }),
  // graphql(PUBLISH_MUTATION, {
  //   name: 'publishDraft',
  // }),
  graphql(DELETE_MUTATION, {
    name: 'deleteCar',
  }),
  withRouter,
)(DetailPage)
