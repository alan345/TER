import React, { Component } from 'react'
import { withRouter } from 'react-router'
import TextField from 'material-ui/TextField'
import CarsPageList from '../car/CarsPageList'


class Autocomplete extends Component {
  state = {
    query : ''
  }

  render() {
    return (
      <div>
        <TextField
          value={this.state.searchAutocomplete}
          onChange={e => this.setState({query:e.target.value})}
          type='text'
          label='Search'
        />
      
        <CarsPageList
          showTitle={false}
          showMore={false}
          query={this.state.query}
          orderBy={this.state.orderBy}/>
      </div>
    )
  }
}

export default withRouter(Autocomplete)
