import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../../constants/constants'
import { NavLink, Link } from 'react-router-dom'
import TopHello  from './TopHello'
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
              <i className="fa fa-home fa-2x"></i>
            </Link>
          </div>
          <div className="flex flex-fixed">
            <TopHello/>
          </div>
        </div>
        <nav className="pa3 pa4-ns">
          <NavLink
            className="link dim black b f6 f5-ns dib mr3"
            to="/"
            title="Feed"
          >
            Blog
          </NavLink>
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
        {authToken && (
          <NavLink
            className="link dim black b f6 f5-ns dib mr3"
            to="/cars"
            title="Cars"
          >
            Cars
          </NavLink>
        )}
        {authToken && (
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/users"
            title="Users"
          >
            Users
          </NavLink>
        )}
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
