import React from 'react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import Main from '../uploadFile'
import Autocomplete from './Autocomplete'
import Paper from 'material-ui/Paper'
import { graphql, compose } from 'react-apollo'


class CreatePage extends React.Component {
  state = {
    title: '',
    text: '',
    nameFile:'',
    idCar:'',
  }
  onElemSelected(elem){
    this.setState({idCar: elem.id})
    // console.log(elem)
  }


  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <form onSubmit={this.handlePost}>
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
          <input
            className={`pa3 bg-black-10 bn ${this.state.text &&
              this.state.title &&
              'dim pointer'}`}
            disabled={!this.state.text || !this.state.title}
            type="submit"
            value="Create"
          />{' '}
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
        <Autocomplete onElemSelected={this.onElemSelected.bind(this)}/>
        <Main onSelectFile={this.handleFile}/>
        </Paper>
      </div>
    )
  }

  handleFile = (nameFile) => {
    this.setState({nameFile: nameFile});
  }


  handlePost = async e => {
    e.preventDefault()
    const { title, text, nameFile } = this.state
    let id = this.state.idCar
    await this.props.createPostMutation({
      variables: { title, text, nameFile, id },
    })
    this.props.history.replace('/drafts')
  }
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!, $nameFile: String!, $idCar: String!) {
    createDraft(title: $title, text: $text, nameFile: $nameFile, idCar:$idCar) {
      id
      title
      text
      nameFile
    }
  }
`
const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $text: String!, $nameFile: String!, $id: ID!) {
    createPost(data: {title: $title, text: $text, nameFile: $nameFile, car: {connect: {id: $id}}}) {
      id
      title
      text
      nameFile
    }
  }
`


export default compose(
  graphql(CREATE_DRAFT_MUTATION, { name: 'createDraftMutation'}),
  graphql(CREATE_POST_MUTATION, { name: 'createPostMutation'}),
  withRouter
)(CreatePage)
