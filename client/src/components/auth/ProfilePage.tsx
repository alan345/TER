import React from "react"
import { AppContext } from "../../ContextProvider"
import { ProfileQuery } from "../ProfileQuery"

const ProfilePage = () => {
  const context = React.useContext(AppContext)

  if (!context.me) {
    return null
  }
  return <ProfileQuery meId={context.me.id} />
}
export default ProfilePage
