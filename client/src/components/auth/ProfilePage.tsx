import React from "react"
import { AppContext } from "../../ContextProvider"
import ProfileQuery from "./ProfileQuery"
import SessionData from "./SessionData"
import Logout from "./Logout"
import { Link } from "react-router-dom"
import { Devices } from "@phosphor-icons/react"

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
      <div className="mt-2">
        <Link className="link" to={`/devices?userId=${context.me.id}`}>
          <button className="btn-white">
            <div className="flex items-center">
              <Devices className="text-xl mr-2" /> Devices
            </div>
          </button>
        </Link>
      </div>
      <SessionData />
    </div>
  )
}
export default ProfilePage
