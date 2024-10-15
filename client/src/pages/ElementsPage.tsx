import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Beers } from "../components/Beers"
import { AppContext } from "../ContextProvider"
import { Movies } from "../components/Movies"
import { Albums } from "../components/Albums"
import { Photos } from "../components/Photos"
import { Employees } from "../components/Employees"
import { Facts } from "../components/Facts"

export const ElementsPage = () => {
  const context = React.useContext(AppContext)
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const initialTab = queryParams.get("tab") || "movies"

  const [tab, setTab] = React.useState(initialTab)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const currentTab = query.get("tab") || "movies"
    if (currentTab !== tab) {
      setTab(currentTab)
    }
  }, [location.search, tab])

  const getClassName = (tabName: string) => {
    return `cursor-pointer ${tab === tabName ? "underline" : ""}`
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

  const handleTabChange = (newTab: string) => {
    navigate(`?tab=${newTab}`)
  }

  return (
    <>
      <nav className="flex gap-6 flex-wrap mt-4">
        {elements.map((element) => (
          <span key={element.name}>
            {((element.isPrivate && context.me) || !element.isPrivate) && (
              <h3 className={getClassName(element.tab)} onClick={() => handleTabChange(element.tab)}>
                {element.name}
              </h3>
            )}
          </span>
        ))}
      </nav>
      {elements.map((element) => (
        <div key={element.name}>
          {((element.isPrivate && context.me) || !element.isPrivate) && <>{tab === element.tab && element.component}</>}
        </div>
      ))}
    </>
  )
}
