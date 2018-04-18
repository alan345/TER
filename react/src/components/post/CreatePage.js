import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Main from '../uploadFile'
import Autocomplete from './Autocomplete'
import Paper from 'material-ui/Paper'



class CreatePage extends React.Component {
  state = {
    title: '',
    text: '',
    nameFile:'',
  }
  onElemSelected(elem){
    console.log(elem)
  }


  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <form onSubmit={this.handlePost}>
          <h1>Create Draft</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="Title"
            type="text"
            value={this.state.title}
          />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            onChange={e => this.setState({ text: e.target.value })}
            placeholder="Content"
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
        <Main onSelectFile={this.handleFile}/>
        <Autocomplete onElemSelected={this.onElemSelected}/>
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
    await this.props.createDraftMutation({
      variables: { title, text, nameFile },
    })
    this.props.history.replace('/drafts')
  }
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!, $nameFile: String!) {
    createDraft(title: $title, text: $text, nameFile: $nameFile) {
      id
      title
      text
      nameFile
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_DRAFT_MUTATION, {
  name: 'createDraftMutation', // name of the injected prop: this.props.createDraftMutation...
})(CreatePage)

export default withRouter(CreatePageWithMutation)
