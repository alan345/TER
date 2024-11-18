import { Link } from "react-router-dom"
import { SignIn, Key } from "@phosphor-icons/react"

const AuthButtons = () => {
  return (
    <div className="flex gap-2">
      <Link to="/login">
        <button id="login-mutation-button" className="btn-white  flex items-center">
          <SignIn className="mr-2" />
          Login
        </button>
      </Link>
      <Link to="/signup">
        <button id="login-mutation-button" className="btn-white flex items-center">
          <Key className="mr-2" />
          Sign up
        </button>
      </Link>
    </div>
  )
}
export default AuthButtons
