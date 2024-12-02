import { useState } from "react"
import { trpc } from "../../utils/trpc"
import { Pencil, CheckFat, SpinnerGap } from "@phosphor-icons/react"
import SavedIconEffect from "./SavedIconEffect"

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
      props.onUpdate()
    } catch (error) {
      setIsEdit(true)
      console.log(error)
    }
  }
  if (mutation.error) {
    console.log(JSON.parse(mutation.error.message)[0].message)
  }
  return (
    <div>
      <div className="flex items-center gap-2 h-8">
        <div>Password: </div>
        {!isEdit ? (
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEdit(true)}>
            <div>xxxxxxxx</div>
            <Pencil className="opacity-0 group-hover:opacity-100 transition-opacity" />
            {mutation.isSuccess && <SavedIconEffect />}
            {mutation.isPending && <SpinnerGap className="animate-spin" />}
          </div>
        ) : (
          <div className="relative">
            <input
              id="id-input-password"
              name="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateUser()
                }
              }}
              className="pr-20"
              style={{ paddingRight: "26px" }}
            />
            <CheckFat
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-green-600 transition-colors"
              onClick={updateUser}
            />
          </div>
        )}
      </div>

      {mutation.error?.message && (
        <p className="text-red-600">Error: {JSON.parse(mutation.error.message)[0].message}</p>
      )}
    </div>
  )
}

export default UpdateUserPassword
