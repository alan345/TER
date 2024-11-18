import React, { useContext } from "react"
import { AppContext } from "./ContextProvider"

type Props = {
  element: React.ReactNode
}

const PrivateRoute = (props: Props) => {
  const context = useContext(AppContext)
  if (context.isLoading) return <>Loading!</>
  if (!context.me) return <>This page is private. Please login.</>
  return <>{props.element}</>
}

export default PrivateRoute
