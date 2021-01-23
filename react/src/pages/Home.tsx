import React from "react"
import { useHistory } from "react-router-dom"
import { PostsContext } from "../Context"

const Home = () => {
  const history = useHistory()
  const context = React.useContext(PostsContext)
  React.useEffect(() => {
    console.log(context.user.id === "")
    if (!context.user.id) {
      history.push("/login")
    }
  }, [context])

  return (
    <>
      <h3>Home</h3>
      Hello {context.user.name}. Your email is {context.user.email}
    </>
  )
}

export default Home
