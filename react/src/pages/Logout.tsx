import React from "react"
import { Link } from "@material-ui/core"
import { PostsContext } from "../Context"
import { Button } from "@material-ui/core"
export default function Logout() {
  const context = React.useContext(PostsContext)

  const logout = async () => {
    localStorage.setItem("AUTH_TOKEN", "")

    context.updateUser({ id: "", name: "", email: "" })
  }

  return (
    <>
      <Link onClick={logout}>
        <Button variant="contained" color="primary">
          Logout
        </Button>
      </Link>
    </>
  )
}
