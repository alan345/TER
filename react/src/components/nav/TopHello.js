import React, {Component} from 'react'
import { AUTH_TOKEN } from '../../constants/constants'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import MenuAvatar from '../nav/MenuAvatar'


class TopHello extends Component {
  // state = {
  //   userToken: {
  //     id: ''
  //   }
  // }

  componentDidMount(){
    // const authToken = localStorage.getItem(AUTH_TOKEN)
    // if(authToken) {
    //   // console.log(authToken)
    //   // console.log(this.props.me)
    //   this.props.me.refetch()
    // }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if(authToken) {
      // console.log(authToken)
      // console.log(this.props.me)
      nextProps.me.refetch()
    }
    // console.log(authToken)
  }
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    // console.log(this.props.me.me)
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
            {userToken && (
              <div>
              Hi {userToken.name}!
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

let userToken = JSON.parse(localStorage.getItem('userToken'))
if(!userToken) {
  userToken = {id: ''}
}
export default compose(
  graphql(USER_QUERY, {name: 'me'})
)(TopHello)
