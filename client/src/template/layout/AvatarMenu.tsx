import React from "react"
import { AppContext } from "../../ContextProvider"
import { Link } from "react-router-dom"
import ImgAvatar from "./ImgAvatar"
import { SignIn } from "@phosphor-icons/react"
export const AvatarMenu = () => {
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
          <Link to="/login">
            <button id="login-mutation-button" className="btn-blue flex items-center">
              <SignIn className="mr-2" />
              Login
            </button>
          </Link>
        )}
      </>
    </div>
  )
}
