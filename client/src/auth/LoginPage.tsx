import React from "react"
import { LoginMutation } from "./LoginMutation"

export const LoginPage = () => {
  const [login, setLogin] = React.useState("alan@example.com")
  const [password, setPassword] = React.useState("securePassword")
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Login</h2>
      <div className="mt-4">
        <div>
          <input
            id="login-input"
            value={login}
            className="text-black"
            type="text"
            placeholder="Login"
            onChange={(e) => setLogin(e.target.value)}
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
            onClick={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show-password-checkbox" className="ml-2">
            Show Password
          </label>
        </div>
        <div className="mt-4">
          <LoginMutation login={login} password={password} />
        </div>
      </div>
    </div>
  )
}
