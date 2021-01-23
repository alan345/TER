import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Header"
import Me from "./Me"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { PostsContext, postsContextDefaultValue } from "./Context"
import { Card, CardContent } from "@material-ui/core/"

export default function BasicExample() {
  const [user, setUser] = React.useState(postsContextDefaultValue.user)

  const updateUser = React.useCallback(
    (user: any) => {
      console.log("updateUser")
      setUser(user)
    },
    [setUser, user]
  )

  return (
    <PostsContext.Provider value={{ user, updateUser }}>
      <Router>
        <div>
          <Header />
          <Me />
          <Card elevation={3}>
            <CardContent>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
              </Switch>
            </CardContent>
          </Card>
        </div>
      </Router>
    </PostsContext.Provider>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}
