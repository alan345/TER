import React from 'react'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../../constants/constants'
import { Link } from 'react-router-dom'

function TopHello(props) {

  const authToken = localStorage.getItem(AUTH_TOKEN)
  const userToken = JSON.parse(localStorage.getItem('userToken'))
    return (
      <div className="flex flex-fixed">
      {authToken ? (
        <div className="black">
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
      {authToken ? (
        <div
          className="ml1 pointer black"
          onClick={() => {
            localStorage.removeItem(AUTH_TOKEN)
            this.props.history.push(`/`)
          }}
        >
          logout
        </div>
      ) : (
        <Link to="/login" className="ml1 no-underline black">
          login
        </Link>
      )}
      </div>
    )
}

export default withRouter(TopHello)
