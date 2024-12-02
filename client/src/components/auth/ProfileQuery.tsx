import { trpc } from "../../utils/trpc"
import { LoadingTemplate } from "../../template/LoadingTemplate"
import ErrorTemplate from "../../template/ErrorTemplate"
import iconAvatar from "../../assets/icons/avatar.svg"
import UpdateUserName from "../user/UpdateUserName"
import ImgAvatar from "../../template/layout/ImgAvatar"
import UpdateUserAge from "../user/UpdateUserAge"
import Logout from "./Logout"
import UpdateUserPassword from "../user/UpdateUserPassword"

type Props = {
  meId: string
}

const ProfileQuery = (props: Props) => {
  const dataQuery = trpc.getUser.useQuery({ id: props.meId })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />
  if (!dataQuery.data) return <div>No data</div>
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Profile</h2>
        <Logout />
      </div>

      <div className="mt-4">
        <div>
          <ImgAvatar
            src={dataQuery.data.image ? dataQuery.data.image : iconAvatar}
            className="w-36 h-36"
            alt="Profile"
          />
        </div>
        <div className="mt-4">
          <UpdateUserName user={dataQuery.data} onUpdate={dataQuery.refetch} />
          <UpdateUserAge user={dataQuery.data} onUpdate={dataQuery.refetch} />
          <div className="flex items-center gap-2 h-8">Email: {dataQuery.data.email}</div>
          <UpdateUserPassword onUpdate={dataQuery.refetch} />
          {/* <div className="flex items-center gap-2 h-8">Password: **********</div> */}
        </div>
      </div>
    </div>
  )
}
export default ProfileQuery
