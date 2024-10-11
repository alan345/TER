import React from "react"
import { trpc } from "../utils/trpc"
import { AppContext } from "../ContextProvider"

type Props = {
  password: string
  email: string
  // onCancel: () => void
}
export function LoginMutation(props: Props) {
  const context = React.useContext(AppContext)
  const createWorkerMutation = trpc.login.useMutation({})
  const handleCreateWorker = async () => {
    try {
      let data = await createWorkerMutation.mutateAsync({ email: props.email, password: props.password })
      console.log(data)
      context.updateUserId()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button
        id="email-mutation-button"
        disabled={createWorkerMutation.isPending || props.email === "" || props.password === ""}
        onClick={handleCreateWorker}
        className="btn-blue"
      >
        {createWorkerMutation.isPending ? "Loading..." : "Login"}
      </button>
      {createWorkerMutation.error && <p className="text-red-600">{createWorkerMutation.error.message}</p>}
    </div>
  )
}
