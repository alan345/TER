import React from "react"
import { AppContext } from "../../ContextProvider"
import Logout from "./Logout"
import Login from "./Login"

const AuthManagement = () => {
  const context = React.useContext(AppContext)
  if (context.me) {
    return (
      <div className="p-6">
        Hey {context.me.name}!
        <Logout />
      </div>
    )
  }

  if (context.isLoadingAuth) {
    return <div className="p-6">Loading...</div>
  }
  return <Login />
}
export default AuthManagement
