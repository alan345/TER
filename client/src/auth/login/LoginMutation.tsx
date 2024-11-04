import React from "react"
import { trpc } from "../../utils/trpc"
import { AppContext } from "../../ContextProvider"
import { useNavigate } from "react-router-dom"

type Props = {
  password: string
  email: string
}
export const LoginMutation = (props: Props) => {
  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  const loginMutation = trpc.login.useMutation({})
  const login = async () => {
    try {
      await loginMutation.mutateAsync({ email: props.email, password: props.password })
      context.updateUser()
      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button
        id="email-mutation-button"
        disabled={loginMutation.isPending || props.email === "" || props.password === ""}
        onClick={login}
        className="btn-blue"
      >
        {loginMutation.isPending ? "Loading..." : "Login"}
      </button>
      {loginMutation.error && <p className="text-red-600">{loginMutation.error.message}</p>}
    </div>
  )
}
