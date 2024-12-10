import { useState } from "react"
import { trpc } from "../../utils/trpc"
import { Pencil, CheckFat, SpinnerGap } from "@phosphor-icons/react"
import SavedIconEffect from "./SavedIconEffect"
import ErrorMutation from "../../layout/ErrorMutation"

type Props = {
  onUpdate: () => void
}

const UpdateUserPassword = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [password, setPassword] = useState("")
  const mutation = trpc.updateUserPassord.useMutation()

  const updateUser = async () => {
    try {
      setIsEdit(false)
      await mutation.mutateAsync({ password })
      setPassword("")
      props.onUpdate()
    } catch (error) {
      setIsEdit(true)
      console.log(error)
    }
  }
  const label = "Password"

  return (
    <div className="move-right">
      <div className="flex items-center gap-2 h-8">
        {!isEdit ? (
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEdit(true)}>
            <div>{label}:</div>
            <div>********</div>
            <Pencil className="opacity-0 group-hover:opacity-100 transition-opacity" />
            {mutation.isSuccess && <SavedIconEffect />}
            {mutation.isPending && <SpinnerGap className="animate-spin" />}
          </div>
        ) : (
          <>
            <div>{label}:</div>
            <div className="relative">
              <input
                id="id-input-password"
                name="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="New password"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsEdit(false)
                  if (e.key === "Enter") updateUser()
                }}
                onBlur={() => setIsEdit(false)}
                className="pr-20"
                style={{ paddingRight: "26px" }}
              />
              <CheckFat
                id="icon-check"
                onMouseDown={(e) => e.preventDefault()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-green-600 transition-colors"
                onClick={updateUser}
              />
            </div>
          </>
        )}
      </div>

      {mutation.error && <ErrorMutation data={mutation.error} />}
    </div>
  )
}

export default UpdateUserPassword
