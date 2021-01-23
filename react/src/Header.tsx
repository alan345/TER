import React from "react"
import { Link } from "react-router-dom"
import { PostsContext } from "./Context"
import Logout from "./pages/Logout"

export default function Header() {
  const context = React.useContext(PostsContext)

  return (
    <div>
      <h2>Hello {context.user.name}</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {context.user.id ? (
          <li>
            <Logout />
          </li>
        ) : (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>

      <hr />
    </div>
  )
}
