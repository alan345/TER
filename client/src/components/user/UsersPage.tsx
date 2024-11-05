import { Link, useLocation } from "react-router-dom"
import { CaretRight, CaretLeft } from "@phosphor-icons/react"
import UsersQuery from "./UsersQuery"

export const UsersPage = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = query.get("page")
  const pageNumber = page ? parseInt(page, 10) : 1

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
          <UsersQuery page={pageNumber} />
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-4">
        {pageNumber > 1 && (
          <Link to={`?page=${pageNumber - 1}`} className="link mr-2">
            <CaretLeft />
          </Link>
        )}
        {pageNumber}
        <Link className="link ml-2" to={`?page=${pageNumber + 1}`}>
          <CaretRight />
        </Link>
      </div>
    </div>
  )
}
