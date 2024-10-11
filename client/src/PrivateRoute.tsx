import React, { useContext } from "react"
import { AppContext } from "./ContextProvider"

interface PrivateRouteProps {
  element: React.ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const context = useContext(AppContext)
  console.log(context.me)
  if (context.isLoading) return <>Loading!</>
  if (!context.me) return <>This page is private. Please login.</>
  return <>{element}</>
}
