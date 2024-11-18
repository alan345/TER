import React from "react"
import { AppContext } from "../../ContextProvider"
import { Link } from "react-router-dom"
import ImgAvatar from "./ImgAvatar"
import { SignIn } from "@phosphor-icons/react"

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
          <div className="flex gap-2">
            <Link to="/login">
              <button id="login-mutation-button" className="btn-white  flex items-center">
                <SignIn className="mr-2" />
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button id="login-mutation-button" className="btn-white flex items-center">
                <SignIn className="mr-2" />
                Sign up
              </button>
            </Link>
          </div>
        )}
      </>
    </div>
  )
}
export default AvatarMenu
