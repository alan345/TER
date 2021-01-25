import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import Users from "../pages/Users";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import User from "../pages/UserPage";

export default function RouteApp() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <PublicRoute path="/signup" component={Signup} />
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/forgetPassword" component={ForgetPassword} />
      <PublicRoute
        path="/resetPassword/:resetPasswordToken"
        component={ResetPassword}
      />

      <PrivateRoute path="/users" component={Users} />
      <PrivateRoute path="/user/:userId" component={User} />
    </Switch>
  );
}
