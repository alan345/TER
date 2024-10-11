import React from "react"
import { trpc } from "../utils/trpc"
import { AppContext } from "../ContextProvider"
import { useNavigate } from "react-router-dom"

type Props = {
  password: string
  email: string
}
export const LoginMutation = (props: Props) => {
  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  const createWorkerMutation = trpc.login.useMutation({})
  const login = async () => {
    try {
      let data = await createWorkerMutation.mutateAsync({ email: props.email, password: props.password })
      console.log(data)
      context.updateUserId()
      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button
        id="email-mutation-button"
        disabled={createWorkerMutation.isPending || props.email === "" || props.password === ""}
        onClick={login}
        className="btn-blue"
      >
        {createWorkerMutation.isPending ? "Loading..." : "Login"}
      </button>
      {createWorkerMutation.error && <p className="text-red-600">{createWorkerMutation.error.message}</p>}
    </div>
  )
}
