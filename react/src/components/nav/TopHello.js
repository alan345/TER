import React, {Component} from 'react'
import { AUTH_TOKEN } from '../../constants/constants'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import MenuAvatar from '../nav/MenuAvatar'


class TopHello extends Component {
  state = {
    userToken: JSON.parse(localStorage.getItem('userToken'))
  }

  componentDidMount(){
    // const authToken = localStorage.getItem(AUTH_TOKEN)
    // if(authToken) {
    //   // console.log(authToken)
    //   // console.log(this.props.me)
    //   this.props.me.refetch()
    // }
  }
  componentWillReceiveProps(nextProps){
    this.refresh()
  }

  refresh() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if(authToken) {
      if(!this.state.userToken) {
        this.props.me.refetch()
        .then(data=> {
          console.log(data.data.me)
          this.setState({userToken: data.data.me})
        })
      }
    }
  }
  render() {

    const authToken = localStorage.getItem(AUTH_TOKEN)
    // const userToken = JSON.parse(localStorage.getItem('userToken'))
    // console.log(this.props.me.me)
      return (
        <div>
        {authToken ? (
          <div>
            {this.state.userToken ? (
              <MenuAvatar user={this.state.userToken} nameFile={this.state.userToken.nameFile}/>
            ) : (
              <div onClick={()=>this.refresh()}>Refresh</div>
            )}
          </div>
        ) : (
          <div>
            {this.state.userToken && (
              <div>
              Hi {this.state.userToken.name}!
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

// let userToken = JSON.parse(localStorage.getItem('userToken'))
// if(!userToken) {
//   userToken = {id: ''}
// }
export default compose(
  graphql(USER_QUERY, {name: 'me'})
)(TopHello)
