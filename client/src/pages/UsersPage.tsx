import { trpc } from "../utils/trpc"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { ErrorTemplate } from "../template/ErrorTemplate"

export const UsersPage = () => {
  const dataQuery = trpc.getUsers.useQuery({ page: 0 })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />

  return (
    <div>
      <div className="flex justify-between mt-4"></div>
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
  )
}
