import React from 'react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { graphql, compose } from 'react-apollo'
import { withApollo } from 'react-apollo'

class CreateChat extends React.Component {
  state = {
    message: '',
  }


  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <form onSubmit={this.handleChat}>
          <input
            autoFocus
            className='w-100 pa2 mv2 br2 b--black-20 bw1'
            onChange={e => this.setState({ message: e.target.value })}
            placeholder='Name'
            type='text'
            value={this.state.name}
          />


          <Button
            className={`pa3 bg-black-10 bn`}
            disabled={!this.state.message}
            type='submit'
            variant='raised' color='primary'>
            Create
          </Button>
        </form>
      </Paper>
      </div>
    )
  }

  handleFile = (nameFile) => {
      this.setState({nameFile: nameFile})
  }


  handleChat = async e => {
    e.preventDefault()
    const { message } = this.state
    await this.props.createChatMutation({
      variables: {message} ,
    })
    // this.props.client.resetStore().then(data=> {
    //   this.props.history.push('/chats')
    // })
  }
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateChatMutation($message: String!) {
    createChat(data: {message: $message}) {
      id
      message
    }
  }
`

export default compose(
  graphql(CREATE_DRAFT_MUTATION, { name: 'createChatMutation' }),
  withRouter,
  withApollo
)(CreateChat)
