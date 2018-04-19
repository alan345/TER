import React, {Component} from 'react'
import {withRouter} from 'react-router'
import CarsPageList from './CarsPageList'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Icon from 'material-ui/Icon'


class CarsPage extends Component {
  state = {
    query: '',
    orderBy: 'name_ASC'
  }

  elemClicked(elem) {
    this.props.history.push('/car/' + elem.id)
  }

  render() {
    return (<React.Fragment>
      <div className='paperOut'>
        <Paper className='paperIn'>
          <TextField
            onChange={e => this.setState({query: e.target.value})}
            type='text'
            label='Search'
            />
          {' '}
          <Button onClick={() => this.props.history.push('/car/create')} variant='raised' color='primary'>
            + Create Car
          </Button>
          <div onClick={() => {
              this.setState({
                orderBy: this.state.orderBy === 'name_ASC'
                  ? 'name_DESC'
                  : 'name_ASC'
              })
            }}>
            {
              this.state.orderBy === 'name_ASC'
                ? (<Icon>keyboard_arrow_down</Icon>)
                : (<Icon>keyboard_arrow_up</Icon>)
            }
          </div>

        <CarsPageList
          showWhenQueryEmpty={true}
          query={this.state.query}
          showTitle={true}
          showMore={true}
          elemClicked={this.elemClicked.bind(this)}
          orderBy={this.state.orderBy}/>
        </Paper>
      </div>
    </React.Fragment>)
  }
}

export default withRouter(CarsPage)
