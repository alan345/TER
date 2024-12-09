import React from "react"
import { trpc } from "../../utils/trpc"
import { AppContext } from "../../ContextProvider"
import { ArrowsClockwise } from "@phosphor-icons/react"
import ErrorMutation from "../../layout/ErrorMutation"

const RefreshToken = () => {
  const context = React.useContext(AppContext)
  const mutation = trpc.refreshToken.useMutation()
  const refreshToken = async () => {
    try {
      await mutation.mutateAsync(undefined)
      context.updateAuth()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button
        id="refreshToken-button"
        disabled={mutation.isPending}
        onClick={refreshToken}
        className="btn-gray flex items-center"
      >
        <ArrowsClockwise className="mr-2" />
        Refresh Session
      </button>
      {mutation.error && <ErrorMutation data={mutation.error} />}
    </div>
  )
}
export default RefreshToken
