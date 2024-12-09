import { trpc } from "../../utils/trpc"
import { LoadingTemplate } from "../../template/LoadingTemplate"
import iconAvatar from "@ter/client/src/assets/icons/avatar.svg"
import ErrorTemplate from "../../template/ErrorTemplate"
import { useLocation, useNavigate } from "react-router-dom"
import { XCircle } from "@phosphor-icons/react"
import ImgAvatar from "../../layout/ImgAvatar"

type Props = {
  userId: string
}

const ChipUserId = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const dataQuery = trpc.getUser.useQuery({ id: props.userId })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />
  if (!dataQuery.data) return null

  return (
    <div className="inline-flex items-center bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full gap-2">
      <ImgAvatar src={dataQuery.data.image ? dataQuery.data.image : iconAvatar} className="w-8 h-8" alt="Profile" />
      {dataQuery.data.name}
      <XCircle
        className="text-xl cursor-pointer"
        onClick={() => {
          searchParams.delete("userId")
          navigate(`${location.pathname}?${searchParams.toString()}`)
        }}
      />
    </div>
  )
}
export default ChipUserId
