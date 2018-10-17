import React from 'react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { graphql, compose } from 'react-apollo'
import { withApollo } from 'react-apollo'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

class CreateCar extends React.Component {
  state = {
    name: '',
  }

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <form onSubmit={this.handleCar}>
          <h1>Create Car</h1>
            <FormControl>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input
                id='name'
                autoComplete='off'
                autoFocus
                onChange={e => this.setState({ name: e.target.value })}
                type='text'
                value={this.state.name}
              />
            </FormControl>
            <br/>
            <br/>
          <Button
            className={`pa3 bg-black-10 bn`}
            disabled={!this.state.name}
            type='submit'
            variant='contained' color='primary'>
            Create
          </Button>
          {' '}
          <Button onClick={this.props.history.goBack}>
            or cancel
          </Button>
        </form>
      </Paper>
      </div>
    )
  }

  handleFile = (nameFile) => {
      this.setState({nameFile: nameFile})
  }

  handleCar = async e => {
    e.preventDefault()
    const { name } = this.state
    await this.props.createCarMutation({
      variables: {name} ,
    })
    this.props.client.resetStore().then( () => {
      this.props.history.push('/cars')
    })
  }
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateCarMutation($name: String!) {
    createCar(data: {name: $name}) {
      id
      name
    }
  }
`

export default compose(
  graphql(CREATE_DRAFT_MUTATION, { name: 'createCarMutation' }),
  withRouter,
  withApollo
)(CreateCar)
