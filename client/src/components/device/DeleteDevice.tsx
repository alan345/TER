import { trpc } from "../../utils/trpc"
import { Trash } from "@phosphor-icons/react"
import ErrorMutation from "../../layout/ErrorMutation"

type Props = {
  deviceId: string
  onDelete: () => void
}
const DeleteDevice = (props: Props) => {
  const mutation = trpc.deleteDevice.useMutation()
  const logout = async () => {
    try {
      await mutation.mutateAsync({
        deviceId: props.deviceId,
      })
      props.onDelete()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button
        id="delete-device-button"
        disabled={mutation.isPending}
        onClick={logout}
        className="btn-white flex items-center"
      >
        <Trash className="mr-2" /> Delete
      </button>
      {mutation.error && <ErrorMutation data={mutation.error} />}
    </div>
  )
}
export default DeleteDevice
