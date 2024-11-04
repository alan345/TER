import React from "react"
import { AppContext } from "../ContextProvider"
import { ProfileQuery } from "../components/ProfileQuery"
import { Logout } from "../components/auth/Logout"

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
