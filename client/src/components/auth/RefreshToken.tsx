import React from "react"
import { trpc } from "../../utils/trpc"
import { AppContext } from "../../ContextProvider"
import { SignOut, ArrowsClockwise } from "@phosphor-icons/react"

const RefreshToken = () => {
  const context = React.useContext(AppContext)
  const refreshTokenMutation = trpc.refreshToken.useMutation()
  const refreshToken = async () => {
    try {
      await refreshTokenMutation.mutateAsync(undefined)
      context.updateAuth()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button
        id="refreshToken-button"
        disabled={refreshTokenMutation.isPending}
        onClick={refreshToken}
        className="btn-gray flex items-center"
      >
        <ArrowsClockwise className="mr-2" /> Refresh Session
      </button>
      {refreshTokenMutation.error && (
        <p className="text-red-600">Something went wrong! {refreshTokenMutation.error.message}</p>
      )}
    </div>
  )
}
export default RefreshToken
