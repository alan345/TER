import React from "react"
import { AppContext } from "../../ContextProvider"
import TimeLeftSession from "./TimeLeftSession"
import RefreshToken from "./RefreshToken"

const SessionData = () => {
  const context = React.useContext(AppContext)

  if (!context.me) {
    return null
  }

  return (
    <div className="mt-10">
      <h4>Sesssion</h4>
      {context.decoded && (
        <>
          <div className="text-xs">
            <div>
              Start: {new Date(context.decoded.iat * 1000).toLocaleDateString()}{" "}
              {new Date(context.decoded.iat * 1000).toLocaleTimeString()}
            </div>
            <div>
              End: {new Date(context.decoded.exp * 1000).toLocaleDateString()}{" "}
              {new Date(context.decoded.exp * 1000).toLocaleTimeString()}
            </div>
            <TimeLeftSession exp={context.decoded.exp} />
          </div>
          <div className="mt-4">
            <RefreshToken />
          </div>
        </>
      )}
    </div>
  )
}
export default SessionData
