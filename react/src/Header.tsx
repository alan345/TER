import React from "react"
import { Link } from "react-router-dom"
import { PostsContext } from "./Context"

export default function Header() {
  const context = React.useContext(PostsContext)
  console.log(context)

  return (
    <div>
      <h2>Hello {context.user.name}</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {context.user.id ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>

      <hr />
    </div>
  )
}
