import React from "react"
import { gql, useQuery } from "@apollo/client"
import { PostsContext } from "./Context"
export const ME_QUERY_ROLE = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`

export default function Me() {
  const { data } = useQuery(ME_QUERY_ROLE)
  const context = React.useContext(PostsContext)

  React.useEffect(() => {
    console.log("me")
    if (data?.me?.id) {
      context.updateUser(data.me)
    }
  }, [data])

  return null
}
