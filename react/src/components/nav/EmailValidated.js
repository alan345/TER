import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../constants/constants'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from './error/Loading'
import NotAuth from './error/NotAuth'
import ResendEmailValidation from './ResendEmailValidation'

class EmailValidated extends Component {
  state = {
    interval : 0
  }
  render() {
    if (this.props.me.loading) {
      return (<Loading />)
    }
    if (this.props.me.error) {
      return (<NotAuth />)
    }

    const authToken = localStorage.getItem(AUTH_TOKEN)

    if(authToken && !this.props.me.me.emailvalidated) {
      return (
        <div className='paperOut'>
          <Paper className='paperIn'>
            <Icon>error_outline</Icon>{' '}
              Email not validated.<ResendEmailValidation />
            </Paper>
          </div>
        )
    } else {
      return(<div></div>)
    }
  }
}

const USER_QUERY = gql`
  query Me {
    me {
      id
      emailvalidated
    }
  }
`

export default compose(
  graphql(USER_QUERY, {name: 'me'}),
)(EmailValidated)
