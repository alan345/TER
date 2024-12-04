import React from "react"
import { AppContext } from "../../ContextProvider"
import ProfileQuery from "./ProfileQuery"
import SessionData from "./SessionData"
import Logout from "./Logout"

const ProfilePage = () => {
  const context = React.useContext(AppContext)

  if (!context.me) {
    return null
  }
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1>Profile</h1>
        <Logout />
      </div>
      <ProfileQuery meId={context.me.id} />
      <SessionData />
    </div>
  )
}
export default ProfilePage
