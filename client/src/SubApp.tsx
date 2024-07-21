import BackgroundPage from "./template/BackgroundPage";
import { Users } from "./user/Users";
import { AuthManagementParent } from "./auth/AuthManagementParent";
import { Beers } from "./beer/Beers";
import React from "react";
import { AppContext } from "./ContextProvider";

export function SubApp() {
  const context = React.useContext(AppContext);
  const [tab, setTab] = React.useState("beers");
  return (
    <BackgroundPage>
      <AuthManagementParent />
      <nav className="flex gap-6">
        <h1
          className={`cursor-pointer ${tab === "beers" ? "underline" : ""}`}
          onClick={() => setTab("beers")}
        >
          Beers
        </h1>
        {context.userId && (
          <h1
            className={`cursor-pointer ${tab === "users" ? "underline" : ""}`}
            onClick={() => setTab("users")}
          >
            Users
          </h1>
        )}
      </nav>
      {tab === "beers" && <Beers />}
      {tab === "users" && <Users />}
    </BackgroundPage>
  );
}
