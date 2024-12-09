import React from "react"
import { AppContext } from "../ContextProvider"
import { Link } from "react-router-dom"
import ImgAvatar from "../layout/ImgAvatar"
import AuthButtons from "./AuthButtons"

const AvatarMenu = () => {
  const context = React.useContext(AppContext)

  return (
    <div className="h-8">
      <>
        {context.me ? (
          <Link to="/profile">
            <div className="flex items-center justify-center">
              <ImgAvatar src={context.me.image} alt="Profile Image" className="w-10 h-10" />
            </div>
          </Link>
        ) : (
          <AuthButtons />
        )}
      </>
    </div>
  )
}
export default AvatarMenu
