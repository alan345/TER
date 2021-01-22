import React from "react"
import { TextField, Button } from "@material-ui/core/"
import { gql, useMutation } from "@apollo/client"

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
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [signupUser] = useMutation(MUTATION)

  const signupF = async () => {
    let data
    try {
      data = await signupUser({
        variables: {
          name,
          email,
          password,
        },
      })
    } catch (e) {
      // console.log(e)
      //
    }
    if (data) {
      //
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
    </>
  )
}
