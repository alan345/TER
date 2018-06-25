import React, {Component} from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import MenuAvatar from './MenuAvatar'
import { withApollo } from 'react-apollo'

class TopHello extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
      return (
        <div>
        {authToken ? (
          <div>
            {this.props.me.me && (
              <MenuAvatar user={this.props.me.me} nameFile={this.props.me.me.nameFile}/>
            )}
          </div>
        ) : (
          <div>
            {this.props.me.me  && (
              <div>
              Hi {this.props.me.me.name}!
              </div>
            )}
          </div>
        )}
        {!authToken && (
          <Link to='/login' className='ml1 no-underline black'>
            login
          </Link>
        )}
        </div>
      )
    }
  }

  const USER_QUERY = gql`
    query Me {
      me {
        id
        email
        role
        name
        nameFile
      }
    }
  `

export default compose(
  graphql(USER_QUERY, {name: 'me'}),
  withApollo
)(TopHello)
