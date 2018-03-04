import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants/constants'
import {
  NavLink,
  Link,
} from 'react-router-dom'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div>
        <div className="flex pa1 justify-between nowrap orange">
          <div className="flex flex-fixed black">
            <i className="fa fa-arrow-left" onClick={this.props.history.goBack}></i>
          </div>
          <div className="flex flex-fixed black">
            <Link
              to="/"
              title="Feed"
            >
              HOME
            </Link>
          </div>
          <div className="flex flex-fixed">
            {authToken ? (
              <div
                className="ml1 pointer black"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN)
                  this.props.history.push(`/new/1`)
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
        </div>
        <nav className="pa3 pa4-ns">
          <Link
            className="link dim black b f6 f5-ns dib mr3"
            to="/"
            title="Feed"
          >
            Blog
          </Link>
          {authToken && (
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/drafts"
            title="Drafts"
          >
            Drafts
          </NavLink>
        )}
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/users"
            title="Users"
          >
            Users
          </NavLink>
          {authToken ? (
          <Link
            to="/create"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
          >
            + Create Draft
          </Link>
        ) : (
          <div></div>
        )}
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
