import React from "react"
import { gql, useQuery } from "@apollo/client"
import { PostsContext } from "./Context"
export const ME_QUERY_ROLE = gql`
  query Me {
    me {
      id
      name
    }
  }
`

export default function Me() {
  const { loading, error, data } = useQuery(ME_QUERY_ROLE)
  const context = React.useContext(PostsContext)
  console.log(data)
  console.log(error)
  console.log(loading)
  // React.useEffect =
  //   (() => {
  //     if (data?.me?.id) {
  //       context.updateUser(data.me)
  //     }
  //   },
  //   [])

  React.useEffect(() => {
    // This effect uses the `value` variable,
    // so it "depends on" `value`.
    if (data?.me?.id) {
      context.updateUser(data.me)
    }
  }, [data])

  // const [user, setUser] = React.useState(postsContextDefaultValue.user)
  // const setUserC = (user: any) => {
  //   setUser(user)
  // }

  return null
}
