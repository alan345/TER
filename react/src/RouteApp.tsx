import React from "react"
import { Switch, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"

export default function RouteApp() {
  return (
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
      <Route path="/ForgetPassword">
        <ForgetPassword />
      </Route>
      <Route path="/resetPassword/:resetPasswordToken">
        <ResetPassword />
      </Route>
    </Switch>
  )
}
