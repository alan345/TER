import React from 'react'
import { AUTH_TOKEN } from '../../constants/constants'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import MenuAvatar from '../nav/MenuAvatar'


function TopHello(props) {

    const authToken = localStorage.getItem(AUTH_TOKEN)
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    return (
      <div>
      {authToken ? (
        <div>
          {props.userQuery.user && (
            <MenuAvatar user={props.userQuery.user} nameFile={props.userQuery.user.nameFile}/>
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

  const USER_QUERY = gql`
    query UserQuery($where: UserWhereUniqueInput!) {
      user(where: $where) {
        id
        email
        role
        name
        nameFile
      }
    }
  `

const userToken = JSON.parse(localStorage.getItem('userToken'))
export default compose(
  graphql(USER_QUERY, {
    name: 'userQuery',
    options: props => ({
      variables: {
          where: {
            id: userToken.id
          }
        },
    }),
  })
  )(TopHello)
