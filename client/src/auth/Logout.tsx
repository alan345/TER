import React from "react"
import { trpc } from "../utils/trpc"
import { AppContext } from "../ContextProvider"
import { useNavigate } from "react-router-dom"

export const Logout = () => {
  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  const logoutMutation = trpc.logout.useMutation({})
  const logout = async () => {
    await logoutMutation.mutateAsync(undefined, {
      onSuccess: () => {
        console.log("success Logout")
        context.updateUserId()
      },
    })
    navigate("/login")
  }
  return (
    <div>
      <button id="logout-button" disabled={logoutMutation.isPending} onClick={logout} className="btn btn-blue">
        {logoutMutation.isPending ? "Closing..." : "Logout"}
      </button>{" "}
      {logoutMutation.error && <p className="text-red-600">Something went wrong! {logoutMutation.error.message}</p>}
    </div>
  )
}
