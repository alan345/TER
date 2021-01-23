import React from "react"
import { Pagination } from "@material-ui/lab"
import { gql, useQuery } from "@apollo/client"
import { User } from "./model/User"
import { useHistory } from "react-router-dom"
import { ParamTypes } from "../ParamTypes.type"
import { useParams } from "react-router"

export const QUERY = gql`
  query UsersPagination($page: Float!) {
    usersPagination(page: $page) {
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
  const page = Number(params.page)

  const history = useHistory()
  const onChange = (event: any, page: number) => {
    history.push(`/users/${page}`)
  }

  const { data } = useQuery(QUERY, {
    variables: {
      page,
    },
  })

  if (!data?.usersPagination?.users) return null
  return (
    <>
      <h3>Users</h3>
      {data.usersPagination.users.map((user: User) => (
        <div key={user.id}>
          {user.name} ({user.email})
        </div>
      ))}
      <div style={{ height: "20px" }} />
      <Pagination
        count={Math.ceil(
          data.usersPagination.count / data.usersPagination.take
        )}
        onChange={onChange}
        page={page}
      />
    </>
  )
}
export default Users
