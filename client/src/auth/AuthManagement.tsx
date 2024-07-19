import React from "react";
import { AppContext } from "../ContextProvider";
import { Logout } from "./Logout";
import { Login } from "./Login";

export function AuthManagement() {
  const context = React.useContext(AppContext);
  console.log(context.userId);

  if (context.userId) {
    return (
      <>
        Hey {context.name}!
        <Logout />
      </>
    );
  }

  if (context.isLoading) {
    return <div>Loading</div>;
  }
  return <Login />;
}
