import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Header"
import Me from "./Me"
import Signup from "./pages/Signup"
import { PostsContext, postsContextDefaultValue } from "./Context"
// import { gql } from "@apollo/client"

// export const ME_QUERY_ROLE = gql`
//   query Me {
//     me {
//       id
//       name
//     }
//   }
// `

export default function BasicExample() {
  const [user, setUser] = React.useState(postsContextDefaultValue.user)
  // const setUserC = (user: any) => {
  //   setUser(user)
  // }
  // const { data } = useQuery(ME_QUERY_ROLE)

  const updateUser = React.useCallback(
    (user: any) => {
      setUser(user)
    },
    [setUser, user]
  )

  // React.useEffect = () => {
  // if (data?.me?.id) {
  //   setUser(data.me)
  // }
  // }

  return (
    <PostsContext.Provider value={{ user, updateUser }}>
      <Router>
        <div>
          <Header />
          <Me />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </PostsContext.Provider>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}
