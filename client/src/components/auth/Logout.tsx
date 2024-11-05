import React from "react"
import { trpc } from "../../utils/trpc"
import { AppContext } from "../../ContextProvider"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  const logoutMutation = trpc.logout.useMutation({})
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync(undefined)
      console.log("success Logout")
      navigate("/login")
      context.updateUser()
    } catch (error) {
      console.log(error)
    }
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
export default Logout
