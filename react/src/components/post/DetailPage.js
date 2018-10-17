import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import ImageTemplate from '../nav/ImageTemplate'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'

class DetailPage extends React.Component {
  render() {
    if (this.props.postQuery.error) {
      return (
        <NotFound/>
      )
    }

    if (this.props.postQuery.loading) {
      return (<Loading />)
    }

    const { post } = this.props.postQuery
    let action = this._renderAction(post)

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>
            <h1 className='f3 black-80 fw4 lh-solid'>
              {post.title} by <Link to={'/user/' + post.author.id} title='Feed'>
                {post.author.name}
              </Link>
            </h1>
            <p className='black-80 fw3'>{post.text}</p>
            {post.cars.map(car => (

              <Link to={'/car/' + car.id} title='Car' key={car.id}>
                {car.name}
                <br/>
              </Link>
            ))}
            <ImageTemplate
              nameFile={post.nameFile}
            />

            {action}
          </Paper>
        </div>
      </React.Fragment>
    )
  }

  _renderAction = ({ id, isPublished }) => {
    if (!isPublished) {
      return (
        <React.Fragment>
          <Button onClick={() => this.publishDraft(id)}>
            Publish
          </Button>
          {' '}
          <Button onClick={() => this.deletePost(id)}>
            Delete
          </Button>
        </React.Fragment>
      )
    }
    return (
      <Button onClick={() => this.deletePost(id)}>
        Delete
      </Button>
    )
  }

  deletePost = async id => {
    await this.props.deletePost({
      variables: { id },
    })
    this.props.history.replace('/')
  }

  publishDraft = async id => {
    await this.props.publishDraft({
      variables: { id },
    })
    this.props.history.replace('/')
  }
}

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      text
      isPublished
      nameFile
      cars {
        id
        name
      }
      author {
        id
        name
      }
    }
  }
`

const PUBLISH_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(POST_QUERY, {
    name: 'postQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(PUBLISH_MUTATION, {
    name: 'publishDraft',
  }),
  graphql(DELETE_MUTATION, {
    name: 'deletePost',
  }),
  withRouter,
)(DetailPage)
