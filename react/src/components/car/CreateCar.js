import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'



class CreatePage extends React.Component {
  state = {
    name: '',
  }


  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <form onSubmit={this.handleCar}>
          <h1>Create Car</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            type="text"
            value={this.state.name}
          />


          <Button             className={`pa3 bg-black-10 bn`}
                      disabled={!this.state.name}
                      type="submit"
                      variant='raised' color='primary'>
            Create
          </Button>
          {' '}
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </Paper>
      </div>
    )
  }

  handleFile = (nameFile) => {
      this.setState({nameFile: nameFile});
  }


  handleCar = async e => {
    e.preventDefault()
    const { name } = this.state
    await this.props.createCarMutation({
      variables: {name} ,
    })
    this.props.history.replace('/cars')
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

const CreatePageWithMutation = graphql(CREATE_DRAFT_MUTATION, {
  name: 'createCarMutation', // name of the injected prop: this.props.createCarMutation...
})(CreatePage)

export default withRouter(CreatePageWithMutation)
