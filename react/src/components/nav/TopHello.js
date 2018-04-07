import React from 'react'
import { AUTH_TOKEN } from '../../constants/constants'
import { Link } from 'react-router-dom'

function TopHello(props) {

    const authToken = localStorage.getItem(AUTH_TOKEN)
    const userToken = JSON.parse(localStorage.getItem('userToken'))

    return (
      <div className='flex flex-fixed'>
      {authToken ? (
        <div className='black link'>
          Hi{' '}<Link to={`/user/${userToken.id}`}>
            {userToken.name}
          </Link>!
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

export default TopHello
