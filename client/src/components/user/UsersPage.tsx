import { useLocation } from "react-router-dom"
import { trpc } from "../../utils/trpc"
import ErrorTemplate from "../../template/ErrorTemplate"
import Pagination from "./Pagination"
import ImgAvatar from "../../template/layout/ImgAvatar"

const UsersPage = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = query.get("page")
  const pageNumber = page ? parseInt(page, 10) : 1
  const dataQuery = trpc.getUsers.useQuery({ page: pageNumber })
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Created At</th>
                <th>Last Login At</th>
                <th>Email</th>
                <th>Avatar</th>
              </tr>
            </thead>
            <tbody>
              {dataQuery.data?.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : ""}</td>
                  <td>{user.email}</td>
                  <td>
                    <ImgAvatar src={user.image} alt="Profile Image" className="w-10 h-10" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {dataQuery.isLoading && <div>Loading...</div>}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="sticky bottom-0 h-10 mr-6 mt-4">
          <div className="flex justify-end">
            {dataQuery.data && (
              <Pagination limit={dataQuery.data.limit} page={dataQuery.data.page} total={dataQuery.data.total} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage
