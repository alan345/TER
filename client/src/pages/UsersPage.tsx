import { trpc } from "../utils/trpc"
// import { useSearchParams } from "react-router-dom"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { ErrorTemplate } from "../template/ErrorTemplate"

export const UsersPage = () => {
  // const [searchParams] = useSearchParams()
  // let sizeUrl = searchParams.get("size")

  const dataQuery = trpc.getUsers.useQuery({ page: 0 })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />

  return (
    <div>
      <div className="flex justify-between mt-4"></div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>

          <tbody>
            {dataQuery.data?.map((singleElement) => (
              <tr key={singleElement.id}>
                <td>{singleElement.id}</td>
                <td>{singleElement.name}</td>
                <td>{singleElement.email}</td>
                <td>
                  <img src={singleElement.image} width="60px" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
