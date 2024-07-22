import React from "react";
import { LoginMutation } from "./LoginMutation";

export function Login() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [login, setLogin] = React.useState("alan@example.com");
  const [password, setPassword] = React.useState("securePassword");
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div>
      {!isOpen ? (
        <button
          id="login-button"
          className="btn-blue"
          onClick={() => setIsOpen(true)}
        >
          Login
        </button>
      ) : (
        <div>
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
          <input
            type="checkbox"
            id="show-password-checkbox"
            name="show-password-checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show-password-checkbox" className="ml-2">
            Show Password
          </label>

          <div className="mt-1">
            <LoginMutation
              onCancel={() => setIsOpen(false)}
              login={login}
              password={password}
            />
          </div>
        </div>
      )}
    </div>
  );
}
