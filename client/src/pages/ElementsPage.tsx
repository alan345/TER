import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Beers } from "../components/Beers"
import { AppContext } from "../ContextProvider"
import { Movies } from "../components/Movies"
import { Albums } from "../components/Albums"
import { Photos } from "../components/Photos"
import { Employees } from "../components/Employees"
import { Facts } from "../components/Facts"

const ElementsPage = () => {
  const context = React.useContext(AppContext)
  const location = useLocation()

  const query = new URLSearchParams(location.search)
  const currentTab = query.get("tab") || "movies"

  const getClassName = (tabName: string) => {
    return `cursor-pointer ${currentTab === tabName ? "underline" : ""}`
  }

  const elements = [
    { name: "Movies", tab: "movies", component: <Movies />, isPrivate: false },
    { name: "Photos", tab: "photos", component: <Photos />, isPrivate: false },
    { name: "Beers", tab: "beers", component: <Beers />, isPrivate: false },
    { name: "Albums", tab: "albums", component: <Albums />, isPrivate: false },
    { name: "Facts", tab: "facts", component: <Facts />, isPrivate: false },
    {
      name: "Employees",
      tab: "employees",
      component: <Employees />,
      isPrivate: true,
    },
  ]

  return (
    <>
      <nav className="flex gap-6 flex-wrap mt-4">
        {elements.map((element) => (
          <span key={element.name}>
            {((element.isPrivate && context.me) || !element.isPrivate) && (
              <Link to={`?tab=${element.tab}`}>
                <h3 className={getClassName(element.tab)}>{element.name}</h3>
              </Link>
            )}
          </span>
        ))}
      </nav>
      {elements.map((element) => (
        <div key={element.name}>
          {((element.isPrivate && context.me) || !element.isPrivate) && (
            <>{currentTab === element.tab && element.component}</>
          )}
        </div>
      ))}
    </>
  )
}

export default ElementsPage
