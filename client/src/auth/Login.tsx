import React from "react";

import { LoginMutation } from "./LoginMutation";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

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
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
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
            onClick={() => setShowPassword(!showPassword)}
          />{" "}
          Show Password
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
