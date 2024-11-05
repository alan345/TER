import React from "react"
import { Link } from "react-router-dom"
import { trpc } from "../../../utils/trpc"
import { AppContext } from "../../../ContextProvider"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const [email, setEmail] = React.useState("alan@example.com")
  const [password, setPassword] = React.useState("securePassword")
  const [showPassword, setShowPassword] = React.useState(false)

  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  const loginMutation = trpc.login.useMutation({})
  const login = async () => {
    try {
      await loginMutation.mutateAsync({ email, password })
      context.updateUser()
      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Login</h2>
      <div className="mt-4">
        <div>
          <input
            id="email-input"
            value={email}
            className="text-black"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-1">
          <input
            id="password-input"
            value={password}
            className="text-black"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <input
            type="checkbox"
            id="show-password-checkbox"
            name="show-password-checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          />
          <label htmlFor="show-password-checkbox" className="ml-2 cursor-pointer">
            Show Password
          </label>
        </div>
        <div className="mt-4">
          <div>
            <button
              id="email-mutation-button"
              disabled={loginMutation.isPending || email === "" || password === ""}
              onClick={login}
              className="btn-blue"
            >
              {loginMutation.isPending ? "Loading..." : "Login"}
            </button>
            {loginMutation.error && <p className="text-red-600">{loginMutation.error.message}</p>}
          </div>
        </div>
        <p className="text-sm mt-6">
          Don’t have an account yet?{" "}
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
