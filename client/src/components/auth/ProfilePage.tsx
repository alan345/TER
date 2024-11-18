import React from "react"
import { AppContext } from "../../ContextProvider"
import ProfileQuery from "../ProfileQuery"
import Logout from "./Logout"

const ProfilePage = () => {
  const context = React.useContext(AppContext)

  if (!context.me) {
    return null
  }
  return (
    <>
      <ProfileQuery meId={context.me.id} />
      <div className="mt-10">
        <h4>Sesssion</h4>
        {context.decoded && (
          <div className="text-xs">
            <div>Id: {context.decoded.id}</div>
            <div>
              Start (Iat): {new Date(context.decoded.iat * 1000).toLocaleDateString()}{" "}
              {new Date(context.decoded.iat * 1000).toLocaleTimeString()}
            </div>
            <div>
              End (Exp): {new Date(context.decoded.exp * 1000).toLocaleDateString()}{" "}
              {new Date(context.decoded.exp * 1000).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
      <div className="mt-6">
        <Logout />
      </div>
    </>
  )
}
export default ProfilePage
