import React from "react";
import { trpc } from "../utils/trpc";
import { AppContext } from "../ContextProvider";
import { Logout } from "./Logout";
import { Login } from "./Login";

export function AuthManagement() {
  const context = React.useContext(AppContext);
  console.log(context.userId);
  // const workersQuery = trpc.getAuthId.useQuery(undefined, { retry: false });

  if (context.userId) {
    return <Logout />;
  }

  if (context.isLoading) {
    return <div>Loading</div>;
  }
  return <Login />;
}
