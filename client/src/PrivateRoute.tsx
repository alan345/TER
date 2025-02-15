import React, { useContext } from "react"
import { AppContext } from "./ContextProvider"
import AuthButtons from "./auth/AuthButtons"
import { Bug } from "@phosphor-icons/react"

type Props = {
  element: React.ReactNode
}

const PrivateRoute = (props: Props) => {
  const context = useContext(AppContext)
  if (context.isLoadingAuth) return <div className="p-6">Loading!</div>
  if (!context.me) {
    return (
      <div className="p-6">
        <div className="flex items-center">
          <Bug className="text-3xl mr-3" />
          <h1>Error</h1>
        </div>
        <p>This page is private.</p>
        <div className="mt-8">
          <AuthButtons />
        </div>
      </div>
    )
  }
  return <>{props.element}</>
}

export default PrivateRoute
