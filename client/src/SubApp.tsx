import React from "react";
import BackgroundPage from "./template/BackgroundPage";
import { Users } from "./components/Users";
import { AuthManagementParent } from "./auth/AuthManagementParent";
import { Beers } from "./components/Beers";
import { AppContext } from "./ContextProvider";
import { Movies } from "./components/Movies";
import { Albums } from "./components/Albums";
import { Photos } from "./components/Photos";
import { Employees } from "./components/Employees";
import { Facts } from "./components/Facts";

export function SubApp() {
  const context = React.useContext(AppContext);
  const [tab, setTab] = React.useState("movies");

  const getClassName = (tabName: string) => {
    return `cursor-pointer ${tab === tabName ? "underline" : ""}`;
  };

  const elements = [
    { name: "Movies", tab: "movies", compoent: <Movies />, isPrivate: false },
    { name: "Photos", tab: "photos", compoent: <Photos />, isPrivate: false },
    { name: "Beers", tab: "beers", compoent: <Beers />, isPrivate: false },
    { name: "Albums", tab: "albums", compoent: <Albums />, isPrivate: false },
    { name: "Facts", tab: "facts", compoent: <Facts />, isPrivate: false },
    { name: "Users", tab: "users", compoent: <Users />, isPrivate: true },
    {
      name: "Employees",
      tab: "employees",
      compoent: <Employees />,
      isPrivate: true,
    },
  ];
  return (
    <BackgroundPage>
      <AuthManagementParent />
      <nav className="flex gap-6">
        {elements.map((element) => (
          <span key={element.name}>
            {((element.isPrivate && context.userId) || !element.isPrivate) && (
              <h1
                className={getClassName(element.tab)}
                onClick={() => setTab(element.tab)}
              >
                {element.name}
              </h1>
            )}
          </span>
        ))}
      </nav>
      {elements.map((element) => (
        <div key={element.name}>
          {((element.isPrivate && context.userId) || !element.isPrivate) && (
            <>{tab === element.tab && element.compoent}</>
          )}
        </div>
      ))}
    </BackgroundPage>
  );
}
