import React from "react"
import { AppContext } from "../../ContextProvider"
import Logout from "./Logout"
import Login from "./Login"

const AuthManagement = () => {
  const context = React.useContext(AppContext)
  if (context.me) {
    return (
      <>
        Hey {context.me.name}!
        <Logout />
      </>
    )
  }

  if (context.isLoadingAuth) {
    return <div>Loading</div>
  }
  return <Login />
}
export default AuthManagement
