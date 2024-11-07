import { trpc } from "../utils/trpc"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { ErrorTemplate } from "../template/ErrorTemplate"
import iconAvatar from "../assets/icons/avatar.svg"
import UpdateUserName from "./user/UpdateUserName"
import ImgAvatar from "../template/layout/ImgAvatar"
import UpdateAge from "./user/UpdateAge"

type Props = {
  meId: string
}
export const ProfileQuery = (props: Props) => {
  const dataQuery = trpc.getUser.useQuery({ id: props.meId })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />
  if (!dataQuery.data) return <div>No data</div>
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Profile</h2>
      <div className="mt-4">
        <div>
          <ImgAvatar
            src={dataQuery.data.image ? dataQuery.data.image : iconAvatar}
            className="w-36 h-36"
            alt="Profile"
          />
        </div>
        <div className="mt-4">
          <UpdateUserName user={dataQuery.data} onUpdate={() => dataQuery.refetch()} />
          <UpdateAge user={dataQuery.data} onUpdate={() => dataQuery.refetch()} />

          <p>Email: {dataQuery.data.email}</p>
        </div>
      </div>
    </div>
  )
}
