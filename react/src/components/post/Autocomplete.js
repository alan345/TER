import React, { Component } from 'react'
import { withRouter } from 'react-router'
import TextField from 'material-ui/TextField'
import CarsPageList from '../car/CarsPageList'


class Autocomplete extends Component {
  state = {
    query : '',
    queryAutocomplete : '',
    elemSelected: {}
  }
  elemClicked(elem) {
    this.setState({
      queryAutocomplete: elem.name,
      query: '',
      elemSelected: elem
    })
    this.props.onElemSelected(elem)
  }
  render() {
    return (
      <div>
        <TextField
          value={this.state.queryAutocomplete}
          onChange={e => this.setState({
            query:e.target.value,
            queryAutocomplete: e.target.value,
            elemSelected: {}
          })}
          type='text'
          label='Search Car'
        />

        <CarsPageList
          showTitle={false}
          showMore={false}
          elemClicked={this.elemClicked.bind(this)}
          query={this.state.query}
          orderBy={this.state.orderBy}/>
      </div>
    )
  }
}

export default withRouter(Autocomplete)
