import React from "react"
import { AppContext } from "../../ContextProvider"
import { ProfileQuery } from "../ProfileQuery"
import { Logout } from "./Logout"

export const ProfilePage = () => {
  const context = React.useContext(AppContext)

  if (!context.me) {
    return null
  }
  return (
    <>
      <ProfileQuery meId={context.me.id} />
      <div className="mt-8">
        <Logout />
      </div>
    </>
  )
}
