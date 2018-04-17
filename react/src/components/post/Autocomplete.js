import React, { Component } from 'react'
import { withRouter } from 'react-router'
import TextField from 'material-ui/TextField'



class Autocomplete extends Component {
  state = {
    searchAutocomplete : ''
  }
  onChangeAutocomplete(e) {
    console.log(e.target.value )
    this.setState({ searchAutocomplete: e.target.value })
  }
  render() {
    return (
      <div>
        <TextField
          value={this.state.searchAutocomplete}
          onChange={e => this.onChangeAutocomplete(e)}
          type='text'
          label='Search'
        />
      </div>
    )
  }
}

export default withRouter(Autocomplete)
