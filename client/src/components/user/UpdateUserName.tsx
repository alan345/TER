import { useState } from "react"
import { trpc } from "../../utils/trpc"
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../../../../server"
type RouterOutput = inferRouterOutputs<AppRouter>
import { Pencil, CheckFat, SpinnerGap } from "@phosphor-icons/react"
import SavedIconEffect from "./SavedIconEffect"

type Props = {
  user: RouterOutput["getUser"]
  onUpdate: () => void
}

const UpdateUserName = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState(props.user.name)
  const mutation = trpc.updateUser.useMutation()

  const updateUser = async () => {
    try {
      setIsEdit(false)
      await mutation.mutateAsync({ id: props.user.id, name: name })
      props.onUpdate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 h-10">
        <div>Name: </div>
        {!isEdit ? (
          <div className="flex items-center gap-2 group" onClick={() => setIsEdit(true)}>
            <div>{name}</div>
            <Pencil className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" />
            {mutation.isSuccess && <SavedIconEffect />}
            {mutation.isPending && <SpinnerGap className="animate-spin" />}
          </div>
        ) : (
          <div className="relative">
            <input
              id="id-input-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
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

      {mutation.error && <p className="text-red-600">{mutation.error.message}</p>}
    </div>
  )
}

export default UpdateUserName
