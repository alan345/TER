import React from "react"
import { gql, useQuery } from "@apollo/client"
import { User } from "./model/User"
import { useLocation } from "react-router-dom"
import { ParamTypes } from "../ParamTypes.type"
import { useParams } from "react-router"
import Search from "./Search"
import PaginationApp from "./PaginationApp"

export const QUERY = gql`
  query UsersPagination($page: Float!, $where: UserWhereInput) {
    usersPagination(page: $page, where: $where) {
      users {
        id
        name
        email
      }
      count
      take
    }
  }
`

const Users = () => {
  const params: ParamTypes = useParams<ParamTypes>()
  const queryString = require("query-string")
  const page = Number(params.page)
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  // console.log(parsed)

  // const history = useHistory()
  // const onChange = (event: any, page: number) => {
  //   history.push(`/users/${page}?${queryString.stringify(parsed)}`)
  // }

  const { data } = useQuery(QUERY, {
    variables: {
      where: {
        search: parsed.search,
      },
      page,
    },
  })

  return (
    <>
      <h3>Users</h3>
      <Search />
      <div style={{ height: "15px" }} />
      {data?.usersPagination?.users && (
        <>
          {data.usersPagination.users.map((user: User) => (
            <div key={user.id}>
              {user.name} ({user.email})
            </div>
          ))}
          <div style={{ height: "20px" }} />
          {/* <Pagination
            count={Math.ceil(
              data.usersPagination.count / data.usersPagination.take
            )}
            onChange={onChange}
            page={page}
          /> */}
          <PaginationApp
            count={data.usersPagination.count}
            take={data.usersPagination.take}
          />
        </>
      )}
    </>
  )
}
export default Users
