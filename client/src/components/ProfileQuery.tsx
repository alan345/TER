import { trpc } from "../utils/trpc"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { ErrorTemplate } from "../template/ErrorTemplate"

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
        <div className="">
          <img
            src={dataQuery.data.image}
            className="w-36 h-w-36 rounded-full border-4 border-gray-300 shadow-lg transition-transform duration-200 transform hover:scale-110 hover:border-[#034DA2]"
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
