import React from "react"
import { TextField, Button } from "@material-ui/core/"
import { gql, useMutation, useApolloClient } from "@apollo/client"
import { Typography } from "@material-ui/core"
import { PostsContext } from "../Context"

const MUTATION = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!) {
    signupUser(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`
export default function Signup() {
  const context = React.useContext(PostsContext)
  const [message, setMessage] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [signupUser] = useMutation(MUTATION)
  const client = useApolloClient()
  const signupF = async () => {
    let dataUser
    try {
      dataUser = await signupUser({
        variables: {
          name,
          email,
          password,
        },
      })
    } catch (e) {
      setMessage("Error")
      // console.log(e)
      //
    }
    if (dataUser?.data?.signupUser) {
      console.log(dataUser)
      setMessage("")

      localStorage.setItem("AUTH_TOKEN", dataUser.data.signupUser.token)
      // localStorage.setItem(
      //   "AUTH_TOKEN_USER",
      //   JSON.stringify(dataUser.data.signupUser.user)
      // )
      context.updateUser(dataUser.data.signupUser.user)

      client.resetStore()
      // this.props.client.resetStore().then(() => {
      //   this.props.history.push(`/`)
      // })
    }
  }

  return (
    <>
      <h3>signup</h3>
      <div>
        <TextField
          id="name"
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="email"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button variant={"outlined"} color={"primary"} onClick={signupF}>
          Sign up
        </Button>
      </div>
      <Typography color={"secondary"}>{message}</Typography>
    </>
  )
}
