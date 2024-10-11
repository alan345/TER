import React from "react"
import { AppContext } from "../ContextProvider"
import { Logout } from "./Logout"
import { LoginPage } from "./LoginPage"

export function AuthManagement() {
  const context = React.useContext(AppContext)
  if (context.userId) {
    return (
      <>
        Hey {context.name}!
        <Logout />
      </>
    )
  }

  if (context.isLoading) {
    return <div>Loading</div>
  }
  return <LoginPage />
}
