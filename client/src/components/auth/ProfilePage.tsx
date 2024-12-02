import React from "react"
import { AppContext } from "../../ContextProvider"
import ProfileQuery from "./ProfileQuery"
import SessionData from "./SessionData"

const ProfilePage = () => {
  const context = React.useContext(AppContext)

  if (!context.me) {
    return null
  }
  return (
    <div className="p-6">
      <ProfileQuery meId={context.me.id} />
      <SessionData />
    </div>
  )
}
export default ProfilePage
