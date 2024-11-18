import React from "react"
import { AppContext } from "../../ContextProvider"
import TimeLeftSession from "./TimeLeftSession"
import RefreshToken from "./RefreshToken"

const SessionData = () => {
  const context = React.useContext(AppContext)

  if (!context.me) {
    return null
  }
  if (context.decoded?.exp && context.decoded?.iat) {
    console.log(context.decoded.exp - context.decoded.iat)
  }
  return (
    <div className="mt-10">
      <h4>Sesssion</h4>
      {context.decoded && (
        <div className="text-xs">
          <div>Id: {context.decoded.id}</div>
          <div>
            Start (Iat): {new Date(context.decoded.iat * 1000).toLocaleDateString()}{" "}
            {new Date(context.decoded.iat * 1000).toLocaleTimeString()}
          </div>
          <div>
            End (Exp): {new Date(context.decoded.exp * 1000).toLocaleDateString()}{" "}
            {new Date(context.decoded.exp * 1000).toLocaleTimeString()}
          </div>
          <TimeLeftSession exp={context.decoded.exp} />
          <div className="mt-6">
            <RefreshToken />
          </div>
        </div>
      )}
    </div>
  )
}
export default SessionData