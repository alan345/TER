import React, { Component } from 'react'
import { withRouter } from 'react-router'
import TextField from '@material-ui/core/TextField'
import CarsPageList from '../car/CarsPageList'
import Chip from '@material-ui/core/Chip'

class Autocomplete extends Component {
  state = {
    queryAutocomplete : '',
    elemSelecteds: []
  }
  elemClicked(elem) {
    this.setState({
      queryAutocomplete: '',
      elemSelecteds: [...this.state.elemSelecteds,  elem]
    }, () => this.props.onElemSelected(this.state.elemSelecteds))
  }
  handleDelete(data){
    const elemSelecteds = [...this.state.elemSelecteds]
    const chipToDelete = elemSelecteds.indexOf(data)
    elemSelecteds.splice(chipToDelete, 1)
    this.setState({ elemSelecteds })
    this.props.onElemSelected(this.state.elemSelecteds)
  }
  render() {
    return (
      <div>
        <TextField
          value={this.state.queryAutocomplete}
          onChange={e => this.setState({
            queryAutocomplete: e.target.value,
            elemSelected: {}
          })}
          type='text'
          label='Search Car'
        />
      <br/>
      {this.state.elemSelecteds.map((elem, i) => (
          <Chip
            key={i}
            label={elem.name}
            onDelete={()=>this.handleDelete(elem)}
          />
      ))}

        <CarsPageList
          showTitle={false}
          showMore={false}
          elemClicked={this.elemClicked.bind(this)}
          query={this.state.queryAutocomplete}
          orderBy={this.state.orderBy}/>
      </div>
    )
  }
}

export default withRouter(Autocomplete)
