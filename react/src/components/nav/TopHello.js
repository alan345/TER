import React, {Component} from 'react'
import { AUTH_TOKEN } from '../../constants/constants'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import MenuAvatar from '../nav/MenuAvatar'
import { withApollo } from 'react-apollo'

class TopHello extends Component {
  // // state = {
  // //   userToken: JSON.parse(localStorage.getItem('userToken'))
  // // }
  //
  // // componentDidMount(){
  // //   console.log('componentDidMount')
  // //   const authToken = localStorage.getItem(AUTH_TOKEN)
  // //   if(authToken && this.props.me.me) {
  // //     this.refresh()
  // //   }
  // //   // const authToken = localStorage.getItem(AUTH_TOKEN)
  // //   // if(authToken) {
  // //   //   // console.log(authToken)
  // //   //   // console.log(this.props.me)
  // //   //   this.props.me.refetch()
  // //   // }
  // // }
  // componentWillReceiveProps(nextProps){
  //   console.log('componentWillReceiveProps')
  //   const authToken = localStorage.getItem(AUTH_TOKEN)
  //   console.log(authToken)
  //   console.log(this.props.me)
  //   if(authToken && this.props.me.me) {
  //     // this.refresh()
  //   }
  // }
  // //
  // refresh() {
  //   // const authToken = localStorage.getItem(AUTH_TOKEN)
  //   // if(authToken) {
  //   console.log('refresh')
  //       this.props.client.resetStore().then(data=> {
  //         this.props.me.refetch()
  //       //
  //       })
  //       // this.render();
  //       // .then(data=> {
  //       //   console.log(data.data.me)
  //       //   console.log(this.props.me)
  //       //   this.forceUpdate()
  //       // })
  //   // }
  // }
  render() {
    // console.log(  this.props.me)
    const authToken = localStorage.getItem(AUTH_TOKEN)
    // const userToken = JSON.parse(localStorage.getItem('userToken'))
    // console.log(this.props.me.me)
      return (
        <div>
        {authToken ? (
          <div>
            {this.props.me.me && (
              <MenuAvatar user={this.props.me.me } nameFile={this.props.me.me.nameFile}/>
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

// let userToken = JSON.parse(localStorage.getItem('userToken'))
// if(!userToken) {
//   userToken = {id: ''}
// }
export default compose(
  graphql(USER_QUERY, {name: 'me'}),
  withApollo
)(TopHello)
