import React from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import UsersPageList from './UsersPageList'
import { withRouter } from 'react-router'
import NotAuth from '../nav/error/NotAuth'
import { AUTH_TOKEN } from '../../constants/constants'

class UsersPage extends React.Component {
  state = {
    query: '',
    orderBy: 'name_ASC'
  }

  elemClicked(elem) {
    this.props.history.push('/user/' + elem.id)
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if(!authToken) {
      return (<NotAuth/>)
    }
    return (<React.Fragment>
      <div className='paperOut'>
        <Paper className='paperIn'>
          <div className='flex justify-between items-center'>
            <h1>Users</h1>
          </div>
          <TextField onChange={e => this.setState({query: e.target.value})} value={this.state.query} type='text' label='Search'/>
          <UsersPageList showWhenQueryEmpty={true} query={this.state.query} showTitle={true} showMore={true} elemClicked={this.elemClicked.bind(this)} orderBy={this.state.orderBy}/>
        </Paper>
      </div>
    </React.Fragment>)
  }
}

export default withRouter(UsersPage)
