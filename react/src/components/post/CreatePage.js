import React from 'react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import UploadFile from '../nav/UploadFile'
import Autocomplete from './Autocomplete'
import Paper from '@material-ui/core/Paper'
import { graphql, compose } from 'react-apollo'
import Button from '@material-ui/core/Button'

class CreatePage extends React.Component {
  state = {
    title: '',
    text: '',
    nameFile:'',
    idCars:[],
  }
  onElemSelected(elems){
    let idCars = elems.map(el => {return {id: el.id}})
    this.setState({idCars})
  }

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>

          <h1>Create Draft</h1>
          <input
            autoFocus
            className='w-100 pa2 mv2 br2 b--black-20 bw1'
            onChange={e => this.setState({ title: e.target.value })}
            placeholder='Title'
            type='text'
            value={this.state.title}
          />
          <textarea
            className='db w-100 ba bw1 b--black-20 pa2 br2 mb2'
            cols={50}
            onChange={e => this.setState({ text: e.target.value })}
            placeholder='Content'
            rows={8}
            value={this.state.text}
          />
          <Autocomplete onElemSelected={this.onElemSelected.bind(this)}/>
          <br/>
          <UploadFile
            isEditMode={true}
            onSelectFile={(nameFile) => {this.setState({nameFile: nameFile})}}/>
          <br/>
          <Button onClick={this.handlePost} variant='contained' color='primary'>
            + Create Post
          </Button>
          <Button onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Paper>
      </div>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { title, text, nameFile } = this.state
    let idCars = this.state.idCars
    await this.props.createPostMutation({
      variables: {
        data: {
          title,
          text,
          nameFile,
          cars: {
            connect: idCars
          }
        }
      }
    })

    this.props.history.replace('/drafts')
  }
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($data: PostCreateInput!) {
    createPost(data: $data) {
      id
      title
      text
      nameFile
    }
  }
`

export default compose(
  graphql(CREATE_POST_MUTATION, { name: 'createPostMutation'}),
  withRouter
)(CreatePage)
