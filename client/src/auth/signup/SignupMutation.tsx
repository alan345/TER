import React from "react"
import { trpc } from "../../utils/trpc"
import { AppContext } from "../../ContextProvider"
import { useNavigate } from "react-router-dom"

type Props = {
  password: string
  name: string
  email: string
}
export const SignupMutation = (props: Props) => {
  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  const signupMutation = trpc.signup.useMutation({})
  const signup = async () => {
    try {
      await signupMutation.mutateAsync({ email: props.email, password: props.password, name: props.name })
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
        disabled={signupMutation.isPending || props.email === "" || props.password === ""}
        onClick={signup}
        className="btn-blue"
      >
        {signupMutation.isPending ? "Loading..." : "Sign up"}
      </button>
      {signupMutation.error && <p className="text-red-600">{signupMutation.error.message}</p>}
    </div>
  )
}
