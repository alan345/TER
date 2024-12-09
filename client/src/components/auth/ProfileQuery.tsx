import { trpc } from "../../utils/trpc"
import { LoadingTemplate } from "../../template/LoadingTemplate"
import ErrorTemplate from "../../template/ErrorTemplate"
import iconAvatar from "@ter/client/src/assets/icons/avatar.svg"
import UpdateUserName from "../user/UpdateUserName"
import ImgAvatar from "../../layout/ImgAvatar"
import UpdateUserAge from "../user/UpdateUserAge"
import UpdateUserPassword from "../user/UpdateUserPassword"
import UpdateUserEmail from "../user/UpdateUserEmail"

type Props = {
  meId: string
}

const ProfileQuery = (props: Props) => {
  const dataQuery = trpc.getUserProfile.useQuery({ id: props.meId })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />
  if (!dataQuery.data) return <div>No data</div>
  return (
    <div>
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
          <UpdateUserEmail user={dataQuery.data} onUpdate={dataQuery.refetch} />
          <UpdateUserPassword onUpdate={dataQuery.refetch} />
        </div>
      </div>
    </div>
  )
}
export default ProfileQuery
