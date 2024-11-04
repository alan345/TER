import { trpc } from "../utils/trpc"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { ErrorTemplate } from "../template/ErrorTemplate"
import { useState } from "react"
import iconAvatar from "../assets/icons/avatar.svg"

type Props = {
  meId: string
}
export const ProfileQuery = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const dataQuery = trpc.getUser.useQuery({ id: props.meId })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />
  if (!dataQuery.data) return <div>No data</div>
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Profile</h2>
      <div className="mt-4">
        <div>
          <img
            src={dataQuery.data.image ? dataQuery.data.image : iconAvatar}
            onLoad={() => setIsLoaded(true)}
            className={`w-36 h-36 rounded-full shadow-lg transition-transform duration-200 transform hover:scale-110 ${
              isLoaded ? "border-4 border-gray-300 hover:border-[#034DA2]" : ""
            }`}
            alt="Profile"
          />
        </div>
        <div className="mt-4">
          <p>Name: {dataQuery.data.name}</p>
          <p>Email: {dataQuery.data.email}</p>
        </div>
      </div>
    </div>
  )
}
