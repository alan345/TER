import React from "react";
import { trpc } from "../utils/trpc";
import { AppContext } from "../ContextProvider";
import { LoginMutation } from "./LoginMutation";

export function Login() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div>
      {!isOpen ? (
        <button
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
          onClick={() => setIsOpen(true)}
        >
          Login
        </button>
      ) : (
        <div>
          <div>
            <input
              value={login}
              className="text-black"
              type="text"
              placeholder="Login"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="mt-1">
            <input
              value={password}
              className="text-black"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
