import BackgroundPage from "./template/BackgroundPage";
import { Users } from "./components/user/Users";
import { AuthManagementParent } from "./auth/AuthManagementParent";
import { Beers } from "./components/beer/Beers";
import React from "react";
import { AppContext } from "./ContextProvider";
import { Movies } from "./components/movie/Movies";
import { Albums } from "./components/album/Albums";

export function SubApp() {
  const context = React.useContext(AppContext);
  const [tab, setTab] = React.useState("beers");

  const getClassName = (tabName: string) => {
    return `cursor-pointer ${tab === tabName ? "underline" : ""}`;
  };
  return (
    <BackgroundPage>
      <AuthManagementParent />
      <nav className="flex gap-6">
        <h1 className={getClassName("beers")} onClick={() => setTab("beers")}>
          Beers
        </h1>
        <h1 className={getClassName("movies")} onClick={() => setTab("movies")}>
          Movies
        </h1>
        <h1 className={getClassName("albums")} onClick={() => setTab("albums")}>
          Albums
        </h1>
        {context.userId && (
          <h1 className={getClassName("users")} onClick={() => setTab("users")}>
            Users
          </h1>
        )}
      </nav>
      {tab === "beers" && <Beers />}
      {tab === "users" && <Users />}
      {tab === "movies" && <Movies />}
      {tab === "albums" && <Albums />}
    </BackgroundPage>
  );
}
