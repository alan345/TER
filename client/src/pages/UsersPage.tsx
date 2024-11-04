import { trpc } from "../utils/trpc"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { ErrorTemplate } from "../template/ErrorTemplate"
import { Link, useLocation } from "react-router-dom"

export const UsersPage = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = query.get("page")
  const pageNumber = page ? parseInt(page, 10) : 1

  const dataQuery = trpc.getUsers.useQuery({ page: pageNumber })
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
          {dataQuery.data?.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.image && <img src={user.image} width="60px" />}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        {pageNumber > 1 && <Link to={`?page=${pageNumber - 1}`} className="mr-2">{`<`}</Link>}
        {pageNumber}
        <Link className="ml-2" to={`?page=${pageNumber + 1}`}>{`>`}</Link>
      </div>
    </div>
  )
}
