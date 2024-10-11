import React from "react"
import { trpc } from "../utils/trpc"
import { AppContext } from "../ContextProvider"

type Props = {
  password: string
  login: string
  // onCancel: () => void
}
export function LoginMutation(props: Props) {
  const context = React.useContext(AppContext)
  const createWorkerMutation = trpc.login.useMutation({})
  const handleCreateWorker = async () => {
    try {
      let data = await createWorkerMutation.mutateAsync({ login: props.login, password: props.password })
      console.log(data)
      context.updateUserId()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button
        id="login-mutation-button"
        disabled={createWorkerMutation.isPending || props.login === "" || props.password === ""}
        onClick={handleCreateWorker}
        className="btn-blue"
      >
        {createWorkerMutation.isPending ? "Closing..." : "Login"}
      </button>{" "}
      {/* <button id="cancel-mutation-button" onClick={props.onCancel}>
        Cancel
      </button> */}
      {createWorkerMutation.error && <p className="text-red-600">{createWorkerMutation.error.message}</p>}
    </div>
  )
}
