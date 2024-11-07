import { useState } from "react"
import { trpc } from "../../utils/trpc"
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "../../../../server"
import { Pencil, CheckFat, SpinnerGap } from "@phosphor-icons/react"
import SavedIconEffect from "./SavedIconEffect"
type RouterOutput = inferRouterOutputs<AppRouter>

type Props = {
  user: RouterOutput["getUser"]
  onUpdate: () => void
}

const UpdateAge = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [age, setAge] = useState<number | "">(props.user.age ? props.user.age : "")
  const mutation = trpc.updateUser.useMutation()

  const updateUser = async () => {
    try {
      setIsEdit(false)
      await mutation.mutateAsync({ id: props.user.id, age: Number(age) })
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
      <div className="flex items-center gap-2">
        <div>Age: </div>
        {!isEdit ? (
          <div className="flex items-center gap-2 group" onClick={() => setIsEdit(true)}>
            <div>{age}</div>
            <Pencil className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" />
            {mutation.isSuccess && <SavedIconEffect />}
            {mutation.isPending && <SpinnerGap className="animate-spin" />}
          </div>
        ) : (
          <div className="relative">
            <input
              id="id-input-name"
              name="name"
              value={age}
              onChange={(e) => {
                const inputValue = e.target.value
                setAge(inputValue === "" ? "" : Number(inputValue))
              }}
              type="number"
              placeholder="Name"
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

export default UpdateAge
